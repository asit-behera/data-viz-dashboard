import { createAsyncThunk } from "@reduxjs/toolkit";
import { TableData } from "../../types/TableData.types";
import { getIndustryView } from "./industryAPI";
import { AxiosError } from "axios";
import { GroupedBarData } from "../../charts/GroupedBarChart/GoupedBarChat";
import { DoughnutDataMeta } from "../../charts/DoughnutChart/DoughnutChart";

export const fetchIndustryTableData = createAsyncThunk<
  TableData,
  void,
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

export const fetchIndustryBarData = createAsyncThunk<
  GroupedBarData[],
  void,
  {
    rejectValue: string;
  }
>("industry/fetchBarData", async (_, thunkAPI) => {
  try {
    const response = await getIndustryView("bar");
    return response.data.data as GroupedBarData[];
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(
      (err.response?.data as string) || "Something went wrong"
    );
  }
});

export const fetchIndustryPieData = createAsyncThunk<
  DoughnutDataMeta,
  void,
  {
    rejectValue: string;
  }
>("industry/fetchPieData", async (_, thunkAPI) => {
  try {
    const response = await getIndustryView("pie");
    return response.data.data as DoughnutDataMeta;
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(
      (err.response?.data as string) || "Something went wrong"
    );
  }
});
