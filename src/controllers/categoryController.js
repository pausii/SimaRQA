const { CategoryAsset } = require('../models');

// Utility function to handle errors
const handleError = (res, error, message = 'Internal Server Error', status = 500) => {
    console.error(error);
    res.status(status).json({ message });
};

// Function to validate category input
const validateCategoryInput = (body) => {
    const { category_name } = body;
    return category_name ? true : false;
};

// Create a new category
const createCategory = async (req, res) => {
    try {
        const { category_name } = req.body;

        if (!validateCategoryInput(req.body)) {
            return res.status(400).json({ error: 'Fields category name are required' });
        }

        const newCategory = await CategoryAsset.create({ category_name });
        res.status(201).json({ message: "Category created successfully", data: newCategory });
    } catch (error) {
        handleError(res, error);
    }
};

// Get all categories
const getAllCategory = async (req, res) => {
    try {
        const categories = await CategoryAsset.findAll();
        res.status(200).json({
            message: "Get all categories successfully",
            data: categories
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Get category by ID
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await CategoryAsset.findByPk(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({
            message: "Get category by ID successfully",
            data: category
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Update category
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { category_name } = req.body;

        const existingCategory = await CategoryAsset.findByPk(id);

        if (!existingCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        existingCategory.category_name = category_name;
        await existingCategory.save();

        res.status(200).json({
            message: 'Category updated successfully',
            data: existingCategory
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Delete category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await CategoryAsset.findByPk(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await category.destroy();
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        handleError(res, error);
    }
}

const searchCategory = async (req, res) => {
    const { query } = req;

    try {
        const categories = await CategoryAsset.findAll();

        let filteredCategories = categories;

        if (query.name) {
            const searchTerm = query.name.toLowerCase();
            filteredCategories = filteredCategories.filter(category => category.category_name.toLowerCase().includes(searchTerm));
        }
        res.status(200).json(filteredCategories);
    } catch (error) {
        console.error('Error Pencarian: ', error);
        res.status(500).json({ message: 'Internal server error'});
    }
}

module.exports = {
    createCategory,
    getAllCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
    searchCategory
};
