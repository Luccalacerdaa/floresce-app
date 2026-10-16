"use client";

import { useState } from "react";
import { OFFER } from "@/lib/config";
import { checkoutHref, track } from "@/lib/tracking";
import { Arrow, buttonStyles } from "./ui";

export function CheckoutButton({ label, className = "" }: { label: string; className?: string }) {
  const [missing, setMissing] = useState(false);

  function go() {
    const href = checkoutHref();
    track("InitiateCheckout", { value: OFFER.founderPrice, currency: "BRL", content_name: "membro_fundador" });
    if (!href) return setMissing(true);
    window.location.href = href;
  }

  return (
    <div className={className}>
      <button type="button" onClick={go} className={`${buttonStyles.primary} w-full`}>
        {label} <Arrow />
      </button>
      {missing && (
        <p className="mt-2 text-center text-sm text-clay" role="alert">
          Checkout ainda não configurado (defina NEXT_PUBLIC_CHECKOUT_URL).
        </p>
      )}
    </div>
  );
}
