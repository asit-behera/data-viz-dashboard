import { Grid, Typography } from "@mui/material";
import StatsDisplay from "../components/StatsDisplay";
import { useAppDispatch, useAppSelector } from "../config/store";
import { useEffect } from "react";
import { fetchAggregatedDashData } from "../features/misc/miscSlice";
import SkeletonLoader from "../components/SkeletonLoader";

function Dashboard() {
  const dispatch = useAppDispatch();
  const {
    dashData,
    loading,
    /* error, */
  } = useAppSelector((state) => state.misc);

  useEffect(() => {
    if (!dashData) dispatch(fetchAggregatedDashData());
  }, [dispatch]);

  if (loading) return <SkeletonLoader />;

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, pt: 1, fontWeight: "600" }}
        >
          Dashboard
        </Typography>
      </Grid>
      <Grid size={12}>
        {!loading && dashData && <StatsDisplay data={dashData} />}
      </Grid>
    </Grid>
  );
}

const data: any = {
  success: true,
  data: {
    result: {
      industry: {
        manufacturing: -32,
        transportation: -74,
        wholesalers: -85,
        tecnology_svcs: 23,
        retail: -86,
        financial_svcs: 571,
        others: -100,
      },
      customer: {
        existing_customer: -52,
        new_customer: -28,
      },
      acv: {
        "$100k_-_200k": 116,
        "$20k_-_50k": -23,
        "$50k_-_100k": -59,
        "<$20k": -57,
      },
      team: {
        asia_pac: -10,
        enterprise: -89,
        europe: -43,
        latin_america: -50,
        north_america: -11,
      },
    },
    resultKeys: {
      industry: [
        "manufacturing",
        "transportation",
        "wholesalers",
        "tecnology_svcs",
        "retail",
        "financial_svcs",
        "education",
        "others",
      ],
      customer: ["existing_customer", "new_customer"],
      acv: ["$100k_-_200k", "$20k_-_50k", "$50k_-_100k", "<$20k", ">=$200k"],
      team: [
        "asia_pac",
        "enterprise",
        "europe",
        "latin_america",
        "north_america",
      ],
    },
    previousQuarter: "2024-Q2",
    secondLastQuarter: "2024-Q1",
  },
  message: "Success",
};

export default Dashboard;
