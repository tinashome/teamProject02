import { Router } from "express";

const testRouter = Router();

testRouter.get("/", (req, res) => {
  res.send({ test: "hi" });
});

export { testRouter };
