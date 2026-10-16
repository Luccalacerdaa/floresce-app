"use client";

import { useEffect } from "react";
import { track } from "@/lib/tracking";

export function TrackOnView({ event, params }: { event: string; params?: Record<string, unknown> }) {
  useEffect(() => {
    track(event, params);
    // Só uma vez por página.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
