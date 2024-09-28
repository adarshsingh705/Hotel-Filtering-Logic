// This is controller logic for sending a response to the user
import hotelModel from "./model.js";

export default class hotelController {
  async getHotel(req, res) {
    try {
     
      const { location, checkIn, checkOut, rooms, guests } = req.body;

      // Convert times into a useful format
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      // Evaluate user input; check all fields are available and valid
      if (!location || !checkInDate || !checkOutDate || !rooms || !guests) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }

      // Find available hotels
      const availableHotels = hotelModel.findHotel(
        location,
        checkInDate,
        checkOutDate,
        rooms,
        guests
      );
     

      // Check if any hotels are found
      if (availableHotels.length === 0) {
        return res.status(404).json({ message: "No available hotels found" });
      }

      // Send the response with available hotels
      res.status(200).json(availableHotels);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
