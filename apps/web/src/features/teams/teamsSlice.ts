import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getTeamsView } from "./teamsAPI";
import { AxiosError } from "axios";

type QuarterTotals = {
  [quarter: string]: {
    opps: number;
    acv: number;
    percent: number;
  };
};

type KeysMap = {
  [convertedKey: string]: string;
};

type DataMap = {
  [convertedKey: string]: {
    [quarter: string]: {
      opps: number;
      acv: number;
      percent: number;
    };
  };
};

type TableData = {
  sortedQuarters: string[];
  quarterTotal: QuarterTotals;
  keys: KeysMap;
  data: DataMap;
  uniqueKey: [string, string];
};

interface TeamsState {
  teamsData: TableData | null;
  loading: boolean;
  error: string | null;
}
// Initial state
const initialState: TeamsState = {
  teamsData: null,
  loading: false,
  error: null,
};

// Async thunk
export const fetchTeamsTableData = createAsyncThunk<
  TableData, // Return type
  void, // Argument type (no args)
  {
    rejectValue: string;
  }
>("teams/fetchTableData", async (_, thunkAPI) => {
  try {
    const response = await getTeamsView("table");
    return response.data.data as TableData;
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(
      (err.response?.data as string) || "Something went wrong"
    );
  }
});

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
      );
  },
});

export default teamsSlice.reducer;
