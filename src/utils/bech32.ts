import { bech32 } from 'bech32';

export const drepIdToRaw = (bechDrepId: string): string => {
  const { prefix, words } = bech32.decode(bechDrepId);

  console.log('prefix', prefix);
  if (prefix !== 'drep' && prefix !== 'drep_script') {
    throw new Error('Invalid drep id prefix');
  }

  const hashBuf = Buffer.from(bech32.fromWords(words));

  return `\\x${Buffer.from(hashBuf).toString('hex')}`;
};
