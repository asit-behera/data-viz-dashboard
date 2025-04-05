import axios from "../../config/axios";

export const getCustomerView = (view: "pie" | "bar" | "table") =>
  axios.get("/customers", {
    params: {
      view,
    },
  });
