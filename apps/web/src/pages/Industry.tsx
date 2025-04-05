import { useEffect } from "react";
import { IndustryChart } from "../charts";
import { useAppDispatch, useAppSelector } from "../config/store";
import { fetchIndustryTableData } from "../features/industry/industrySlice";
import { Table } from "../components";

function Industry() {
  const dispatch = useAppDispatch();
  const { industryData, loading, error } = useAppSelector(
    (state) => state.industry
  );

  console.log({ industryData, loading, error });

  useEffect(() => {
    if (!industryData) dispatch(fetchIndustryTableData());
  }, [dispatch]);

  return (
    <>
      <div>Industry</div>
      <IndustryChart />
      {!loading && industryData && <Table tableData={industryData} />}
    </>
  );
}

export default Industry;
