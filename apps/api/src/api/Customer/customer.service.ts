import fs from "fs/promises";
import path from "path";

const getCustomerTypesData = async () => {
  console.log(__dirname);
  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "data",
    "Customer Type.json"
  );
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw);
};

export default {
  getCustomerTypesData,
};
