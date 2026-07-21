export interface CredlyBadge {
  name: string;
  issuer: string;
  issued: string;
  image: string;
}

export const credlyProfileUrl = "https://www.credly.com/users/sing-yun-wu";

export const credlyBadges: CredlyBadge[] = [
  {
    name: "AI Literacy",
    issuer: "IBM SkillsBuild",
    issued: "2026-05-15",
    image: "badges/credly-ai-literacy.png",
  },
  {
    name: "Explore Emerging Tech",
    issuer: "IBM SkillsBuild",
    issued: "2026-05-15",
    image: "badges/credly-emerging-tech.png",
  },
  {
    name: "IT Specialist — Python",
    issuer: "Certiport",
    issued: "2022-08-28",
    image: "badges/credly-python.png",
  },
  {
    name: "Quantum Enigmas",
    issuer: "IBM SkillsBuild",
    issued: "2026-05-15",
    image: "badges/credly-quantum-enigmas.png",
  },
];
