# OCD Mantra Monorepo

Welcome to the **OCD Mantra Monorepo** — a comprehensive suite of mental wellness tools and cognitive-behavioral interactive exercises designed specifically to help users understand, manage, and cope with obsessive-compulsive disorders and anxiety.

This codebase is a modern Next.js 15 application incorporating unified navigation, modular sub-applications, and Neon PostgreSQL data storage.

---

## 🚀 Getting Started

### Prerequisites

* **Node.js** (v18+ recommended)
* **npm** or **yarn**

### Installation

1. Clone this repository (if not already done):
   ```bash
   git clone https://github.com/kashyap-cloud/OCD-Mantra.git
   cd OCD-Mantra
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` or `.env` file in the root directory and add the following keys (fill in with active credentials):
   ```env
   DATABASE_URL="postgresql://<user>:<password>@<host>/<database>?sslmode=require"
   NEON_PROJECT_ID=""
   NEON_API_KEY=""
   NEXT_PUBLIC_BASE_PATH="/ocd"
   GOOGLE_TRANSLATE_API_KEY=""
   AZURE_TRANSLATOR_KEY=""
   AZURE_TRANSLATOR_REGION="eastus"
   ```

### Running Locally

To run the Next.js development server on port `3005`:
```bash
npm run dev
```
Open [http://localhost:3005](http://localhost:3005) (or `/ocd` base path if configured) in your browser.

### Building for Production

Compile the production bundle:
```bash
npm run build
```

---

## 📁 Repository Structure

* `/src/app`: Contains the central routing, API routes, and individual nested applications (60+ tools like `anxiety_cycle`, `guided_imagery`, `pure_ocd`, `what_is_health_ocd`, etc.).
* `/src/components`: Shared React/Tailwind UI elements (e.g. `AuthGate`, `LanguageDropdown`, buttons, forms, and alerts).
* `/src/hooks`: Global custom hooks (e.g. `use-auth`, `use-toast`, `use-mobile`).
* `/src/lib`: Core services including PostgreSQL database client (`db.ts`), tracker utilities, translation services, and theme helpers.
* `/db`: Local migrations and SQL scripts for initializing data schemas.
* `/public`: Static assets including images, vectors, and icons.

---

## 🛠️ Main Available Scripts

* `npm run dev`: Starts the Next.js development server at `http://localhost:3005`.
* `npm run build`: Compiles and optimizes the application for production.
* `npm run start`: Starts the Next.js production server.
* `npm run lint`: Runs ESLint check across all directories.
