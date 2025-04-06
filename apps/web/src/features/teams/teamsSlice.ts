import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TableData } from "../../types/TableData.types";
import {
  fetchTeamsBarData,
  fetchTeamsPieData,
  fetchTeamsTableData,
} from "./teamsThunks";
import { GroupedBarData } from "../../charts/GroupedBarChart/GoupedBarChat";
import { DoughnutDataMeta } from "../../charts/DoughnutChart/DoughnutChart";

interface TeamsState {
  teamsData: TableData | null;
  loading: boolean;
  error: string | null;

  teamBarData: GroupedBarData[] | null;
  isTeamBarDataLoading: boolean;

  teamPieData: DoughnutDataMeta | null;
  isTeamPieDataLoading: boolean;
}
// Initial state
const initialState: TeamsState = {
  teamsData: null,
  loading: false,
  error: null,
  teamBarData: null,
  isTeamBarDataLoading: false,
  teamPieData: null,
  isTeamPieDataLoading: false,
};

// Slice
const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamsTableData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTeamsTableData.fulfilled,
        (state, action: PayloadAction<TableData>) => {
          state.loading = false;
          state.teamsData = action.payload;
        }
      )
      .addCase(
        fetchTeamsTableData.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? "Unknown error";
        }
      )

      .addCase(fetchTeamsBarData.pending, (state) => {
        state.isTeamBarDataLoading = true;
        state.error = null;
      })
      .addCase(
        fetchTeamsBarData.fulfilled,
        (state, action: PayloadAction<GroupedBarData[]>) => {
          state.isTeamBarDataLoading = false;
          state.teamBarData = action.payload;
        }
      )
      .addCase(
        fetchTeamsBarData.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isTeamBarDataLoading = false;
          state.error = action.payload ?? "Unknown error";
        }
      )

      .addCase(fetchTeamsPieData.pending, (state) => {
        state.isTeamPieDataLoading = true;
        state.error = null;
      })
      .addCase(
        fetchTeamsPieData.fulfilled,
        (state, action: PayloadAction<DoughnutDataMeta>) => {
          state.isTeamPieDataLoading = false;
          state.teamPieData = action.payload;
        }
      )
      .addCase(
        fetchTeamsPieData.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isTeamPieDataLoading = false;
          state.error = action.payload ?? "Unknown error";
        }
      );
  },
});

export default teamsSlice.reducer;
