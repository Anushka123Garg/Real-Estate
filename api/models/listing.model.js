import mongoose from "mongoose";

const listingschema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        // whyChoose: {
        //     type: String,
        //     required: true,
        // },
        propertyType: {
            type: String,
            required: true,
        },
        subType: {
            type: String,
            required: true,
        },
        subSubType: {
            type: String,
        },
        regularPrice: {
            type: Number,
            required: true,
        },
        discountPrice: {
            type: Number,
            required: true,
        },
        bathrooms: {
            type: Number,
            required: true,
        },
        bedrooms: {
            type: Number,
            required: true,
        },
        furnished: {
            type: Boolean,
            required: true,
        },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
        balcony: {
            type: Boolean,
            required: true,
        },
        parking: {
            type: Boolean,
            required: true,
        },
        // facilities: {
        //     gymnasium: { type: Boolean, required: true },
        //     pool: { type: Boolean, required: true },
        //     games: { type: Boolean, required: true },
        //     playArea: { type: Boolean, required: true },
        // },
        
        type: {         //rent or sale
            type: String,
            required: true,
        },
        offer: {
            type: Boolean,
            required: true,
        },
        imageUrls: {
            type: Array,
            required: true,
        },
        userRef: { //which user created this listing
            type: String,
            required: true,
        },
    }, 
    {timestamps: true} //save these true data's
);


//creating a model
const Listing = mongoose.model("Listing", listingschema);

export default Listing;

