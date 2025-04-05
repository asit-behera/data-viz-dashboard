import axios from "../../config/axios";

export const getTeamsView = (view: "pie" | "bar" | "table") =>
  axios.get("/teams", {
    params: {
      view,
    },
  });
