/* UV Studio runtime command framing shared by serial consumers. */
;(function () {
    "use strict";

    const OBFUSCATION_TABLE = new Uint8Array([
        0x16, 0x6c, 0x14, 0xe6, 0x2e, 0x91, 0x0d, 0x40,
        0x21, 0x35, 0xd5, 0x40, 0x13, 0x03, 0xe9, 0x80
    ]);
    const MAX_MESSAGE_LENGTH = 512;

    function obfuscate(buffer, offset, size) {
        for (let index = 0; index < size; index++) {
            buffer[offset + index] ^= OBFUSCATION_TABLE[index % OBFUSCATION_TABLE.length];
        }
    }

    function calculateCrc(buffer, offset, size) {
        let crc = 0;
        for (let index = 0; index < size; index++) {
            crc ^= (buffer[offset + index] & 0xff) << 8;
            for (let bit = 0; bit < 8; bit++) {
                crc = crc & 0x8000
                    ? ((crc << 1) ^ 0x1021) & 0xffff
                    : (crc << 1) & 0xffff;
            }
        }
        return crc;
    }

    function createPacket(messageType, dataBytes) {
        const data = dataBytes instanceof Uint8Array
            ? dataBytes
            : new Uint8Array(dataBytes || 0);
        const payloadLength = 4 + data.length;
        const messageLength = payloadLength + (payloadLength & 1);
        const packet = new Uint8Array(8 + messageLength);
        const view = new DataView(packet.buffer);

        view.setUint16(0, 0xcdab, true);
        view.setUint16(2, messageLength, true);
        view.setUint16(4, messageType, true);
        view.setUint16(6, data.length, true);
        packet.set(data, 8);
        view.setUint16(4 + messageLength, calculateCrc(packet, 4, messageLength), true);
        view.setUint16(6 + messageLength, 0xbadc, true);
        obfuscate(packet, 4, messageLength + 2);
        return packet;
    }

    function parsePacketAt(buffer, offset, limit) {
        const end = Math.min(limit ?? buffer.length, buffer.length);
        if (offset < 0 || offset >= end || buffer[offset] !== 0xab) return null;
        if (offset + 1 >= end) return { incomplete: true, consumed: 0 };
        if (buffer[offset + 1] !== 0xcd) return null;
        if (offset + 4 > end) return { incomplete: true, consumed: 0 };

        const messageLength = buffer[offset + 2] | (buffer[offset + 3] << 8);
        if (messageLength < 4 || messageLength > MAX_MESSAGE_LENGTH) {
            return { invalid: true, consumed: 1 };
        }

        const packetLength = 8 + messageLength;
        if (offset + packetLength > end) return { incomplete: true, consumed: 0 };
        if (buffer[offset + packetLength - 2] !== 0xdc ||
            buffer[offset + packetLength - 1] !== 0xba) {
            return { invalid: true, consumed: 1 };
        }

        const decoded = buffer.slice(offset + 4, offset + 6 + messageLength);
        obfuscate(decoded, 0, decoded.length);
        const decodedView = new DataView(decoded.buffer, decoded.byteOffset, decoded.byteLength);
        const expectedCrc = decodedView.getUint16(messageLength, true);
        // Radio replies retain the original protocol's 0xFFFF placeholder,
        // while browser-to-radio commands carry a calculated CRC.
        if (expectedCrc !== 0xffff &&
            calculateCrc(decoded, 0, messageLength) !== expectedCrc) {
            return { invalid: true, consumed: packetLength };
        }

        const dataLength = decodedView.getUint16(2, true);
        if (dataLength > messageLength - 4) {
            return { invalid: true, consumed: packetLength };
        }

        return {
            consumed: packetLength,
            message: {
                type: decodedView.getUint16(0, true),
                data: decoded.slice(4, 4 + dataLength)
            }
        };
    }

    window.UVStudioRuntimeProtocol = Object.freeze({
        createPacket,
        parsePacketAt
    });
})();
