"use client";

import { useEffect, useState } from "react";

export const BOOT_DONE_EVENT = "sk:boot-done";
const STORAGE_KEY = "sk-boot-seen";

export function useBootReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(STORAGE_KEY);

    if (reduced || seen) {
      setReady(true);
      return;
    }

    const onDone = () => setReady(true);
    window.addEventListener(BOOT_DONE_EVENT, onDone);
    return () => window.removeEventListener(BOOT_DONE_EVENT, onDone);
  }, []);

  return ready;
}
