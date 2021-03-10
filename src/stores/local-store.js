import { writable } from 'svelte/store';


export let PROLIFIC_PID;
export let STUDY_ID;
export let SESSION_ID;
export let consent;

if (typeof window !== "undefined") {
    // If localStorage has the key then it will be used
    // if not the default will be used. Format:
    // export const var = createLocalStore(key, default)
    const storedPROLIFIC_PID = parseInt(localStorage.getItem("PROLIFIC_PID"));
    PROLIFIC_PID = writable(storedPROLIFIC_PID || -1);
    PROLIFIC_PID.subscribe(value => localStorage.setItem("PROLIFIC_PID", value));
    const storedSTUDY_ID = parseInt(localStorage.getItem("STUDY_ID"));
    STUDY_ID = writable(storedSTUDY_ID || -1);
    STUDY_ID.subscribe(value => localStorage.setItem("STUDY_ID", value));
    const storedSESSION_ID = parseInt(localStorage.getItem("SESSION_ID"));
    SESSION_ID = writable(storedSESSION_ID || -1);
    SESSION_ID.subscribe(value => localStorage.setItem("SESSION_ID", value));
    const storedConsent = parseInt(localStorage.getItem("consent"));
    consent = writable(storedConsent || 0);
    consent.subscribe(value => localStorage.setItem("consent", value));
} else {
    PROLIFIC_PID = writable(-1);
    STUDY_ID = writable(-1);
    SESSION_ID = writable(-1);
    consent = writable(0);
}

