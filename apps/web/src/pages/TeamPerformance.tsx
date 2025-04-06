import { useEffect } from "react";
import { fetchTeamsTableData } from "../features/teams/teamsSlice";
import { Table } from "../components";
import { useAppDispatch, useAppSelector } from "../config/store";
import { Grid } from "@mui/material";
import { DoughnutChartWrapper, GroupBarChartWrapper } from "../charts";

function TeamPerformance() {
  const dispatch = useAppDispatch();
  const { teamsData, loading, error } = useAppSelector((state) => state.teams);

  console.log({ teamsData, loading, error });

  useEffect(() => {
    if (!teamsData) dispatch(fetchTeamsTableData());
  }, [dispatch]);

  return (
    <Grid container>
      <Grid size={12}>TeamPerformance</Grid>
      <Grid size={6}>
        <GroupBarChartWrapper
          height={400}
          data={[
            {
              x: "2023-Q3",
              y: 238547,
              group: "Asia Pac",
            },
            {
              x: "2023-Q4",
              y: 349600,
              group: "Asia Pac",
            },
            {
              x: "2024-Q1",
              y: 255205,
              group: "Asia Pac",
            },
            {
              x: "2024-Q2",
              y: 229533,
              group: "Asia Pac",
            },
            {
              x: "2023-Q3",
              y: 165000,
              group: "Enterprise",
            },
            {
              x: "2023-Q4",
              y: 192000,
              group: "Enterprise",
            },
            {
              x: "2024-Q1",
              y: 530865,
              group: "Enterprise",
            },
            {
              x: "2024-Q2",
              y: 57750,
              group: "Enterprise",
            },
            {
              x: "2023-Q3",
              y: 778384,
              group: "Europe",
            },
            {
              x: "2023-Q4",
              y: 736277,
              group: "Europe",
            },
            {
              x: "2024-Q1",
              y: 569561,
              group: "Europe",
            },
            {
              x: "2024-Q2",
              y: 322090,
              group: "Europe",
            },
            {
              x: "2023-Q3",
              y: 87410,
              group: "Latin America",
            },
            {
              x: "2023-Q4",
              y: 54280,
              group: "Latin America",
            },
            {
              x: "2024-Q1",
              y: 53346,
              group: "Latin America",
            },
            {
              x: "2024-Q2",
              y: 26792,
              group: "Latin America",
            },
            {
              x: "2023-Q3",
              y: 1036000,
              group: "North America",
            },
            {
              x: "2023-Q4",
              y: 180000,
              group: "North America",
            },
            {
              x: "2024-Q1",
              y: 264259,
              group: "North America",
            },
            {
              x: "2024-Q2",
              y: 236300,
              group: "North America",
            },
          ]}
        />
      </Grid>
      <Grid size={6}>
        <DoughnutChartWrapper
          data={{
            data: [
              {
                label: "Asia Pac",
                value: 1072885,
                percent: 17,
              },
              {
                label: "Enterprise",
                value: 945615,
                percent: 15,
              },
              {
                label: "Europe",
                value: 2406312,
                percent: 38,
              },
              {
                label: "Latin America",
                value: 221828,
                percent: 3,
              },
              {
                label: "North America",
                value: 1716559,
                percent: 27,
              },
            ],
            total: 6363199,
          }}
          height={400}
          widthScaling={2}
        />
      </Grid>
      <Grid size={12}>
        {!loading && teamsData && <Table tableData={teamsData} />}
      </Grid>
    </Grid>
  );
}

export default TeamPerformance;
