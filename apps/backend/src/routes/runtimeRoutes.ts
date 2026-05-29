import express from "express";

import { prisma } from "../lib/prisma";
import {
  authMiddleware,
  AuthRequest
}
from "../middleware/authMiddleware";

const router = express.Router();
router.use(authMiddleware);

router.get("/:entity", async (req, res) => {

  try {

    const { entity } = req.params;

    const records =
      await prisma.runtimeRecord.findMany({
        where: {
          entity,
        },
      });

    res.json(records);

  } catch (error) {

    res.status(500).json({
      error: "Failed to fetch records",
    });

  }
});

router.post(
  "/:entity",

  async (
    req: AuthRequest,
    res
  ) => {

    try {

      const entity =
        req.params.entity as string;

      const record =
        await prisma.runtimeRecord.create({
          data: {
            entity,

            data: req.body,

            userId: req.userId!,
          },
        });

      res.json(record);

    } catch (error) {

      res.status(500).json({
        error: "Failed to create record",
      });

    }
  }
);
export default router;