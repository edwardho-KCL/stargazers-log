const list = document.getElementById("starred-list");

async function loadStarredRepos() {
  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const repositories = await response.json();

    if (!repositories.length) {
      list.innerHTML = '<li class="empty-state">No starred repositories yet.</li>';
      return;
    }

    list.innerHTML = repositories
      .map(
        (repo) => `
          <li class="repo-item">
            <div class="repo-header">
              <a class="repo-name" href="${repo.html_url}" target="_blank" rel="noreferrer">
                ${repo.name}
              </a>
              ${repo.language ? `<span class="language-tag">${repo.language}</span>` : ""}
            </div>
            <p class="repo-description">${repo.description}</p>
            <div class="repo-meta">
              <span>⭐ ${repo.stargazers_count}</span>
              <span>Owner: ${repo.owner}</span>
            </div>
          </li>
        `
      )
      .join("");
  } catch (error) {
    list.innerHTML = '<li class="empty-state">Unable to load starred repositories.</li>';
    console.error(error);
  }
}

loadStarredRepos();
