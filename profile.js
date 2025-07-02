const user = JSON.parse(localStorage.getItem('user'));
if (!user) window.location.href = 'login.html';

document.getElementById('username').textContent = user.username;
document.getElementById('email').textContent = user.email;
document.getElementById('bio').value = user.bio || '';
document.getElementById('interests').value = user.interests?.join(', ') || '';
document.getElementById('avatar').src = user.avatar || 'assets/images/default-avatar.png';

document.getElementById('uploadAvatar').addEventListener('change', (e) => {
  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById('avatar').src = reader.result;
    user.avatar = reader.result;
  };
  reader.readAsDataURL(e.target.files[0]);
});

function saveProfile() {
  user.bio = document.getElementById('bio').value;
  user.interests = document.getElementById('interests').value.split(',').map(i => i.trim());
  localStorage.setItem('user', JSON.stringify(user));

  // Yangilash users massivida ham
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const index = users.findIndex(u => u.email === user.email);
  if (index !== -1) {
    users[index] = user;
    localStorage.setItem('users', JSON.stringify(users));
  }

  alert("Profile updated!");
}
