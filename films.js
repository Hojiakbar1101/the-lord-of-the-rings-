fetch('data/films.json')
  .then(res => res.json())
  .then(films => {
    const grid = document.getElementById('filmGrid');
    films.forEach(film => {
      const card = document.createElement('div');
      card.className = 'film-card';
      card.innerHTML = `
        <img src="${film.thumbnail}" alt="${film.title}">
        <div class="film-info">
          <h3>${film.title}</h3>
          <p>${film.year} • ${film.duration}</p>
          <a href="${film.link}" target="_blank">▶ Watch</a>
        </div>
      `;
      grid.appendChild(card);
    });
  })
  .catch(err => console.error("Filmlar yuklanmadi:", err));
