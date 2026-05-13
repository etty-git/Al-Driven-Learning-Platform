import Category from "../models/Categories";
import Sub_Category from "../models/Sub_categories";

export const createSubCategory = async (data: any) => {
  const { name, categoryId } = data;

  if (!name || !categoryId) {
    throw new Error("Name and category ID are required");
  }

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  const existingSubCategory = await Sub_Category.findOne({
    name,
    category: categoryId,
  });

  if (existingSubCategory) {
    throw new Error(
      "Sub-category with this name already exists in the specified category"
    );
  }

  const subCategory = await Sub_Category.create({
    name,
    category: categoryId,
  });

  return subCategory;
};

export const getSubCategoriesByCategoryId = async (
  categoryId: string
): Promise<any> => {
  const subCategories = await Sub_Category.find({
    category: categoryId,
  });

  if (!subCategories || subCategories.length === 0) {
    throw new Error("Sub-categories not found");
  }

  return subCategories;
};

export const deleteSubCategory = async (id: string) => {
  try {
    const subCategory = await Sub_Category.findByIdAndDelete(id);

    if (!subCategory) {
      throw new Error("Sub-category not found");
    }

    return subCategory;
  } catch (error) {
    throw new Error("Server error");
  }
};
