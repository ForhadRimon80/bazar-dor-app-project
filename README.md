
<div align="center">

# 🛒 Bazar Dor | বাজার দর

### A Bengali Market Price Tracking Web Application

Explore essential product prices, compare market trends, and browse everyday commodities through a modern Bengali-language interface.

[View Source Code](https://github.com/ForhadRimon80/bazar-dor-app-project)

</div>

---

## Overview

Bazar Dor is a market price information application built for users in Bangladesh. It presents commodity prices in an accessible, category-based interface, highlighting price increases and decreases to make market information easier to understand.

The project also includes account authentication and profile management, integrating Better Auth with MongoDB.

## Key Features

- **Market price overview:** Browse product prices with units and price-change indicators.
- **Price movement highlights:** Dedicated sections for products with rising and falling prices.
- **Category-based browsing:** Explore products organized by commodity categories.
- **Price sorting:** Sort category listings from low to high or high to low.
- **Authentication:** Email/password sign-up and sign-in, plus Google and GitHub sign-in configured with Better Auth.
- **User profiles:** View and update account information.
- **Session-aware access:** Session checks and redirects for protected application routes.
- **Bengali-first interface:** Localized labels and typography for Bangladeshi users.
- **Responsive presentation:** Tailwind CSS-based layouts and reusable UI components.

## Tech Stack

| Area | Technologies |
|------|--------------|
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4, DaisyUI, HeroUI |
| Authentication | Better Auth, Google OAuth, GitHub OAuth |
| Database | MongoDB, Better Auth MongoDB adapter |
| UI Utilities | React Icons, react-marquee-text |
| Data | External market-price REST API |

## Getting Started

### Prerequisites

- Node.js compatible with Next.js 16
- npm
- MongoDB connection
- OAuth credentials if testing Google or GitHub sign-in

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/ForhadRimon80/bazar-dor-app-project.git
cd bazar-dor-app-project
npm install
```

### Environment Variables

Create a `.env.local` file in the project root and configure the credentials used by the authentication setup:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_secure_random_secret
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

**Security Note:** Never commit `.env.local`, database credentials, OAuth secrets, or other sensitive values to GitHub. Configure the OAuth redirect URLs in the corresponding provider dashboards.

### Run Development Server

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

## Project Structure

```text
src/
├── app/           # App Router pages and layouts
├── components/    # Reusable interface components
├── lib/           # Authentication setup and shared utilities
└── proxy.ts       # Route access checks
```

## What This Project Demonstrates

- Building a multi-page application with the Next.js App Router
- Integrating and presenting data from REST APIs
- Implementing sorting and category-based navigation
- Configuring third-party and credentials-based authentication
- Connecting authentication persistence to MongoDB
- Developing reusable, responsive UI components

## Future Improvements

- Historical price charts and comparisons
- Search and additional product filters
- Automated tests for key user journeys
- More detailed accessibility and performance audits

## Author

**Farhad Rimon**

- **GitHub:** [ForhadRimon80](https://github.com/ForhadRimon80)
- **LinkedIn:** [Farhad Rimon](https://www.linkedin.com/in/farhad-rimon-7487b5201/)

Developed as a practical Next.js application focused on market-price discovery and modern web development.
