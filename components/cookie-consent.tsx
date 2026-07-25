"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

import { Button } from "@/components/ui/button";

const STORAGE_KEY = "cookie-consent";

type Choice = "granted" | "denied";

/**
 * GA4 sets cookies, so it stays unloaded until the visitor opts in. Vercel
 * Analytics is cookieless and runs unconditionally in the layout — only the
 * Google tag is gated here. The choice lives in localStorage, so no cookie is
 * written just to record that no cookies were wanted.
 */
export function CookieConsent({ gaId }: { gaId?: string }) {
  // `undefined` = not read yet (server + first paint), `null` = no choice made.
  const [choice, setChoice] = useState<Choice | null | undefined>(undefined);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      setChoice(stored === "granted" || stored === "denied" ? stored : null);
    } catch {
      setChoice(null);
    }
  }, []);

  function decide(next: Choice) {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode / storage disabled — honour the choice for this session only.
    }
    setChoice(next);
  }

  return (
    <>
      {gaId && choice === "granted" && <GoogleAnalytics gaId={gaId} />}
      {choice === null && (
        <div className="fixed inset-x-4 bottom-4 z-50 sm:inset-x-auto sm:left-6 sm:max-w-md">
          <div className="rounded-2xl border border-border bg-card/95 p-5 shadow-lg backdrop-blur">
            <p className="text-sm leading-relaxed text-muted-foreground">
              I use Google Analytics to see which pages get read. It sets
              cookies, so it stays off until you say yes. Everything on the site
              works either way.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" onClick={() => decide("granted")}>
                Accept
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => decide("denied")}
              >
                Decline
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
