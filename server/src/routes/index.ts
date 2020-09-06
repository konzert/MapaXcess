import { Router } from "express";
import {
	getReviews,
	addReview,
	updateReview,
	deleteReview,
	getReviewsByPlace
} from "../controllers/reviews";
import {
	getPlaces,
	addPlace,
	updatePlace,
	deletePlace,
} from "../controllers/places";
const bodyParser = require('body-parser');
const router: Router = Router();

// create application/json parser
const jsonParser = bodyParser.json()

router.get("/reviews", getReviews);
router.post("/reviews", jsonParser, addReview);
router.put("/reviews/:id", jsonParser, updateReview);
router.delete("/reviews/:id", deleteReview);
router.get("/reviews/:placeId", getReviewsByPlace);

router.get("/places", getPlaces);
router.post("/places", jsonParser, addPlace);
router.put("/places/:id", jsonParser, updatePlace);
router.delete("/places/:id", deletePlace);

export default router;
