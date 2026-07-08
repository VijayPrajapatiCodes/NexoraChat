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

const PRODUCTS = [
  { icon: '💬', name: 'Nexora Chat', status: 'Live', text: 'Private 1:1 encrypted messaging and video calling. Available now.' },
  { icon: '🏢', name: 'Nexora Business', status: 'Planned', text: 'Team workspaces with multi-user chat, admin controls, and shared billing.' },
  { icon: '💻', name: 'Nexora Desktop', status: 'In development', text: 'Native Windows and macOS apps with system notifications and always-on calling.' },
  { icon: '🔌', name: 'Nexora API', status: 'Planned', text: 'Developer APIs to embed encrypted chat and calling into your own product.' },
]

const FEATURES = [
  { icon: '🔒', title: 'End-to-end encrypted', text: 'Every chat is secured with device-to-device AES-256 encryption. We never see your messages.' },
  { icon: '📹', title: 'HD video calling', text: 'Crystal-clear one-to-one video calls that connect directly, with no lag.' },
  { icon: '⚡', title: 'Real-time messaging', text: 'Instant delivery, live typing indicators, and accurate online/last-seen status.' },
  { icon: '🌐', title: 'Works everywhere', text: 'No install needed — open it in any browser, on any device.' },
  { icon: '🎙️', title: 'Crystal-clear audio', text: 'High-quality voice calls that stay stable even on average connections.' },
  { icon: '🕶️', title: 'No accounts, no profiles', text: 'Just a phone number — no email, no password, no public profile to manage.' },
]

const USE_CASES = [
  { icon: '💼', title: 'Confidential business calls', text: 'Discuss sensitive deals, contracts, or client details without worrying about who might be listening.' },
  { icon: '❤️', title: 'Personal & family conversations', text: 'Stay close with the people who matter, with the privacy a real relationship deserves.' },
  { icon: '🩺', title: 'Sensitive one-on-one consultations', text: 'A private channel for conversations that need to stay strictly between two people.' },
  { icon: '🌍', title: 'Long-distance relationships', text: 'HD video calls that feel close, wherever the two of you actually are.' },
]

const STEPS = [
  { n: '01', title: 'Enter your number', text: 'Add your mobile number and the number of the person you want to talk to.' },
  { n: '02', title: 'Connect instantly', text: 'A secure, encrypted session is created between just the two of you.' },
  { n: '03', title: 'Chat or call', text: 'Send messages or start a video/audio call, all end-to-end encrypted.' },
]

const FAQS = [
  { q: 'Is Nexora Chat really end-to-end encrypted?', a: 'Yes. Message encryption keys are generated on your device and exchanged directly with the other person — we never have access to the keys or your message content.' },
  { q: 'Do I need to create an account?', a: 'No. Just enter your mobile number and the number you want to talk to — a private session is created between just the two of you.' },
  { q: 'Is there a free plan?', a: 'Yes, core chat and calling is free. See our Pricing page for optional paid features.' },
  { q: 'How do I cancel or get a refund?', a: 'You can cancel anytime from your account, and refunds are handled per our Refund & Cancellation Policy.' },
]

const ROADMAP = [
  { icon: '👥', title: 'Group video calls', status: 'Coming soon', text: 'Bring more than two people into a single encrypted call, for teams and friend groups.' },
  { icon: '📎', title: 'File & media sharing', status: 'Coming soon', text: 'Send encrypted files, photos, and documents directly inside a chat.' },
  { icon: '💻', title: 'Desktop & mobile apps', status: 'In development', text: "Native apps for Windows, macOS, iOS, and Android, so you're never tied to a browser tab." },
  { icon: '🏢', title: 'Team & business plans', status: 'Planned', text: 'Multi-user workspaces with admin controls, built for small teams and businesses.' },
]

const WHY_US = [
  { title: 'Privacy-first architecture', text: 'We build with encryption and minimal data collection from day one, not as an afterthought.' },
  { title: 'No ads, ever', text: 'Our revenue comes from subscriptions, not from selling attention or data.' },
  { title: 'Built to scale', text: 'The same real-time infrastructure that powers a single call is designed to support teams as we grow.' },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className={'faq-item' + (open ? ' open' : '')}>
      <button className="faq-q" onClick={() => setOpen((o) => !o)}>
        <span>{q}</span>
        <span className="faq-caret">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="faq-a">{a}</div>}
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="lbg">
        <div className="lbg-grid" />
        <div className="lbg-blob lb1" />
        <div className="lbg-blob lb2" />
        <div className="lbg-blob lb3" />
      </div>

      <header className="landing-topbar">
        <a href="#/" className="policy-brand">
          <span className="policy-brand-mark">N</span>
          Nexora <span>Chat</span>
        </a>
        <nav className="policy-nav landing-nav-links">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <a href="#/login" className="landing-nav-cta">Get started</a>
      </header>

      <main className="landing-hero">
        <div className="landing-hero-chip">🔒 Private by default · End-to-end encrypted</div>
        <h1>
          Chat and video call,<br />just between <span>the two of you</span>.
        </h1>
        <p className="landing-hero-sub">
          Nexora Chat is a fast, secure messaging and video calling app. No accounts, no data mining —
          just a private line between you and one other person.
        </p>
        <div className="landing-hero-ctas">
          <a href="#/login" className="landing-btn-primary">Get started →</a>
          <a href="#about-section" className="landing-btn-secondary">See how it works</a>
        </div>
        <div className="landing-trust-row">
          <div className="trust-dot" />
          <span>No app download required · Works in your browser</span>
        </div>
      </main>

      <section className="landing-stats">
        <div className="landing-stat"><div className="landing-stat-num">256-bit</div><div className="landing-stat-lbl">AES encryption</div></div>
        <div className="landing-stat"><div className="landing-stat-num">1:1</div><div className="landing-stat-lbl">Private sessions only</div></div>
        <div className="landing-stat"><div className="landing-stat-num">HD</div><div className="landing-stat-lbl">Video & audio calls</div></div>
        <div className="landing-stat"><div className="landing-stat-num">0</div><div className="landing-stat-lbl">Ads or data selling</div></div>
      </section>

      <section className="landing-features">
        {FEATURES.map((f) => (
          <div key={f.title} className="landing-feature-card">
            <div className="landing-feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </section>

      <section className="landing-steps" id="about-section">
        <h2>How it works</h2>
        <div className="landing-steps-grid">
          {STEPS.map((s) => (
            <div key={s.n} className="landing-step-card">
              <div className="landing-step-num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
        <div className="landing-steps-cta">
          <a href="#/login" className="landing-btn-primary">Get started →</a>
        </div>
      </section>

      <section className="landing-usecases">
        <div className="landing-section-head">
          <h2>Built for conversations that matter</h2>
          <p>Whatever the reason you need a private line, Nexora Chat is built for it.</p>
        </div>
        <div className="landing-usecases-grid">
          {USE_CASES.map((u) => (
            <div key={u.title} className="landing-usecase-card">
              <div className="landing-usecase-icon">{u.icon}</div>
              <div>
                <h3>{u.title}</h3>
                <p>{u.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-why">
        <div className="landing-why-text">
          <h2>Built like a company that's here to stay</h2>
          <p>
            Nexora Chat isn't a side project — it's built on the same principles serious communication
            platforms are: security by default, no ads, and infrastructure designed to grow with our users.
          </p>
        </div>
        <div className="landing-why-grid">
          {WHY_US.map((w) => (
            <div key={w.title} className="landing-why-card">
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-products">
        <div className="landing-section-head">
          <h2>Our products</h2>
          <p>Nexora Chat is the first product in a growing platform.</p>
        </div>
        <div className="landing-products-grid">
          {PRODUCTS.map((p) => (
            <div key={p.name} className={'landing-product-card' + (p.status === 'Live' ? ' live' : '')}>
              <div className="landing-roadmap-top">
                <span className="landing-roadmap-icon">{p.icon}</span>
                <span className={'landing-roadmap-status' + (p.status === 'Live' ? ' live' : '')}>{p.status}</span>
              </div>
              <h3>{p.name}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-roadmap">
        <div className="landing-section-head">
          <h2>What's coming next</h2>
          <p>We're actively building. Here's what's on the roadmap for Nexora Chat.</p>
        </div>
        <div className="landing-roadmap-grid">
          {ROADMAP.map((r) => (
            <div key={r.title} className="landing-roadmap-card">
              <div className="landing-roadmap-top">
                <span className="landing-roadmap-icon">{r.icon}</span>
                <span className="landing-roadmap-status">{r.status}</span>
              </div>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-faq">
        <h2>Frequently asked questions</h2>
        <div className="landing-faq-list">
          {FAQS.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      <footer className="landing-footer-full">
        <div className="landing-footer-top">
          <div className="landing-footer-brand">
            <a href="#/" className="policy-brand"><span className="policy-brand-mark">N</span>Nexora <span>Chat</span></a>
            <p>Private, encrypted messaging and calling — built to grow into a full communication platform.</p>
          </div>
          <div className="landing-footer-col">
            <h4>Product</h4>
            <a href="#/">Nexora Chat</a>
            <a href="#/pricing">Pricing</a>
            <a href="#/security">Security</a>
          </div>
          <div className="landing-footer-col">
            <h4>Company</h4>
            <a href="#/about">About</a>
            <a href="#/contact">Contact</a>
          </div>
          <div className="landing-footer-col">
            <h4>Legal</h4>
            <a href="#/privacy">Privacy Policy</a>
            <a href="#/terms">Terms & Conditions</a>
            <a href="#/refund">Refund & Cancellation</a>
          </div>
        </div>
        <div className="landing-footer-bottom">
          <span>© {new Date().getFullYear()} Nexora Technologies. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}
