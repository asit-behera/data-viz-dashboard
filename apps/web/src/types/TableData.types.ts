export type QuarterTotals = {
  [quarter: string]: {
    opps: number;
    acv: number;
    percent: number;
  };
};

export type KeysMap = {
  [convertedKey: string]: string;
};

export type DataMap = {
  [convertedKey: string]: {
    [quarter: string]: {
      opps: number;
      acv: number;
      percent: number;
    };
  };
};

export type TableData = {
  sortedQuarters: string[];
  quarterTotal: QuarterTotals;
  keys: KeysMap;
  data: DataMap;
  uniqueKey: [string, string];
};
