import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getACVRangesView } from "./acvRangesAPI";
import { AxiosError } from "axios";
import { TableData } from "../../types/TableData.types";

interface ACVRangeState {
  acvRangeData: TableData | null;
  loading: boolean;
  error: string | null;
}
// Initial state
const initialState: ACVRangeState = {
  acvRangeData: null,
  loading: false,
  error: null,
};

// Async thunk
export const fetchACVRangeTableData = createAsyncThunk<
  TableData, // Return type
  void, // Argument type (no args)
  {
    rejectValue: string;
  }
>("acvRange/fetchTableData", async (_, thunkAPI) => {
  try {
    const response = await getACVRangesView("table");
    return response.data.data as TableData;
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(
      (err.response?.data as string) || "Something went wrong"
    );
  }
});

// Slice
const acvRangeSlice = createSlice({
  name: "acvRange",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchACVRangeTableData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchACVRangeTableData.fulfilled,
        (state, action: PayloadAction<TableData>) => {
          state.loading = false;
          state.acvRangeData = action.payload;
        }
      )
      .addCase(
        fetchACVRangeTableData.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? "Unknown error";
        }
      );
  },
});

export default acvRangeSlice.reducer;
