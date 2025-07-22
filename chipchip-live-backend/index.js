// chipchip-live-backend/index.js
require('dotenv').config();
const express = require('express');
const http    = require('http');
const { Server } = require('socket.io');
const { WebcastPushConnection } = require('tiktok-live-connector');
const cors = require('cors');

let tiktokUsername = process.env.TIKTOK_USERNAME || '';
let tiktok = null;
let tiktokConnected = false;

// 1) Setup Express + HTTP + Socket.IO
const app    = express();
const server = http.createServer(app);
const io     = new Server(server, {
  cors: { origin: '*' }
});

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Health check
app.get('/', (req, res) => res.send('Backend is up'));

// API to get current TikTok username
app.get('/api/tiktok-username', (req, res) => {
  res.json({ username: tiktokUsername });
});

// API to set TikTok username and reconnect
app.post('/api/tiktok-username', async (req, res) => {
  const { username } = req.body;
  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Invalid username' });
  }
  tiktokUsername = username;
  await connectTikTok();
  res.json({ success: true, username });
});

async function connectTikTok() {
  if (tiktok) {
    try { await tiktok.disconnect(); } catch {}
    tiktok.removeAllListeners();
  }
  tiktok = new WebcastPushConnection(tiktokUsername);
  tiktokConnected = false;

  tiktok.on('chat', (data) => {
    // Defensive: ignore if data or comment is missing
    if (!data || typeof data.comment !== 'string') return;
    const comment = data.comment.trim().toUpperCase();
    const user    = data.uniqueId;
    console.log(`💬 @${user}: "${comment}"`);

    // Defensive: check for giftDetails if you ever use it
    // if (data.giftDetails && data.giftDetails.giftImage) { ... }

    if (comment === 'BUY' || /^[A-Z0-9]+$/.test(comment)) {
      const order = {
        tiktokUser:  user,
        productCode: comment,
        timestamp:   Date.now()
      };
      io.emit('new-order', order);
      console.log('📡 Emitted new-order:', order);
    }
  });

  try {
    await tiktok.connect();
    tiktokConnected = true;
    console.log(`✅ Connected to TikTok Live as @${tiktokUsername}`);
  } catch (err) {
    tiktokConnected = false;
    console.error('TikTok connection failed:', err);
  }
}

// Initial connect
connectTikTok();

// 4) Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Backend listening on http://localhost:${PORT}`);
});
