
const Category = require('../models/Categories');
 export const getCategories = async () => {
  
    const categories = await Category.find();
    if (!categories || categories.length === 0) {
      throw new Error("Categories not found");
  } 
};
export const createCategory = async (name: string) => {
  try {
   
    if (!name) {
      throw new Error("Name is required");
    }
    const category = new Category({ name });
    await category.save();
    return category;
  } catch (error) {
    throw new Error("Server error");
  }
};
 export const deleteCategory = async (id: string) => {
  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  } catch (error) {
    throw new Error("Server error");
  }
};

