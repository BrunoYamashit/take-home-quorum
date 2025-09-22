import express from "express";
import { LegislatorBillController } from "./controller/legislatorBills.controller.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) =>  new LegislatorBillController().getLegislatorBills(req, res));

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);