import axios from "../../config/axios";

export const getACVRangesView = (view: "pie" | "bar" | "table") =>
  axios.get("/acv-ranges", {
    params: {
      view,
    },
  });
