import React from 'react'

const NAV = [
  { href: '#/', label: 'Home' },
  { href: '#/about', label: 'About' },
  { href: '#/security', label: 'Security' },
  { href: '#/pricing', label: 'Pricing' },
  { href: '#/privacy', label: 'Privacy Policy' },
  { href: '#/terms', label: 'Terms & Conditions' },
  { href: '#/refund', label: 'Refund & Cancellation' },
  { href: '#/contact', label: 'Contact Us' },
]

export function PageLayout({ title, updated, children }) {
  return (
    <div className="policy-page">
      <div className="policy-topbar">
        <a href="#/" className="policy-brand">
          <span className="policy-brand-mark">N</span>
          Nexora <span>Chat</span>
        </a>
        <nav className="policy-nav">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
      </div>
      <div className="policy-body">
        <div className="policy-card">
          <h1>{title}</h1>
          {updated && <div className="policy-updated">Last updated: {updated}</div>}
          <div className="policy-content">{children}</div>
        </div>
      </div>
      <footer className="policy-footer">
        <span>© {new Date().getFullYear()} Nexora Technologies. All rights reserved.</span>
        <div className="policy-footer-links">
          {NAV.slice(1).map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </div>
      </footer>
    </div>
  )
}

export function AboutPage() {
  return (
    <PageLayout title="About Nexora Chat">
      <p>
        Nexora Chat is a lightweight, private messaging and video calling app built for people who want a
        fast, secure way to talk one-on-one. Conversations are protected with end-to-end encryption, and
        calls connect directly, peer-to-peer, wherever possible.
      </p>
      <h3>Our mission</h3>
      <p>
        We believe private conversations should stay private. Our mission is to build communication tools
        that put security and simplicity first — no accounts to manage, no ads, no data harvesting.
      </p>
      <h3>What we offer today</h3>
      <ul>
        <li>Real-time one-to-one text messaging</li>
        <li>End-to-end encrypted chats (AES-256, ECDH key exchange)</li>
        <li>HD video and audio calling</li>
        <li>Online/last-seen presence status</li>
      </ul>
      <h3>What we're building next</h3>
      <p>
        Nexora Chat is under active development. Upcoming additions include group video calls, encrypted
        file and media sharing, native desktop and mobile apps, and team/business plans for organisations
        that need multi-user workspaces. See our <a href="#/pricing">Pricing</a> page for current and
        upcoming plans.
      </p>
      <h3>Who we are</h3>
      <p>
        Nexora Chat is a software product operated by Vijay Prajapati, focused on building secure,
        privacy-first communication and software solutions for individual and business users.
      </p>
      <p>
        Legal name: <b>Vijay Prajapati</b><br />
        Registered address: <b>C Block, Govindpuram, Ghaziabad, Uttar Pradesh - 20105</b><br />
        Email: <b>vijayprajapati24646@gmail.com</b><br />
        Phone: <b>9205483945</b><br />
        Website: <b>https://web.nexorachat.online/</b>
      </p>
    </PageLayout>
  )
}

export function PricingPage() {
  return (
    <PageLayout title="Pricing">
      <p>
        Nexora Chat is free to use for one-to-one messaging and calling. A Pro plan is available for anyone
        who wants additional benefits, billed monthly.
      </p>
      <div className="policy-pricing-grid">
        <div className="policy-plan">
          <h4>Free</h4>
          <div className="policy-price">₹0</div>
          <ul>
            <li>Unlimited 1:1 chats</li>
            <li>Standard video/audio calls</li>
            <li>End-to-end encryption</li>
          </ul>
        </div>
        <div className="policy-plan featured">
          <h4>Pro</h4>
          <div className="policy-price">₹49 / month</div>
          <ul>
            <li>Access to available Pro features</li>
            <li>Additional benefits provided with the Pro plan</li>
            <li>Priority support</li>
          </ul>
        </div>
      </div>
      <p>
        All payments are processed securely through our payment partner. Prices are listed in INR and are
        inclusive of applicable taxes unless stated otherwise at checkout. Any applicable subscription,
        cancellation, and refund terms are described in our <a href="#/refund">Refund & Cancellation Policy</a>
        and <a href="#/terms">Terms & Conditions</a>.
      </p>
    </PageLayout>
  )
}

export function PrivacyPage() {
  return (
    <PageLayout title="Privacy Policy" updated="30 August 2026">
      <p>
        <strong>Policy Version: 1.1</strong><br />
        This Privacy Policy explains how Nexora Chat ("we", "our", "us") collects, uses, and protects
        information when you use our messaging and video calling service (the "Service").
      </p>
      <h3>1. Information we collect</h3>
      <ul>
        <li>Phone number, used to identify your account and connect you with the person you're chatting with</li>
        <li>Presence information (online/last-seen status)</li>
        <li>Technical data such as IP address and device/browser type, used for connecting calls and diagnosing issues</li>
      </ul>
      <h3>2. What we do not do</h3>
      <p>
        Chat messages are end-to-end encrypted: message content is encrypted on your device and can only be
        decrypted by the intended recipient. We do not store plaintext message content on our servers.
      </p>
      <h3>3. How we use information</h3>
      <ul>
        <li>To operate and maintain the Service (connecting chats and calls)</li>
        <li>To show accurate online/offline and last-seen status</li>
        <li>To improve reliability and troubleshoot technical issues</li>
        <li>To process payments for paid features through our payment service provider</li>
        <li>To protect the Service against fraud, abuse, unauthorized access, and other security threats</li>
      </ul>
      <h3>4. Third-party services</h3>
      <p>
        We use third-party infrastructure for functions such as real-time messaging relay, STUN/TURN servers
        for video calls, hosting and infrastructure, and payment processing for paid features. These third-party
        service providers may process limited information as necessary to provide their services and are expected
        to maintain appropriate security and privacy protections. Payment processing may be handled by Cashfree
        Payments, subject to Cashfree's applicable terms and privacy policy.
      </p>
      <h3>5. Data retention</h3>
      <p>
        We retain personal information only for as long as necessary to operate the Service, maintain account
        security, comply with applicable legal obligations, resolve disputes, and enforce our agreements.
        Users may request deletion of their personal data and account by contacting us through our contact page.
        Where deletion is legally or technically restricted, we will retain only the information that is required
        for the applicable purpose.
      </p>
      <h3>6. Your rights</h3>
      <p>
        You may request access to, correction of, or deletion of your personal data by contacting us at{' '}
        <a href="#/contact">our contact page</a>.
      </p>
      <h3>7. Contact</h3>
      <p>
        For any privacy questions, data-related requests, or concerns, please contact us through the following
        details:
      </p>
      <ul>
        <li><strong>Legal Name:</strong> Vijay Prajapati</li>
        <li><strong>Email:</strong> vijayprajapati24646@gmail.com</li>
        <li><strong>Mobile:</strong> 9205483945</li>
      </ul>
    </PageLayout>
  )
}

export function TermsPage() {
  return (
    <PageLayout title="Terms & Conditions" updated="30 August 2026">
      <p>
        <strong>Version: 1.1</strong><br />
        These Terms & Conditions ("Terms") govern your use of Nexora Chat (the "Service"), operated by
        Vijay Prajapati ("we", "us"). By using the Service, you agree to these Terms.
      </p>
      <h3>1. Eligibility</h3>
      <p>You must be at least 18 years old, or the age of legal majority in your jurisdiction, to use the Service.</p>
      <h3>2. Acceptable use</h3>
      <ul>
        <li>Do not use the Service for unlawful, harassing, or fraudulent activity</li>
        <li>Do not attempt to intercept, disrupt, or reverse-engineer the Service</li>
        <li>You are responsible for the content of your own messages and calls</li>
      </ul>
      <h3>3. Paid features</h3>
      <p>
        Certain features may be offered as paid plans or subscriptions. Current prices and available features
        are shown on the Pricing page or at checkout. Payments may be processed through Cashfree Payments or
        another authorized payment service provider. By purchasing a paid feature, you agree to the applicable
        price, billing period, and payment terms presented at checkout.
      </p>
      <h3>4. Availability</h3>
      <p>
        We aim to keep the Service available at all times but do not guarantee uninterrupted access. The
        Service is provided "as is" without warranties of any kind.
      </p>
      <h3>5. Limitation of liability</h3>
      <p>
        To the maximum extent permitted by law, Vijay Prajapati shall not be liable for indirect,
        incidental, or consequential damages arising from your use of the Service.
      </p>
      <h3>6. Termination</h3>
      <p>We may suspend or terminate access to the Service for violation of these Terms.</p>
      <h3>7. Changes to these Terms</h3>
      <p>We may update these Terms from time to time. Continued use of the Service means you accept the updated Terms.</p>
      <h3>8. Governing law</h3>
      <p>
        These Terms are governed by the laws of India. Any dispute will be subject to the jurisdiction of
        the courts having appropriate jurisdiction in Uttar Pradesh, India.
      </p>
      <h3>9. Contact</h3>
      <p>
        Questions about these Terms can be sent to <a href="mailto:vijayprajapati24646@gmail.com">vijayprajapati24646@gmail.com</a>.
      </p>
    </PageLayout>
  )
}

export function RefundPage() {
  return (
    <PageLayout title="Refund & Cancellation Policy" updated="30 August 2026">
      <p>
        <strong>Policy Version: 1.1</strong><br />
        This Refund & Cancellation Policy applies to any paid plans or features purchased through Nexora
        Chat. Free features do not require payment. For paid subscriptions, the applicable price and billing
        period are shown before payment is completed.
      </p>
      <h3>1. Cancellations</h3>
      <p>
        You may request cancellation of a paid subscription at any time by contacting us through the Contact
        Us page. Cancellation requests will apply to the applicable subscription period and will not create a
        new charge for the following billing period where cancellation is successfully processed.
      </p>
      <h3>2. Refunds</h3>
      <p>
        Refund requests may be considered for duplicate charges, failed transactions that were nevertheless
        debited, or other valid billing issues. Refund eligibility for a paid feature may depend on the
        circumstances and the extent to which the paid service has been used.
      </p>
      <h3>3. How to request a refund or cancellation</h3>
      <p>
        Email us at <a href="mailto:vijayprajapati24646@gmail.com">vijayprajapati24646@gmail.com</a> with your
        registered phone number and the transaction ID from your payment confirmation. We aim to respond to
        requests within 3–5 business days.
      </p>
      <h3>4. Failed or duplicate payments</h3>
      <p>
        If you were charged more than once for the same plan, or a payment failed but was still debited,
        contact us with the transaction reference and we will investigate and refund any confirmed duplicate
        or failed charge.
      </p>
      <h3>5. Processing time</h3>
      <p>
        Approved refunds are credited back to the original payment method within 5–7 business days, subject
        to your bank or payment provider's processing timelines.
      </p>
    </PageLayout>
  )
}

export function SecurityPage() {
  return (
    <PageLayout title="Security at Nexora Chat">
      <p>
        Security isn't a feature we bolted on — it's the foundation Nexora Chat is built on. Here's a
        technical look at how we protect your conversations.
      </p>
      <h3>End-to-end encryption</h3>
      <p>
        Every chat session uses an ECDH (P-256) key exchange to establish a shared secret directly between
        the two participants' devices. Messages are encrypted with AES-256-GCM before they ever leave your
        device. Our servers relay encrypted payloads only — they never see plaintext message content and
        never store decryption keys.
      </p>
      <h3>Transport security</h3>
      <p>
        All traffic between your device and our servers is encrypted in transit (HTTPS/WSS). Signaling for
        video/audio calls uses standard WebRTC with STUN/TURN, and call media streams connect directly
        peer-to-peer wherever network conditions allow.
      </p>
      <h3>Data minimisation</h3>
      <p>
        We only collect what's needed to operate the service — your phone number and basic presence status.
        We don't require an email, a password, or profile information to use core features.
      </p>
      <h3>Infrastructure</h3>
      <p>
        We use secure third-party hosting and infrastructure services to operate the Service. Access to
        infrastructure is restricted to authorised personnel and service providers where required, and we
        take reasonable measures to protect data against unauthorized access, loss, misuse, or alteration.
      </p>
      <h3>Responsible disclosure</h3>
      <p>
        If you believe you've found a security issue in Nexora Chat, please report it to
        <a href="mailto:vijayprajapati24646@gmail.com"> vijayprajapati24646@gmail.com</a> — we take these
        reports seriously and will respond promptly.
      </p>
      <p style={{ marginTop: 18 }}>
        For how we handle personal data more broadly, see our <a href="#/privacy">Privacy Policy</a>.
      </p>
    </PageLayout>
  )
}

export function ContactPage() {
  return (
    <PageLayout title="Contact Us">
      <p>We're happy to help with questions about your account, billing, privacy, or anything else.</p>
      <p>
        <strong>Legal Name:</strong> Vijay Prajapati<br />
        <strong>Email:</strong> <a href="mailto:vijayprajapati24646@gmail.com">vijayprajapati24646@gmail.com</a><br />
        <strong>Mobile:</strong> 9205483945
      </p>
      <div className="policy-contact-grid">
        <div>
          <h4>Support email</h4>
          <p><a href="mailto:vijayprajapati24646@gmail.com">vijayprajapati24646@gmail.com</a></p>
        </div>
        <div>
          <h4>Business name</h4>
          <p>Vijay Prajapati</p>
        </div>
        <div>
          <h4>Registered address</h4>
          <p>C Block, Govindpuram, Ghaziabad, Uttar Pradesh - 20105</p>
        </div>
        <div>
          <h4>Phone</h4>
          <p>9205483945</p>
        </div>
      </div>
      <p style={{ marginTop: 18 }}>
        For billing or payment issues, please include your registered phone number and transaction ID (if
        applicable) so we can help faster.
      </p>
    </PageLayout>
  )
}
