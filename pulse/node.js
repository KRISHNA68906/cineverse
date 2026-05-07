// script.js - Pulse Mental Wellness App
// Interactive Features: Mood tracking, guided meditation, AI companion (empathetic responses),
// emotional journaling, video modal with storytelling, and soft UI dynamics.

document.addEventListener('DOMContentLoaded', () => {
  // ---------- MOOD TRACKING DEMO ----------
  const moodSpans = document.querySelectorAll('.mood-selector span');
  const moodFeedback = document.getElementById('moodFeedback');
  if (moodSpans.length && moodFeedback) {
    moodSpans.forEach(span => {
      span.addEventListener('click', (e) => {
        const selectedMood = span.getAttribute('data-mood') || span.innerText.trim();
        let message = '';
        switch(selectedMood) {
          case 'bliss': case '😊 Bliss': message = '✨ Bliss — you’re glowing today. Let’s cherish that.'; break;
          case 'calm': case '😌 Calm': message = '🌿 Calm presence — peaceful center.'; break;
          case 'anxious': case '🌀 Anxious': message = '🌀 It’s okay to feel this way. Breathe with me.'; break;
          case 'sad': case '💧 Sad': message = '💙 Sadness visited. Let’s give it space and kindness.'; break;
          case 'energetic': case '⚡ Energetic': message = '⚡ Spark alive! Channel that energy gently.'; break;
          default: message = 'Thanks for sharing your mood. Pulse honors your feeling.';
        }
        moodFeedback.textContent = message;
        // small animation
        moodFeedback.style.opacity = '0';
        setTimeout(() => { moodFeedback.style.opacity = '1'; }, 50);
      });
    });
  }

  // ---------- GUIDED MEDITATION: Breathing Circle ----------
  const breathCircle = document.querySelector('.circle-breath');
  const breathText = document.querySelector('.breath-text');
  const breathBtn = document.getElementById('startBreathBtn');
  let breathInterval = null;
  let isBreathingActive = false;

  function stopBreathing() {
    if (breathInterval) {
      clearInterval(breathInterval);
      breathInterval = null;
    }
    isBreathingActive = false;
    if (breathCircle) breathCircle.style.transform = 'scale(1)';
    if (breathText) breathText.textContent = 'Breathe in';
    if (breathBtn) breathBtn.innerHTML = 'Start 2-min calm <i class="fas fa-play"></i>';
  }

  function startBreathing() {
    if (isBreathingActive) {
      stopBreathing();
      return;
    }
    isBreathingActive = true;
    let step = 0; // 0: inhale, 1: hold, 2: exhale, 3: hold
    let timer = 0;
    if (breathBtn) breathBtn.innerHTML = 'Stop <i class="fas fa-stop"></i>';
    
    breathInterval = setInterval(() => {
      if (!isBreathingActive) {
        clearInterval(breathInterval);
        breathInterval = null;
        return;
      }
      // cycle 4 seconds inhale, 4 hold, 6 exhale, 4 hold (creating calm)
      if (step === 0) {
        breathCircle.style.transition = 'transform 4s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
        breathCircle.style.transform = 'scale(1.5)';
        breathText.textContent = 'Inhale peace...';
        step = 1;
        timer = 4;
      } else if (step === 1) {
        breathText.textContent = 'Hold gently';
        step = 2;
        timer = 4;
      } else if (step === 2) {
        breathCircle.style.transition = 'transform 6s cubic-bezier(0.4, 0.1, 0.3, 1)';
        breathCircle.style.transform = 'scale(1)';
        breathText.textContent = 'Exhale slowly...';
        step = 3;
        timer = 6;
      } else if (step === 3) {
        breathText.textContent = 'Pause with love';
        step = 0;
        timer = 4;
      }
    }, 1000);
    // auto stop after 2 minutes (120 seconds)
    setTimeout(() => {
      if (isBreathingActive) {
        stopBreathing();
      }
    }, 120000);
  }
  
  if (breathBtn) {
    breathBtn.addEventListener('click', startBreathing);
  }

  // ---------- EMOTIONAL JOURNALING ----------
  const journalTextarea = document.getElementById('journalEntry');
  const saveJournalBtn = document.getElementById('saveJournalBtn');
  const journalFeedbackDiv = document.getElementById('journalFeedback');
  
  if (saveJournalBtn && journalTextarea) {
    saveJournalBtn.addEventListener('click', () => {
      const entry = journalTextarea.value.trim();
      if (entry === '') {
        journalFeedbackDiv.innerHTML = '🌸 Write something, even one word. Your feelings matter.';
        journalFeedbackDiv.style.color = '#C77A52';
      } else {
        journalFeedbackDiv.innerHTML = '✨ Reflection saved. Pulse holds space for you. ✨';
        journalFeedbackDiv.style.color = '#8F6A4F';
        journalTextarea.value = '';
        setTimeout(() => {
          journalFeedbackDiv.innerHTML = '';
        }, 2800);
      }
    });
  }

  // ---------- AI COMPANION (AURA) –  empathetic & contextual ----------
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendChatBtn');
  const chatMessagesDiv = document.getElementById('chatMessages');
  
  function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender === 'user' ? 'user' : 'ai');
    msgDiv.innerHTML = sender === 'user' ? `<i class="fas fa-user-circle"></i> ${text}` : `<i class="fas fa-robot"></i> ${text}`;
    chatMessagesDiv.appendChild(msgDiv);
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
  }
  
  function getAIResponse(userMessage) {
    const lowerMsg = userMessage.toLowerCase();
    if (lowerMsg.includes('anxious') || lowerMsg.includes('anxiety') || lowerMsg.includes('nervous')) {
      return "I hear you. Let’s breathe together: inhale for 4, hold, exhale for 6. You are safe right now. 💙";
    } else if (lowerMsg.includes('sad') || lowerMsg.includes('unhappy') || lowerMsg.includes('cry')) {
      return "It’s okay to feel sadness. You're not alone. Would you like to journal or try a gentle self-compassion exercise? 🌧️💗";
    } else if (lowerMsg.includes('happy') || lowerMsg.includes('joy') || lowerMsg.includes('grateful')) {
      return "Joy is such a beautiful energy. I'm glad you're feeling this — let's savor the moment together. ✨";
    } else if (lowerMsg.includes('tired') || lowerMsg.includes('exhausted')) {
      return "Rest is sacred. Take a few deep breaths. You've done enough for now. I’m here supporting you. 🌙";
    } else if (lowerMsg.includes('thank')) {
      return "You're most welcome. You deserve this kindness. Always remember that. 🤍";
    } else if (lowerMsg.includes('stress') || lowerMsg.includes('overwhelm')) {
      return "Overwhelm is heavy. Let's break it down: name one small thing you see around you. You've got this. 🌱";
    } else if (lowerMsg === '' || lowerMsg === 'hi' || lowerMsg === 'hello') {
      return "Hello, lovely. How can I support your heart today? 💬";
    } else {
      return "Thank you for sharing that with me. Remember, every emotion is a visitor — welcome it with curiosity. Would you like a gentle meditation suggestion? 🧘";
    }
  }
  
  function handleChat() {
    const userMsg = chatInput.value.trim();
    if (userMsg === '') return;
    addMessage(userMsg, 'user');
    chatInput.value = '';
    // simulate thinking slight delay
    setTimeout(() => {
      const reply = getAIResponse(userMsg);
      addMessage(reply, 'ai');
    }, 400);
  }
  
  if (sendBtn && chatInput) {
    sendBtn.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleChat();
      }
    });
  }
  
  // ---------- VIDEO MODAL (emotional storytelling reels) ----------
  const videoModal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideoPlayer');
  const modalTitle = document.getElementById('modalVideoTitle');
  const modalDesc = document.getElementById('modalVideoDesc');
  const closeModalSpan = document.querySelector('.close-modal');
  
  // video data mapping (since we use placeholder flower video but we customize description emotionally)
  const videoData = {
    'Emotional Promo Reel': {
      src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      desc: '🌼 A soft narrative of healing: from solitude to sunrise. Pulse brings emotional storytelling into every breath.'
    },
    'UI Walkthrough Video': {
      src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/earth.mp4',
      desc: '🌀 Navigate the serene Pulse universe — mood orbits, journal reflections, and the comforting AI companion Aura.'
    },
    'App Launch Teaser': {
      src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/space.mp4',
      desc: '🌌 Coming soon: The sanctuary you carry in your pocket. Pulse prelude — softness awaits.'
    }
  };
  
  const videoCards = document.querySelectorAll('.video-card');
  if (videoCards.length && videoModal) {
    videoCards.forEach(card => {
      card.addEventListener('click', () => {
        const title = card.querySelector('h4')?.innerText || 'Emotional Promo Reel';
        let videoKey = title;
        // match exact keys:  'Emotional Promo Reel' , 'UI Walkthrough Video' , 'App Launch Teaser'
        if (title.includes('Promo')) videoKey = 'Emotional Promo Reel';
        else if (title.includes('Walkthrough')) videoKey = 'UI Walkthrough Video';
        else if (title.includes('Teaser')) videoKey = 'App Launch Teaser';
        
        const videoInfo = videoData[videoKey] || videoData['Emotional Promo Reel'];
        if (modalVideo) {
          modalVideo.querySelector('source')?.setAttribute('src', videoInfo.src);
          modalVideo.load();
          modalVideo.play().catch(e => console.log('autoplay prevented', e));
        }
        if (modalTitle) modalTitle.innerText = videoKey;
        if (modalDesc) modalDesc.innerText = videoInfo.desc;
        videoModal.style.display = 'flex';
      });
    });
  }
  
  function closeModal() {
    if (videoModal) {
      videoModal.style.display = 'none';
      if (modalVideo) modalVideo.pause();
    }
  }
  
  if (closeModalSpan) closeModalSpan.addEventListener('click', closeModal);
  window.addEventListener('click', (e) => {
    if (e.target === videoModal) closeModal();
  });
  
  // ---------- promo reel button on hero (watch promo) ----------
  const watchPromoBtn = document.getElementById('watchPromoBtn');
  if (watchPromoBtn && videoModal) {
    watchPromoBtn.addEventListener('click', () => {
      const promoInfo = videoData['Emotional Promo Reel'];
      if (modalVideo) {
        modalVideo.querySelector('source')?.setAttribute('src', promoInfo.src);
        modalVideo.load();
        modalVideo.play().catch(e => console.log(e));
      }
      if (modalTitle) modalTitle.innerText = 'Emotional Promo Reel';
      if (modalDesc) modalDesc.innerText = promoInfo.desc;
      videoModal.style.display = 'flex';
    });
  }
  
  // ---------- Soft UI extras: any floating card subtle parallax or breathing suggestions? ----------
  // small interactive for mood card demo hero
  const miniMoodSpans = document.querySelectorAll('.mini-moods span');
  if (miniMoodSpans.length) {
    miniMoodSpans.forEach((span, idx) => {
      span.addEventListener('click', () => {
        const moodsText = ['cheerful', 'serene', 'tender', 'energetic'];
        const heroMsg = document.querySelector('.hero-text p');
        if (heroMsg) {
          const originalText = heroMsg.innerHTML;
          heroMsg.innerHTML = `✨ You selected ${span.innerText} — Pulse welcomes every layer of you. ✨`;
          setTimeout(() => { heroMsg.innerHTML = originalText; }, 1800);
        }
      });
    });
  }
  
  // gentle ripple effect on buttons
  const allBtns = document.querySelectorAll('.btn-primary, .btn-secondary, .breath-btn, .small-btn');
  allBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.backgroundColor = 'rgba(255,255,245,0.5)';
      ripple.style.width = '40px';
      ripple.style.height = '40px';
      ripple.style.transform = 'translate(-50%, -50%) scale(0)';
      ripple.style.animation = 'rippleAnim 0.5s ease-out';
      ripple.style.pointerEvents = 'none';
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });
  // add keyframes for ripple if not exist
  if (!document.querySelector('#dynamicRippleStyle')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'dynamicRippleStyle';
    styleSheet.textContent = `@keyframes rippleAnim { 0% { transform: translate(-50%, -50%) scale(0); opacity: 0.6; } 100% { transform: translate(-50%, -50%) scale(4); opacity: 0; } }`;
    document.head.appendChild(styleSheet);
  }
  
  // simple breathing cycle hint for AI companion messages maybe welcome 
  // initial ai greeting after 2 seconds to feel alive
  setTimeout(() => {
    const existingMsgs = document.querySelectorAll('#chatMessages .message');
    if (chatMessagesDiv && existingMsgs.length === 1) {
      // add a follow up after load to show emotional storytelling
      const welcomeMsg = document.createElement('div');
      welcomeMsg.classList.add('message', 'ai');
      welcomeMsg.innerHTML = '<i class="fas fa-robot"></i> 🌱 I’m Aura, your Pulse companion. Share any emotion — this is a judgment-free space.';
      chatMessagesDiv.appendChild(welcomeMsg);
      chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
    }
  }, 800);
  
  // small fix: ensure journal feedback does not persist incorrectly
  console.log('Pulse mental wellness app — emotional storytelling active');
});