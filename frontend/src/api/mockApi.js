import { mockRecipes, mockChatAnswers } from '../data/mockData';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchRecipes = async () => {
  await delay(300);
  return mockRecipes;
};

export const fetchRecipeById = async (id) => {
  await delay(200);
  return mockRecipes.find((r) => r.id === id);
};

export const askQuestion = async (query) => {
  await delay(800);
  const idx = Math.floor(Math.random() * mockChatAnswers.length);
  return mockChatAnswers[idx];
};
