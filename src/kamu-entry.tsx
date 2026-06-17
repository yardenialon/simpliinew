import { createRoot } from "react-dom/client";
import "./kamu.css";
import { IdentityCardBody, RevealCardContainer, type SocialItem } from "@/components/identity-card";

const socials: SocialItem[] = [
  {
    id: "linkedin",
    url: "https://www.linkedin.com/",
    label: "LinkedIn",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0H12v2.2h.07c.63-1.2 2.17-2.46 4.46-2.46C21.4 7.74 24 10 24 14.6V24h-5v-8.3c0-2-.04-4.57-2.78-4.57-2.78 0-3.21 2.17-3.21 4.42V24h-5V8z" />
      </svg>
    ),
  },
  {
    id: "x",
    url: "https://x.com/",
    label: "X",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.9 1.5h3.7l-8 9.2L24 22.5h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.5h7.6l5.2 6.9 6.1-6.9zm-1.3 18.8h2L6.5 3.6H4.4l13.2 16.7z" />
      </svg>
    ),
  },
];

// --- Card content. Card 2 (Kamu) is real; cards 1 & 3 are PLACEHOLDERS — replace name/role/bio/avatar. ---
const people = [
  {
    fullName: "Maya Chen", // PLACEHOLDER
    place: "Founder & CEO",
    about:
      "On a mission to make plant-based seafood indistinguishable from the ocean's best — sustainable, clean, and made entirely from spirulina.",
    avatarUrl: "/og-image.jpg",
    avatarText: "M",
  },
  {
    fullName: "Kamu",
    place: "Head of Food Technology",
    about:
      "Pioneering proprietary spirulina texture technology — building plant-based seafood that looks, tastes, and flakes like the real thing, made entirely from algae.",
    avatarUrl: "/og-image.jpg",
    avatarText: "K",
  },
  {
    fullName: "Daniel Roth", // PLACEHOLDER
    place: "Head of R&D",
    about:
      "Leads the science behind our flash-frozen spirulina and texture engineering, turning nutrient-dense microalgae into craveable everyday food.",
    avatarUrl: "/og-image.jpg",
    avatarText: "D",
  },
];

const mount = document.getElementById("kamu-root");
if (mount) {
  createRoot(mount).render(
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1.5rem",
        justifyContent: "center",
        alignItems: "stretch",
        width: "100%",
      }}
    >
      {people.map((p, i) => (
        <RevealCardContainer
          key={i}
          className="kamu-card"
          accent="#154048"
          textOnAccent="#ffffff"
          mutedOnAccent="rgba(255,255,255,0.8)"
          base={<IdentityCardBody scheme="plain" socials={socials} {...p} />}
          overlay={<IdentityCardBody scheme="accented" socials={socials} {...p} />}
        />
      ))}
    </div>
  );
}
