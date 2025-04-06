import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TableData } from "../../types/TableData.types";
import {
  fetchIndustryBarData,
  fetchIndustryPieData,
  fetchIndustryTableData,
} from "./industryThunks";
import { GroupedBarData } from "../../charts/GroupedBarChart/GoupedBarChat";
import { DoughnutDataMeta } from "../../charts/DoughnutChart/DoughnutChart";

interface IndustryState {
  industryData: TableData | null;
  loading: boolean;
  error: string | null;

  industryBarData: GroupedBarData[] | null;
  isIndustryBardataLoading: boolean;

  industryPieData: DoughnutDataMeta | null;
  isIndustryPieDataLoading: boolean;
}
// Initial state
const initialState: IndustryState = {
  industryData: null,
  loading: false,
  error: null,

  industryBarData: null,
  isIndustryBardataLoading: false,

  industryPieData: null,
  isIndustryPieDataLoading: false,
};

// Slice
const industrySlice = createSlice({
  name: "industry",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIndustryTableData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchIndustryTableData.fulfilled,
        (state, action: PayloadAction<TableData>) => {
          state.loading = false;
          state.industryData = action.payload;
        }
      )
      .addCase(
        fetchIndustryTableData.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? "Unknown error";
        }
      )

      .addCase(fetchIndustryBarData.pending, (state) => {
        state.isIndustryBardataLoading = true;
        state.error = null;
      })
      .addCase(
        fetchIndustryBarData.fulfilled,
        (state, action: PayloadAction<GroupedBarData[]>) => {
          state.isIndustryBardataLoading = false;
          state.industryBarData = action.payload;
        }
      )
      .addCase(
        fetchIndustryBarData.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isIndustryBardataLoading = false;
          state.error = action.payload ?? "Unknown error";
        }
      )

      .addCase(fetchIndustryPieData.pending, (state) => {
        state.isIndustryPieDataLoading = true;
        state.error = null;
      })
      .addCase(
        fetchIndustryPieData.fulfilled,
        (state, action: PayloadAction<DoughnutDataMeta>) => {
          state.isIndustryPieDataLoading = false;
          state.industryPieData = action.payload;
        }
      )
      .addCase(
        fetchIndustryPieData.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isIndustryPieDataLoading = false;
          state.error = action.payload ?? "Unknown error";
        }
      );
  },
});

export default industrySlice.reducer;
