/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#161622",
                secondary: {
                    DEFAULT: "#FF9C01",
                    100: "#FF9001",
                    200: "#FF8E01",
                },
                black: {
                    DEFAULT: "#000",
                    100: "#1E1E2D",
                    200: "#232533",
                },
                gray: {
                    100: "#CDCDE0",
                },
            },
            fontFamily: {
                pthin: ["Kanit-Thin", "sans-serif"],
                pextralight: ["Kanit-ExtraLight", "sans-serif"],
                plight: ["Kanit-Light", "sans-serif"],
                pregular: ["Kanit-Regular", "sans-serif"],
                pmedium: ["Kanit-Medium", "sans-serif"],
                psemibold: ["Kanit-SemiBold", "sans-serif"],
                pbold: ["Kanit-Bold", "sans-serif"],
                pextrabold: ["Kanit-ExtraBold", "sans-serif"],
                pblack: ["Kanit-Black", "sans-serif"],
            },
        },
    },
    plugins: [],
};
