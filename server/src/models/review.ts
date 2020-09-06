import { IReview } from "../types/review";
import { model, Schema } from "mongoose";

const reviewSchema: Schema = new Schema(
	{
		author: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
		},
		placeId: {
			type: String,
			required: true,
		},
		likedUsers: {
			type: [String],
			required: true,
		},
		unlikedUsers: {
			type: [String],
			required: true,
		}
	},
	{ timestamps: true }
);

export default model<IReview>("Review", reviewSchema);
