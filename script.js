// ===============================
// 🔊 Lord ovozini yuklash
// ===============================
const lordSound = new Audio('assets/audio/lord.mp3');

// ===============================
// 🪟 Modal elementlar
// ===============================
const modal = document.getElementById('modal-container');
const modalMessage = document.getElementById('modal-message');
const closeModalBtn = document.getElementById('close-modal');

// ===============================
// 📍 Xarita joylari haqida ma'lumotlar
// ===============================
const locations = {
  Rivendell: {
    title: "Rivendell",
    description: "The hidden valley of the Elves, ruled by Elrond. A place of wisdom and healing."
  },
  Mordor: {
    title: "Mordor",
    description: "The dark land of Sauron, home to Mount Doom and the forging of the One Ring."
  },
  Gondor: {
    title: "Gondor",
    description: "The kingdom of men, stronghold of Minas Tirith, and last defense against the Shadow."
  }
};

// ===============================
// 🎯 DOM yuklanganda hodisalarni biriktirish
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupInteractiveElements();
  setupMapInteractions();
  loadHeroes();
  loadComments();
});

// ===============================
// 🔘 Interaktiv tugmalar va havolalar
// ===============================
function setupInteractiveElements() {
  const interactiveElements = document.querySelectorAll('.btn, button, a');
  interactiveElements.forEach(el => {
    el.addEventListener('click', (e) => {
      playLordSound();
      const label = el.getAttribute('data-message');
      if (label) showModal(label);
    });
  });
}

// ===============================
// 🗺️ Xarita joylari bilan ishlash
// ===============================
function setupMapInteractions() {
  document.querySelectorAll('area[data-location]').forEach(area => {
    area.addEventListener('click', (e) => {
      e.preventDefault();
      const loc = area.dataset.location;
      const info = locations[loc];
      if (info) {
        playLordSound();
        showModal(`<strong>${info.title}</strong><br>${info.description}`);
      }
    });
  });
}

// ===============================
// 🔊 Ovoz ijro funksiyasi
// ===============================
function playLordSound() {
  lordSound.currentTime = 0;
  lordSound.play().catch(err => {
    console.warn("Ovoz ijro etilmadi:", err);
  });
}

// ===============================
// 🪟 Modal oynani ko‘rsatish funksiyasi
// ===============================
function showModal(message) {
  modalMessage.innerHTML = message;
  modal.style.display = 'flex';
}

closeModalBtn?.addEventListener('click', () => {
  modal.style.display = 'none';
});

modal?.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// ===============================
// 🖼️ Fon rasmlari almashtirish
// ===============================
const backgrounds = [
  'assets/images/bg1.jpg',
  'assets/images/bg2.jpg',
  'assets/images/bg3.jpg',
  'assets/images/bg4.jpg',
  'assets/images/bg5.jpg',
  'assets/images/bg6.jpg',
  'assets/images/bg7.jpg',
  'assets/images/bg8.jpg',
  'assets/images/bg9.jpg',
  'assets/images/bg10.jpg'
];

let currentBg = 0;
setInterval(() => {
  currentBg = (currentBg + 1) % backgrounds.length;
  document.body.style.backgroundImage = `url('${backgrounds[currentBg]}')`;
}, 8000);

// ===============================
// 📦 Qahramonlar JSON'dan yuklash
// ===============================
function loadHeroes() {
  fetch('data/heroes.json')
    .then(response => response.json())
    .then(data => {
      const grid = document.getElementById('heroGrid');
      if (!grid) return;
      data.forEach(hero => {
        const card = document.createElement('div');
        card.className = 'hero-card';
        card.innerHTML = `
          <img src="${hero.image}" alt="${hero.name}" />
          <h3>${hero.name}</h3>
          <h4>${hero.title}</h4>
          <p>${hero.description}</p>
        `;
        card.addEventListener('click', () => openHeroModal(hero));
        grid.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Qahramonlar yuklanmadi:", error);
    });
}

// ===============================
// 🧝‍♂️ Qahramon modal oynasi
// ===============================
function openHeroModal(hero) {
  const modal = document.getElementById('hero-modal');
  document.getElementById('modal-hero-image').src = hero.image;
  document.getElementById('modal-hero-name').textContent = hero.name;
  document.getElementById('modal-hero-title').textContent = hero.title;
  document.getElementById('modal-hero-bio').textContent = hero.bio;
  modal.style.display = 'flex';
}

document.getElementById('close-hero-modal')?.addEventListener('click', () => {
  document.getElementById('hero-modal').style.display = 'none';
});

document.getElementById('hero-modal')?.addEventListener('click', (e) => {
  if (e.target.id === 'hero-modal') {
    document.getElementById('hero-modal').style.display = 'none';
  }
});

// ===============================
// 🔐 Logout funksiyasi
// ===============================
function logout() {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

// ===============================
// 🔗 Nav menyuni dinamik boshqarish
// ===============================
function setupNavigation() {
  const nav = document.querySelector('.nav-links');
  if (!nav) return;

  const isLoggedIn = localStorage.getItem('loggedIn');
  const user = JSON.parse(localStorage.getItem('user'));

  nav.innerHTML = `
    <li><a href="films.html" target="_blank">Films</a></li>
    <li><a href="#intro">Intro</a></li>
    <li><a href="#heroes">Heroes</a></li>
    <li><a href="#map">Map</a></li>
    <li><a href="#lore">Lore</a></li>
    <li><a href="#contact">Join</a></li>
  `;

  if (isLoggedIn && user) {
    if (user.isAdmin) {
      nav.innerHTML += `<li><a href="admin.html">Admin</a></li>`;
    }
    nav.innerHTML += `
      <li><a href="profile.html">My Profile</a></li>
      <li><a href="#" onclick="logout()">Log out</a></li>`;
  } else {
    nav.innerHTML += `
      <li><a href="login.html">Login</a></li>
      <li><a href="register.html">Register</a></li>`;
  }
}

// ===============================
// 💬 Sharhlar tizimi
// ===============================
const commentForm = document.getElementById('commentForm');
const commentList = document.getElementById('commentList');

if (commentForm) {
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = document.getElementById('commentText').value.trim();
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert("Fikr qoldirish uchun avval login qiling.");
      return;
    }

    const comment = {
      username: user.username,
      text: text,
      time: new Date().toLocaleString()
    };

    const comments = JSON.parse(localStorage.getItem('comments') || '[]');
    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));
    document.getElementById('commentText').value = '';
    loadComments();
  });
}

function loadComments() {
  if (!commentList) return;
  const comments = JSON.parse(localStorage.getItem('comments') || '[]');
  commentList.innerHTML = '';
  comments.forEach(c => {
    const div = document.createElement('div');
    div.className = 'comment';
    div.innerHTML = `<strong>${c.username}</strong> <em>${c.time}</em><p>${c.text}</p>`;
    commentList.appendChild(div);
  });
}
