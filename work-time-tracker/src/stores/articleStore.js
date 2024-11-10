// src/stores/themeStore.js
import { defineStore } from 'pinia';

export const useArticleStore = defineStore('theme', {
  state: () => ({
    articles: [],
  }),
  actions: {
    addAtricle(article) {
      this.articles.push(article);
      document.documentElement.setAttribute('data-theme', theme);
    },
  },
});