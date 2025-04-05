import { useEffect } from "react";
import { fetchTeamsTableData } from "../features/teams/teamsSlice";
import { Table } from "../components";
import { useAppDispatch, useAppSelector } from "../config/store";

function TeamPerformance() {
  const dispatch = useAppDispatch();
  const { teamsData, loading, error } = useAppSelector((state) => state.teams);

  console.log({ teamsData, loading, error });

  useEffect(() => {
    if (!teamsData) dispatch(fetchTeamsTableData());
  }, [dispatch]);

  return (
    <>
      <div>TeamPerformance</div>
      {!loading && teamsData && <Table tableData={teamsData} />}
    </>
  );
}

export default TeamPerformance;
