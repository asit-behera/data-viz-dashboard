import axios from "../../config/axios";

export const getIndustryView = (view: "pie" | "bar" | "table") =>
  axios.get("/industry", {
    params: {
      view,
    },
  });
