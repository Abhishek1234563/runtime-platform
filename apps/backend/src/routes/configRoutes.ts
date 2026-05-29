import express from "express";

import { prisma }
from "../lib/prisma";

import {
  authMiddleware,
  AuthRequest
}
from "../middleware/authMiddleware";

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/save",
  async (
    req: AuthRequest,
    res
  ) => {

    try {

      const {
        name,
        config,
      } = req.body;

      const saved =
        await prisma.savedConfig.create({

          data: {
            name,

            config,

            userId:
              req.userId!,
          },
        });

      res.json(saved);

    } catch (error) {

      res.status(500).json({
        error:
          "Failed to save config",
      });
    }
  }
);

router.get(
  "/all",
  async (
    req: AuthRequest,
    res
  ) => {

    try {

      const configs =
        await prisma.savedConfig.findMany({

          where: {
            userId:
              req.userId!,
          },

          orderBy: {
            createdAt: "desc",
          },
        });

      res.json(configs);

    } catch (error) {

      res.status(500).json({
        error:
          "Failed to fetch configs",
      });
    }
  }
);

export default router;