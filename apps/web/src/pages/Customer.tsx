import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../config/store";
import { Table } from "../components";
import { Grid, Paper, Typography } from "@mui/material";
import { DoughnutChartWrapper, StackedBarChartWrapper } from "../charts";
import {
  fetchCustomerBarData,
  fetchCustomerPieData,
  fetchCustomerTableData,
} from "../features/customer/customerThunks";
import SkeletonLoader from "../components/SkeletonLoader";

function Customer() {
  const dispatch = useAppDispatch();
  const {
    customerTableData,
    loading,
    /* error, */
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

  if (loading || isCustomerBarDataLoading || isCustomerPieDataLoading)
    return <SkeletonLoader />;

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, pt: 1, fontWeight: "600" }}
        >
          Customer
        </Typography>
      </Grid>
      <Grid size={{ sm: 12, md: 6 }}>
        <Paper elevation={0}>
          {!isCustomerBarDataLoading && customerBarData && (
            <StackedBarChartWrapper
              data={customerBarData}
              height={400}
              xAxisLabel={"Closed Fiscal Quarter"}
              yAxisLabel={"ACV"}
            />
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
