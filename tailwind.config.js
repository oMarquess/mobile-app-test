/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./constants/**/*.{js,jsx,ts,tsx}",
    "./theme/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "lingua-purple": "#6C4EF5",
        "lingua-deep-purple": "#5B3BF6",
        "lingua-blue": "#4D8BFF",
        "lingua-green": "#21C16B",
        success: "#21C16B",
        warning: "#FFCC00",
        streak: "#FF8A00",
        error: "#FF4D4F",
        info: "#4D8BFF",
        "text-primary": "#0D132B",
        "text-secondary": "#6B7280",
        border: "#E5E7EB",
        surface: "#F6F7FB",
        background: "#FFFFFF",
      },
      fontFamily: {
        "poppins-regular": ["Poppins-Regular"],
        "poppins-medium": ["Poppins-Medium"],
        "poppins-semibold": ["Poppins-SemiBold"],
        "poppins-bold": ["Poppins-Bold"],
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".ds-screen": {
          flex: 1,
          backgroundColor: "#FFFFFF",
          paddingLeft: 20,
          paddingRight: 20,
        },
        ".ds-card": {
          borderRadius: 18,
          borderWidth: 1,
          borderColor: "#E5E7EB",
          backgroundColor: "#FFFFFF",
          padding: 16,
        },
        ".ds-section": {
          gap: 16,
        },
        ".ds-brand-label": {
          fontFamily: "Poppins-Bold",
          fontSize: 14,
          letterSpacing: 1.2,
          textTransform: "uppercase",
          color: "#6C4EF5",
        },
        ".ds-h1": {
          fontFamily: "Poppins-Bold",
          fontSize: 32,
          lineHeight: 38,
          color: "#0D132B",
        },
        ".ds-h2": {
          fontFamily: "Poppins-SemiBold",
          fontSize: 24,
          lineHeight: 31,
          color: "#0D132B",
        },
        ".ds-h3": {
          fontFamily: "Poppins-SemiBold",
          fontSize: 20,
          lineHeight: 26,
          color: "#0D132B",
        },
        ".ds-h4": {
          fontFamily: "Poppins-Medium",
          fontSize: 16,
          lineHeight: 22,
          color: "#0D132B",
        },
        ".ds-body-lg": {
          fontFamily: "Poppins-Regular",
          fontSize: 16,
          lineHeight: 26,
          color: "#0D132B",
        },
        ".ds-body": {
          fontFamily: "Poppins-Regular",
          fontSize: 14,
          lineHeight: 22,
          color: "#6B7280",
        },
        ".ds-body-sm": {
          fontFamily: "Poppins-Regular",
          fontSize: 13,
          lineHeight: 21,
          color: "#6B7280",
        },
        ".ds-caption": {
          fontFamily: "Poppins-Regular",
          fontSize: 11,
          lineHeight: 15,
          color: "#6B7280",
        },
      });
    }),
  ],
};
