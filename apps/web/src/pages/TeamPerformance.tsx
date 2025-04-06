import { useEffect } from "react";
import { Table } from "../components";
import { useAppDispatch, useAppSelector } from "../config/store";
import { Grid, Paper, Typography } from "@mui/material";
import { DoughnutChartWrapper, GroupBarChartWrapper } from "../charts";
import {
  fetchTeamsBarData,
  fetchTeamsPieData,
  fetchTeamsTableData,
} from "../features/teams/teamsThunks";
import SkeletonLoader from "../components/SkeletonLoader";

function TeamPerformance() {
  const dispatch = useAppDispatch();
  const {
    teamsData,
    loading,
    /* error, */
    teamBarData,
    isTeamBarDataLoading,
    teamPieData,
    isTeamPieDataLoading,
  } = useAppSelector((state) => state.teams);

  useEffect(() => {
    if (!teamsData) dispatch(fetchTeamsTableData());
    if (!teamBarData) dispatch(fetchTeamsBarData());
    if (!teamPieData) dispatch(fetchTeamsPieData());
  }, [dispatch]);

  if (loading || isTeamBarDataLoading || isTeamPieDataLoading)
    return <SkeletonLoader />;

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, pt: 1, fontWeight: "600" }}
        >
          Teams
        </Typography>
      </Grid>
      <Grid size={{ sm: 12, md: 8 }}>
        <Paper elevation={0}>
          {!isTeamBarDataLoading && teamBarData && (
            <GroupBarChartWrapper
              height={400}
              data={teamBarData}
              xAxisLabel={"Closed Fiscal Quarter"}
              yAxisLabel={"ACV"}
            />
          )}
        </Paper>
      </Grid>
      <Grid size={{ sm: 12, md: 4 }}>
        <Paper elevation={0}>
          {!isTeamPieDataLoading && teamPieData && (
            <DoughnutChartWrapper
              data={teamPieData}
              height={400}
              widthScaling={1}
              showLabels={false}
            />
          )}
        </Paper>
      </Grid>
      <Grid size={12}>
        {!loading && teamsData && <Table tableData={teamsData} />}
      </Grid>
    </Grid>
  );
}

export default TeamPerformance;
