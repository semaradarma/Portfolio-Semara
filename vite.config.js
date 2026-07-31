import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // <-- tambahkan ini
import path from "path";
import { fileURLToPath } from "url";

export default defineConfig({
  plugins: [react()], // <-- tambahkan ini juga
  resolve: {
    alias: {
      "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./src"),
    },
  },
});
