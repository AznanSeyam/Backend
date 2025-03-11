const Product = require("../models/Product");
const Category = require("../models/Category"); 
const generateProductCode = require("../utils/generateProductCode");

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, discount, image, status, category } = req.body;

        if (!name || !description || !price || !image || !status || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return res.status(400).json({ message: `Product with name '${name}' already exists.` });
        }

        const categoryObj = await Category.findOne({ name: category });
        if (!categoryObj) {
            return res.status(400).json({ message: "Invalid category name" });
        }

        const productCode = generateProductCode(name);

        const product = new Product({
            name,
            description,
            price,
            discount,
            image,
            status,
            productCode,
            category: categoryObj._id, 
        });

        await product.save();
        res.status(201).json({ message: "Product created successfully", product });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Product with this name already exists. Use a different name." });
        }

        res.status(500).json({ message: error.message });
    }
};


exports.getProducts = async (req, res) => {
    try {
        let { category, name, minPrice, maxPrice, status } = req.query;
        let filter = {};

        if (category) {
            const categoryObj = await Category.findOne({ name: category });
            if (!categoryObj) {
                return res.status(400).json({ message: "Invalid category name" });
            }
            filter.category = categoryObj._id;
        }

        if (name) filter.name = { $regex: new RegExp(name, "i") };

        let priceFilter = {};
        if (minPrice && !isNaN(minPrice)) priceFilter.$gte = parseFloat(minPrice);
        if (maxPrice && !isNaN(maxPrice)) priceFilter.$lte = parseFloat(maxPrice);
        if (Object.keys(priceFilter).length > 0) filter.price = priceFilter;

        if (status) filter.status = status;

        const products = await Product.find(filter).populate("category", "name");

        const updatedProducts = products.map(product => ({
            ...product._doc,
            finalPrice: product.price - (product.price * (product.discount / 100))
        }));

        res.status(200).json(updatedProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateProduct = async (req, res) => {
    try {
        const { status, description, discount, category } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json({ message: "Product not found" });

        if (status !== undefined) product.status = status;
        if (description !== undefined) product.description = description;
        if (discount !== undefined) product.discount = discount;

        if (category) {
            const categoryObj = await Category.findOne({ name: category });
            if (!categoryObj) {
                return res.status(400).json({ message: "Invalid category name" });
            }
            product.category = categoryObj._id; 
        }

        await product.save();
        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};