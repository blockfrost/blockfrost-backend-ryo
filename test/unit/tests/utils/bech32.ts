import { drepIdToRaw } from '../../../../src/utils/bech32.js';
import { describe, expect, test } from 'vitest';

describe('bech32', () => {
  test('drepIdToRaw', () => {
    expect(drepIdToRaw('drep1y3wylkrkyt3q6u078ajh8f2henflpsq5hrcqhfa3yfmlqx7z66n')).toEqual(
      '\\x245c4fd87622e20d71fe3f6573a557ccd3f0c014b8f00ba7b12277f0',
    );

    expect(drepIdToRaw('drep1edu7a90eszdus0hguck2w3lxr5r0juvc9frrxv3d2e6fcnqte0e')).toEqual(
      '\\xcb79ee95f9809bc83ee8e62ca747e61d06f971982a4633322d56749c',
    );

    expect(drepIdToRaw('drep_script1hmgwyt6zv89j5htlnwcttk95lr0x7r87sxzr9dumxnc3vadhlap')).toEqual(
      '\\xbed0e22f4261cb2a5d7f9bb0b5d8b4f8de6f0cfe818432b79b34f116',
    );

    expect(drepIdToRaw('drep1hmgwyt6zv89j5htlnwcttk95lr0x7r87sxzr9dumxnc3vj02hpq')).toEqual(
      '\\xbed0e22f4261cb2a5d7f9bb0b5d8b4f8de6f0cfe818432b79b34f116',
    );
    expect(drepIdToRaw('drep_script16pxnn38ykshfahwmkaqmke3kdqaksg4w935d7uztvh8y5sh6f6d')).toEqual(
      '\\xd04d39c4e4b42e9edddbb741bb6636683b6822ae2c68df704b65ce4a',
    );
  });
});
