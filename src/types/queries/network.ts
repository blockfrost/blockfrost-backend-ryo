export interface Network {
  supply: {
    max: string;
    total: string;
    circulating: string;
    locked: string;
    treasury: string;
    reserves: string;
  };
  stake: { live: string; active: string };
}

export interface Epoch {
  epoch: number;
}

export interface Protocols {
  epoch: number;
  protocol_major: number;
}
