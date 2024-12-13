import { SnapshotMirror } from '../types/common.js';

export const appendLocationToSnapshot = (snapshot: unknown, snapshotMirrors: SnapshotMirror[]) => {
  if (
    typeof snapshot !== 'object' ||
    snapshot === null ||
    !('locations' in snapshot) ||
    !Array.isArray(snapshot.locations)
  ) {
    console.error('Could not append URL to snapshot locations. Invalid data format.', snapshot);
    throw new Error('Invalid snapshot format');
  }

  const snapshotCopy = { ...snapshot };

  if (!Array.isArray(snapshotCopy.locations)) {
    throw new TypeError('Invalid snapshot format');
  }

  const mirroredUrls: string[] = [];

  // Create mirror url for every snapshot location matching snapshotMirror configuration
  for (const snapshotLocation of snapshotCopy.locations) {
    if (typeof snapshotLocation !== 'string') {
      continue;
    }

    for (const snapshotMirror of snapshotMirrors) {
      const mirroredUrl = snapshotLocation.replace(
        snapshotMirror.originalUrl,
        snapshotMirror.mirrorUrl,
      );

      mirroredUrls.push(mirroredUrl);
    }
  }
  snapshotCopy.locations.push(...mirroredUrls);

  return snapshotCopy;
};
