const currentUser = JSON.parse(localStorage.getItem('user'));
if (!currentUser?.isAdmin) {
  alert("Access denied.");
  window.location.href = 'index.html';
}

// 👥 Foydalanuvchilar ro‘yxati
const users = JSON.parse(localStorage.getItem('users') || '[]');
const userList = document.getElementById('userList');
if (userList) {
  userList.innerHTML = '<h3>Users</h3>';
  users.forEach((u, i) => {
    const div = document.createElement('div');
    div.className = 'user-card';
    div.innerHTML = `
      <p><strong>${u.username}</strong> (${u.email}) - ${u.isAdmin ? '🛡️ Admin' : 'User'}</p>
      <button onclick="toggleAdmin(${i})">${u.isAdmin ? 'Revoke Admin' : 'Make Admin'}</button>
      <button onclick="deleteUser(${i})">🗑️ Delete</button>
    `;
    userList.appendChild(div);
  });
}

// 🔁 Admin holatini o‘zgartirish
function toggleAdmin(index) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  users[index].isAdmin = !users[index].isAdmin;
  localStorage.setItem('users', JSON.stringify(users));
  location.reload();
}

// ❌ Foydalanuvchini o‘chirish
function deleteUser(index) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const removed = users.splice(index, 1);
  localStorage.setItem('users', JSON.stringify(users));

  if (removed[0].email === currentUser.email) {
    localStorage.removeItem('user');
    localStorage.removeItem('loggedIn');
    alert("Siz o‘zingizni o‘chirdingiz.");
    window.location.href = 'index.html';
  } else {
    location.reload();
  }
}

// 💬 Sharhlar ro‘yxati
const comments = JSON.parse(localStorage.getItem('comments') || '[]');
const commentList = document.getElementById('commentList');
if (commentList) {
  commentList.innerHTML = '<h3>Comments</h3>';
  comments.forEach((c, i) => {
    const div = document.createElement('div');
    div.className = 'comment';
    div.innerHTML = `
      <strong>${c.username}</strong> <em>${c.time}</em>
      <p>${c.text}</p>
      <button onclick="deleteComment(${i})">🗑️ Delete</button>
    `;
    commentList.appendChild(div);
  });
}

function deleteComment(index) {
  const comments = JSON.parse(localStorage.getItem('comments') || '[]');
  comments.splice(index, 1);
  localStorage.setItem('comments', JSON.stringify(comments));
  location.reload();
}
