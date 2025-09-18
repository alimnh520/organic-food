const { Schema, default: mongoose } = require("mongoose");

const productSchema = new Schema({
    product_name: {
        type: String,
        required: true,
        trim: true,
    },
    product_image: {
        type: String,
        required: true,
    },
    image_id: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    stock: {
        type: Number,
        required: false,
    },
    details: {
        type: String,
        required: false,
    },
}, { timestamps: true });

export default mongoose.models.Products || mongoose.model("Products", productSchema);