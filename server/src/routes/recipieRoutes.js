import express from "express";
import {
  createRecipe,
  getRecipes,
  getRecipeById,
} from "../controllers/recipieController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getRecipes);
router.get("/:id", getRecipeById);

// Protected
router.post("/", protect, createRecipe);

export default router;
