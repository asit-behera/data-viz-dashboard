import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../config/store";
import { fetchACVRangeTableData } from "../features/acvRanges/acvRangesSlice";
import { Table } from "../components";

function AcvRanges() {
  const dispatch = useAppDispatch();
  const { acvRangeData, loading, error } = useAppSelector(
    (state) => state.acvRange
  );

  console.log({ acvRangeData, loading, error });

  useEffect(() => {
    if (!acvRangeData) dispatch(fetchACVRangeTableData());
  }, [dispatch]);

  return (
    <>
      <div>AcvRanges</div>
      {!loading && acvRangeData && <Table tableData={acvRangeData} />}
    </>
  );
}

export default AcvRanges;
