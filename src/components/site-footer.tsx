import Link from "next/link";

const email = "hello@renatuscartesius.com";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container-shell site-footer__inner">
        <div>
          <p className="site-footer__label">Get in touch</p>
          <a className="site-footer__email link-accent" href={`mailto:${email}`}>
            {email}
          </a>
        </div>

        <nav className="site-footer__nav" aria-label="Footer navigation">
          <Link href="/">Home</Link>
          <Link href="/work">Work</Link>
          <Link href="/about">About</Link>
        </nav>

        <p className="site-footer__copyright">
          © {new Date().getFullYear()} Renatus Cartesius
        </p>
      </div>
    </footer>
  );
}
