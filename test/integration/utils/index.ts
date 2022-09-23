export const getApiUrl = (endpoint: string, version?: string): string => {
  if (!process.env.BASE_URL) {
    throw new Error('Missing base api url process.env.BASE_URL');
  }

  if (process.env.BASE_URL.includes('localhost')) {
    return process.env.BASE_URL + endpoint;
  }

  return `${process.env.BASE_URL}/api/v${version || 0}${endpoint}`;
};
