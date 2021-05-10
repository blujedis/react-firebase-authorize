
function get<T>(key: string, def: T = null as any): T {
  const val = localStorage.getItem(key);
  if (!val)
    return def;
  return JSON.parse(val);
}

function has(key: string) {
  return !!get(key);
}

function set(key: string, value: string | number | boolean | Date | Record<string, any>) {
  if (value instanceof Date)
    value = value.toISOString();
  else
    value = JSON.stringify(value);
  localStorage.setItem(key, value);
}

function remove(key: string) {
  localStorage.removeItem(key);
}

function clear() {
  localStorage.clear();
}

export const storage = {
  get,
  set,
  has,
  remove,
  clear
};
