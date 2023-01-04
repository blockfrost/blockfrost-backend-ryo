import { getInstance } from '../../utils';
import { describe, test, expect } from 'vitest';

const response_eras_mainnet =
[
  {
    start: {
      time: 0,
      slot: 0,
      epoch: 0
    },
    end: {
      time: 89856000,
      slot: 4492800,
      epoch: 208
    },
    parameters: {
      epoch_length: 21600,
      slot_length: 20,
      safe_zone: 4320
    }
  },
  {
    start: {
      time: 89856000,
      slot: 4492800,
      epoch: 208
    },
    end: {
      time: 101952000,
      slot: 16588800,
      epoch: 236
    },
    parameters: {
      epoch_length: 432000,
      slot_length: 1,
      safe_zone: 129600
    }
  },
  {
    start: {
      time: 101952000,
      slot: 16588800,
      epoch: 236
    },
    end: {
      time: 108432000,
      slot: 23068800,
      epoch: 251
    },
    parameters: {
      epoch_length: 432000,
      slot_length: 1,
      safe_zone: 129600
    }
  },
  {
    start: {
      time: 108432000,
      slot: 23068800,
      epoch: 251
    },
    end: {
      time: 125280000,
      slot: 39916800,
      epoch: 290
    },
    parameters: {
      epoch_length: 432000,
      slot_length: 1,
      safe_zone: 129600
    }
  },
  {
    start: {
      time: 125280000,
      slot: 39916800,
      epoch: 290
    },
    end: {
      time: 157680000,
      slot: 72316800,
      epoch: 365
    },
    parameters: {
      epoch_length: 432000,
      slot_length: 1,
      safe_zone: 129600
    }
  },
  {
    start: {
      time: 157680000,
      slot: 72316800,
      epoch: 365
    },
    end: {
      time: expect.any(Number),
      slot: expect.any(Number),
      epoch: expect.any(Number)
    },
    parameters: {
      epoch_length: 432000,
      slot_length: 1,
      safe_zone: 129600
    }
  }
];

describe('network endpoint', () => {
  test('/network/eras', async () => {
    const client = getInstance();
    const response = await client
      .get('network/eras').json();

    expect(response).toStrictEqual(
      expect.arrayContaining(response_eras_mainnet),
    );
  });
});
