import React from 'react'

const NAV = [
  { href: '#/about', label: 'About' },
  { href: '#/security', label: 'Security' },
  { href: '#/pricing', label: 'Pricing' },
  { href: '#/privacy', label: 'Privacy' },
  { href: '#/terms', label: 'Terms' },
  { href: '#/refund', label: 'Refund' },
  { href: '#/contact', label: 'Contact' },
]

function Layout({ title, children }) {
  return (
    <div className="policy-page">
      <header className="policy-topbar">
        <a href="#/" className="policy-brand">
          <span className="policy-brand-mark">N</span>
          Nexora <span>Chat</span>
        </a>
        <nav className="policy-nav">
          {NAV.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
      </header>
      <main className="policy-body">
        <article className="policy-card">
          <h1>{title}</h1>
          <div className="policy-updated">Last updated: 30 August 2026</div>
          <div className="policy-content">{children}</div>
        </article>
      </main>
      <footer className="policy-footer">
        <span>© {new Date().getFullYear()} Nexora Chat. All rights reserved.</span>
        <div className="policy-footer-links">
          <a href="#/privacy">Privacy</a>
          <a href="#/terms">Terms</a>
          <a href="#/refund">Refund</a>
          <a href="#/contact">Contact</a>
        </div>
      </footer>
    </div>
  )
}

export function AboutPage() {
  return <Layout title="About Nexora Chat">
    <p>Nexora Chat is a privacy-focused communication platform for private one-to-one messaging and audio/video calling.</p>
    <h3>What we build</h3>
    <p>We are building simple communication tools with privacy, security, and reliable real-time connectivity as core principles.</p>
    <h3>Contact</h3>
    <p>For business, support, or legal enquiries, please use the Contact page.</p>
  </Layout>
}

export function SecurityPage() {
  return <Layout title="Security">
    <p>Nexora Chat is designed with security and privacy in mind.</p>
    <h3>Encrypted communication</h3>
    <p>Messages and calls use encryption mechanisms implemented by the application. Sensitive credentials and payment data are handled through the relevant service providers.</p>
    <h3>Responsible disclosure</h3>
    <p>If you discover a security issue, please report it through our Contact page with enough detail for us to investigate.</p>
  </Layout>
}

export function PricingPage() {
  return <Layout title="Pricing">
    <p>Nexora Chat currently provides its core communication experience free of charge.</p>
    <div className="policy-pricing-grid">
      <div className="policy-plan featured">
        <h4>Core <span>Available</span></h4>
        <div className="policy-price">Free</div>
        <ul><li>Private one-to-one chat</li><li>Audio/video calling</li><li>Real-time messaging</li></ul>
      </div>
      <div className="policy-plan">
        <h4>Premium <span>Coming soon</span></h4>
        <div className="policy-price">To be announced</div>
        <ul><li>Optional paid features</li><li>Additional product capabilities</li></ul>
      </div>
    </div>
  </Layout>
}

export function PrivacyPage() {
  return <Layout title="Privacy Policy">
    <p>We aim to collect only the information needed to provide and secure Nexora Chat.</p>
    <h3>Information</h3>
    <p>Depending on how you use the service, technical information required for authentication, connectivity, security, and service operation may be processed.</p>
    <h3>Messages and calls</h3>
    <p>We design the service so that message and call content is protected by encryption. We do not sell personal information for advertising.</p>
    <h3>Questions</h3>
    <p>For privacy questions or requests, please contact us through the Contact page.</p>
  </Layout>
}

export function TermsPage() {
  return <Layout title="Terms & Conditions">
    <p>By using Nexora Chat, you agree to use the service lawfully and responsibly.</p>
    <h3>Acceptable use</h3>
    <p>You must not use the service for unlawful activity, abuse, harassment, fraud, or attempts to compromise the service or another person's security.</p>
    <h3>Service availability</h3>
    <p>We may update, suspend, or change parts of the service as needed for maintenance, security, or product development.</p>
    <h3>Contact</h3>
    <p>If you have questions about these terms, please use the Contact page.</p>
  </Layout>
}

export function RefundPage() {
  return <Layout title="Refund & Cancellation Policy">
    <p>Core Nexora Chat features are currently free. If paid features or services are introduced, the applicable pricing and refund terms will be shown before purchase.</p>
    <h3>Cancellation</h3>
    <p>Where a paid subscription is offered, cancellation instructions will be provided with the subscription.</p>
    <h3>Refunds</h3>
    <p>Refund eligibility for a paid product will depend on the applicable purchase terms and the circumstances of the request.</p>
    <p>For a refund or billing question, please contact support with your order details.</p>
  </Layout>
}

export function ContactPage() {
  return <Layout title="Contact Us">
    <p>For support, business, billing, privacy, or security enquiries, contact the Nexora Chat team.</p>
    <div className="policy-contact-grid">
      <div><h4>Support</h4><p>Use the support contact provided with your Nexora Chat service.</p></div>
      <div><h4>Business</h4><p>Use the Contact page for business enquiries.</p></div>
    </div>
    <h3>Before publishing</h3>
    <p>If this site is used commercially, replace the generic contact text above with your actual business name, address, support email, and phone number.</p>
  </Layout>
}
