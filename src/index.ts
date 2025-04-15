import { BookAirport } from '~/BookAirport'
import { Redis } from '~/Repository/Redis'

const redis = new Redis()
const bookingAirport = new BookAirport(redis)

async function run(){
  await Promise.all([
    bookingAirport.bookAirport({
      user_id: '1',
      flight: 'FA634',
      seat: 'A34_S012C'
    }),
    bookingAirport.bookAirport({
      user_id: '2',
      flight: 'FA634',
      seat: 'A34_S012C'
    }),
  ])
}

run().catch(console.error);
