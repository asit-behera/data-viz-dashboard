import axios from "../../config/axios";

export const getACVRangesView = (view: "line" | "bar" | "table") =>
  axios.get("/acv-ranges", {
    params: {
      view,
    },
  });
