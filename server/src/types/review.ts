import { Document } from "mongoose";

export interface IReview extends Document {
	author: string;
	description: string;
	rating: number;
	placeId: string;
	likedUsers: [String];
	unlikedUsers: [String];
}
