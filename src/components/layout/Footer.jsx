import React from "react";

const ShieldIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const MapPinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z" />
  </svg>
);
const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
function Footer() {
  return (
    <footer className="pf-footer">
      <div className="pf-newsletter">
        <div className="pf-newsletter-label">
          <h3>Stay on top of your payments</h3>
          <p>
            Get weekly summaries and payment reminders directly to your inbox.
          </p>
        </div>
        <div className="pf-newsletter-form">
          <input type="email" placeholder="Enter your email address" />
          <button type="button">Subscribe</button>
        </div>
      </div>

      <div className="pf-main">
        <div>
          <div className="pf-logo">
            <div className="pf-logo-icon">
              <svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div>
              <div className="pf-logo-name">PayFlow</div>
              <div className="pf-logo-sub">Smart Scheduler</div>
            </div>
          </div>
          <p className="pf-tagline">
            Automating your bills so you never miss a payment again. Built for
            smart, stress-free financial management.
          </p>
          <div className="pf-socials">
            {[
              <path
                key="x"
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.734-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              />,
              <path
                key="fb"
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />,
            ].map((p, i) => (
              <div key={i} className="pf-social">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  {p}
                </svg>
              </div>
            ))}
            <div className="pf-social">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
          </div>
          <div className="pf-badges">
            <div className="pf-badge">
              <ShieldIcon />
              <div className="pf-badge-text">
                <strong>256-bit SSL Secured</strong>Bank-grade encryption
              </div>
            </div>
            <div className="pf-badge">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: 16, height: 16, color: "#4caf78" }}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <div className="pf-badge-text">
                <strong>CBN Licensed</strong>
                <span>Regulatory body / licence</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="pf-col-title">Quick Links</div>
          <ul className="pf-link-list">
            {[
              "Home",
              "Dashboard",
              "History",
              "Scheduler",
              "Wallet",
              "Reports",
            ].map((l) => (
              <li key={l}>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="pf-col-title">Support</div>
          <ul className="pf-link-list">
            {[
              "Help Center",
              "FAQs",
              "Contact Us",
              "Report a Bug",
              "Privacy Policy",
              "Terms of Service",
            ].map((l) => (
              <li key={l}>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="pf-col-title">Contact Us</div>
          {[
            { Icon: MapPinIcon, text: "Victoria Island, Lagos, Nigeria" },
            { Icon: PhoneIcon, text: "+234 800 PAY FLOW" },
            { Icon: MailIcon, text: "hello@payflow.ng" },
          ].map(({ Icon, text }, i) => (
            <div key={i} className="pf-contact-item">
              <Icon />
              <span className="pf-contact-text">{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pf-divider" />
      <div className="pf-bottom">
        <div>
          <div className="pf-copy">
            © 2026 PayFlow Technologies Ltd. — All rights reserved.
          </div>
          <div className="pf-legal-links">
            {[
              "Privacy Policy",
              "Terms of Use",
              "Cookie Policy",
              "Refund Policy",
            ].map((l) => (
              <a key={l} href="#" onClick={(e) => e.preventDefault()}>
                {l}
              </a>
            ))}
          </div>
        </div>
        <div className="pf-reg">RC No.: RC 0000000 (CAC Registration No.)</div>
      </div>
    </footer>
  );
}

export default Footer;
