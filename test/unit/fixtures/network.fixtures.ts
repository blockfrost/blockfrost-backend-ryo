const query_network = [
  {
    supply: {
      max: '45000000000000000',
      circulating: '30212405494649956',
      total: '38412455491629251',
      locked: '123124342341',
      treasury: '3242343242342',
      reserves: '123235049089',
    },
    stake: { live: '23204521899908362', active: '23210733595257321' },
  },
];

const response_network = {
  supply: {
    max: '45000000000000000',
    circulating: '30212405494649956',
    total: '38412455491629251',
    locked: '123124342341',
    treasury: '3242343242342',
    reserves: '123235049089',
  },
  stake: { live: '23204521899908362', active: '23210733595257321' },
};

const query_last_epoch_mainnet = [{ epoch: 376, epoch_slot: 1 }];
const query_param_proposal_mainnet = [
  { epoch: 235, protocol_major: 3 },
  { epoch: 250, protocol_major: 4 },
  { epoch: 289, protocol_major: 5 },
  { epoch: 297, protocol_major: 6 },
  { epoch: 364, protocol_major: 7 },
];

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
      time: 162864000,
      slot: 77500800,
      epoch: 377
    },
    parameters: {
      epoch_length: 432000,
      slot_length: 1,
      safe_zone: 129600
    }
  }
];

const query_last_epoch_testnet = [{ epoch: 242, epoch_slot: 1 }];
const query_param_proposal_testnet = [
  { epoch: 101, protocol_major: 3 },
  { epoch: 111, protocol_major: 4 },
  { epoch: 153, protocol_major: 5 },
  { epoch: 161, protocol_major: 6 },
  { epoch: 214, protocol_major: 7 },
];

const response_eras_testnet = [
  {
    start: {
      time: 0,
      slot: 0,
      epoch: 0
    },
    end: {
      time: 31968000,
      slot: 1598400,
      epoch: 74
    },
    parameters: {
      epoch_length: 21600,
      slot_length: 20,
      safe_zone: 4320
    }
  },
  {
    start: {
      time: 31968000,
      slot: 1598400,
      epoch: 74
    },
    end: {
      time: 44064000,
      slot: 13694400,
      epoch: 102
    },
    parameters: {
      epoch_length: 432000,
      slot_length: 1,
      safe_zone: 129600
    }
  },
  {
    start: {
      time: 44064000,
      slot: 13694400,
      epoch: 102
    },
    end: {
      time: 48384000,
      slot: 18014400,
      epoch: 112
    },
    parameters: {
      epoch_length: 432000,
      slot_length: 1,
      safe_zone: 129600
    }
  },
  {
    start: {
      time: 48384000,
      slot: 18014400,
      epoch: 112
    },
    end: {
      time: 66528000,
      slot: 36158400,
      epoch: 154
    },
    parameters: {
      epoch_length: 432000,
      slot_length: 1,
      safe_zone: 129600
    }
  },
  {
    start: {
      time: 66528000,
      slot: 36158400,
      epoch: 154
    },
    end: {
      time: 92880000,
      slot: 62510400,
      epoch: 215
    },
    parameters: {
      epoch_length: 432000,
      slot_length: 1,
      safe_zone: 129600
    }
  },
  {
    start: {
      time: 92880000,
      slot: 62510400,
      epoch: 215
    },
    end: {
      time: 104976000,
      slot: 74606400,
      epoch: 243
    },
    parameters: {
      epoch_length: 432000,
      slot_length: 1,
      safe_zone: 129600
    }
  }
];

const query_last_epoch_preprod = [{ epoch: 33, epoch_slot: 1 }];
const query_param_proposal_preprod = [
  { epoch: 4, protocol_major: 3 },
  { epoch: 5, protocol_major: 4 },
  { epoch: 6, protocol_major: 5 },
  { epoch: 8, protocol_major: 6 },
  { epoch: 11, protocol_major: 7 },
];

const response_eras_preprod = [
  {
    start: {
      time: 0,
      slot: 0,
      epoch: 0
    },
    end: {
      time: 1728000,
      slot: 86400,
      epoch: 4
    },
    parameters: {
      epoch_length: 21600,
      slot_length: 20,
      safe_zone: 4320
    }
  },
  {
    start: {
      time: 1728000,
      slot: 86400,
      epoch: 4
    },
    end: {
      time: 2160000,
      slot: 518400,
      epoch: 5
    },
    parameters: {
      epoch_length: 432000,
      slot_length: 1,
      safe_zone: 129600
    }
  },
  {
    start: {
      time: 2160000,
      slot: 518400,
      epoch: 5
    },
    end: {
      time: 2592000,
      slot: 950400,
      epoch: 6
    },
    parameters: {
      epoch_length: 432000,
      slot_length: 1,
      safe_zone: 129600
    }
  },
  {
    start: {
      time: 2592000,
      slot: 950400,
      epoch: 6
    },
    end: {
      time: 3024000,
      slot: 1382400,
      epoch: 7
    },
    parameters: {
      epoch_length: 432000,
      slot_length: 1,
      safe_zone: 129600
    }
  },
  {
    start: {
      time: 3024000,
      slot: 1382400,
      epoch: 7
    },
    end: {
      time: 5184000,
      slot: 3542400,
      epoch: 12
    },
    parameters: {
      epoch_length: 432000,
      slot_length: 1,
      safe_zone: 129600
    }
  },
  {
    start: {
      time: 5184000,
      slot: 3542400,
      epoch: 12
    },
    end: {
      time: 14688000,
      slot: 13046400,
      epoch: 34
    },
    parameters: {
      epoch_length: 432000,
      slot_length: 1,
      safe_zone: 129600
    }
  }
];

const query_last_epoch_preview = [{ epoch: 25, epoch_slot: 1 }];
const query_param_proposal_preview = [
  { epoch: 2, protocol_major: 7 },
  { epoch: 21, protocol_major: 8 },
];

const response_eras_preview = [
  {
    start: {
      time: 0,
      slot: 0,
      epoch: 0
    },
    end: {
      time: 0,
      slot: 0,
      epoch: 0
    },
    parameters: {
      epoch_length: 4320,
      slot_length: 20,
      safe_zone: 864
    }
  },
  {
    start: {
      time: 0,
      slot: 0,
      epoch: 0
    },
    end: {
      time: 0,
      slot: 0,
      epoch: 0
    },
    parameters: {
      epoch_length: 86400,
      slot_length: 1,
      safe_zone: 25920
    }
  },
  {
    start: {
      time: 0,
      slot: 0,
      epoch: 0
    },
    end: {
      time: 0,
      slot: 0,
      epoch: 0
    },
    parameters: {
      epoch_length: 86400,
      slot_length: 1,
      safe_zone: 25920
    }
  },
  {
    start: {
      time: 0,
      slot: 0,
      epoch: 0
    },
    end: {
      time: 0,
      slot: 0,
      epoch: 0
    },
    parameters: {
      epoch_length: 86400,
      slot_length: 1,
      safe_zone: 25920
    }
  },
  {
    start: {
      time: 0,
      slot: 0,
      epoch: 0
    },
    end: {
      time: 259200,
      slot: 259200,
      epoch: 3
    },
    parameters: {
      epoch_length: 86400,
      slot_length: 1,
      safe_zone: 25920
    }
  },
  {
    start: {
      time: 259200,
      slot: 259200,
      epoch: 3
    },
    end: {
      time: 2246400,
      slot: 2246400,
      epoch: 26
    },
    parameters: {
      epoch_length: 86400,
      slot_length: 1,
      safe_zone: 25920
    }
  }
];

// within safe zone
const query_last_epoch_preview_safe = [{ epoch: 70, epoch_slot: 65536 }];

const response_eras_preview_safe = [
  {
    start: {
      time: 0,
      slot: 0,
      epoch: 0
    },
    end: {
      time: 0,
      slot: 0,
      epoch: 0
    },
    parameters: {
      epoch_length: 4320,
      slot_length: 20,
      safe_zone: 864
    }
  },
  {
    start: {
      time: 0,
      slot: 0,
      epoch: 0
    },
    end: {
      time: 0,
      slot: 0,
      epoch: 0
    },
    parameters: {
      epoch_length: 86400,
      slot_length: 1,
      safe_zone: 25920
    }
  },
  {
    start: {
      time: 0,
      slot: 0,
      epoch: 0
    },
    end: {
      time: 0,
      slot: 0,
      epoch: 0
    },
    parameters: {
      epoch_length: 86400,
      slot_length: 1,
      safe_zone: 25920
    }
  },
  {
    start: {
      time: 0,
      slot: 0,
      epoch: 0
    },
    end: {
      time: 0,
      slot: 0,
      epoch: 0
    },
    parameters: {
      epoch_length: 86400,
      slot_length: 1,
      safe_zone: 25920
    }
  },
  {
    start: {
      time: 0,
      slot: 0,
      epoch: 0
    },
    end: {
      time: 259200,
      slot: 259200,
      epoch: 3
    },
    parameters: {
      epoch_length: 86400,
      slot_length: 1,
      safe_zone: 25920
    }
  },
  {
    start: {
      time: 259200,
      slot: 259200,
      epoch: 3
    },
    end: {
      time: 6220800,
      slot: 6220800,
      epoch: 72
    },
    parameters: {
      epoch_length: 86400,
      slot_length: 1,
      safe_zone: 25920
    }
  }
];


const response_500 = {
  error: 'Internal Server Error',
  message: 'An unexpected response was received from the backend.',
  status_code: 500,
};

export default [
  {
    name: 'respond with success and data on /network',
    endpoint: '/network',
    sqlQueryMock: {
      rows: query_network,
    },
    network: 'mainnet',
    response: response_network,
  },
  {
    name: 'TESTNET: respond with success and data on /network',
    endpoint: '/network',
    sqlQueryMock: {
      rows: query_network,
    },
    network: 'testnet',
    response: response_network,
  },
  // eras
  {
    name: 'respond with success and data on /network/eras',
    endpoint: '/network/eras',
    sqlQueryMock: {
      rows: query_last_epoch_mainnet,
    },
    sqlQueryMock2: {
      rows: query_param_proposal_mainnet,
    },
    network: 'mainnet',
    response: response_eras_mainnet,
  },
  {
    name: 'TESTNET: respond with success and data on /network/eras',
    endpoint: '/network/eras',
    sqlQueryMock: {
      rows: query_last_epoch_testnet,
    },
    sqlQueryMock2: {
      rows: query_param_proposal_testnet,
    },
    network: 'testnet',
    response: response_eras_testnet,
  },
  {
    name: 'PREPROD: respond with success and data on /network/eras',
    endpoint: '/network/eras',
    sqlQueryMock: {
      rows: query_last_epoch_preprod,
    },
    sqlQueryMock2: {
      rows: query_param_proposal_preprod,
    },
    network: 'preprod',
    response: response_eras_preprod,
  },
  {
    name: 'PREVIEW: respond with success and data on /network/eras',
    endpoint: '/network/eras',
    sqlQueryMock: {
      rows: query_last_epoch_preview,
    },
    sqlQueryMock2: {
      rows: query_param_proposal_preview,
    },
    network: 'preview',
    response: response_eras_preview,
  },
  {
    name: 'PREVIEW: respond with success and data on /network/eras when within safe zone',
    endpoint: '/network/eras',
    sqlQueryMock: {
      rows: query_last_epoch_preview_safe,
    },
    sqlQueryMock2: {
      rows: query_param_proposal_preview,
    },
    network: 'preview',
    response: response_eras_preview_safe,
  },



  /*
      500s
  */

  {
    name: 'respond with 500 and null on /network',
    endpoint: '/network',
    sqlQueryMock: {
      rows: null,
    },
    network: 'mainnet',
    response: response_500,
  },
] as const;
