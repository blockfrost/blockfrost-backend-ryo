export const appendLocationToSnapshot = (snapshot: unknown, baseSnapshotURL: string) => {
  if (
    typeof snapshot !== 'object' ||
    snapshot === null ||
    !('digest' in snapshot) ||
    !('locations' in snapshot) ||
    typeof snapshot.digest !== 'string' ||
    !Array.isArray(snapshot.locations)
  ) {
    console.error('Could not append URL to snapshot locations. Invalid data format.', snapshot);
    throw new Error('Invalid snapshot format');
  }

  const snapshotCopy = { ...snapshot };

  const additionalSnapshotUrl = new URL(snapshot.digest, baseSnapshotURL);

  (snapshotCopy.locations as unknown[]).push(additionalSnapshotUrl);
  return snapshotCopy;
};
