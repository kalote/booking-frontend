// Format Wallet address like 0x1234...1234
const formatAddress = (address: string): string => {
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4
  )}`;
};

const isPassedOneHour = (ts: number): boolean => {
  const now = new Date().getTime();
  return now + 3600 > ts;
};

export { formatAddress, isPassedOneHour };
