import { Response, Request } from "express";
import { IReview } from "../../types/review";
import Review from "../../models/review";

const getReviews = async (req: Request, res: Response): Promise<void> => {
	try {
		const reviews: IReview[] = await Review.find();
		res.status(200).json({ reviews });
	} catch (error) {
		throw error;
	}
};

let getReviewsByPlace = async (req: Request, res: Response): Promise<void> => {
	try {
		const place = req.params.placeId;
		const reviews: IReview[] = await Review.find({ placeId: place })
		res.status(200).json({reviews});
	} catch (error) {
		throw error;
	}
}

const addReview = async (req: Request, res: Response): Promise<void> => {
	try {
		console.log(req.body);
		const body = req.body as Pick<
			IReview,
			"author" | "description" | "rating" | "placeId"
		>;

		const review: IReview = new Review({
			author: body.author,
			description: body.description,
			rating: body.rating,
			placeId: body.placeId
		});

		const newReview: IReview = await review.save();
		const allReviews: IReview[] = await Review.find();

		res.status(201).json({
			message: "Review added",
			review: newReview,
			reviews: allReviews,
		});
	} catch (error) {
		throw error;
	}
};

const updateReview = async (req: Request, res: Response): Promise<void> => {
	try {
		const {
			params: { id },
			body,
		} = req;
		const updateReview: IReview | null = await Review.findByIdAndUpdate(
			{ _id: id },
			body
		);
		const allReviews: IReview[] = await Review.find();
		res.status(200).json({
			message: "Review updated",
			review: updateReview,
			reviews: allReviews,
		});
	} catch (error) {
		throw error;
	}
};

const deleteReview = async (req: Request, res: Response): Promise<void> => {
	try {
		const deletedReview: IReview | null = await Review.findByIdAndRemove(
			req.params.id
		);
		const allReviews: IReview[] = await Review.find();
		res.status(200).json({
			message: "Review deleted",
			review: deletedReview,
			reviews: allReviews,
		});
	} catch (error) {
		throw error;
	}
};

export { getReviews, getReviewsByPlace, addReview, updateReview, deleteReview };
