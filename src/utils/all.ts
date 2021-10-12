// Format Wallet address like 0x1234...1234
const formatAddress = (address: string): string => {
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4
  )}`;
};

// Return true if the timestamp supplied is more than 1h ago
const isMoreThanOneHourAgo = (ts: number): boolean => {
  const now = new Date().getTime();
  return ts + 3600 * 1000 < now;
};

export { formatAddress, isMoreThanOneHourAgo };
