import axios from 'axios'

export const getBookings =  async () => {
    const response = await axios.get("/reservations");
    const bookings = response.data;
    bookings.map((booking) => {
        booking.start = new Date(booking.start)
        booking.end = new Date(booking.end)
        return booking;
      })
      
    return bookings;

}
