'use client';

import { useSyncExternalStore } from 'react';

type QueryParamStateOptions<T extends string> = {
  defaultValue: T;
  paramName: string;
  validValues: readonly T[];
};

const subscribe = (callback: () => void): (() => void) => {
  window.addEventListener('popstate', callback);

  return () => window.removeEventListener('popstate', callback);
};

const createGetSnapshot = <T extends string>(
  paramName: string,
  validValues: readonly T[],
  defaultValue: T,
): (() => T) => () => {
  if (typeof window === 'undefined') return defaultValue;

  const params = new URLSearchParams(window.location.search);
  const value = params.get(paramName) as T | null;

  return value && validValues.includes(value) ? value : defaultValue;
};

const createSetValue = <T extends string>(
  paramName: string,
  defaultValue: T,
): ((newValue: T) => void) => (newValue: T) => {
  const url = new URL(window.location.href);

  if (newValue === defaultValue) {
    url.searchParams.delete(paramName);
  } else {
    url.searchParams.set(paramName, newValue);
  }

  window.history.pushState({}, '', url.toString());
  window.dispatchEvent(new PopStateEvent('popstate'));
};

export const useQueryParamState = <T extends string>(
  options: QueryParamStateOptions<T>,
): [T, (value: T) => void] => {
  const { defaultValue, paramName, validValues } = options;

  const getSnapshot = createGetSnapshot(paramName, validValues, defaultValue);
  const getServerSnapshot = (): T => defaultValue;
  const setValue = createSetValue(paramName, defaultValue);

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return [value, setValue];
};
