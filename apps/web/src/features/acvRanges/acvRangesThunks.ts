import { createAsyncThunk } from "@reduxjs/toolkit";
import { TableData } from "../../types/TableData.types";
import { getACVRangesView } from "./acvRangesAPI";
import { AxiosError } from "axios";
import { GroupedBarData } from "../../charts/GroupedBarChart/GoupedBarChat";
import { SingleLineDataPoint } from "../../charts/LineChart/SingleLineChart";

export const fetchACVRangeTableData = createAsyncThunk<
  TableData,
  void,
  { rejectValue: string }
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

export const fetchACVRangeLineChartData = createAsyncThunk<
  SingleLineDataPoint[],
  void,
  { rejectValue: string }
>("acvRange/fetchLineCharData", async (_, thunkAPI) => {
  try {
    const response = await getACVRangesView("line");
    return response.data.data as SingleLineDataPoint[];
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(
      (err.response?.data as string) || "Something went wrong"
    );
  }
});

export const fetchACVRangeBarChartData = createAsyncThunk<
  GroupedBarData[],
  void,
  { rejectValue: string }
>("acvRange/fetchBarChartData", async (_, thunkAPI) => {
  try {
    const response = await getACVRangesView("bar");
    return response.data.data as GroupedBarData[];
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(
      (err.response?.data as string) || "Something went wrong"
    );
  }
});
