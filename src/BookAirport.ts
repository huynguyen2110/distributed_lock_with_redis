import { IRedis } from '~/Repository/IRedis'
import { BookingAirport } from '~/type'
export class BookAirport {
  private redis: IRedis;
  private LOCK_TTL = 5 //second

  constructor(redis: IRedis) {
    this.redis = redis
  }

  public async bookAirport(request: BookingAirport){
    const lockSeat = `lock_${request.flight}_${request.seat}`
    const isLockSeat = await this.setLockSeat(lockSeat)
    if(!isLockSeat) {
      return;
    }
    await this.fakeBooking(request)
    await this.releaseLockSeat(lockSeat)

  }

  private async setLockSeat(lockSeat: string): Promise<string | null> {
    return await this.redis.set(lockSeat, lockSeat, {
      NX: true,
      EX: this.LOCK_TTL
    })
  }

  private async releaseLockSeat(lockSeat: string){
    await this.redis.delete(lockSeat)
  }

  private async fakeBooking(_request: BookingAirport) {
    await new Promise(r => setTimeout(r, 2000));
  }
}