import { SetOptions } from 'redis'

export interface IRedis {
  get(key: string): Promise<string | null>
  set(key: string, value: string, config?: SetOptions): Promise<string | null>
  delete(key: string): Promise<void>
}