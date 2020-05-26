import {browser} from 'webextension-polyfill-ts';
import { ACCEPTER_ON } from '../Popup/Popup';

let enabled = false;

const clickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window
});

const observer = new MutationObserver(mutations => {
    for (let mutation of mutations) {
        if (mutation.type === "childList") {
            const spans = document.querySelectorAll("span");
            let acceptSpan: HTMLElement | null = null;

            spans.forEach((span, index, array) => {
                if (span.innerHTML === "Приемане" || span.innerHTML === "Admit") {
                    console.log("span found");
                    acceptSpan = span;
                    console.log(acceptSpan);
                }

                if (index === array.length -1) {
                    acceptSpan?.dispatchEvent(clickEvent);     
                }
            });
        }
    }
});

const startObserving = () => {
    observer.observe(document.body, {
        childList: true,
        attributes: false,
        characterData: false,
        subtree: true,
        // attributeFilter: ['one', 'two'],
        attributeOldValue: false,
        characterDataOldValue: false
    });
};

browser.storage.sync.get(ACCEPTER_ON).then(result => {
    enabled = result[ACCEPTER_ON] === "true";

    if (enabled) {
        startObserving();
    }
});

browser.storage.onChanged.addListener(changes => {
    if (changes[ACCEPTER_ON]) {
        enabled = changes[ACCEPTER_ON].newValue === "true";
        if (enabled) {
            startObserving();
        } else {
            observer.disconnect();
        }
    }
});

export {};
