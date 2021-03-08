import { writable } from 'svelte/store';

// If localStorage has the key then it will be used
// if not the default will be used. Format:
// export const var = createLocalStore(key, default)
export const PROLIFIC_PID = writable(-1);
export const STUDY_ID = writable(-1);
export const SESSION_ID = writable(-1);
export const startTime = writable(0);