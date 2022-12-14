import * as CardanoWasm from '@emurgo/cardano-serialization-lib-nodejs';
import { parseAsset } from '@blockfrost/blockfrost-js';
import crc8 from 'crc/crc8';
import isValidUTF8 from 'utf-8-validate';
import cbor from 'cbor';

const ASSET_NAME_LABELS = {
  reference_nft: 100, // Reference NFT locked at a script containing the datum
  nft: 222, // NFT hold by the user's wallet making use of CIP-0025 inner structure
  ft: 333, // FT hold by the user's wallet making use of Cardano foundation off-chain registry inner structure
} as const;

export interface ReferenceMetadataDatum {
  metadata: Record<string, unknown>;
  version: number;
}

export const cip67Checksum = (number_: string): string => {
  return crc8(Uint8Array.from(Buffer.from(number_, 'hex')))
    .toString(16)
    .padStart(2, '0');
};

export const toLabel = (number_: number): string => {
  if (number_ < 0 || number_ > 65_535) {
    throw new Error(`Label ${number_} out of range: min label 1 - max label 65535.`);
  }
  const numberHex = number_.toString(16).padStart(4, '0');

  return '0' + numberHex + cip67Checksum(numberHex) + '0';
};

export const fromLabel = (label: string): number | null => {
  if (label.length !== 8 || !(label[0] === '0' && label[7] === '0')) {
    return null;
  }
  const numberHex = label.slice(1, 5);
  const number_ = Number.parseInt(numberHex, 16);
  const check = label.slice(5, 7);

  return check === cip67Checksum(numberHex) ? number_ : null;
};

const buildAssetHex = (policyId: string, label: string, assetName: string) => {
  const assetHex = `${policyId}${label}${assetName}`;

  return assetHex;
};

export const toCip68Assets = (hex: string) => {
  // Asset name is prefixed by 4 bytes (32 bits, 8 hex chars)
  // https://developers.cardano.org/docs/governance/cardano-improvement-proposals/cip-0067/#specification
  // split asset hex to policy and asset name
  const assetParts = parseAsset(hex);
  // slice label prefix (first 4 bytes)
  const labelPrefix = assetParts.assetNameHex.slice(0, 8);
  const labelNumber = fromLabel(labelPrefix);
  // slice asset name without the label prefix
  const assetNameWithoutLabelPrefix = assetParts.assetNameHex.slice(8);

  if (labelNumber === null) {
    // Asset does not follow CIP67/68
    return null;
  }

  // Encode label
  const referenceLabel = toLabel(ASSET_NAME_LABELS.reference_nft);
  const nftLabel = toLabel(ASSET_NAME_LABELS.nft);
  const ftLabel = toLabel(ASSET_NAME_LABELS.ft);

  // Build reference asset hex (policy_id|reference_label|name)
  const assets = {
    reference_nft: buildAssetHex(assetParts.policyId, referenceLabel, assetNameWithoutLabelPrefix),
    nft: buildAssetHex(assetParts.policyId, nftLabel, assetNameWithoutLabelPrefix),
    ft: buildAssetHex(assetParts.policyId, ftLabel, assetNameWithoutLabelPrefix),
  };

  return assets;
};

export const toUTF8OrHex = (hexOrBuffer: string | Buffer) => {
  const buffer = Buffer.isBuffer(hexOrBuffer) ? hexOrBuffer : Buffer.from(hexOrBuffer, 'hex');

  return isValidUTF8(buffer) ? buffer.toString('utf8') : buffer.toString('hex');
};

export const getMetadataFromOutputDatum = (datumHex: string): ReferenceMetadataDatum | null => {
  const datum = CardanoWasm.PlutusData.from_hex(datumHex);

  const constrPlutusData = datum.as_constr_plutus_data();

  if (!constrPlutusData || constrPlutusData.data().len() === 0) {
    // no data
    return null;
  }

  // Lookup metadata by going into the first field of constructor 0.
  const datumMap = constrPlutusData.data().get(0).as_map();
  const datumVersion = Number(constrPlutusData.data().get(1).as_integer()?.to_str());

  if (!datumMap) {
    return null;
  }

  if (datumVersion === undefined) {
    // missing version
    return null;
  }

  // The approach below would need to add handling for all data types supported by cbor/cip68 metadata format
  // const datumJson = JSON.parse(datum.to_json(CardanoWasm.PlutusDatumSchema.DetailedSchema));
  // const metadataMap: Record<string, unknown> = {};
  // const datumMetadataMap = datumJson['fields'][0]['map'];
  // const datumVersion = datumJson['fields'][1]?.['int'];

  // if (!datumMetadataMap) {
  //   return null;
  // }
  //
  // for (const kvObject of datumMetadataMap) {
  //   // key and value are converted to utf-8 if their bytes are valid utf-8 sequence, hex otherwise
  //   const key = toUTF8OrHex(kvObject['k']['bytes']);
  //   let value: string | number | undefined;

  //   // TODO: this parses only bytes and int values, what about other types?
  //   if ('bytes' in kvObject['v']) {
  //     value = toUTF8OrHex(kvObject['v']['bytes']);
  //   } else if ('int' in kvObject['v']) {
  //     value = kvObject['v']['int'];
  //   }

  //   if (value === undefined) {
  //     console.error(`Cannot parse value ${JSON.stringify(kvObject['v'])} from datum.`);
  //     return null;
  //   }

  //   metadataMap[key] = value;
  // }

  // Parsing metadata keys and its values (with conversion to utf-8 if possible)
  const metadataMap: Record<string, unknown> = {};
  const keys = datumMap.keys();

  for (let index = 0; index < datumMap.len(); index++) {
    const key = keys.get(index);
    const decodedKey = cbor.decodeFirstSync(key.to_bytes());

    const value = datumMap.get(key);
    const decodedValue = value ? cbor.decodeFirstSync(value.to_bytes()) : null;

    // key and value are converted to utf-8 if their bytes are valid utf-8 sequence, hex otherwise
    const convertedKey = Buffer.isBuffer(decodedKey) ? toUTF8OrHex(decodedKey) : decodedKey;
    const convertedValue = Buffer.isBuffer(decodedValue) ? toUTF8OrHex(decodedValue) : decodedValue;

    metadataMap[convertedKey] = convertedValue;
  }

  return { metadata: metadataMap, version: datumVersion };
};
