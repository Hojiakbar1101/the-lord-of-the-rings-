// ===============================
// 🔐 Ro‘yxatdan o‘tish
// ===============================
document.getElementById('registerForm')?.addEventListener('submit', e => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  // 🔒 Bo‘sh maydonlar tekshiruvi
  if (!username || !email || !password) {
    alert("Iltimos, barcha maydonlarni to‘ldiring.");
    return;
  }

  // 🔐 Parol uzunligi tekshiruvi
  if (password.length < 4) {
    alert("Parol kamida 4 belgidan iborat bo‘lishi kerak.");
    return;
  }

  const newUser = {
    username,
    email,
    password,
    isAdmin: false,
    avatar: '',
    bio: '',
    interests: []
  };

  // 👑 Maxsus admin foydalanuvchi
  if (
    email === 'saidrasulovhojiakbar7@gmail.com' &&
    username === 'khojiakbar_1101' &&
    password === '1101samon'
  ) {
    newUser.isAdmin = true;
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]');

  // 📛 Takroriy email tekshiruvi
  const exists = users.find(u => u.email === email);
  if (exists) {
    alert("Bu email bilan foydalanuvchi allaqachon mavjud.");
    return;
  }

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('user', JSON.stringify(newUser));
  localStorage.setItem('loggedIn', 'true');

  alert("Ro‘yxatdan o‘tildi!");
  window.location.href = 'index.html';
});

// ===============================
// 🔑 Kirish (Login)
// ===============================
document.getElementById('loginForm')?.addEventListener('submit', e => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  // 🔒 Bo‘sh maydonlar tekshiruvi
  if (!email || !password) {
    alert("Iltimos, barcha maydonlarni to‘ldiring.");
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('loggedIn', 'true');
    alert("Xush kelibsiz, " + user.username + "!");
    window.location.href = 'index.html';
  } else {
    alert("Email yoki parol noto‘g‘ri.");
  }
});

// ===============================
// 🚪 Logout funksiyasi
// ===============================
function logout() {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}
