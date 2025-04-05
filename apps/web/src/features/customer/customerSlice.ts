import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getCustomerView } from "./customerAPI";
import { AxiosError } from "axios";
import { TableData } from "../../types/TableData.types";

interface CustomerState {
  customerData: TableData | null;
  loading: boolean;
  error: string | null;
}
// Initial state
const initialState: CustomerState = {
  customerData: null,
  loading: false,
  error: null,
};

// Async thunk
export const fetchCustomerTableData = createAsyncThunk<
  TableData, // Return type
  void, // Argument type (no args)
  {
    rejectValue: string;
  }
>("customer/fetchTableData", async (_, thunkAPI) => {
  try {
    const response = await getCustomerView("table");
    return response.data.data as TableData;
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(
      (err.response?.data as string) || "Something went wrong"
    );
  }
});

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
          state.customerData = action.payload;
        }
      )
      .addCase(
        fetchCustomerTableData.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? "Unknown error";
        }
      );
  },
});

export default customerSlice.reducer;
