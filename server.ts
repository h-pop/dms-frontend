import * as cors from "cors";
import * as express from "express";

//get router
var router = express.Router();

console.log('here');

//options for cors midddleware
const options:cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", 'authorization'],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: ['*'],
  preflightContinue: false
};

console.log('and here');

//use cors middleware
router.use(cors(options));

//add your routes

//enable pre-flight
router.options("*", cors(options));