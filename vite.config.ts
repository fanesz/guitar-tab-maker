import path from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@public": path.resolve(__dirname, "./public"),
      "@classStyle": path.resolve(__dirname, "./src/common/classStyle"),
      "@components": path.resolve(__dirname, "./src/common/components"),
      "@consts": path.resolve(__dirname, "./src/common/consts"),
      "@hooks": path.resolve(__dirname, "./src/common/hooks"),
      "@types": path.resolve(__dirname, "./src/common/types/index.ts"),
      "@utils": path.resolve(__dirname, "./src/common/utils"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
});
