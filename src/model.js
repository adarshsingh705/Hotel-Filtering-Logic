export default class hotelModel {
    static findHotel(location, checkInDate, checkOutDate, rooms, guests) {
        // Filter hotels according to user input
        const hotelData = hotels.filter((hotel) => {
            if (hotel.location !== location) return false;

            let bookedRoom = 0;
            hotel.bookings.forEach((booking) => {
                const duringTimeBooked = !(
                    checkOutDate <= booking.checkIn || checkInDate >= booking.checkOut
                );
                if (duringTimeBooked) {
                    bookedRoom += booking.roomsNo; 
                }
            });

            // Total available rooms
            const roomNotBooked = hotel.totalRooms - bookedRoom;

            // Calculate the maximum guests allowed in the user-requested rooms
            const maxGuestsPerRoom = hotel.maxGuestsPerRoom;
            const maxGuestsForRequestedRooms = rooms * maxGuestsPerRoom;

            // Determine how many rooms are required based on guest count
            let requiredRooms = rooms; 
            if (guests > maxGuestsForRequestedRooms) {
                // If guests exceed the capacity of the requested rooms, auto-suggest rooms
                requiredRooms = Math.ceil(guests / maxGuestsPerRoom);
            }

            // Check if the hotel has enough available rooms for the required rooms
            return roomNotBooked >= requiredRooms;
        });

        // Create a response array with hotel name, location, available rooms, price, and required rooms
        const response = hotelData.map((hotel) => {
            const bookedRoom = hotel.bookings.reduce((acc, booking) => {
                const duringTimeBooked = !(
                    checkOutDate <= booking.checkIn || checkInDate >= booking.checkOut
                );
                return duringTimeBooked ? acc + booking.roomsNo : acc; 
            }, 0);

            const roomNotBooked = hotel.totalRooms - bookedRoom;

            // Calculate the maximum guests allowed in the user-requested rooms
            const maxGuestsPerRoom = hotel.maxGuestsPerRoom;
            const maxGuestsForRequestedRooms = rooms * maxGuestsPerRoom;

            // Determine how many rooms are required based on guest count
            let requiredRooms = rooms; 
            if (guests > maxGuestsForRequestedRooms) {
                // If guests exceed the capacity of the requested rooms, auto-suggest rooms
                requiredRooms = Math.ceil(guests / maxGuestsPerRoom);
            }

            // Calculate total booking price based on the required rooms
            const totalBookingPrice = hotel.totalBookingPrice * requiredRooms;

            return {
                name: hotel.name,
                location: hotel.location,
                availableRooms: roomNotBooked,
                requiredRooms: requiredRooms,  
                bookingPrice: totalBookingPrice,
            };
        });

        if (response.length === 0) {
            return { message: "No available hotels found" };
        }

        return response;
    }
}

// Sample hotels data
const hotels = [
    {
        name: "Hotel Blue Lagoon",
        location: "New York",
        totalRooms: 10,
        maxGuestsPerRoom: 4,
        totalBookingPrice: 4000,
        bookings: [
            {
                checkIn: new Date("2024-10-01"),
                checkOut: new Date("2024-10-05"),
                roomsNo: 2, 
            },
            {
                checkIn: new Date("2024-10-06"),
                checkOut: new Date("2024-10-10"),
                roomsNo: 3, 
            },
        ],
    },
    {
        name: "Hotel Sunshine",
        location: "Los Angeles",
        totalRooms: 5,
        maxGuestsPerRoom: 2,
        totalBookingPrice: 4000,
        bookings: [
            {
                checkIn: new Date("2024-09-25"),
                checkOut: new Date("2024-10-05"),
                roomsNo: 3, 
            },
        ],
    },
    {
        name: "Mountain View Hotel",
        location: "New York",
        totalRooms: 7,
        maxGuestsPerRoom: 3,
        totalBookingPrice: 4000,
        bookings: [], 
    },
];
