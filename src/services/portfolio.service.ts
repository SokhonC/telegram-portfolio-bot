
import { portfolio } from "../data/portfolio";

export function getAbout() {
  return `${portfolio.name}
${portfolio.title}

${portfolio.summary}`;
}

export function getSkills() {
  return Object.entries(portfolio.skills)
    .map(([category, skills]) =>
      `${category.toUpperCase()}:\n${skills.join(", ")}`
    )
    .join("\n\n");
}

export function getExperience() {
  return portfolio.experience
    .map(
      (job) =>
        `${job.position} at ${job.company}\n${job.period}`
    )
    .join("\n\n");
}

export function getProjects() {
  return portfolio.projects
    .map((project, index) => `${index + 1}. ${project}`)
    .join("\n");
}

export function getEducation() {
  return portfolio.education.join("\n\n");
}
