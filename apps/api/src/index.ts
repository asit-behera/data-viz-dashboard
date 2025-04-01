/**
 * * Using server.listen() gives more flexibility over the Express app.listen()
 * * 1. Ability to test the express app as some testing library just need an instance of express app.
 * * 2. Ability to extend features like implementing websockets
 * * 3. We can switch between http and https servers pretty easily.
 */

import { createServer } from "node:http";
import app from "./server";

const port = process.env.PORT || 3001;
const server = createServer(app);

server.listen(port, () => {
  console.log(`api running on ${port}`);
});
