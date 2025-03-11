const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    image: { type: String, required: true },
    status: { type: String, enum: ["Stock Out", "In Stock"], default: "In Stock" },
    productCode: { type: String, unique: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
