# 🎬 MovieHub

A modern, cinematic **movie-discovery platform** built with **Next.js 16 (App Router)** and **React 19**.
Browse trending, popular, top-rated, now-playing and upcoming films, filter the entire catalogue,
dive into rich movie pages (cast, trailers, where-to-watch, recommendations), read reviews, and curate
a personal collection of favorites.

Powered by the [TMDB](https://www.themoviedb.org/) API, with authentication via
[Clerk](https://clerk.com/) and favorites persisted in **MongoDB**.

## ✨ Features

- **Cinematic, dark-first UI** with a refined gold accent and an optional light mode.
- **Home** — a trailer-enabled featured hero plus horizontal rows for Trending, Popular, Top Rated,
  Now Playing and Upcoming, and a browse-by-genre strip.
- **Discover** — filter by genre, sort order and release year with server-rendered pagination.
- **Search** any film by title.
- **Rich movie pages** — backdrop hero, poster, genres, ratings, runtime, revenue, status, top cast,
  an in-page trailer modal, where-to-watch providers, plus recommended & similar titles — all fetched
  in a single request via TMDB's `append_to_response`.
- **Community reviews** per title.
- **Favorites** — save films to your account (synced to MongoDB + Clerk metadata).

## 🧱 Tech stack

| Concern     | Tool                               |
| ----------- | ---------------------------------- |
| Framework   | Next.js 16 (App Router, RSC)       |
| UI runtime  | React 19                           |
| Styling     | Tailwind CSS + CSS design tokens   |
| Typography  | Bebas Neue (display) · Sora (body) |
| Auth        | Clerk                              |
| Database    | MongoDB + Mongoose                 |
| Movie data  | TMDB API                           |
| Theme       | next-themes (dark-first + light)   |

## 🏗️ Architecture

**Server-first.** Every route (`page.tsx`) is a React Server Component that fetches its own data.
Client components are limited to small interactive leaves: search box, theme toggle, nav active state,
the favorite button, the discover filter bar, and the trailer modal.

```
src/
├─ app/                       # Routes, API handlers, error/loading states
│  ├─ api/user/fav/           # PUT — toggle a favorite
│  ├─ api/webhooks/           # Clerk → Mongo user sync (svix-verified)
│  ├─ discover/               # Filterable, paginated browse
│  ├─ movie/[id]/             # Movie detail (+ /review)
│  ├─ search/[searchTerm]/    # Search results
│  └─ favorites, about, faq, sign-in, sign-up …
├─ components/
│  ├─ layout/                 # Header, Footer, MainNav, SearchBox, ThemeToggle
│  ├─ movie/                  # MovieCard, MovieGrid, MovieRow, Hero, CastList,
│  │                         #   WatchProviders, TrailerModal, FavoriteButton, GenreChips
│  ├─ discover/               # FilterBar
│  └─ ui/                     # RatingBadge, SectionHeader, EmptyState, Pagination, Skeletons
├─ lib/
│  ├─ tmdb/                   # TMDB access layer
│  │  ├─ client.ts            #   core fetch (auth, locale, caching)
│  │  ├─ images.ts            #   intent-based image URLs
│  │  ├─ movies.ts            #   endpoints + selectors
│  │  ├─ types.ts             #   API types
│  │  └─ index.ts             #   barrel
│  ├─ db/                     # Mongoose connection, models, actions
│  ├─ constants.ts            # home rows, sort options, watch region
│  └─ utils.ts                # formatting + helpers
└─ proxy.ts                   # Clerk middleware (Next 16 `proxy` convention)
```

## 🚀 Getting started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment** — copy `.env.example` to `.env.local` and fill in your keys:

   ```bash
   cp .env.example .env.local
   ```

   | Variable                            | Purpose                                |
   | ----------------------------------- | -------------------------------------- |
   | `API_KEY`                           | TMDB v3 API key                        |
   | `MONGODB_URI`                       | MongoDB connection string              |
   | `MONGODB_DB_NAME`                   | Database name (defaults to `moviehub`) |
   | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key                  |
   | `CLERK_SECRET_KEY`                  | Clerk secret key                       |
   | `CLERK_WEBHOOK_SIGNING_SECRET`      | Signing secret for the Clerk webhook   |

3. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## 🔗 Clerk webhook

`/api/webhooks` keeps MongoDB in sync with Clerk (`user.created` / `user.updated` / `user.deleted`).
Point a Clerk webhook at `<your-domain>/api/webhooks` and set `CLERK_WEBHOOK_SIGNING_SECRET`.

## 📦 Scripts

```bash
npm run dev     # start dev server
npm run build   # production build
npm run start   # serve production build
npm run lint    # eslint (flat config)
```

> This product uses the TMDB API but is not endorsed or certified by TMDB.
