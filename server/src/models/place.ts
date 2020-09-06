import { IPlace } from "../types/place";
import { model, Schema } from "mongoose";

const placeSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        risk: {
            type: String,
            required: true
        },
        rules: {
            type: Object,
            required: true
        },
        schedule: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        geolocation: {
            type: { type: String },
            coordinates: [Number]
        }
    },
);

export default model<IPlace>("Place", placeSchema);
