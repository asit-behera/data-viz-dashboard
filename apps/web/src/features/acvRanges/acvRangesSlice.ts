import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TableData } from "../../types/TableData.types";
import {
  fetchACVRangeBarChartData,
  fetchACVRangeLineChartData,
  fetchACVRangeTableData,
} from "./acvRangesThunks";
import { SingleLineDataPoint } from "../../charts/LineChart/SingleLineChart";
import { GroupedBarData } from "../../charts/GroupedBarChart/GoupedBarChat";

interface ACVRangeState {
  acvRangeTableData: TableData | null;
  isAcvtableDataLoading: boolean;

  acvRangeLineChartData: SingleLineDataPoint[] | null;
  isAcvLineChartDataLoading: boolean;

  acvRangeBarChartData: GroupedBarData[] | null;
  isAcvBarChartDataLoading: boolean;

  error: string | null;
}
// Initial state
const initialState: ACVRangeState = {
  acvRangeTableData: null,
  isAcvtableDataLoading: false,

  acvRangeLineChartData: null,
  isAcvLineChartDataLoading: false,

  acvRangeBarChartData: null,
  isAcvBarChartDataLoading: false,

  error: null,
};

// Slice
const acvRangeSlice = createSlice({
  name: "acvRange",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchACVRangeTableData.pending, (state) => {
        state.isAcvtableDataLoading = true;
        state.error = null;
      })
      .addCase(
        fetchACVRangeTableData.fulfilled,
        (state, action: PayloadAction<TableData>) => {
          state.isAcvtableDataLoading = false;
          state.acvRangeTableData = action.payload;
        }
      )
      .addCase(
        fetchACVRangeTableData.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isAcvtableDataLoading = false;
          state.error = action.payload ?? "Unknown error";
        }
      )

      .addCase(fetchACVRangeLineChartData.pending, (state) => {
        state.isAcvLineChartDataLoading = true;
        state.error = null;
      })
      .addCase(
        fetchACVRangeLineChartData.fulfilled,
        (state, action: PayloadAction<SingleLineDataPoint[]>) => {
          state.isAcvLineChartDataLoading = false;
          state.acvRangeLineChartData = action.payload;
        }
      )
      .addCase(
        fetchACVRangeLineChartData.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isAcvLineChartDataLoading = false;
          state.error = action.payload ?? "Unknown error";
        }
      )

      .addCase(fetchACVRangeBarChartData.pending, (state) => {
        state.isAcvBarChartDataLoading = true;
        state.error = null;
      })

      .addCase(
        fetchACVRangeBarChartData.fulfilled,
        (state, action: PayloadAction<GroupedBarData[]>) => {
          state.isAcvBarChartDataLoading = false;
          state.acvRangeBarChartData = action.payload;
        }
      )
      .addCase(
        fetchACVRangeBarChartData.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isAcvBarChartDataLoading = false;
          state.error = action.payload ?? "Unknown error";
        }
      );
  },
});

export default acvRangeSlice.reducer;
