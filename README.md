# Nexora Chat — React Frontend

Ye React (Vite) version hai tumhare Nexora Chat app ka. **Koi bhi API call, WebSocket endpoint, STOMP destination, ya ICE/TURN config nahi chhua gaya hai** — sab `App.jsx` ke top par `API_BASE`, `WS_URL` aur `ICE_CONFIG` mein waise ke waise hain jaise original file mein the.

Sirf UI/UX ko modern polish diya gaya hai (blue/indigo professional theme, refined spacing) aur pura app React components + hooks mein restructure kiya gaya hai.

## Run locally
```bash
npm install
npm run dev
```

## Production build (isse deploy karna hai)
```bash
npm install
npm run build
```
Output `dist/` folder mein banega — usi ko apne hosting (jahan `web.nexorachat.online` deployed hai) par upload/deploy karna hai, jaise pehle plain `index.html` deploy kiya tha.

## Backend
Backend/API/WebSocket server mein **koi change nahi karna** — ye sirf frontend hai, backend jaisa hai waisa hi rahega aur usi se connect karega.

## Cashfree jaisa gateway approval ke liye ek suggestion
Payment gateway approval mostly frontend ki "look" se zyada in cheezon par depend karta hai:
- Company/business ka naam, address, contact/support email ya number kahin page par ho
- Privacy Policy, Terms of Service, Refund/Cancellation Policy pages
- HTTPS domain (already hai)
- App ka clear description ki ye kya karta hai

## Added: gateway-review pages
`src/pages/PolicyPages.jsx` mein ye pages already add kar di gayi hain, login screen ke footer se link hain:
- `#/about` — About
- `#/pricing` — Pricing
- `#/privacy` — Privacy Policy
- `#/terms` — Terms & Conditions
- `#/refund` — Refund & Cancellation Policy
- `#/contact` — Contact Us

**Zaroori:** in files mein har jagah `[FILL IN ...]` likha hai — apna real business name, address, support email/phone, aur actual pricing waha daal do. Ye template hai, legal advice nahi — agar business registered hai to ek baar CA/lawyer se bhi review karwa lena, especially Terms aur Refund policy.
