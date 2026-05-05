const profile = {
  badge: "digital identity",
  eyebrow: "creative profile",
  name: "SCOFF",
  bio: "Designer de presença digital, edits, música, projetos visuais e uma bio page feita para chamar atenção de verdade.",
  avatarText: "S",
  avatarImage: "",
  coverImage: "",
  tags: ["3D vibes", "animated bg", "music player"],
  statusTitle: "Disponível para collabs",
  statusText: "Edição, identidade visual, conteúdo musical, visualizers e páginas pessoais com presença forte.",
  highlightTitle: "Experiência imersiva",
  highlightText: "Fundo vivo, brilho responsivo ao mouse, cards com profundidade e transições suaves em desktop e mobile.",
  socials: {
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
    youtube: "https://youtube.com",
    discord: "https://discord.com",
  },
};

const tracks = [
  {
    title: "Neon Skyline",
    artist: "SCOFF x Night Pulse",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: "6:13",
    glyph: "01",
    palette: "linear-gradient(135deg, #15274b 0%, #2d6f95 45%, #ff8bc7 100%)",
  },
  {
    title: "Orbit Dreams",
    artist: "Static Lights",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: "5:34",
    glyph: "02",
    palette: "linear-gradient(135deg, #24143f 0%, #305ccf 45%, #7be7ff 100%)",
  },
  {
    title: "Afterglow Rush",
    artist: "Velvet Signal",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: "5:03",
    glyph: "03",
    palette: "linear-gradient(135deg, #2f102d 0%, #ab407c 48%, #ffd28a 100%)",
  },
];

const audio = document.getElementById("audio");
const playButton = document.getElementById("playButton");
const playIcon = document.getElementById("playIcon");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const trackTitle = document.getElementById("trackTitle");
const trackArtist = document.getElementById("trackArtist");
const albumArt = document.getElementById("albumArt");
const albumGlyph = document.getElementById("albumGlyph");
const playlist = document.getElementById("playlist");
const heroBadge = document.getElementById("heroBadge");
const heroEyebrow = document.getElementById("heroEyebrow");
const heroName = document.getElementById("heroName");
const heroBio = document.getElementById("heroBio");
const heroTags = document.getElementById("heroTags");
const heroAvatar = document.getElementById("heroAvatar");
const avatarLetter = document.getElementById("avatarLetter");
const statusTitle = document.getElementById("statusTitle");
const statusText = document.getElementById("statusText");
const highlightTitle = document.getElementById("highlightTitle");
const highlightText = document.getElementById("highlightText");

function applyProfileContent() {
  heroBadge.textContent = profile.badge;
  heroEyebrow.textContent = profile.eyebrow;
  heroName.textContent = profile.name;
  heroBio.textContent = profile.bio;
  avatarLetter.textContent = profile.avatarText;
  statusTitle.textContent = profile.statusTitle;
  statusText.textContent = profile.statusText;
  highlightTitle.textContent = profile.highlightTitle;
  highlightText.textContent = profile.highlightText;

  heroTags.innerHTML = "";
  profile.tags.forEach((tag) => {
    const chip = document.createElement("span");
    chip.textContent = tag;
    heroTags.appendChild(chip);
  });

  Object.entries(profile.socials).forEach(([key, value]) => {
    const link = document.querySelector(`[data-social="${key}"]`);

    if (link) {
      link.href = value;
    }
  });

  if (profile.avatarImage) {
    heroAvatar.style.backgroundImage = `url("${profile.avatarImage}")`;
    heroAvatar.style.backgroundPosition = "center";
    heroAvatar.style.backgroundSize = "cover";
    avatarLetter.textContent = "";
  }

  if (profile.coverImage) {
    document.querySelector(".hero-cover").style.backgroundImage = `
      linear-gradient(180deg, rgba(4, 7, 19, 0.2), rgba(4, 7, 19, 0.82)),
      url("${profile.coverImage}")
    `;
    document.querySelector(".hero-cover").style.backgroundPosition = "center";
    document.querySelector(".hero-cover").style.backgroundSize = "cover";
  }
}

let currentTrack = 0;
let isPlaying = false;

function formatTime(value) {
  if (!Number.isFinite(value)) {
    return "0:00";
  }

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
}

function setPlayIcon(playing) {
  playIcon.innerHTML = playing
    ? '<path d="M8 5h3v14H8zm5 0h3v14h-3z"></path>'
    : '<path d="M8 5.5v13l10-6.5-10-6.5Z"></path>';
}

function renderPlaylist() {
  playlist.innerHTML = "";

  tracks.forEach((track, index) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = `track${index === currentTrack ? " active" : ""}`;
    item.innerHTML = `
      <span class="track-index">${track.glyph}</span>
      <span>
        <strong>${track.title}</strong>
        <small>${track.artist}</small>
      </span>
      <span class="track-time">${track.duration}</span>
    `;

    item.addEventListener("click", () => {
      currentTrack = index;
      loadTrack(currentTrack);
      playAudio();
    });

    playlist.appendChild(item);
  });
}

function loadTrack(index) {
  const track = tracks[index];

  audio.src = track.src;
  trackTitle.textContent = track.title;
  trackArtist.textContent = track.artist;
  duration.textContent = track.duration;
  albumGlyph.textContent = track.glyph;
  albumArt.style.background = `
    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.82), transparent 14%),
    ${track.palette}
  `;

  progress.value = 0;
  progress.style.backgroundSize = "0% 100%";
  currentTime.textContent = "0:00";
  renderPlaylist();
}

async function playAudio() {
  try {
    await audio.play();
    isPlaying = true;
    setPlayIcon(true);
  } catch (error) {
    console.error("Nao foi possivel tocar a faixa:", error);
  }
}

function pauseAudio() {
  audio.pause();
  isPlaying = false;
  setPlayIcon(false);
}

playButton.addEventListener("click", () => {
  if (isPlaying) {
    pauseAudio();
    return;
  }

  playAudio();
});

prevButton.addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
  playAudio();
});

nextButton.addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
  playAudio();
});

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) {
    return;
  }

  const percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent;
  progress.style.backgroundSize = `${percent}% 100%`;
  currentTime.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("ended", () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
  playAudio();
});

progress.addEventListener("input", () => {
  progress.style.backgroundSize = `${progress.value}% 100%`;

  if (!audio.duration) {
    return;
  }

  audio.currentTime = (progress.value / 100) * audio.duration;
});

function setupTilt() {
  const tiltCards = document.querySelectorAll("[data-tilt]");

  tiltCards.forEach((card) => {
    const reset = () => {
      card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    };

    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 10;
      const rotateX = (0.5 - py) * 10;

      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
    });

    card.addEventListener("mouseleave", reset);
    card.addEventListener("blur", reset, true);
  });
}

function setupStars() {
  const canvas = document.getElementById("starfield");
  const context = canvas.getContext("2d");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let stars = [];

  const resize = () => {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

    stars = Array.from({ length: Math.max(60, Math.floor(window.innerWidth / 18)) }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.7,
      speed: 0.06 + Math.random() * 0.28,
      alpha: 0.18 + Math.random() * 0.7,
    }));
  };

  const draw = () => {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    stars.forEach((star) => {
      context.beginPath();
      context.fillStyle = `rgba(255,255,255,${star.alpha})`;
      context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      context.fill();

      if (!prefersReducedMotion) {
        star.y += star.speed;

        if (star.y > window.innerHeight + 2) {
          star.y = -2;
          star.x = Math.random() * window.innerWidth;
        }
      }
    });

    if (!prefersReducedMotion) {
      window.requestAnimationFrame(draw);
    }
  };

  resize();
  draw();
  window.addEventListener("resize", resize);
}

applyProfileContent();
loadTrack(currentTrack);
setupTilt();
setupStars();
