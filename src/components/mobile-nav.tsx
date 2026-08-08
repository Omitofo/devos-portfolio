"use client";

import Link from "next/link";
import { useState } from "react";

type NavigationItem = {
  href: string;
  label: string;
};

export function MobileNav({ items }: { items: NavigationItem[] }) {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <div className="mobile-nav">
      <button
        type="button"
        className="mobile-nav__trigger"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setOpen((current) => !current)}
      >
        <span aria-hidden="true">{open ? "Close" : "Menu"}</span>
      </button>

      {open ? (
        <div className="mobile-nav__panel" id="mobile-navigation">
          <nav aria-label="Mobile navigation">
            {items.map((item) => (
              <Link className="mobile-nav__link" href={item.href} key={item.href} onClick={closeMenu}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
