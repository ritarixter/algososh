import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {    
    },
    baseUrl: 'http://localhost:3000/',
    "env": {
      "colorDefault": "rgb(0, 50, 255)",
      "colorChanging": "rgb(210, 82, 225)",
      "colorModifed": "rgb(127, 224, 81)",
      "styleBorder": {css: "have.css", border: "border-color"}
  }
  },
  
});
