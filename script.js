window.addEventListener("load", () => {
  requestIdleCallback(async () => {
    const wait = (min, max) =>
      new Promise(r => setTimeout(r, Math.random() * (max - min) + min));

    await wait(100, 600);
    console.log("[server] nya mrrp meow mrrp");

    await wait(100, 600);
    console.log("[client] :3");

    await wait(100, 600);
    console.log("[server] tramsfem protocol initialized");
    console.debug("https://pinterest.com/pin/820992207093312445/");
  });
});

const inner = document.getElementById('content-inner');

async function loadPage(file, pushState = true) {
  inner.innerHTML = 'loading...';
  try {
    const res = await fetch('content/' + file);
    if (!res.ok) throw new Error();
    inner.innerHTML = marked.parse(await res.text());
    initSpoilers();
    document.getElementById('content-area').scrollTop = 0;

    inner.querySelectorAll('a[href]').forEach(a => {
      if (a.hostname && a.hostname !== location.hostname) {
        a.target = '_blank';
        a.rel = 'noopener';
      }
    });
  } catch {
    inner.innerHTML = 'could not load file :(';
  }

  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.file === file);
  });

  if (pushState) {
    const page = file.replace(/\.md$/, '');
    history.pushState(null, '', '#' + page);
  }
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    loadPage(link.dataset.file);
  });
});

function initSpoilers() {
  inner.querySelectorAll(".spoiler").forEach(el => {
    el.addEventListener("click", () => {
      el.classList.add("revealing");

      setTimeout(() => {
        el.classList.remove("spoiler");
        el.classList.remove("revealing");
      }, 250);
    }, { once: true });
  });
}

function loadFromHash() {
  const hash = location.hash.slice(1);
  if (hash) {
    loadPage(hash + '.md', false);
  } else {
    const first = document.querySelector('.nav-link[data-file]');
    if (first) loadPage(first.dataset.file);
  }
}

window.addEventListener('hashchange', () => loadFromHash());
loadFromHash();
