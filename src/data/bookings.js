import axios from 'axios'

export const getBookings =  async (room) => {
    const response = await axios.get(`/reservations?room=${room}`);
    // const response = await axios.get(`https://tilat.lab.fi/getReservations.php?room=${room}`);
    const bookings = response.data;
    let happening=0;
    let test = 0;
    bookings.map((booking) => {
        booking.start = new Date(booking.start)
        booking.end = new Date(booking.end)
        let now = new Date();
        if(test === 0) {
          if (booking.start <= now && booking.end > now){
            happening = 1;
            test=1;
          }
        }
        
      
        return booking;
      })

   
      
    return bookings,happening;

}
