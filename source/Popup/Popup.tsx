import React, {useState, useEffect} from 'react';
import {browser} from 'webextension-polyfill-ts';

import './styles.scss';

export const ACCEPTER_ON = "gmeet-auto-accepter-on";

const Popup: React.FC = () => {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    (async () => {
      let result = await browser.storage.sync.get(ACCEPTER_ON);
      setEnabled(result[ACCEPTER_ON] === "true");
    })()
  }, []);

  const toggle = async () => {
    await browser.storage.sync.set({
      [ACCEPTER_ON]: (!enabled).toString()
    });

    setEnabled(!enabled); 
  };

  return (
    <section id="popup">
      <h2>Google Meet Auto-Accepter</h2>
      <p>from Mitko with ❤️</p>
      <div className="links__holder">
        <ul>
          <li>
            <button
              type="button"
              onClick={toggle}
              className={enabled ? "on" : "off"}
            >
              {enabled ? "Включено" : "Изключено"}
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Popup;
