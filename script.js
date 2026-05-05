const profile = {
  badge: "digital identity",
  eyebrow: "creative profile",
  name: "SCOFF",
  bio: "Designer de presença digital, edits, música, projetos visuais e uma bio page feita para chamar atenção de verdade.",
  avatarText: "S",
  avatarImage: "",
  coverImage: "",
  backgroundVideoId: "ZMOjfn-wyOQ",
  tags: ["3D vibes", "cinematic loop", "video background"],
  statusTitle: "Disponível para collabs",
  statusText: "Edição, identidade visual, conteúdo musical, visualizers e páginas pessoais com presença forte.",
  highlightTitle: "Experiência imersiva",
  highlightText: "Vídeo em tela cheia no fundo, visual glassmorphism e transições suaves para deixar a bio mais viva.",
  socials: {
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
    youtube: "https://youtube.com",
    discord: "https://discord.com",
  },
};

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
const backgroundVideo = document.getElementById("backgroundVideo");

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
  
  if (profile.backgroundVideoId) {
    backgroundVideo.src = `https://www.youtube-nocookie.com/embed/${profile.backgroundVideoId}?autoplay=1&controls=0&showinfo=0&modestbranding=1&loop=1&playlist=${profile.backgroundVideoId}&playsinline=1&rel=0&mute=1&enablejsapi=1`;
  }
}

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

function enableBackgroundAudio() {
  let soundActivated = false;

  const activateSound = () => {
    if (soundActivated) {
      return;
    }

    soundActivated = true;
    backgroundVideo.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func: "unMute",
        args: [],
      }),
      "*",
    );
    backgroundVideo.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func: "playVideo",
        args: [],
      }),
      "*",
    );

    window.removeEventListener("pointerdown", activateSound);
    window.removeEventListener("keydown", activateSound);
  };

  window.addEventListener("pointerdown", activateSound, { once: true });
  window.addEventListener("keydown", activateSound, { once: true });
}

applyProfileContent();
setupTilt();
enableBackgroundAudio();
