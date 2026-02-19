export interface NavItem {
  label: string;
  sectionId: string;
}

export interface Skill {
  name: string;
  icon: string;
  level: number;
  category: string;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  link: string;
  techStack: string[];
  keyResponsibilities: ProjectSection[];
  technologies: ProjectSection[];
  outcomes: string[];
}

export interface ProjectSection {
  title: string;
  items: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  issuerIcon: string;
  credentialUrl: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  responsibilities: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  linkedin: string;
  linkedinUrl: string;
  github: string;
  githubUrl: string;
  whatsappUrl: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  roles: string[];
  tagline: string;
  aboutPoints: string[];
  resumePath: string;
}
