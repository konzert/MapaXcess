import { Response, Request } from "express";
import { IPlace } from "../../types/place";
import Place from "../../models/place";

const getPlaces = async (req: Request, res: Response): Promise<void> => {
    try {
        const places: IPlace[] = await Place.find();
        res.status(200).json({ places });
    } catch (error) {
        throw error;
    }
};

const addPlace = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log(req.body);
        const body = req.body as Pick<
            IPlace,
            "name" | "address" | "risk" | "rules" | "schedule" | "category" | "geolocation"
            >;

        const place: IPlace = new Place({
            name: body.name,
            address: body.address,
            risk: body.risk,
            rules: body.rules,
            schedule: body.schedule,
            category: body.category,
            geolocation: body.geolocation
        });

        const newPlace: IPlace = await place.save();
        const allPlaces: IPlace[] = await Place.find();

        res.status(201).json({
            message: "Place added",
            place: newPlace,
            places: allPlaces,
        });
    } catch (error) {
        throw error;
    }
};

const updatePlace = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req;
        const updatePlace: IPlace | null = await Place.findByIdAndUpdate(
            { _id: id },
            body
        );
        const allPlaces: IPlace[] = await Place.find();
        res.status(200).json({
            message: "Place updated",
            place: updatePlace,
            places: allPlaces,
        });
    } catch (error) {
        throw error;
    }
};

const deletePlace = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedPlace: IPlace | null = await Place.findByIdAndRemove(
            req.params.id
        );
        const allPlaces: IPlace[] = await Place.find();
        res.status(200).json({
            message: "Place deleted",
            review: deletedPlace,
            reviews: allPlaces,
        });
    } catch (error) {
        throw error;
    }
};

export { getPlaces, addPlace, updatePlace, deletePlace };
