import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../config/store";
import { Table } from "../components";
import { Grid, Paper } from "@mui/material";
import { DoughnutChartWrapper, StackedBarChartWrapper } from "../charts";
import {
  fetchCustomerBarData,
  fetchCustomerPieData,
  fetchCustomerTableData,
} from "../features/customer/customerThunks";

function Customer() {
  const dispatch = useAppDispatch();
  const {
    customerTableData,
    loading,
    error,
    customerBarData,
    isCustomerBarDataLoading,
    customerPieData,
    isCustomerPieDataLoading,
  } = useAppSelector((state) => state.customer);

  useEffect(() => {
    if (!customerTableData) dispatch(fetchCustomerTableData());
    if (!customerBarData) dispatch(fetchCustomerBarData());
    if (!customerPieData) dispatch(fetchCustomerPieData());
  }, [dispatch]);

  return (
    <Grid container spacing={1}>
      <Grid size={12}>Customer</Grid>
      <Grid size={{ sm: 12, md: 6 }}>
        <Paper elevation={0}>
          {!isCustomerBarDataLoading && customerBarData && (
            <StackedBarChartWrapper data={customerBarData} height={400} />
          )}
        </Paper>
      </Grid>
      <Grid size={{ sm: 12, md: 6 }}>
        <Paper elevation={0}>
          {!isCustomerPieDataLoading && customerPieData && (
            <DoughnutChartWrapper
              data={customerPieData}
              height={400}
              widthScaling={2}
            />
          )}
        </Paper>
      </Grid>
      <Grid size={12}>
        {!loading && customerTableData && (
          <Table tableData={customerTableData} />
        )}
      </Grid>
    </Grid>
  );
}

export default Customer;
