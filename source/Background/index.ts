import 'emoji-log';
import {browser} from 'webextension-polyfill-ts';
import { ACCEPTER_ON } from '../Popup/Popup';

browser.runtime.onInstalled.addListener((): void => {
  browser.storage.sync.set({
    [ACCEPTER_ON]: "true"
  });
});
