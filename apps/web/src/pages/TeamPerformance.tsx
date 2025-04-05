import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeamsTableData } from "../features/teams/teamsSlice";
import { Table } from "../components";

function TeamPerformance() {
  const dispatch = useDispatch();
  const { teamsData, loading, error } = useSelector((state) => state.teams);

  console.log({ teamsData, loading, error });

  useEffect(() => {
    dispatch(fetchTeamsTableData());
  }, [dispatch]);

  return (
    <>
      <div>TeamPerformance</div>
      {!loading && teamsData && <Table tableData={teamsData} />}
    </>
  );
}

export default TeamPerformance;
