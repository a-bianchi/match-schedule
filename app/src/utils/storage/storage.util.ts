import { StorageKeyName } from './storage.type';

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export function loadString(key: StorageKeyName): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export function saveString(key: StorageKeyName, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export function load(key: StorageKeyName): Object | null {
  try {
    const almostThere = localStorage.getItem(key);
    return almostThere ? JSON.parse(almostThere) : '';
  } catch {
    return null;
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export function save(key: StorageKeyName, value: Object): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export function remove(key: StorageKeyName): void {
  try {
    localStorage.removeItem(key);
  } catch {}
}

/**
 * Burn it all to the ground.
 */
export function clear(): void {
  try {
    localStorage.clear();
  } catch {}
}
