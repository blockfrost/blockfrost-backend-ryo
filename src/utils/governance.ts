import { bech32 } from 'bech32';

const SPECIAL_DREP_IDS = new Set(['drep_always_abstain', 'drep_always_no_confidence']);

// eslint-disable-next-line unicorn/prevent-abbreviations
export const dbSyncDRepToCIP129 = <T extends { drep_id: string; has_script: boolean }>(dRep: T) => {
  if (SPECIAL_DREP_IDS.has(dRep.drep_id)) {
    return {
      id: dRep.drep_id,
      hex: null,
    };
  }

  const { prefix, words } = bech32.decode(dRep.drep_id);

  if (prefix !== 'drep' && prefix !== 'drep_script') {
    throw new Error('Invalid drep id prefix');
  }

  const hexBuf = Buffer.from(bech32.fromWords(words));

  const keyTypeNibble = 0x2 << 4; // set keyType to dRep
  const credentialTypeNibble = dRep.has_script ? 0x3 : 0x2;

  const header = keyTypeNibble | credentialTypeNibble;

  const headerBuff = Buffer.alloc(1); // Allocate a 1-byte buffer (adjust size as needed)

  headerBuff.writeUInt8(header, 0);

  const hexWithHeader = Buffer.concat([headerBuff, hexBuf]);
  const idWithHeader = bech32.encode('drep', bech32.toWords(hexWithHeader));

  return {
    id: idWithHeader,
    hex: hexWithHeader.toString('hex'),
  };
};

export interface DRepValidationResult {
  dbSync: {
    id: string;
    raw: string | null;
    hasScript: boolean;
  };
  cip129: {
    // CIP129 bech32 representation of dRep ID
    id: string;
    // CIP129 hex representation of dRep ID (includes 1 byte header)
    hex: string | null;
  };
  isCip129: boolean;
}

/**
 * Validates a DRep ID and returns both the ID and its raw format if applicable.
 *
 * @param {string} bechDrepId - The DRep ID in Bech32 format that needs to be validated.
 * @returns {{
 *   dbSync: { id: string, raw: string | null, hasScript: boolean },
 *   cip129: { id: string, hex: string | null },
 *   isCip129: boolean
 * }} An object containing the validation results:
 *   - `dbSync.id`: The legacy Bech32-encoded DRep ID.
 *   - `dbSync.raw`: The raw format of the DRep ID in hexadecimal, prefixed with `\x`, or `` for special IDs.
 *   - `dbSync.hasScript`: Indicates whether the DRep ID corresponds to a script-based ID.
 *   - `cip129.id`: The CIP-129 formatted DRep ID, equivalent to the input Bech32 ID.
 *   - `cip129.hex`: The raw hexadecimal format of the CIP-129 ID, or `null` for special cases.
 *   - `isCip129`: True if the ID is CIP-129 compliant; otherwise, false.
 *
 * @throws {Error} If the DRep ID prefix is invalid, an error is thrown.
 */
export const validateDRepId = (bechDrepId: string): DRepValidationResult => {
  if (SPECIAL_DREP_IDS.has(bechDrepId)) {
    return {
      dbSync: {
        id: bechDrepId,
        raw: null,
        hasScript: false,
      },
      cip129: {
        id: bechDrepId,
        hex: null,
      },
      isCip129: false,
    };
  }
  const { prefix, words } = bech32.decode(bechDrepId);

  if (prefix !== 'drep' && prefix !== 'drep_script') {
    throw new Error('Invalid drep id prefix');
  }

  const hexBuf = Buffer.from(bech32.fromWords(words));

  if (hexBuf.length === 28) {
    // 28 bytes of keyHash/scriptHash
    // Legacy dbSync-compatible format
    const drepIdRaw = `\\x${hexBuf.toString('hex')}`;
    const hasScript = prefix === 'drep_script';

    const cip129Id = dbSyncDRepToCIP129({
      drep_id: bechDrepId,
      hex: hexBuf.toString('hex'),
      has_script: hasScript,
    });

    return {
      dbSync: {
        id: bechDrepId,
        raw: drepIdRaw,
        hasScript: hasScript,
      },
      cip129: cip129Id,
      isCip129: false,
    };
  } else {
    // CIP-0129 with 1-byte header
    // Extract the first byte
    const headerByte = hexBuf[0];

    // Decode the first nibble (4 bits) for key type
    const keyTypeNibble = (headerByte >> 4) & 0x0f;
    let keyType: 'cc_hot' | 'cc_cold' | 'drep';

    switch (keyTypeNibble) {
      case 0x0: {
        keyType = 'cc_hot'; // Hot Credential
        break;
      }
      case 0x1: {
        keyType = 'cc_cold'; // Cold Credential
        break;
      }
      case 0x2: {
        keyType = 'drep'; // Delegation Representative
        break;
      }
      default: {
        throw new Error('Invalid key type in header');
      }
    }

    if (keyType !== 'drep') {
      throw new Error('Invalid key type in header for dRep');
    }

    // Decode the second nibble (4 bits) for credential type
    const credentialTypeNibble = headerByte & 0x0f;
    let credentialType: 'keyHash' | 'scriptHash';

    switch (credentialTypeNibble) {
      case 0x2: {
        credentialType = 'keyHash'; // Key Hash Credential
        break;
      }
      case 0x3: {
        credentialType = 'scriptHash'; // Script Hash Credential
        break;
      }
      default: {
        throw new Error('Invalid credential type in header');
      }
    }

    // Extract the rest of the buffer (excluding the header byte)
    const drepIdRaw = hexBuf.subarray(1).toString('hex');

    const legacyBech32 = bech32.encode('drep', bech32.toWords(hexBuf.subarray(1)));

    return {
      dbSync: {
        id: legacyBech32,
        raw: `\\x${drepIdRaw}`,
        hasScript: credentialType === 'scriptHash',
      },
      cip129: {
        id: bechDrepId,
        hex: hexBuf.toString('hex'),
      },
      isCip129: true,
    };
  }
};

/**
 * Transform DRep dbsync data to CIP-0129 format if necessary
 *
 * @param {{drep_id: string; hex: string}} data - DRep dbsync data
 * @returns Object - DRep data object with CIP-0129 compatible bech32 ID and hex in case of CIP-0129 drepId. Otherwise the data remain unmodified.
 *
 */
export const enhanceDRep = <T extends { drep_id: string; hex: string }>(
  data: T,
  dRepValidationResult: DRepValidationResult,
) => {
  if (dRepValidationResult.isCip129) {
    // Client queried with CIP129 DRep
    // Replace legacy-dbsync-native DRep ID and hex with CIP129 format
    return {
      ...data,
      drep_id: dRepValidationResult.cip129.id,
      hex: dRepValidationResult.cip129.hex,
    };
  } else {
    return data;
  }
};

/**
 * Validates a governance action ID (gov_action_id) and extracts its components.
 *
 * A gov_action_id is a Bech32-encoded string with the prefix 'gov_action',
 * encoding a concatenation of a 32-byte transaction hash and a variable-length certificate index.
 *
 * @param {string} govActionId - The Bech32-encoded governance action ID to validate and parse.
 * @returns {{ tx_hash: string, cert_index: number }}
 *   An object containing:
 *   - `tx_hash`: The 32-byte transaction hash as a hex string.
 *   - `cert_index`: The certificate index as a number.
 *
 * @throws {Error} If the prefix is not 'gov_action', or the decoded length is invalid.
 *
 * @see https://github.com/cardano-foundation/CIPs/blob/master/CIP-0129/README.md
 */
export const validateGovActionId = (govActionId: string) => {
  // https://github.com/cardano-foundation/CIPs/blob/master/CIP-0129/README.md
  // gov action id = bech32(prefix gov_action, tx_hash+cert_index)

  const { prefix, words } = bech32.decode(govActionId);

  if (prefix !== 'gov_action') {
    throw new Error(`Invalid gov action id prefix`);
  }

  const hexBuf = Buffer.from(bech32.fromWords(words));

  if (hexBuf.length < 32) {
    throw new Error('Invalid gov action id length');
  }

  const txHash = hexBuf.subarray(0, 32).toString('hex');
  const certIndexHex = hexBuf.subarray(32).toString('hex');
  const certIndex = Number.parseInt(certIndexHex, 16);

  return {
    tx_hash: txHash,
    cert_index: certIndex,
  };
};

const toMinimalHex = (n: number | bigint): string => {
  let hex = BigInt(n).toString(16);

  if (hex.length % 2) {
    hex = '0' + hex; // pad to even length
  }
  return hex;
};

/**
 * Constructs a governance action ID (gov_action_id) from a transaction hash and certificate index.
 *
 * The resulting gov_action_id is a Bech32-encoded string with the prefix 'gov_action',
 * encoding the concatenation of the 32-byte transaction hash and the minimal-length
 * big-endian representation of the certificate index.
 *
 * @param {string} txHash - The 32-byte transaction hash as a hex string (64 hex chars).
 * @param {number} certIndex - The certificate index as a number.
 * @returns {string} The Bech32-encoded governance action ID.
 *
 * @see https://github.com/cardano-foundation/CIPs/blob/master/CIP-0129/README.md
 */
export const getGovActionId = (txHash: string, certIndex: number) => {
  const txHashBuf = Buffer.from(txHash, 'hex');
  const certIndexBuf = Buffer.from(toMinimalHex(certIndex), 'hex');

  const combinedBuf = Buffer.concat([txHashBuf, certIndexBuf]);

  const words = bech32.toWords(combinedBuf);
  const govActionId = bech32.encode('gov_action', words);

  return govActionId;
};

export const enhanceProposal = <T extends { tx_hash: string; cert_index: number }>(data: T) => {
  if (data === undefined) {
    return data;
  }
  return {
    id: getGovActionId(data.tx_hash, data.cert_index),
    ...data,
  };
};
