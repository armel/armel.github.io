
function log(message, replace = false) {
  const consoleArea = document.getElementById('console');

  if (replace) {
    // Replace the last line with the new message
    const lastLineIndex = consoleArea.value.lastIndexOf('\n');
    consoleArea.value = consoleArea.value.substring(0, lastLineIndex) + '\n' + message;
  } else {
  // Append the new message to the existing content and add a newline

  // If the console is empty, dont add a newline
  if (consoleArea.value.length === 0) {
    consoleArea.value = message;
  } else {

  consoleArea.value += '\n' + message;
  }
  }

  // Scroll to the bottom to show the latest message
  consoleArea.scrollTop = consoleArea.scrollHeight;
}



// Helper functions:

/**
 * Converts a hexadecimal string to a Uint8Array.
 * The input hex string should have the format "HH" where HH is a two-digit hexadecimal value. 
 * 
 * 0x or \x is not allowed
 * 
 * To output a python bytearray in the correct format, use this in python: print(''.join('%02x'%i for i in YOUR_BYTEARRAY))
 * @example hexString("0102AAFF") // Outputs Uint8Array of 1, 2, 170, 255
 * @param {string} hexString - The hexadecimal string to convert.
 * @returns {Uint8Array} The Uint8Array representing the converted data.
 */
function hexString(hexString) {
  const byteArray = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < byteArray.length; i++) {
    const byteValue = parseInt(hexString.substr(i * 2, 2), 16);
    byteArray[i] = byteValue;
  }
  return byteArray;
}

/**
 * Converts a Uint8Array to a hexadecimal string, mostly for debugging purposes.
 *
 * @param {Uint8Array} uint8Array - The Uint8Array to convert.
 * @returns {string} The hexadecimal representation of the Uint8Array without separators. 
 */
function uint8ArrayToHexString(uint8Array) {
  return Array.from(uint8Array)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}


/**
 * Replaces or appends a section in the firmware data with new data at the specified offset.
 * To append data to the firmware, use firmwareData.length as the offset. 
 * @param {Uint8Array} firmwareData - The original firmware Uint8array.
 * @param {Uint8Array} newData - The new data to replace the section with.
 * @param {number} offset - The offset where the section should be replaced. 
 * @returns {Uint8Array} - The updated firmware data with the section replaced.
 */
function replaceSection(firmwareData, newData, offset) {
  const updatedFirmwareData = new Uint8Array(Math.max(firmwareData.length, offset + newData.length));

  updatedFirmwareData.set(firmwareData.subarray(0, offset));
  updatedFirmwareData.set(newData, offset);
  if (offset + newData.length < firmwareData.length) {
    updatedFirmwareData.set(firmwareData.subarray(offset + newData.length), offset + newData.length);
  }

  return updatedFirmwareData;
}

/**
 * Compares two Uint8Arrays to check if they are equal.
 * @param {Uint8Array} array1 - The first Uint8Array to compare.
 * @param {Uint8Array} array2 - The second Uint8Array to compare.
 * @returns {boolean} - True if the Uint8Arrays are equal, false otherwise.
 */
function compareUint8Arrays(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
}

