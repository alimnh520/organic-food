// models/Products.js
const { Schema, default: mongoose } = require("mongoose");

const productSchema = new Schema(
    {
        product_name: { type: String, required: true, trim: true },
        product_image: { type: String, required: true },
        image_id: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        stock: { type: Number, required: false },
        details: { type: String, required: false },
        soldCount: { type: Number, default: 0 },
        category: {
            type: String,
            enum: [
                "organic_food",
                "gazette",
                "medical_equipments",
                "fashion",
                "electronics",
                "sourcing_service",
                "decorate",
                "others",
            ],
            required: true,
        },
        viewCount: { type: Number, default: 0 }, // ← added
    },
    { timestamps: true }
);

export default mongoose.models.Products || mongoose.model("Products", productSchema);
