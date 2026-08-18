"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "osano-consent-v1";

type ConsentChoice = "essential" | "accepted";

export function PrivacyConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const timer = window.setTimeout(() => setVisible(!saved), 0);
    if (saved) {
      try {
        const { choice } = JSON.parse(saved) as { choice?: ConsentChoice };
        if (choice) document.documentElement.dataset.consent = choice;
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
    const open = () => setVisible(true);
    window.addEventListener("osano:open-consent", open);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("osano:open-consent", open);
    };
  }, []);

  const save = (choice: ConsentChoice) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice, updatedAt: new Date().toISOString() }));
    document.documentElement.dataset.consent = choice;
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside className="privacy-consent" aria-labelledby="privacy-consent-title" role="dialog" aria-modal="false">
      <div className="privacy-consent__mark" aria-hidden="true"><i /><i /></div>
      <div>
        <p className="eyebrow">YOUR PRIVACY</p>
        <h2 id="privacy-consent-title">A considered digital experience.</h2>
        <p>Essential storage keeps the site working. Optional experience storage may help us understand and improve how OSANO is explored. No optional tracking runs unless you accept it.</p>
        <Link href="/privacy">Read our privacy policy</Link>
      </div>
      <div className="privacy-consent__actions">
        <button type="button" onClick={() => save("essential")}>Essential only</button>
        <button type="button" className="privacy-consent__accept" onClick={() => save("accepted")}>Accept all</button>
      </div>
    </aside>
  );
}

export function ConsentSettingsButton() {
  return <button type="button" onClick={() => window.dispatchEvent(new Event("osano:open-consent"))}>Cookie settings</button>;
}
