/* cSpell:disable */

import { describe, expect, test } from 'vitest';
import * as governanceUtils from '../../../../src/utils/governance.js';

describe('governance utils', () => {
  test('governanceUtils.validateDRepId', () => {
    expect(governanceUtils.validateDRepId('drep_always_abstain')).toStrictEqual({
      isCip129: false,
      dbSync: { id: 'drep_always_abstain', raw: null, hasScript: false },
      cip129: {
        id: 'drep_always_abstain',
        hex: null,
      },
    });

    expect(governanceUtils.validateDRepId('drep_always_no_confidence')).toStrictEqual({
      isCip129: false,
      dbSync: { id: 'drep_always_no_confidence', raw: null, hasScript: false },
      cip129: {
        id: 'drep_always_no_confidence',
        hex: null,
      },
    });

    // Note: in reality this is scriptHash dRep on preprod
    expect(
      governanceUtils.validateDRepId('drep1y3wylkrkyt3q6u078ajh8f2henflpsq5hrcqhfa3yfmlqx7z66n'),
    ).toStrictEqual({
      isCip129: false,
      dbSync: {
        id: 'drep1y3wylkrkyt3q6u078ajh8f2henflpsq5hrcqhfa3yfmlqx7z66n',
        raw: '\\x245c4fd87622e20d71fe3f6573a557ccd3f0c014b8f00ba7b12277f0',
        hasScript: false,
      },
      cip129: {
        id: 'drep1ygj9cn7cwc3wyrt3lclk2ua92lxd8uxqzju0qza8ky380uqjnj28h',
        hex: '22245c4fd87622e20d71fe3f6573a557ccd3f0c014b8f00ba7b12277f0',
      },
    });

    // Note: in reality this is scriptHash dRep on preprod
    expect(
      governanceUtils.validateDRepId('drep1edu7a90eszdus0hguck2w3lxr5r0juvc9frrxv3d2e6fcnqte0e'),
    ).toStrictEqual({
      isCip129: false,
      dbSync: {
        id: 'drep1edu7a90eszdus0hguck2w3lxr5r0juvc9frrxv3d2e6fcnqte0e',
        raw: '\\xcb79ee95f9809bc83ee8e62ca747e61d06f971982a4633322d56749c',
        hasScript: false,
      },
      cip129: {
        id: 'drep1yt9hnm54lxqfhjp7arnzef68ucwsd7t3nq4yvvej94t8f8qgam3dv',
        hex: '22cb79ee95f9809bc83ee8e62ca747e61d06f971982a4633322d56749c',
      },
    });

    expect(
      governanceUtils.validateDRepId(
        'drep_script1hmgwyt6zv89j5htlnwcttk95lr0x7r87sxzr9dumxnc3vadhlap',
      ),
    ).toStrictEqual({
      isCip129: false,
      dbSync: {
        id: 'drep_script1hmgwyt6zv89j5htlnwcttk95lr0x7r87sxzr9dumxnc3vadhlap',
        raw: '\\xbed0e22f4261cb2a5d7f9bb0b5d8b4f8de6f0cfe818432b79b34f116',
        hasScript: true,
      },
      cip129: {
        id: 'drep1ywldpc30gfsuk2ja07dmpdwcknudumcvl6qcgv4hnv60z9sl4umuv',
        hex: '23bed0e22f4261cb2a5d7f9bb0b5d8b4f8de6f0cfe818432b79b34f116',
      },
    });

    expect(
      governanceUtils.validateDRepId('drep1hmgwyt6zv89j5htlnwcttk95lr0x7r87sxzr9dumxnc3vj02hpq'),
    ).toStrictEqual({
      isCip129: false,
      dbSync: {
        id: 'drep1hmgwyt6zv89j5htlnwcttk95lr0x7r87sxzr9dumxnc3vj02hpq',
        raw: '\\xbed0e22f4261cb2a5d7f9bb0b5d8b4f8de6f0cfe818432b79b34f116',
        hasScript: false,
      },
      cip129: {
        id: 'drep1y2ldpc30gfsuk2ja07dmpdwcknudumcvl6qcgv4hnv60z9sl8v2ut',
        hex: '22bed0e22f4261cb2a5d7f9bb0b5d8b4f8de6f0cfe818432b79b34f116',
      },
    });

    expect(
      governanceUtils.validateDRepId(
        'drep_script16pxnn38ykshfahwmkaqmke3kdqaksg4w935d7uztvh8y5sh6f6d',
      ),
    ).toStrictEqual({
      isCip129: false,
      dbSync: {
        id: 'drep_script16pxnn38ykshfahwmkaqmke3kdqaksg4w935d7uztvh8y5sh6f6d',
        raw: '\\xd04d39c4e4b42e9edddbb741bb6636683b6822ae2c68df704b65ce4a',
        hasScript: true,
      },
      cip129: {
        id: 'drep1y0gy6wwyuj6za8kamwm5rwmxxe5rk6pz4ckx3hmsfdjuujsr70shz',
        hex: '23d04d39c4e4b42e9edddbb741bb6636683b6822ae2c68df704b65ce4a',
      },
    });

    expect(
      governanceUtils.validateDRepId('drep1y0gy6wwyuj6za8kamwm5rwmxxe5rk6pz4ckx3hmsfdjuujsr70shz'),
    ).toStrictEqual({
      isCip129: true,
      dbSync: {
        id: 'drep16pxnn38ykshfahwmkaqmke3kdqaksg4w935d7uztvh8y5l48pxv',
        raw: '\\xd04d39c4e4b42e9edddbb741bb6636683b6822ae2c68df704b65ce4a',
        hasScript: true,
      },
      cip129: {
        id: 'drep1y0gy6wwyuj6za8kamwm5rwmxxe5rk6pz4ckx3hmsfdjuujsr70shz',
        hex: '23d04d39c4e4b42e9edddbb741bb6636683b6822ae2c68df704b65ce4a',
      },
    });

    // CIP129
    // test vector
    expect(
      governanceUtils.validateDRepId('drep1ygqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq7vlc9n'),
    ).toStrictEqual({
      isCip129: true,
      dbSync: {
        id: 'drep1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqua9udh',
        raw: '\\x00000000000000000000000000000000000000000000000000000000',
        hasScript: false,
      },
      cip129: {
        id: 'drep1ygqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq7vlc9n',
        hex: '2200000000000000000000000000000000000000000000000000000000',
      },
    });

    // HOSKY
    expect(
      governanceUtils.validateDRepId('drep1yf2jzhuc4f7eu2yay9d9ta3dykxxcwn34wz8kak7nhd7vcgrxn7ns'),
    ).toStrictEqual({
      isCip129: true,
      dbSync: {
        id: 'drep125s4lx920k0z38fptf2lvtf933kr5udts3ahdh5am0nxzcqwua9',
        raw: '\\x55215f98aa7d9e289d215a55f62d258c6c3a71ab847b76de9ddbe661',
        hasScript: false,
      },
      cip129: {
        id: 'drep1yf2jzhuc4f7eu2yay9d9ta3dykxxcwn34wz8kak7nhd7vcgrxn7ns',
        hex: '2255215f98aa7d9e289d215a55f62d258c6c3a71ab847b76de9ddbe661',
      },
    });

    // Sebastien Guillemot セバ
    expect(
      governanceUtils.validateDRepId('drep1y2csyxt7u2hl4674pl9cef5lknafaw5nraxvyx033kmd0es3awuv0'),
    ).toStrictEqual({
      isCip129: true,
      dbSync: {
        id: 'drep1kyppjlhz4lawh4g0ewx2d8a5l20t4yclfnppnuvdkmt7vccg836',
        raw: '\\xb102197ee2affaebd50fcb8ca69fb4fa9eba931f4cc219f18db6d7e6',
        hasScript: false,
      },
      cip129: {
        id: 'drep1y2csyxt7u2hl4674pl9cef5lknafaw5nraxvyx033kmd0es3awuv0',
        hex: '22b102197ee2affaebd50fcb8ca69fb4fa9eba931f4cc219f18db6d7e6',
      },
    });
  });
});
