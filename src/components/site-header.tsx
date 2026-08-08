import Link from "next/link";
import { MobileNav } from "./mobile-nav";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="site-header" aria-label="Site header">
      <div className="container-shell site-header__inner">
        <Link className="site-header__wordmark" href="/" aria-label="Renatus Cartesius home">
          Renatus Cartesius
        </Link>

        <nav className="site-header__nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link className="site-header__link" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <MobileNav items={navigation} />
      </div>
    </header>
  );
}
