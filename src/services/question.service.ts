
import { portfolio } from "../data/portfolio";

export function answerQuestion(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("experience") || q.includes("years")) {
    return portfolio.summary;
  }

  if (q.includes("node") || q.includes("backend")) {
    return `My backend skills include:
${portfolio.skills.backend.join(", ")}`;
  }

  if (q.includes("database") || q.includes("sql")) {
    return `My database technologies include:
${portfolio.skills.database.join(", ")}`;
  }

  if (q.includes("cloud") || q.includes("devops")) {
    return `My cloud and infrastructure skills include:
${portfolio.skills.cloud.join(", ")}`;
  }

  if (q.includes("frontend") || q.includes("react")) {
    return `My frontend skills include:
${portfolio.skills.frontend.join(", ")}`;
  }

  if (q.includes("project")) {
    return `Here are my projects:
${portfolio.projects.join("\n")}`;
  }

  if (q.includes("education") || q.includes("degree")) {
    return `My education:
${portfolio.education.join("\n")}`;
  }

  return "I'm not sure about that yet. Try asking about my experience, backend skills, databases, cloud technologies, projects or education.";
}
