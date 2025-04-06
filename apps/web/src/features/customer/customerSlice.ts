import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TableData } from "../../types/TableData.types";
import {
  fetchCustomerBarData,
  fetchCustomerPieData,
  fetchCustomerTableData,
} from "./customerThunks";
import { GroupedBarData } from "../../charts/GroupedBarChart/GoupedBarChat";
import { DoughnutDataMeta } from "../../charts/DoughnutChart/DoughnutChart";

interface CustomerState {
  customerTableData: TableData | null;
  loading: boolean;
  error: string | null;

  customerBarData: GroupedBarData[] | null;
  isCustomerBarDataLoading: boolean;

  customerPieData: DoughnutDataMeta | null;
  isCustomerPieDataLoading: boolean;
}
// Initial state
const initialState: CustomerState = {
  customerTableData: null,
  loading: false,
  error: null,

  customerBarData: null,
  isCustomerBarDataLoading: false,

  customerPieData: null,
  isCustomerPieDataLoading: false,
};

// Slice
const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerTableData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCustomerTableData.fulfilled,
        (state, action: PayloadAction<TableData>) => {
          state.loading = false;
          state.customerTableData = action.payload;
        }
      )
      .addCase(
        fetchCustomerTableData.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? "Unknown error";
        }
      )

      .addCase(fetchCustomerBarData.pending, (state) => {
        state.isCustomerBarDataLoading = true;
        state.error = null;
      })
      .addCase(
        fetchCustomerBarData.fulfilled,
        (state, action: PayloadAction<GroupedBarData[]>) => {
          state.isCustomerBarDataLoading = false;
          state.customerBarData = action.payload;
        }
      )
      .addCase(
        fetchCustomerBarData.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isCustomerBarDataLoading = false;
          state.error = action.payload ?? "Unknown error";
        }
      )

      .addCase(fetchCustomerPieData.pending, (state) => {
        state.isCustomerPieDataLoading = true;
        state.error = null;
      })
      .addCase(
        fetchCustomerPieData.fulfilled,
        (state, action: PayloadAction<DoughnutDataMeta>) => {
          state.isCustomerPieDataLoading = false;
          state.customerPieData = action.payload;
        }
      )
      .addCase(
        fetchCustomerPieData.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isCustomerPieDataLoading = false;
          state.error = action.payload ?? "Unknown error";
        }
      );
  },
});

export default customerSlice.reducer;
