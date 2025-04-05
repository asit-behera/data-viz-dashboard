import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../config/store";
import { fetchCustomerTableData } from "../features/customer/customerSlice";
import { Table } from "../components";

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
    <>
      <div>Customer</div>
      {!loading && customerData && <Table tableData={customerData} />}
    </>
  );
}

export default Customer;
