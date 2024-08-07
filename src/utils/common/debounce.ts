export function debounce<T extends (func: void) => void>(
  func: T,
  timeout = 300,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, timeout);
  };
}
