import { createAsyncThunk } from "@reduxjs/toolkit";
import { TableData } from "../../types/TableData.types";
import { getTeamsView } from "./teamsAPI";
import { AxiosError } from "axios";
import { GroupedBarData } from "../../charts/GroupedBarChart/GoupedBarChat";
import { DoughnutDataMeta } from "../../charts/DoughnutChart/DoughnutChart";

export const fetchTeamsTableData = createAsyncThunk<
  TableData,
  void,
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

export const fetchTeamsBarData = createAsyncThunk<
  GroupedBarData[],
  void,
  {
    rejectValue: string;
  }
>("teams/fetchBarData", async (_, thunkAPI) => {
  try {
    const response = await getTeamsView("bar");
    return response.data.data as GroupedBarData[];
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(
      (err.response?.data as string) || "Something went wrong"
    );
  }
});

export const fetchTeamsPieData = createAsyncThunk<
  DoughnutDataMeta,
  void,
  {
    rejectValue: string;
  }
>("teams/fetchPieData", async (_, thunkAPI) => {
  try {
    const response = await getTeamsView("pie");
    return response.data.data as DoughnutDataMeta;
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(
      (err.response?.data as string) || "Something went wrong"
    );
  }
});
