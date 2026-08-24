import profileJson from "@/data/profile.json";
import experienceJson from "@/data/experience.json";
import projectsJson from "@/data/projects.json";
import skillsJson from "@/data/skills.json";
import buildLabJson from "@/data/build-lab.json";
import achievementsJson from "@/data/achievements.json";
import configJson from "@/data/config.json";

import type {
  Profile,
  ExperienceEntry,
  Project,
  SkillsData,
  BuildLabData,
  Achievement,
  SiteConfig
} from "@/lib/types";

// Thin typed accessors. Keeping these as functions (not just re-exported
// constants) leaves room to swap the source (e.g. a future CMS) without
// touching every component that consumes them — see Section 34/35 of the spec.

export function getProfile(): Profile {
  return profileJson as Profile;
}

export function getExperience(): ExperienceEntry[] {
  return experienceJson as ExperienceEntry[];
}

export function getProjects(): Project[] {
  return projectsJson as Project[];
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((p) => p.featured);
}

export function getSkills(): SkillsData {
  return skillsJson as SkillsData;
}

export function getBuildLab(): BuildLabData {
  return buildLabJson as BuildLabData;
}

export function getAchievements(): Achievement[] {
  return achievementsJson as Achievement[];
}

export function getConfig(): SiteConfig {
  return configJson as SiteConfig;
}
