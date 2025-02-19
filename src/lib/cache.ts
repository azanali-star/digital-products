type CacheItem<T> = {
  value: T;
  timestamp: number;
  expiresIn: number;
};

class Cache {
  private static instance: Cache;
  private cache: Map<string, CacheItem<any>>;
  private persistentCache: Map<string, CacheItem<any>>;

  private constructor() {
    this.cache = new Map();
    this.persistentCache = new Map();
    this.loadFromLocalStorage();
  }

  public static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache();
    }
    return Cache.instance;
  }

  private loadFromLocalStorage() {
    if (typeof window === 'undefined') return;

    try {
      const savedCache = localStorage.getItem('app-cache');
      if (savedCache) {
        const parsed = JSON.parse(savedCache);
        Object.entries(parsed).forEach(([key, value]) => {
          this.persistentCache.set(key, value as CacheItem<any>);
        });
      }
    } catch (error) {
      console.error('Error loading cache from localStorage:', error);
    }
  }

  private saveToLocalStorage() {
    if (typeof window === 'undefined') return;

    try {
      const cacheObject = Object.fromEntries(this.persistentCache.entries());
      localStorage.setItem('app-cache', JSON.stringify(cacheObject));
    } catch (error) {
      console.error('Error saving cache to localStorage:', error);
    }
  }

  public set<T>(key: string, value: T, expiresIn: number = 3600000, persistent: boolean = false): void {
    const item: CacheItem<T> = {
      value,
      timestamp: Date.now(),
      expiresIn,
    };

    if (persistent) {
      this.persistentCache.set(key, item);
      this.saveToLocalStorage();
    } else {
      this.cache.set(key, item);
    }
  }

  public get<T>(key: string): T | null {
    const item = this.cache.get(key) || this.persistentCache.get(key);
    
    if (!item) return null;

    const now = Date.now();
    if (now - item.timestamp > item.expiresIn) {
      this.cache.delete(key);
      this.persistentCache.delete(key);
      this.saveToLocalStorage();
      return null;
    }

    return item.value;
  }

  public remove(key: string): void {
    this.cache.delete(key);
    this.persistentCache.delete(key);
    this.saveToLocalStorage();
  }

  public clear(): void {
    this.cache.clear();
    this.persistentCache.clear();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('app-cache');
    }
  }
}

export const cache = Cache.getInstance();
