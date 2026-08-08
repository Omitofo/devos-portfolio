import { ContactForm } from "./contact-form";

export function ContactSection() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-heading">
      <div className="container-shell contact-section__inner">
        <div className="contact-section__intro">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-heading">Have a project in mind?</h2>
          <p>
            Send a short note about what you are building, where you are in the process,
            and what kind of help you need.
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
