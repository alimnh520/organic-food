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
                "home_and_healthy",
                "mother_and_baby",
                "life_style",
                "others",
            ],
            required: true,
        },

        viewCount: { type: Number, default: 0 },

        // 🏷️ Discount information
        discount: { type: Number, default: 0 }, // discount percentage (0-100)
        discountedPrice: { type: Number, default: 0 }, // final price after discount

        // 🚚 Delivery charge field
        delivery_charge: { type: Number, required: false, default: 0 }, // delivery fee in BDT
    },
    { timestamps: true }
);

export default mongoose.models.Products || mongoose.model("Products", productSchema);
