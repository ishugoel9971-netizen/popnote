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
- Minimal product design with soft surfaces, neutral colors, and restrained motion
- Fully client-side filtering logic

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

Serves the production build locally for review.


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
