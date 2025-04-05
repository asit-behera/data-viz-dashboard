import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getIndustryView } from "./industryAPI";
import { AxiosError } from "axios";
import { TableData } from "../../types/TableData.types";

interface IndustryState {
  industryData: TableData | null;
  loading: boolean;
  error: string | null;
}
// Initial state
const initialState: IndustryState = {
  industryData: null,
  loading: false,
  error: null,
};

// Async thunk
export const fetchIndustryTableData = createAsyncThunk<
  TableData, // Return type
  void, // Argument type (no args)
  {
    rejectValue: string;
  }
>("industry/fetchTableData", async (_, thunkAPI) => {
  try {
    const response = await getIndustryView("table");
    return response.data.data as TableData;
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(
      (err.response?.data as string) || "Something went wrong"
    );
  }
});

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
      );
  },
});

export default industrySlice.reducer;
