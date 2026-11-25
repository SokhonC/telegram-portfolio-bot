
import express from "express";
import { webhookCallback } from "grammy";
import { Bot, InlineKeyboard } from "grammy";
import dotenv from "dotenv";
import { answerQuestion } from "./services/question.service";
import {
  getAbout,
  getSkills,
  getExperience,
  getProjects,
  getEducation
} from "./services/portfolio.service";

dotenv.config();

const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error("BOT_TOKEN is missing");
}

const bot = new Bot(token);

bot.command("start", async (ctx) => {
  const keyboard = new InlineKeyboard()
    .text("About Me", "about")
    .text("My Skills", "skills")
    .row()
    .text("Projects", "projects")
    .text("Contact", "contact");

  await ctx.reply(
    "👋 Hello! Welcome to my portfolio assistant.\n\nI'm here to tell you about my professional background, technical skills and projects.\n\nWhat would you like to explore?",
    { reply_markup: keyboard }
  );
});


bot.callbackQuery("about", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply(getAbout());
});

bot.callbackQuery("skills", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply(getSkills());
});

bot.callbackQuery("projects", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply(getProjects());
});

bot.callbackQuery("experience", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply(getExperience());
});

bot.callbackQuery("education", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply(getEducation());
});



bot.on("message:text", async (ctx) => {
  const question = ctx.message.text.toLowerCase();

//   if (question.includes("experience")) {
//     return ctx.reply(
//       "I have experience in web development, backend development and DevOps-related tasks."
//     );
//   }

//   if (question.includes("node")) {
//     return ctx.reply(
//       "I use Node.js to build backend applications and APIs, with Express.js and TypeScript."
//     );
//   }

//   if (question.includes("database") || question.includes("postgres")) {
//     return ctx.reply(
//       "I have experience working with PostgreSQL and database-driven applications."
//     );
//   }

//   if (question.includes("project")) {
//     return ctx.reply(
//       "I've worked on web development projects involving Laravel, Python, sentiment analysis and AI integrations."
//     );
//   }

//   if (question.includes("frontend") || question.includes("react")) {
//     return ctx.reply(
//       "I work with React, JavaScript and TypeScript for frontend development."
//     );
//   }

  const answer = answerQuestion(question);

  await ctx.reply(answer);

//   return ctx.reply(
//     "I couldn't find an answer to that question yet. Try asking about my experience, Node.js, databases or projects."
//   );
});


bot.catch((err) => {
  console.error("Bot error:", err);
});

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Sokhon Portfolio Bot is running!");
});

const PORT = Number(process.env.PORT) || 3000;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

// Register webhook route ONLY in production
if (WEBHOOK_URL) {
  app.post(
    "/telegram",
    webhookCallback(bot, "express")
  );
}

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    if (WEBHOOK_URL) {
      // Production: Telegram Webhook
      await bot.api.setWebhook(
        `${WEBHOOK_URL}/telegram`
      );

      console.log("Telegram webhook configured!");
    } else {
      // Local: Telegram Long Polling
      await bot.api.deleteWebhook();

      console.log("Starting local bot...");

      bot.start({
        onStart: () => {
          console.log("Telegram bot is running locally!");
        }
      });
    }
  } catch (error) {
    console.error("Bot startup error:", error);
  }
});