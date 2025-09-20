// models/OfferProduct.js
import mongoose, { Schema } from "mongoose";

const offerProductSchema = new Schema(
    {
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
        discount: {
            type: Number,
            default: 0, // default 0%
        },
    },
    { timestamps: true }
);

export default mongoose.models.OfferProduct ||
    mongoose.model("OfferProduct", offerProductSchema);
