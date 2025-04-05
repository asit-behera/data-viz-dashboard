import { useEffect } from "react";
import { IndustryChart } from "../charts";
import { useAppDispatch, useAppSelector } from "../config/store";
import { fetchIndustryTableData } from "../features/industry/industrySlice";
import { Table } from "../components";
import { Grid } from "@mui/material";
import IndustryGroupBarChart from "../charts/Industry/IndustryGroupBarChart";
import IndustryDoughnutChart from "../charts/Industry/IndustryDoughnutChart";

function Industry() {
  const dispatch = useAppDispatch();
  const { industryData, loading, error } = useAppSelector(
    (state) => state.industry
  );

  console.log({ industryData, loading, error });

  useEffect(() => {
    if (!industryData) dispatch(fetchIndustryTableData());
  }, [dispatch]);

  /* return (
    <>
      <div>Industry</div>

      
    </>
  ); */

  return (
    <Grid container /* spacing={2} */>
      <Grid size={12}>Industry</Grid>
      <Grid
        size={7}
        /* sx={{
          background: "yellow",
        }} */
      >
        <IndustryGroupBarChart
          data={[
            { x: "2023-Q3", y: 1010484, group: "Manufacturing" },
            { x: "2023-Q4", y: 519986, group: "Manufacturing" },
            { x: "2024-Q1", y: 809109, group: "Manufacturing" },
            { x: "2024-Q2", y: 550325, group: "Manufacturing" },
            { x: "2023-Q3", y: 875742, group: "Transportation" },
            { x: "2023-Q4", y: 380430, group: "Transportation" },
            { x: "2024-Q1", y: 353472, group: "Transportation" },
            { x: "2024-Q2", y: 93597, group: "Transportation" },
            { x: "2023-Q3", y: 168050, group: "Wholesalers" },
            { x: "2023-Q4", y: 233000, group: "Wholesalers" },
            { x: "2024-Q1", y: 171211, group: "Wholesalers" },
            { x: "2024-Q2", y: 25500, group: "Wholesalers" },
            { x: "2023-Q3", y: 57966, group: "Tecnology Svcs" },
            { x: "2023-Q4", y: 218578, group: "Tecnology Svcs" },
            { x: "2024-Q1", y: 110339, group: "Tecnology Svcs" },
            { x: "2024-Q2", y: 136044, group: "Tecnology Svcs" },
            { x: "2023-Q3", y: 36476, group: "Retail" },
            { x: "2023-Q4", y: 100240, group: "Retail" },
            { x: "2024-Q1", y: 168722, group: "Retail" },
            { x: "2024-Q2", y: 24200, group: "Retail" },
            { x: "2023-Q3", y: 106744, group: "Financial Svcs" },
            { x: "2023-Q4", y: 20696, group: "Financial Svcs" },
            { x: "2024-Q1", y: 6383, group: "Financial Svcs" },
            { x: "2024-Q2", y: 42799, group: "Financial Svcs" },
            { x: "2024-Q1", y: 51000, group: "Education" },
            { x: "2023-Q3", y: 49880, group: "Others" },
            { x: "2023-Q4", y: 39226, group: "Others" },
            { x: "2024-Q1", y: 3000, group: "Others" },
            { x: "2024-Q2", y: 0, group: "Others" },
          ]}
        />
      </Grid>
      <Grid size={5}>
        <IndustryDoughnutChart
          data={{
            data: [
              { label: "Manufacturing", value: 2889904, percent: 46 },
              { label: "Transportation", value: 1703241, percent: 27 },
              { label: "Wholesalers", value: 597761, percent: 10 },
              { label: "Tecnology Svcs", value: 522927, percent: 8 },
              { label: "Retail", value: 329638, percent: 5 },
              { label: "Financial Svcs", value: 176622, percent: 3 },
              { label: "Education", value: 51000, percent: 1 },
              { label: "Others", value: 92106, percent: 1 },
            ],
            total: 6274093,
          }}
        />
      </Grid>
      <Grid size={12}>
        {!loading && industryData && <Table tableData={industryData} />}
      </Grid>
    </Grid>
  );
}

export default Industry;
