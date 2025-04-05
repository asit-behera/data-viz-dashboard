import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import teamsReducer from "../features/teams/teamsSlice";
import industryReducer from "../features/industry/industrySlice";
import customerReducer from "../features/customer/customerSlice";
import acvRangeReducer from "../features/acvRanges/acvRangesSlice";

export const store = configureStore({
  reducer: {
    teams: teamsReducer,
    industry: industryReducer,
    customer: customerReducer,
    acvRange: acvRangeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
