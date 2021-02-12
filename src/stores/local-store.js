import { writable } from 'svelte/store';

const createLocalStore = (key, startValue) => {
  const {
    subscribe,
    set,
    update
  } = writable(startValue);

  return {
    subscribe,
    set,
    update,
    useLocalStorage: () => {
      const json = localStorage.getItem(key);
      if (json) {
        set(JSON.parse(json));
      }

      subscribe(current => {
        localStorage.setItem(key, JSON.stringify(current));
      });
    }
  };
}


// If localStorage has the key then it will be used
// if not the default will be used. Format:
// export const var = createLocalStore(key, default)
export const PROLIFIC_PID = createLocalStore('PROLIFIC_PID', -1);
export const STUDY_ID = createLocalStore('STUDY_ID', -1);
export const SESSION_ID = createLocalStore('SESSION_ID',-1);