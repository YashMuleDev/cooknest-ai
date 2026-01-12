import Recipe from "../models/Recipe.js";

// CREATE recipe
export const createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all recipes (with search)
export const getRecipes = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          title: {
            $regex: req.query.search,
            $options: "i",
          },
        }
      : {};

    const recipes = await Recipe.find(keyword)
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single recipe
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      "createdBy",
      "name"
    );

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
