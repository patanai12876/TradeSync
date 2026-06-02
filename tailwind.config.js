/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        "primary-light": "var(--primary-light)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
      },
      gradients: {
        primary: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)",
        secondary: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
        accent: "linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)",
      },
      boxShadow: {
        card: "0 2px 12px rgba(15, 118, 110, 0.08)",
        hover: "0 12px 24px rgba(15, 118, 110, 0.15)",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
      animation: {
        "slide-in-up": "slideInUp 0.5s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
        "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        slideInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

