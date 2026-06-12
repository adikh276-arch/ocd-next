import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			"surface-blue": "hsl(var(--surface-blue))",
  			"surface-light": "hsl(var(--surface-light))",
  			"accent-coral": "hsl(var(--accent-coral))",
  			"accent-peach": "hsl(var(--accent-peach))",
  			"card-blue-deep": "hsl(var(--card-blue-deep))",
  			"card-light": "hsl(var(--card-light))",
  			"text-blue-primary": "hsl(var(--text-blue-primary))",
  			"text-blue-secondary": "hsl(var(--text-blue-secondary))",
  			"text-light-primary": "hsl(var(--text-light-primary))",
  			"text-light-secondary": "hsl(var(--text-light-secondary))",
  			"text-blue-muted": "hsl(var(--text-blue-muted))",
  			mood: {
  				great: "hsl(var(--mood-great))",
  				good: "hsl(var(--mood-good))",
  				okay: "hsl(var(--mood-okay))",
  				low: "hsl(var(--mood-low))",
  				struggling: "hsl(var(--mood-struggling))",
  			},
  			therapy: {
  				soft: "hsl(var(--therapy-soft))",
  				glow: "hsl(var(--therapy-glow))"
  			},
  			warm: {
  				rose: "hsl(var(--warm-rose))",
  				peach: "hsl(var(--warm-peach))",
  				gold: "hsl(var(--warm-gold))",
  				blush: "hsl(var(--warm-blush))",
  				glow: "hsl(var(--warm-glow))",
  			},
  			calm: {
  				blue: "hsl(var(--calm-blue))",
  				mint: "hsl(var(--calm-mint))",
  				lavender: "hsl(var(--calm-lavender))",
  				peach: "hsl(var(--calm-peach))",
  				rose: "hsl(var(--calm-rose))",
  				cream: "hsl(var(--calm-cream))",
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
