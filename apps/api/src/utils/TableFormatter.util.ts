type RawDataItem = {
  count: number;
  acv: number;
  closed_fiscal_quarter: string;
  [key: string]: any; // to allow uniqueKey dynamically
};

type QuarterTotals = {
  [quarter: string]: {
    opps: number;
    acv: number;
    percent: number;
  };
};

type KeysMap = {
  [convertedKey: string]: string;
};

type DataMap = {
  [convertedKey: string]: {
    [quarter: string]: {
      opps: number;
      acv: number;
      percent: number;
    };
  };
};

type FormattedData = {
  sortedQuarters: string[];
  quarterTotal: QuarterTotals;
  keys: KeysMap;
  data: DataMap;
  uniqueKey: [string, string];
};

export default function formatTable<T extends RawDataItem>(
  rawData: T[],
  uniqueKey: Extract<keyof T, string>
): FormattedData {
  let sortedQuartersSet = new Set<string>();
  const quarterTotal: QuarterTotals = {
    total: { opps: 0, acv: 0, percent: 100 },
  };
  const keys: KeysMap = {};
  const _data: DataMap = {};

  for (const data of rawData) {
    sortedQuartersSet.add(data.closed_fiscal_quarter);
    if (!Object.hasOwn(quarterTotal, data.closed_fiscal_quarter)) {
      quarterTotal[data.closed_fiscal_quarter] = {
        opps: 0,
        acv: 0,
        percent: 100,
      };
    }

    const uniqueKeyValue = data[uniqueKey];
    const convertedKeyValue = uniqueKeyValue.toLowerCase().replace(/\s+/g, "_");
    if (!Object.hasOwn(keys, convertedKeyValue))
      keys[convertedKeyValue] = uniqueKeyValue;

    if (!Object.hasOwn(_data, convertedKeyValue)) _data[convertedKeyValue] = {};

    _data[convertedKeyValue][data.closed_fiscal_quarter] = {
      opps: Math.round(data.count),
      acv: Math.round(data.acv),
      percent: 0,
    };

    if (!Object.hasOwn(_data[convertedKeyValue], "total"))
      _data[convertedKeyValue]["total"] = { opps: 0, acv: 0, percent: 0 };

    _data[convertedKeyValue]["total"] = {
      opps:
        _data[convertedKeyValue]["total"]["opps"] +
        _data[convertedKeyValue][data.closed_fiscal_quarter]["opps"],
      acv:
        _data[convertedKeyValue]["total"]["acv"] +
        _data[convertedKeyValue][data.closed_fiscal_quarter]["acv"],
      percent: 0,
    };
  }

  const sortedQuarters = Array.from(sortedQuartersSet).sort((a, b) => {
    const [yearA, quarterA] = a.split("-Q").map(Number);
    const [yearB, quarterB] = b.split("-Q").map(Number);
    return yearA !== yearB ? yearA - yearB : quarterA - quarterB;
  });

  for (const quarter of sortedQuarters) {
    const qtotal = { opps: 0, acv: 0 };
    for (const key in keys) {
      if (!Object.hasOwn(_data[key], quarter as PropertyKey)) {
        break;
      }
      qtotal.opps += _data[key][quarter as string]["opps"];
      qtotal.acv += _data[key][quarter as string]["acv"];
    }

    quarterTotal[quarter as string]["opps"] = Math.round(qtotal.opps);
    quarterTotal[quarter as string]["acv"] = Math.round(qtotal.acv);

    for (const key in keys) {
      if (!Object.hasOwn(_data[key], quarter as PropertyKey)) {
        break;
      }
      _data[key][quarter as string]["percent"] = Math.round(
        (Math.round(_data[key][quarter as string]["acv"]) /
          Math.round(quarterTotal[quarter as string]["acv"])) *
          100
      );
    }

    quarterTotal["total"]["opps"] += quarterTotal[quarter as string]["opps"];
    quarterTotal["total"]["acv"] += quarterTotal[quarter as string]["acv"];
  }

  for (const key in keys) {
    _data[key]["total"]["percent"] = Math.round(
      (Math.round(_data[key]["total"]["acv"]) /
        Math.round(quarterTotal["total"]["acv"])) *
        100
    );
  }

  return {
    sortedQuarters: Array.from(sortedQuarters),
    quarterTotal,
    keys,
    data: _data,
    uniqueKey: [
      uniqueKey,
      uniqueKey
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    ],
  };
}
