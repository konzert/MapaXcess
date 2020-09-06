import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import reviewRoutes from "./routes";
import * as dotenv from 'dotenv';

const app: Express = express();
const bodyParser = require('body-parser');
dotenv.config();

const PORT: string | number = process.env.PORT || 4000;
const ipaddress = '192.168.0.16'

app.use(cors());
app.use(reviewRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.syc6w.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.set("useFindAndModify", false);

mongoose
	.connect(uri, options)
	.then(() =>
		app.listen(4000, ipaddress, function () {
			// console.log(`Server running on http://localhost:${PORT}`}
			console.log('Server running')}
		)
	)
	.catch((error) => {
		throw error;
	});
