# UV-K1 and UV-K5 V3 factory restoration assets

These files are bundled locally so the guided factory-software restoration does
not depend on another repository while a radio is being restored.

- `K1_External_Flash_Factory_Reconstructed.bin` is the 2 MiB reconstructed UV-K1
  external image, not an unaltered physical dump. It contains the
  factory configuration in the first 64 KiB, erased bytes outside known factory
  data, the factory logo sector at `0x011000-0x011FFF`, and the original audio
  region at `0x100000-0x196FFF`. Its
  calibration-sector placeholder at `0x010000-0x010FFF` is never written.
  The logo sector uses the stock `0x9ABC5A5A` magic and 1024-byte size field
  expected by the original firmware.
- `K5V3_External_Flash_Factory_Reconstructed.bin` contains the same data, except
  that factory boot-message line 2 at `0x007030-0x00703F` contains the
  null-padded string `UV-K5` instead of `UV-K1`.
- `quansheng.stock.logo.png` is the 128x64 factory-logo source encoded into the
  logo sector of both reconstructed external images.
- `quansheng.k1.stock.firmware.v7.03.01.bin` is the stock UV-K1 firmware flashed
  after the external-flash restoration.
- `quansheng.k5v3.stock.firmware.v7.00.11.bin` is the stock UV-K5 V3 firmware.

Expected SHA-256 checksums:

- `K1_External_Flash_Factory_Reconstructed.bin`:
  `a2383aa050dc0963fee7b7c99692b8330d9455a6bbb2bb7498b2bba4174c9d55`
- `K5V3_External_Flash_Factory_Reconstructed.bin`:
  `b85c8066a1b0885d1cf3e430533f45c9c8ea91c8b936a94aba99221fd1bff79b`
- `quansheng.stock.logo.png`:
  `a5b4277efb5f78986bcdb22e4132b62b68aee5f4637a1798164ecc230a935848`
- `quansheng.k1.stock.firmware.v7.03.01.bin`:
  `55ec0daffc5668bdb41dcc118475d7e6e23ad953d70f57a9bca64a6202734ba0`
- `quansheng.k5v3.stock.firmware.v7.00.11.bin`:
  `f4e5264a6f9a5436a6c75f7b217c60ba002cec04928f247392b9968c5c9458cb`

UV Studio verifies the selected files by size and SHA-256 before connecting to the
radio. It skips the device-specific calibration sector, and the compatible
firmware independently rejects erase/write requests targeting that sector.

When UV Studio is opened directly with `file://`, browsers do not allow
`fetch()` to read the binary files. `factory-assets.js` contains the same four
verified files as Base64 and is loaded on demand only in that mode. Regenerate
it after changing any binary with:

```sh
python3 build_factory_assets.py
```
