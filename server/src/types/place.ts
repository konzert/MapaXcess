import { Document } from "mongoose";

export interface IPlace extends Document {
    name: string;
    address: string;
    risk: string;
    rules: {
        mask: boolean,
        distance: boolean,
        temperature: boolean,
    }
    schedule: string;
    category: string;
    geolocation: {
        type: { type: String },
        coordinates: [Number]
    }
}
