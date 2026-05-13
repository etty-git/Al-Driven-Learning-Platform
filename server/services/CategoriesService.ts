import Categories from "../models/Categories";

// קבלת כל הקטגוריות
export const getCategories = async () => {
  const categories = await Categories.find();

  if (!categories || categories.length === 0) {
    throw new Error("Categories not found");
  }

  return categories;
};

// יצירת קטגוריה חדשה
export const createCategory = async (name: string) => {
  if (!name) {
    throw new Error("Name is required");
  }

  const category = new Categories({ name });
  await category.save();

  return category;
};

// מחיקת קטגוריה לפי ID
export const deleteCategory = async (id: string) => {
  const category = await Categories.findByIdAndDelete(id);

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};