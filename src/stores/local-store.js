import { writable } from 'svelte/store';


export let PROLIFIC_PID;
export let STUDY_ID;
export let SESSION_ID;
export let consent;
export let condition;

if (typeof window !== "undefined") {
    // If localStorage has the key then it will be used
    // if not the default will be used. Format:
    // export const var = createLocalStore(key, default)
    const storedPROLIFIC_PID = localStorage.getItem("PROLIFIC_PID");
    PROLIFIC_PID = writable(storedPROLIFIC_PID || -1);
    PROLIFIC_PID.subscribe(value => localStorage.setItem("PROLIFIC_PID", value));
    const storedSTUDY_ID = localStorage.getItem("STUDY_ID");
    STUDY_ID = writable(storedSTUDY_ID || -1);
    STUDY_ID.subscribe(value => localStorage.setItem("STUDY_ID", value));
    const storedSESSION_ID = localStorage.getItem("SESSION_ID");
    SESSION_ID = writable(storedSESSION_ID || -1);
    SESSION_ID.subscribe(value => localStorage.setItem("SESSION_ID", value));
    const storedConsent = localStorage.getItem("consent");
    consent = writable(storedConsent || 0);
    consent.subscribe(value => localStorage.setItem("consent", value));
    const storedCondition = localStorage.getItem("condition");
    condition = writable(storedCondition || -1);
    condition.subscribe(value => localStorage.setItem("condition", value));
} else {
    PROLIFIC_PID = writable(-1);
    STUDY_ID = writable(-1);
    SESSION_ID = writable(-1);
    consent = writable(0);
    condition = writable(-1);
}

