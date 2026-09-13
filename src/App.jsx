import React, { useRef, useState, useEffect, useCallback } from 'react'
import './pages/policyPages.css'
import './pages/landingPage.css'
import LandingPage from './pages/LandingPage'
import { AboutPage, PricingPage, PrivacyPage, TermsPage, RefundPage, ContactPage, SecurityPage } from './pages/PolicyPages'

/* ============================================================
   BACKEND CONFIG — DO NOT CHANGE ANY OF THESE VALUES.
   Same API base, WebSocket endpoint, STOMP destinations and
   ICE server config as the original deployed app.
   ============================================================ */
const API_BASE = 'https://api.nexorachat.online'
const WS_URL = API_BASE + '/chat'
const ICE_CONFIG = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    {
      urls: [
        'turn:openrelay.metered.ca:80',
        'turn:openrelay.metered.ca:443',
        'turn:openrelay.metered.ca:443?transport=tcp',
      ],
      username: 'openrelayproject',
      credential: 'openrelayproject',
    },
  ],
}

/* ---------- helpers ---------- */
function ab2b64(buf) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
}
function b642ab(b64) {
  const bin = atob(b64)
  const buf = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i)
  return buf.buffer
}
function formatNum(n) {
  return '+91 ' + n.slice(0, 5) + ' ' + n.slice(5)
}
function initials(n) {
  return n.slice(0, 1).toUpperCase()
}
function nowTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function getInfoPage() {
  const h = window.location.hash.replace(/^#/, '')
  return h || '/'
}

export default function App() {
  /* ---------- static info page routing (About/Pricing/Privacy/Terms/Refund/Contact) ---------- */
  const [infoPage, setInfoPage] = useState(getInfoPage())
  useEffect(() => {
    const onHashChange = () => setInfoPage(getInfoPage())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  /* ---------- UI state ---------- */
  const [screen, setScreen] = useState('login') // 'login' | 'chat'
  const [myNumInput, setMyNumInput] = useState('')
  const [toNumInput, setToNumInput] = useState('')
  const [loginError, setLoginError] = useState(false)

  const [peerNumDisplay, setPeerNumDisplay] = useState('')
  const [peerOnline, setPeerOnline] = useState(false)
  const [peerStatusText, setPeerStatusText] = useState('offline')
  const [e2eeActive, setE2eeActive] = useState(false)
  const [typingShow, setTypingShow] = useState(false)
  const [messages, setMessages] = useState([]) // {id, type, text, ts}

  const [msgText, setMsgText] = useState('')

  const [callModalOpen, setCallModalOpen] = useState(false)
  const [callScreenOpen, setCallScreenOpen] = useState(false)
  const [callState, setCallState] = useState('Connecting…')
  const [isMuted, setIsMuted] = useState(false)
  const [isCamOff, setIsCamOff] = useState(false)

  const [toast, setToast] = useState({ show: false, msg: '' })

  /* ---------- mutable session refs (mirror the old globals) ---------- */
  const myIdRef = useRef('')
  const receiverRef = useRef('')
  const myNumRef = useRef('')
  const peerNumRef = useRef('')
  const stompClientRef = useRef(null)
  const pcRef = useRef(null)
  const localStreamRef = useRef(null)
  const pendingICERef = useRef([])
  const typingTimerRef = useRef(null)
  const toastTimerRef = useRef(null)
  const e2eeRef = useRef({ myKeyPair: null, sharedAESKey: null, myPublicKeyB64: null, ready: false })

  const chatBoxRef = useRef(null)
  const msgInputRef = useRef(null)
  const remoteVideoRef = useRef(null)
  const localVideoRef = useRef(null)

  const msgIdRef = useRef(0)

  const toastFn = useCallback((msg) => {
    clearTimeout(toastTimerRef.current)
    setToast({ show: true, msg })
    toastTimerRef.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 2600)
  }, [])

  const addMsg = useCallback((type, text) => {
    msgIdRef.current += 1
    setMessages((m) => [...m, { id: msgIdRef.current, type, text, ts: nowTime() }])
  }, [])

  useEffect(() => {
    if (chatBoxRef.current) chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
  }, [messages, typingShow])

  /* ---------- E2EE (unchanged crypto) ---------- */
  async function generateKeyPair() {
    const kp = await crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveKey'])
    const pubRaw = await crypto.subtle.exportKey('raw', kp.publicKey)
    e2eeRef.current.myKeyPair = kp
    e2eeRef.current.myPublicKeyB64 = ab2b64(pubRaw)
  }
  async function deriveSharedKey(peerPubB64) {
    const peerPubRaw = b642ab(peerPubB64)
    const peerPublicKey = await crypto.subtle.importKey('raw', peerPubRaw, { name: 'ECDH', namedCurve: 'P-256' }, false, [])
    e2eeRef.current.sharedAESKey = await crypto.subtle.deriveKey(
      { name: 'ECDH', public: peerPublicKey },
      e2eeRef.current.myKeyPair.privateKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    )
    e2eeRef.current.ready = true
    setE2eeActive(true)
    addMsg('system', '🔒 End-to-end encrypted. Messages are secure.')
  }
  async function encryptMsg(plaintext) {
    const iv = crypto.getRandomValues(new Uint8Array(12))
    const encoded = new TextEncoder().encode(plaintext)
    const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, e2eeRef.current.sharedAESKey, encoded)
    return JSON.stringify({ iv: ab2b64(iv.buffer), ct: ab2b64(ct) })
  }
  async function decryptMsg(payload) {
    try {
      const { iv, ct } = JSON.parse(payload)
      const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b642ab(iv) }, e2eeRef.current.sharedAESKey, b642ab(ct))
      return new TextDecoder().decode(decrypted)
    } catch (e) {
      return '[🔒 Could not decrypt message]'
    }
  }

  async function fetchLastSeen(userId) {
    try {
      const res = await fetch(`${API_BASE}/api/last-seen/${userId}`)
      if (!res.ok) return 'Offline'
      const txt = await res.text()
      return txt || 'Offline'
    } catch (e) {
      return 'Offline'
    }
  }

  function setStatus(online, lastSeenText) {
    setPeerOnline(online)
    setPeerStatusText(online ? 'online' : lastSeenText || 'offline')
  }

  /* ---------- signaling ---------- */
  function signal(type, data) {
    try {
      stompClientRef.current.send(
        '/app/private-chat',
        {},
        JSON.stringify({ sender: myIdRef.current, receiver: receiverRef.current, type, data: data || {} })
      )
    } catch (e) {}
  }

  function connect() {
    try {
      const socket = new WebSocket(WS_URL + '?userId=' + myIdRef.current)
      const stompClient = window.Stomp.over(socket)
      stompClient.debug = null
      stompClient.heartbeat = { outgoing: 20000, incoming: 20000 }
      stompClientRef.current = stompClient
      stompClient.connect(
        {},
        () => {
          stompClient.subscribe('/user/queue/messages', (msg) => {
            route(JSON.parse(msg.body))
          })
          signal('ONLINE', { num: myNumRef.current, pubKey: e2eeRef.current.myPublicKeyB64 })
        },
        () => {
          toastFn('Connection failed. Retrying…')
          setTimeout(connect, 3000)
        }
      )
      socket.onclose = () => {
        toastFn('Disconnected. Reconnecting…')
        setTimeout(connect, 3000)
      }
    } catch (e) {
      console.error(e)
      setTimeout(connect, 3000)
    }
  }

  async function route(d) {
    switch (d.type) {
      case 'ONLINE':
        setStatus(true)
        if (d.data && d.data.pubKey) await deriveSharedKey(d.data.pubKey)
        signal('ONLINE_ACK', { pubKey: e2eeRef.current.myPublicKeyB64 })
        addMsg('system', `${formatNum(peerNumRef.current)} joined`)
        break
      case 'ONLINE_ACK':
        setStatus(true)
        if (!e2eeRef.current.ready && d.data && d.data.pubKey) await deriveSharedKey(d.data.pubKey)
        break
      case 'OFFLINE': {
        const ls = await fetchLastSeen(peerNumRef.current)
        setStatus(false, ls)
        e2eeRef.current.ready = false
        e2eeRef.current.sharedAESKey = null
        setE2eeActive(false)
        break
      }
      case 'CHAT':
        if (e2eeRef.current.ready && d.data.enc) {
          const plain = await decryptMsg(d.data.enc)
          addMsg('received', plain)
        } else if (d.data.text) addMsg('received', d.data.text)
        break
      case 'TYPING':
        setTypingShow(true)
        break
      case 'STOP_TYPING':
        setTypingShow(false)
        break
      case 'CALL_REQUEST':
        setCallModalOpen(true)
        break
      case 'CALL_ACCEPT':
        startCaller()
        break
      case 'OFFER':
        startCallee(d.data)
        break
      case 'ANSWER':
        gotAnswer(d.data)
        break
      case 'ICE':
        gotICE(d.data)
        break
      case 'END_CALL':
        cleanup()
        toastFn('Call ended')
        break
      default:
        break
    }
  }

  /* ---------- login ---------- */
  function autoResize(el) {
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 110) + 'px'
  }

  async function startChat() {
    const myNum = myNumInput.trim()
    const peerNum = toNumInput.trim()
    if (myNum.length !== 10 || peerNum.length !== 10) {
      setLoginError(true)
      return
    }
    setLoginError(false)
    myNumRef.current = myNum
    peerNumRef.current = peerNum
    myIdRef.current = myNum
    receiverRef.current = peerNum
    await generateKeyPair()
    setPeerNumDisplay(peerNum)
    setScreen('chat')
    const ls = await fetchLastSeen(peerNum)
    setStatus(false, ls)
    connect()
  }

  function handleNumInput(setter) {
    return (e) => setter(e.target.value.replace(/\D/g, ''))
  }
  function handleNumKeyDown(e) {
    if (e.key === 'Enter') startChat()
  }

  /* ---------- chat ---------- */
  let typingTimerLocal = typingTimerRef.current
  function signalTyping() {
    signal('TYPING', {})
    clearTimeout(typingTimerRef.current)
    typingTimerRef.current = setTimeout(() => signal('STOP_TYPING', {}), 1500)
  }

  async function sendMsg() {
    const text = msgText.trim()
    if (!text) return
    if (e2eeRef.current.ready) {
      const enc = await encryptMsg(text)
      signal('CHAT', { enc })
    } else {
      signal('CHAT', { text })
    }
    addMsg('sent', text)
    setMsgText('')
    if (msgInputRef.current) msgInputRef.current.style.height = 'auto'
    signal('STOP_TYPING', {})
  }

  function onMsgInputChange(e) {
    setMsgText(e.target.value)
    autoResize(e.target)
    signalTyping()
  }
  function onMsgInputKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMsg()
    }
  }

  /* ---------- calling ---------- */
  function startVideoCall() {
    signal('CALL_REQUEST', {})
    openCallScreen()
    toastFn('Calling…')
  }
  function startAudioCall() {
    signal('CALL_REQUEST', {})
    openCallScreen()
    toastFn('Audio calling…')
  }

  async function acceptCall() {
    setCallModalOpen(false)
    signal('CALL_ACCEPT', {})
    openCallScreen()
    localStreamRef.current = await getMedia()
  }
  function declineCall() {
    setCallModalOpen(false)
    signal('END_CALL', {})
  }

  async function startCaller() {
    localStreamRef.current = await getMedia()
    const pc = createPeer()
    pcRef.current = pc
    localStreamRef.current.getTracks().forEach((t) => pc.addTrack(t, localStreamRef.current))
    const offer = await pc.createOffer()
    await pc.setLocalDescription(offer)
    signal('OFFER', pc.localDescription)
  }
  async function startCallee(offer) {
    if (!localStreamRef.current) localStreamRef.current = await getMedia()
    const pc = createPeer()
    pcRef.current = pc
    localStreamRef.current.getTracks().forEach((t) => pc.addTrack(t, localStreamRef.current))
    await pc.setRemoteDescription(new RTCSessionDescription(offer))
    pendingICERef.current.forEach((c) => pc.addIceCandidate(new RTCIceCandidate(c)))
    pendingICERef.current = []
    const answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)
    signal('ANSWER', pc.localDescription)
  }
  async function gotAnswer(ans) {
    const pc = pcRef.current
    await pc.setRemoteDescription(new RTCSessionDescription(ans))
    pendingICERef.current.forEach((c) => pc.addIceCandidate(new RTCIceCandidate(c)))
    pendingICERef.current = []
  }
  async function gotICE(c) {
    try {
      const pc = pcRef.current
      if (pc && pc.remoteDescription) await pc.addIceCandidate(new RTCIceCandidate(c))
      else pendingICERef.current.push(c)
    } catch (e) {}
  }
  function createPeer() {
    const conn = new RTCPeerConnection(ICE_CONFIG)
    const remoteStream = new MediaStream()
    const video = remoteVideoRef.current
    if (video) video.srcObject = remoteStream
    conn.ontrack = (e) => {
      if (!remoteStream.getTracks().find((t) => t.id === e.track.id)) remoteStream.addTrack(e.track)
      if (video) {
        video.muted = false
        video.volume = 1
        video.play().catch(() => {})
      }
      setCallState('🟢 Connected')
    }
    conn.onicecandidate = (e) => {
      if (e.candidate) signal('ICE', e.candidate)
    }
    conn.oniceconnectionstatechange = () => {
      if (conn.iceConnectionState === 'failed') conn.restartIce()
      if (conn.iceConnectionState === 'disconnected') setCallState('Reconnecting…')
    }
    return conn
  }
  async function getMedia() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      stream.getAudioTracks().forEach((t) => (t.enabled = true))
      if (localVideoRef.current) localVideoRef.current.srcObject = stream
      return stream
    } catch (e) {
      toastFn('Camera/Mic blocked')
      return null
    }
  }
  function openCallScreen() {
    setCallScreenOpen(true)
    setCallState('Connecting…')
  }
  function toggleMute() {
    if (!localStreamRef.current) return
    const next = !isMuted
    localStreamRef.current.getAudioTracks().forEach((t) => (t.enabled = !next))
    setIsMuted(next)
  }
  function toggleCam() {
    if (!localStreamRef.current) return
    const next = !isCamOff
    localStreamRef.current.getVideoTracks().forEach((t) => (t.enabled = !next))
    setIsCamOff(next)
  }
  function endCall() {
    signal('END_CALL', {})
    cleanup()
  }
  function cleanup() {
    if (pcRef.current) {
      pcRef.current.close()
      pcRef.current = null
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop())
      localStreamRef.current = null
    }
    setCallScreenOpen(false)
    setCallModalOpen(false)
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null
    if (localVideoRef.current) localVideoRef.current.srcObject = null
    setIsMuted(false)
    setIsCamOff(false)
    setCallState('Connecting…')
  }

  useEffect(() => {
    const onUnload = () => {
      try {
        signal('OFFLINE', {})
      } catch (e) {}
    }
    window.addEventListener('beforeunload', onUnload)
    return () => window.removeEventListener('beforeunload', onUnload)
  }, [])

  /* ============================================================
     RENDER
     ============================================================ */
  if (screen !== 'chat') {
    if (infoPage === '/about') return <AboutPage />
    if (infoPage === '/security') return <SecurityPage />
    if (infoPage === '/pricing') return <PricingPage />
    if (infoPage === '/privacy') return <PrivacyPage />
    if (infoPage === '/terms') return <TermsPage />
    if (infoPage === '/refund') return <RefundPage />
    if (infoPage === '/contact') return <ContactPage />
    if (infoPage !== '/login') return <LandingPage />
  }

  return (
    <div className="app-root">
      {screen === 'login' && (
        <div className="screen" id="loginScreen">
          <div className="lbg">
            <div className="lbg-grid" />
            <div className="lbg-blob lb1" />
            <div className="lbg-blob lb2" />
            <div className="lbg-blob lb3" />
          </div>
          <div className="login-card">
            <div className="login-hero">
              <div className="logo-stack">
                <div className="logo-ring1" />
                <div className="logo-ring2" />
                <div className="logo-box">
                  <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M37 7H7C5.9 7 5 7.9 5 9V31C5 32.1 5.9 33 7 33H14V40L23 33H37C38.1 33 39 32.1 39 31V9C39 7.9 38.1 7 37 7Z"
                      fill="white"
                      opacity="0.95"
                    />
                    <circle cx="15" cy="21" r="2.5" fill="rgba(45,124,255,0.75)" />
                    <circle cx="22" cy="21" r="2.5" fill="rgba(45,124,255,0.75)" />
                    <circle cx="29" cy="21" r="2.5" fill="rgba(45,124,255,0.75)" />
                  </svg>
                </div>
              </div>
              <div className="brand-name">
                Nexora <span>Chat</span>
              </div>
              <div className="brand-tag">Secure · Real-time · Private</div>
              <div className="feature-chips">
                <span className="chip">🔒 E2EE</span>
                <span className="chip">📹 Video</span>
                <span className="chip">⚡ Live</span>
              </div>
            </div>
            <div className="login-form">
              <div>
                <div className="card-label">Welcome</div>
                <div className="card-title">Get started</div>
                <div className="card-sub">Enter your phone numbers to connect</div>
              </div>
              <div className="inp-wrap">
                <span className="inp-ico">🇮🇳</span>
                <span className="inp-pre">+91</span>
                <input
                  type="tel"
                  placeholder="Your mobile number"
                  maxLength={10}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={myNumInput}
                  onChange={handleNumInput(setMyNumInput)}
                  onKeyDown={handleNumKeyDown}
                />
              </div>
              <div className="inp-wrap">
                <span className="inp-ico">📱</span>
                <span className="inp-pre" style={{ left: 44, fontSize: 12 }}>
                  To:
                </span>
                <input
                  type="tel"
                  placeholder="Friend's number"
                  maxLength={10}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  style={{ paddingLeft: 66 }}
                  value={toNumInput}
                  onChange={handleNumInput(setToNumInput)}
                  onKeyDown={handleNumKeyDown}
                />
              </div>
              <button className="login-btn" onClick={startChat}>
                Continue →
              </button>
              {loginError && <span id="loginError" style={{ display: 'block' }}>Please enter valid 10-digit numbers</span>}
              <div className="trust-row">
                <div className="trust-dot" />
                <span>End-to-end encrypted by default</span>
              </div>
              <div className="login-footer-links">
                <a href="#/about">About</a>
                <a href="#/privacy">Privacy</a>
                <a href="#/terms">Terms</a>
                <a href="#/refund">Refund</a>
                <a href="#/contact">Contact</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {screen === 'chat' && (
        <div className="screen" id="chatScreen">
          <div className="chat-header">
            <div className="peer-info">
              <div className="avatar-wrap">
                <div className="avatar">{initials(peerNumDisplay || '?')}</div>
                <div className={'status-dot' + (peerOnline ? ' online' : '')} />
              </div>
              <div className="peer-details">
                <div className="name">{peerNumDisplay ? formatNum(peerNumDisplay) : '—'}</div>
                <div className={'status-txt' + (peerOnline ? ' online' : '')}>{peerStatusText}</div>
              </div>
              <span className={'e2ee-badge' + (e2eeActive ? ' active' : '')}>🔒 E2EE</span>
            </div>
            <div className="header-actions">
              <button className="hdr-btn" title="Video call" onClick={startVideoCall}>
                📹
              </button>
              <button className="hdr-btn" title="Audio call" onClick={startAudioCall}>
                📞
              </button>
            </div>
          </div>

          <div id="chatBox" ref={chatBoxRef}>
            <div className="date-sep">Today</div>
            {messages.map((m) => (
              <div key={m.id} className={'msg ' + m.type}>
                {m.type !== 'system' ? (
                  <>
                    <span>{m.text}</span>
                    <span className="ts">{m.ts}</span>
                  </>
                ) : (
                  m.text
                )}
              </div>
            ))}
          </div>

          <div className={'typing-indicator' + (typingShow ? ' show' : '')}>
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
          </div>

          <div className="chat-input-area">
            <div className="input-box">
              <textarea
                ref={msgInputRef}
                placeholder="Message…"
                rows={1}
                value={msgText}
                onChange={onMsgInputChange}
                onKeyDown={onMsgInputKeyDown}
              />
            </div>
            <button id="sendBtn" onClick={sendMsg}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* INCOMING CALL */}
      <div id="callModal" style={{ display: callModalOpen ? 'flex' : 'none' }}>
        <div className="call-sheet">
          <div className="ring-avatar">{initials(peerNumDisplay || '?')}</div>
          <h3>{peerNumDisplay ? formatNum(peerNumDisplay) : 'Someone'}</h3>
          <div className="call-num">{peerNumDisplay ? formatNum(peerNumDisplay) : '+91 XXXXXXXXXX'}</div>
          <div className="call-lbl">Incoming video call…</div>
          <div className="modal-btns">
            <div style={{ textAlign: 'center' }}>
              <button id="declineBtn" onClick={declineCall}>📵</button>
              <div className="modal-btn-lbl">Decline</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button id="acceptBtn" onClick={acceptCall}>📹</button>
              <div className="modal-btn-lbl">Accept</div>
            </div>
          </div>
        </div>
      </div>

      {/* CALL SCREEN */}
      <div id="callScreen" style={{ display: callScreenOpen ? 'flex' : 'none' }}>
        <video ref={remoteVideoRef} id="remoteVideo" autoPlay playsInline />
        <div className="call-overlay" />
        <video ref={localVideoRef} id="localVideo" autoPlay muted playsInline />
        <div id="callStatus">
          <div className="call-peer-name">{peerNumDisplay ? formatNum(peerNumDisplay) : '—'}</div>
          <div className="call-state">{callState}</div>
        </div>
        <div className="call-controls">
          <button className={'ctrl-btn' + (isMuted ? ' muted' : '')} id="muteBtn" onClick={toggleMute}>
            {isMuted ? '🔇' : '🎤'}
          </button>
          <button className="ctrl-btn" id="endBtn" onClick={endCall}>📵</button>
          <button className={'ctrl-btn' + (isCamOff ? ' off' : '')} id="camBtn" onClick={toggleCam}>
            {isCamOff ? '🚫' : '📷'}
          </button>
        </div>
      </div>

      <div id="toast" className={toast.show ? 'show' : ''}>{toast.msg}</div>
    </div>
  )
}
