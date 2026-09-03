# Popnote

Popnote is a polished, frontend-only notification dashboard built with React, TypeScript, Vite, and Tailwind CSS. It demonstrates how a modern inbox experience can reduce notification overload by organizing a large set of unread messages into priority alerts and concise summaries.

The app uses fully local mock data. There is no backend, database, authentication, or live WhatsApp/Instagram API integration.

## Features

- Priority message dashboard for high-value alerts
- Local mock dataset with 100+ simulated unread messages
- Adjustable notification threshold slider
- Custom VIP names and priority keyword tags
- WhatsApp and Instagram monitoring toggles
- Expandable message summaries for lower-priority conversations
- Quick reply interaction for important messages
- Minimal Apple-inspired visual design with soft cards, neutral colors, and restrained motion
- Fully client-side filtering logic

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open the app:

```text
http://127.0.0.1:5173/
```

To run on port 3000:

```bash
pnpm vite --host 127.0.0.1 --port 3000
```

## Available Scripts

```bash
pnpm dev
```

Starts the local Vite development server.

```bash
pnpm build
```

Runs TypeScript checks and creates a production build.

```bash
pnpm preview
```

Serves the production build locally for review.

## Project Structure

```text
src/
  components/
    ControlPanel.tsx
    CrucialAlertCard.tsx
    Dashboard.tsx
    MetricCard.tsx
    ProcessingOverlay.tsx
    SmartSummaryFeed.tsx
  data/
    mockMessages.ts
  utils/
    filterEngine.ts
  main.tsx
  styles.css
  types.ts
```

## Core Logic

Popnote filters messages entirely in the browser. The filtering utility checks enabled platforms, VIP names, and priority keywords, then separates the local message pool into:

- priority messages
- quieted notifications
- grouped message summaries
- dashboard metrics

This makes the project easy to run, test, and present without external services.

## Build

Create a production build:

```bash
pnpm build
```

The compiled output is generated in:

```text
dist/
```

## License

This project is licensed under the terms included in the repository license file.
