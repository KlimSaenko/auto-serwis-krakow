/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        'loop-scroll': 'loop-scroll 12s linear infinite',
        'bounce-h': 'bounce-h 1s infinite',
        'text-reveal': 'text-reveal 2s cubic-bezier(0.33, 1, 0.68, 1) alternate'
      },
      keyframes: {
        'loop-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' }
        },
        'bounce-h': {
          '0%, 100%': {
              transform: 'none',
              animationTimingFunction: 'cubic-bezier(0.8,0,1,1)'
          },
          '50%': {
              transform: 'translateX(50%)',
              animationTimingFunction: 'cubic-bezier(0,0,0.2,1)'
          }
        },
        'text-reveal': {
          '0%, 30%': { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' },
          '100%': { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }
        }
      },
      fontFamily: {
        "jost-bold": ["Jost-SemiBold", "sans-serif"],
        "jost": ["Jost-Regular", "sans-serif"],
        "jost-medium": ["Jost-Medium", "sans-serif"],
        "jost-light": ["Jost-Light", "sans-serif"],
        "jost-thin": ["Jost-Thin", "sans-serif"],
      },
      backgroundImage: {
        'service-banner': "url('@/assets/car-service-banner.jpg')",
      },
      aspectRatio: {
        '4/3': '4 / 3',
      }
    }
  },
  plugins: [],
}

