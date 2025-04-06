import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import axios from "../../config/axios";
import { AxiosError } from "axios";

const getDashAggregated = () => axios.get("/");

interface MiscState {
  dashData: any | null;
  loading: boolean;
  error: string | null;
}
// Initial state
const initialState: MiscState = {
  dashData: null,
  loading: false,
  error: null,
};

export const fetchAggregatedDashData = createAsyncThunk<
  any,
  void,
  {
    rejectValue: string;
  }
>("misc/fetchDashData", async (_, thunkAPI) => {
  try {
    const response = await getDashAggregated();
    return response.data.data as any;
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(
      (err.response?.data as string) || "Something went wrong"
    );
  }
});

// Slice
const miscSlice = createSlice({
  name: "industry",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAggregatedDashData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAggregatedDashData.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.dashData = action.payload;
        }
      )
      .addCase(
        fetchAggregatedDashData.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? "Unknown error";
        }
      );
  },
});

export default miscSlice.reducer;
