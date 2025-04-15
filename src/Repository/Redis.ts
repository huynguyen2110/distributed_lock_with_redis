import { IRedis } from '~/Repository/IRedis'
import { createClient, SetOptions } from 'redis'

export class Redis implements IRedis{
  private redisClient;

  constructor() {
    this.redisClient = createClient({ url: 'redis://localhost:6379' })
    this.initialSetup()
  }

  private async initialSetup() {
    this.redisClient.on('error', (err) => console.log('Redis Client Error', err))
    await this.redisClient.connect();
  }
  public async get(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  public async set(key: string, value: string, config?: SetOptions): Promise<string | null> {
    return await this.redisClient.set(key, value, config)
  }

  public async delete(key: string): Promise<void> {
     await this.redisClient.del(key)
  }
}