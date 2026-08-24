// Central type definitions for the portfolio's data layer.
// UI components should import these rather than re-deriving shapes ad hoc,
// so `src/data/*.json` stays the single source of truth (Section 34).

export type SkillLevel =
  | "familiar"
  | "working-knowledge"
  | "hands-on"
  | "project-experience";

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

export interface SkillsData {
  categories: SkillCategory[];
  levelDefinitions: Record<SkillLevel, string>;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  status: string;
  featured: boolean;
  shortDescription: string;
  problem: string;
  solution: string;
  technologies: string[];
  currentState: string;
  whatRyanLearned: string;
  githubUrl: string | null;
  demoUrl: string | null;
  demoUrlSecondary?: string | null;
  roadmap: string | null;
  note?: string;
}

export interface ExperienceEntry {
  id: string;
  organization: string;
  roleLabel: string;
  type: string;
  dateRange: string;
  location?: string;
  summary: string;
  responsibilities: string[];
  networkingConcepts?: string[];
  environment?: string[];
  note?: string;
}

export interface Profile {
  name: string;
  location: string;
  positioningPrimary: string;
  positioningSecondary: string;
  identityTags: string[];
  story: string;
  philosophy: string;
  hero: {
    heading: string;
    subheading: string;
    supportingText: string;
    primaryCta: string;
    secondaryCta: string;
    optionalCta: string;
  };
  howIBuild: { step: string; title: string; description: string }[];
  education: {
    degree: string;
    institution: string;
    relevantAreas: string[];
  };
  photo: {
    status: "placeholder" | "uploaded";
    note: string;
  };
}

export interface BuildLabItem {
  id: string;
  title: string;
  category: string;
  status: string;
  description: string;
  note?: string;
}

export interface BuildLabData {
  intro: string;
  items: BuildLabItem[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  type: "certificate";
}

export interface CertModule {
  title: string;
  issuedOn: string;
}

export interface CertificationsData {
  intro: string;
  certificates: Certificate[];
  modulesInProgress: CertModule[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  trigger: string;
}

export interface SiteConfig {
  site: {
    title: string;
    description: string;
    canonicalUrl: string;
  };
  contact: {
    email: string;
    github: string;
    linkedin: string;
    phone: string;
    website: string;
    handle: string;
  };
  github: {
    username: string;
    note: string;
  };
  featureFlags: {
    commandCenter: boolean;
    terminal: boolean;
    achievements: boolean;
    githubExplorer: boolean;
    portfolioAssistant: boolean;
    analytics: boolean;
  };
  analytics: {
    provider: "google" | "plausible" | "vercel" | null;
    note: string;
  };
}

// Minimal shape of the GitHub repo data the GitHub Explorer will consume.
// See src/lib/github.ts.
export interface GitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazersCount: number;
  forksCount: number;
  updatedAt: string;
  htmlUrl: string;
}
