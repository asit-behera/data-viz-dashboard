import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../config/store";
import { fetchCustomerTableData } from "../features/customer/customerSlice";
import { Table } from "../components";
import { Grid, Paper } from "@mui/material";
import { DoughnutChartWrapper, StackedBarChartWrapper } from "../charts";

function Customer() {
  const dispatch = useAppDispatch();
  const { customerData, loading, error } = useAppSelector(
    (state) => state.customer
  );

  console.log({ customerData, loading, error });

  useEffect(() => {
    if (!customerData) dispatch(fetchCustomerTableData());
  }, [dispatch]);

  return (
    <Grid container spacing={1}>
      <Grid size={12}>Customer</Grid>
      <Grid size={{ sm: 12, md: 6 }}>
        <Paper elevation={0}>
          <StackedBarChartWrapper
            data={[
              {
                x: "2023-Q3",
                y: 1322310,
                group: "Existing Customer",
              },
              {
                x: "2023-Q4",
                y: 1124857,
                group: "Existing Customer",
              },
              {
                x: "2024-Q1",
                y: 1360047,
                group: "Existing Customer",
              },
              {
                x: "2024-Q2",
                y: 647821,
                group: "Existing Customer",
              },
              {
                x: "2023-Q3",
                y: 983031,
                group: "New Customer",
              },
              {
                x: "2023-Q4",
                y: 387300,
                group: "New Customer",
              },
              {
                x: "2024-Q1",
                y: 313189,
                group: "New Customer",
              },
              {
                x: "2024-Q2",
                y: 224643,
                group: "New Customer",
              },
            ]}
            height={400}
          />
        </Paper>
      </Grid>
      <Grid size={{ sm: 12, md: 6 }}>
        <Paper elevation={0}>
          <DoughnutChartWrapper
            data={{
              data: [
                {
                  label: "Existing Customer",
                  value: 4455035,
                  percent: 70,
                },
                {
                  label: "New Customer",
                  value: 1908163,
                  percent: 30,
                },
              ],
              total: 6363198,
            }}
            height={400}
            widthScaling={2}
          />
        </Paper>
      </Grid>
      <Grid size={12}>
        {!loading && customerData && <Table tableData={customerData} />}
      </Grid>
    </Grid>
  );
}

export default Customer;
