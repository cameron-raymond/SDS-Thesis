import { writable } from 'svelte/store';


export let PROLIFIC_PID;
export let STUDY_ID;
export let SESSION_ID;
export let consent;

if (typeof window !== "undefined") {
    // If localStorage has the key then it will be used
    // if not the default will be used. Format:
    // export const var = createLocalStore(key, default)
    const storedPROLIFIC_PID = localStorage.getItem("PROLIFIC_PID");
    PROLIFIC_PID = writable(storedPROLIFIC_PID);
    PROLIFIC_PID.subscribe(value => localStorage.setItem("PROLIFIC_PID", value));
    const storedSTUDY_ID = localStorage.getItem("STUDY_ID");
    STUDY_ID = writable(storedSTUDY_ID);
    STUDY_ID.subscribe(value => localStorage.setItem("STUDY_ID", value));
    const storedSESSION_ID = localStorage.getItem("SESSION_ID");
    SESSION_ID = writable(storedSESSION_ID);
    SESSION_ID.subscribe(value => localStorage.setItem("SESSION_ID", value));
    const storedConsent = localStorage.getItem("consent");
    consent = writable(storedConsent);
    consent.subscribe(value => localStorage.setItem("consent", value));
} else {
    PROLIFIC_PID = writable(null);
    STUDY_ID = writable(null);
    SESSION_ID = writable(null);
    consent = writable(null);
}

