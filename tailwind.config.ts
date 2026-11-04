import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.ts'],
  theme: {
    container: { center: true, padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '3rem' }, screens: { '2xl': '1280px' } },
    extend: {
      colors: {
        green: { 50: '#F1FAF2', 100: '#E2F7E5', 500: '#2C9E65', 700: '#1B7E4D', 800: '#145F3A', 900: '#0F3A2A' },
        leaf: { DEFAULT: '#57B54D', lt: '#E2F7E5', dk: '#2F7A28' },
        teal: { DEFAULT: '#15968D', dk: '#0E6E67' },
        blue: { 700: '#1A78AA', 800: '#135E87' },
        water: { DEFAULT: '#2DA9DA', lt: '#E3F8FF', dk: '#0D6F95' },
        sand: { DEFAULT: '#F7F2EA', 2: '#EFE6D8' },
        earth: { DEFAULT: '#B8925F', dk: '#7A5A30' },
        coral: { DEFAULT: '#F2785C', lt: '#FDE7E1', dk: '#B3442B' },
        ink: { DEFAULT: '#12291F', 2: '#4A5C53' },
        line: '#E3DED3',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-manrope)', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: { card: '18px', xl2: '24px', xl3: '28px' },
      boxShadow: { soft: '0 10px 30px -12px rgba(18,41,31,.18)', lift: '0 24px 50px -20px rgba(18,41,31,.28)' },
      backgroundImage: {
        signature: 'linear-gradient(135deg, #2C9E65 0%, #15968D 50%, #1A78AA 100%)',
        'signature-dk': 'linear-gradient(135deg, #0F3A2A 0%, #1B7E4D 50%, #15968D 100%)',
      },
      keyframes: {
        flow: { to: { strokeDashoffset: '-72' } },
        float: { '50%': { transform: 'translateY(-8px)' } },
      },
      animation: { flow: 'flow 2.4s linear infinite', float: 'float 5s ease-in-out infinite' },
    },
  },
  plugins: [],
};

export default config;
