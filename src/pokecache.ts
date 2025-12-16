import { keyof, set } from "zod";

export type CacheEntry<T> = {
  createdAt: number; // number for the Date.now() value
  val: T; // represents the object we're caching
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  #reap() {
    for (const key of this.#cache.keys()) {
      const entry = this.#cache.get(key);
      if (!entry) {
        continue;
      }
      if (entry.createdAt > Date.now() - this.#interval) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }

  add<T>(key: string, val: T) {
    const entry: CacheEntry<T> = {
      createdAt: Date.now(),
      val,
    };
    this.#cache.set(key, entry);
  }

  get<T>(key: string) {
    const entry = this.#cache.get(key);
    return entry ?? undefined;
  }
}
