// import express for create server

import express from "express";

import hotelController from "./src/controller.js";

let Hotelcontroller = new hotelController();
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
// assign port for server
app.listen(2001, () => {
  console.log("server is running on port 2001");
 
});

app.get("/gethotels",Hotelcontroller.getHotel);
