import { createAsyncThunk } from "@reduxjs/toolkit";
import { TableData } from "../../types/TableData.types";
import { getCustomerView } from "./customerAPI";
import { AxiosError } from "axios";
import { GroupedBarData } from "../../charts/GroupedBarChart/GoupedBarChat";
import {
  DoughnutData,
  DoughnutDataMeta,
} from "../../charts/DoughnutChart/DoughnutChart";

export const fetchCustomerTableData = createAsyncThunk<
  TableData,
  void,
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

export const fetchCustomerBarData = createAsyncThunk<
  GroupedBarData[],
  void,
  {
    rejectValue: string;
  }
>("customer/fetchBarData", async (_, thunkAPI) => {
  try {
    const response = await getCustomerView("bar");
    return response.data.data as GroupedBarData[];
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(
      (err.response?.data as string) || "Something went wrong"
    );
  }
});

export const fetchCustomerPieData = createAsyncThunk<
  DoughnutDataMeta,
  void,
  {
    rejectValue: string;
  }
>("customer/fetchPieData", async (_, thunkAPI) => {
  try {
    const response = await getCustomerView("pie");
    return response.data.data as DoughnutDataMeta;
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(
      (err.response?.data as string) || "Something went wrong"
    );
  }
});
