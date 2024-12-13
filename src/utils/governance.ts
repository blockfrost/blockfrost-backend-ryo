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
 * @returns {{ id: string, raw: string | null }} - An object containing the validated ID and its raw form.
 *   - `id`: The original DRep ID.
 *   - `raw`: The raw format of the DRep ID in hexadecimal if applicable, or `null` for special cases (drep_always_abstain, drep_always_no_confidence).
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
    return {
      ...data,
      drep_id: dRepValidationResult.cip129.id,
      hex: dRepValidationResult.cip129.hex,
    };
  } else {
    return data;
  }
};
