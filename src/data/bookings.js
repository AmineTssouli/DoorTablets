import axios from 'axios'

export const getBookings =  async (room) => {
    const response = await axios.get(`/reservations?room=${room}`);
    // const response = await axios.get(`https://tilat.lab.fi/getReservations.php?room=${room}`);
    const bookings = response.data;
    let happening;
    let test = '';
    bookings.map((booking) => {
        booking.start = new Date(booking.start)
        booking.end = new Date(booking.end)
        let now = new Date();
        (booking.start <= now && booking.end > now)? happening = 1:happening = 0;
        test = 'Now is '+now+'\nStart is '+booking.start +'\nEnd is '+booking.end;
        return booking;
      })
      
      console.log('test ', test)
      bookings['happening'] = happening;
      
    return bookings;

}
