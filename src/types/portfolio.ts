export interface SocialLink {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  summary: string;
  techStack: string[];
  liveUrl: string;
  repoUrl: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

export interface ResumeHighlight {
  title: string;
  detail: string;
}

export interface PrCampaign {
  organization: string;
  title: string;
  summary: string;
  outcomes: string[];
  postImages: string[];
}

export interface PortfolioData {
  name: string;
  role: string;
  location: string;
  intro: string;
  socialLinks: SocialLink[];
  skills: string[];
  projects: Project[];
  experience: Experience[];
  resumeHighlights: ResumeHighlight[];
  prCampaigns: PrCampaign[];
  contactEmail: string;
}