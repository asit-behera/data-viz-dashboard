import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  useTheme,
} from "@mui/material";

type Metric = {
  opps: number;
  acv: number;
  percent: number;
};
type TableData = {
  sortedQuarters: string[];
  quarterTotal: Record<string, Metric>;
  keys: Record<string, string>;
  data: Record<string, Record<string, Metric>>;
  uniqueKey: [string, string];
};

function Table({ tableData }: { tableData: TableData }) {
  const {
    uniqueKey = [],
    data,
    quarterTotal,
    sortedQuarters,
    keys: _keys,
  } = tableData;
  if ([0, 1].includes(uniqueKey.length)) return;

  let keys = [];

  if (uniqueKey[0] === "ACV_Range") {
    keys = Object.keys(_keys).sort((a: string, b: string) => {
      const getMin = (str: string): number => {
        if (str.includes("<")) return 0;
        if (str.includes(">=")) return 200000; // Or whatever max threshold you choose
        const [min] = str.replace(/\$|k/g, "").split("_-_").map(Number);
        return min * 1000;
      };

      return getMin(a) - getMin(b);
    });
  } else {
    keys = Object.keys(_keys).sort();
  }

  const theme = useTheme();

  console.log({ uniqueKey, data, quarterTotal, sortedQuarters, keys });

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.background.default, // Uses MUI theme
        borderRadius: 1,
        overflow: "hidden",
      }}
    >
      <TableContainer component={Paper} sx={{ width: "100%", margin: "auto" }}>
        <MUITable size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976D2" }}>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: `1px solid ${theme.palette.divider}`,
                  fontSize: "12px",
                  padding: "6px",
                }}
              >
                Closed Fiscal Quarter
              </TableCell>
              {sortedQuarters?.map((elemet, index) => (
                <TableCell
                  key={`${elemet}_${index}`}
                  colSpan={3}
                  align="center"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    border: `1px solid ${theme.palette.divider}`,
                    fontSize: "12px",
                    padding: "6px",
                  }}
                >
                  {elemet}
                </TableCell>
              ))}
              <TableCell
                colSpan={3}
                align="center"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  border: `1px solid ${theme.palette.divider}`,
                  fontSize: "12px",
                  padding: "6px",
                }}
              >
                {"Total"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  fontWeight: "bold",
                  fontSize: "12px",
                  padding: "6px",
                }}
              >
                {uniqueKey[1]}
              </TableCell>
              {sortedQuarters?.map((_) => (
                <>
                  <TableCell
                    sx={{
                      border: `1px solid ${theme.palette.divider}`,
                      fontSize: "12px",
                      padding: "6px",
                      fontWeight: "bold",
                    }}
                  >
                    # of Opps
                  </TableCell>
                  <TableCell
                    sx={{
                      border: `1px solid ${theme.palette.divider}`,
                      fontSize: "12px",
                      padding: "6px",
                      fontWeight: "bold",
                    }}
                  >
                    ACV
                  </TableCell>
                  <TableCell
                    sx={{
                      border: `1px solid ${theme.palette.divider}`,
                      fontSize: "12px",
                      padding: "6px",
                      fontWeight: "bold",
                    }}
                  >
                    % of Total
                  </TableCell>
                </>
              ))}
              <>
                <TableCell
                  sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    fontSize: "12px",
                    padding: "6px",
                    fontWeight: "bold",
                  }}
                >
                  # of Opps
                </TableCell>
                <TableCell
                  sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    fontSize: "12px",
                    padding: "6px",
                    fontWeight: "bold",
                  }}
                >
                  ACV
                </TableCell>
                <TableCell
                  sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    fontSize: "12px",
                    padding: "6px",
                    fontWeight: "bold",
                  }}
                >
                  % of Total
                </TableCell>
              </>
            </TableRow>
          </TableHead>
          <TableBody>
            {keys?.map((key, index) => {
              return (
                <>
                  <TableRow
                    key={`${key}_${index}`}
                    /* sx={{
                      backgroundColor: index === 2 ? "#E3F2FD" : "inherit",
                      fontWeight: index === 2 ? "bold" : "normal",
                    }} */
                  >
                    <TableCell
                      /* sx={{ fontWeight: index === 2 ? "bold" : "normal" }} */
                      sx={{
                        border: `1px solid ${theme.palette.divider}`,
                        fontSize: "12px",
                        padding: "6px",
                      }}
                    >
                      {_keys[key]}
                    </TableCell>
                    {sortedQuarters.map((quarter) => (
                      <>
                        <TableCell
                          sx={{
                            border: `1px solid ${theme.palette.divider}`,
                            fontSize: "12px",
                            padding: "6px",
                          }}
                        >{`${data[key][quarter]?.opps ?? "-"}`}</TableCell>
                        <TableCell
                          sx={{
                            border: `1px solid ${theme.palette.divider}`,
                            fontSize: "12px",
                            padding: "6px",
                          }}
                        >
                          {formatCurrency(data[key][quarter]?.acv)}
                        </TableCell>
                        <TableCell
                          sx={{
                            border: `1px solid ${theme.palette.divider}`,
                            fontSize: "12px",
                            padding: "6px",
                          }}
                        >{`${data[key][quarter]?.percent ? data[key][quarter]?.percent + "%" : "-"}`}</TableCell>
                      </>
                    ))}
                    <TableCell
                      sx={{
                        border: `1px solid ${theme.palette.divider}`,
                        fontSize: "12px",
                        padding: "6px",
                        fontWeight: "bold",
                      }}
                    >{`${data[key]["total"]?.opps ?? "-"}`}</TableCell>
                    <TableCell
                      sx={{
                        border: `1px solid ${theme.palette.divider}`,
                        fontSize: "12px",
                        padding: "6px",
                        fontWeight: "bold",
                      }}
                    >
                      {formatCurrency(data[key]["total"]?.acv)}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: `1px solid ${theme.palette.divider}`,
                        fontSize: "12px",
                        padding: "6px",
                        fontWeight: "bold",
                      }}
                    >{`${data[key]["total"]?.percent ? data[key]["total"]?.percent + "%" : "-"}`}</TableCell>
                  </TableRow>
                </>
              );
            })}
            <TableRow
              sx={{
                backgroundColor: theme.palette.secondary.main,
                fontWeight: "bold",
              }}
            >
              <TableCell
                sx={{ fontWeight: "bold" }}
                /* sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  fontSize: "12px",
                  padding: "6px",
                }} */
              >
                {"Total"}
              </TableCell>
              {sortedQuarters.map((quarter) => (
                <>
                  <TableCell
                    sx={{
                      border: `1px solid ${theme.palette.divider}`,
                      fontSize: "12px",
                      padding: "6px",
                      fontWeight: "bold",
                    }}
                  >{`${quarterTotal[quarter]?.opps ?? "-"}`}</TableCell>
                  <TableCell
                    sx={{
                      border: `1px solid ${theme.palette.divider}`,
                      fontSize: "12px",
                      padding: "6px",
                      fontWeight: "bold",
                    }}
                  >
                    {formatCurrency(quarterTotal[quarter]?.acv)}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: `1px solid ${theme.palette.divider}`,
                      fontSize: "12px",
                      padding: "6px",
                      fontWeight: "bold",
                    }}
                  >{`${quarterTotal[quarter]?.percent ? quarterTotal[quarter]?.percent + "%" : "-"}`}</TableCell>
                </>
              ))}

              <TableCell
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  fontSize: "12px",
                  padding: "6px",
                  fontWeight: "bold",
                }}
              >{`${quarterTotal["total"]?.opps ?? "-"}`}</TableCell>
              <TableCell
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  fontSize: "12px",
                  padding: "6px",
                  fontWeight: "bold",
                }}
              >
                {formatCurrency(quarterTotal["total"]?.acv)}
              </TableCell>
              <TableCell
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  fontSize: "12px",
                  padding: "6px",
                  fontWeight: "bold",
                }}
              >{`${quarterTotal["total"]?.percent ? quarterTotal["total"]?.percent + "%" : "-"}`}</TableCell>
            </TableRow>
          </TableBody>
        </MUITable>
      </TableContainer>
    </Box>
  );
}

const formatCurrency = (num: number | null | undefined): string => {
  if (num == null || isNaN(num)) return "-";
  return `$${num.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
};

export default Table;
