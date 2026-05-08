# SafeZone Delhi

**Real-time Crime Awareness & Safety Platform for Delhi**

SafeZone Delhi is a React web app that helps users — especially those unfamiliar with Delhi — understand crime risk in any district, report incidents anonymously, and access emergency services instantly. It pulls live data from the Indian government's open crime dataset and OpenStreetMap, and works for anyone from a first-time visitor to a long-time resident.

---

## Overview

Imagine someone flying into Delhi from Kashmir — they have no idea which areas are safe, where the crime hotspots are, or who to contact in an emergency. SafeZone Delhi solves exactly that.

Select your district or let the app detect your location automatically. You instantly see whether you are in a High Risk, Moderate, or Safe Zone based on real crime data. From there, you can call the police, trigger an SOS alert to your emergency contacts, report an incident anonymously, or find the nearest police station.

---

## Features

- **Risk Zone Detection** — Green / Orange / Red zone based on official crime data per district and time of day
- **Use My Location** — GPS-based auto-detection of your current Delhi district using Nominatim reverse geocoding
- **SOS Button** — Calls 112 and simultaneously sends a WhatsApp alert to all saved emergency contacts with your district name
- **Emergency Contacts** — Save up to 3 contacts locally; used automatically when SOS is triggered
- **Anonymous Incident Reporting** — Submit reports without any login. Supports Theft, Assault, Harassment, and Other (with specify field)
- **Official Crime Statistics** — Monthly theft, assault, and robbery figures per district from the data.gov.in API
- **Community Reports** — Aggregated view of all anonymously submitted reports with trending crime type
- **Police Station Finder** — Real station data from OpenStreetMap with one-tap Call 100 and Google Maps navigation
- **Dark / Light Mode** — Full theme toggle with a deep navy dark mode designed for night-time use
- **Fallback Data** — All API calls have hardcoded backup data so the app never breaks if a government API is down

---

## Tech Stack

- **Frontend** — React 18 with hooks and component-based architecture
- **Build Tool** — Vite
- **Styling** — Tailwind CSS v4 with custom CSS variables for theming
- **Crime Data** — [data.gov.in](https://data.gov.in) public crime dataset API (no key required for basic use)
- **Police Stations** — OpenStreetMap Overpass API
- **Location Detection** — Nominatim reverse geocoding API
- **Deployment** — Vercel

---

## Live Demo

[https://safe-zone-bay.vercel.app/](https://safe-zone-bay.vercel.app/)

---

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal:

```
http://localhost:5173
```

Location detection works on `localhost`. For deployed versions, GPS access requires HTTPS.

---

## Available Scripts

```bash
npm run dev       # Start local Vite dev server
npm run build     # Create production build
npm run preview   # Preview production build locally
```

---

## Project Structure

```
SafeZone/
├── public/
├── src/
│   ├── components/
│   │   ├── RiskBanner.jsx          # Top alert banner showing risk level
│   │   ├── RiskAssessment.jsx      # Sidebar risk card with detailed message
│   │   ├── EmergencyButtons.jsx    # Police / SOS / Emergency buttons + contacts panel
│   │   ├── CrimeStats.jsx          # Official monthly crime statistics card
│   │   ├── CommunityReports.jsx    # Summary counts of all user-submitted reports
│   │   ├── RecentReports.jsx       # List of recent anonymous reports with delete
│   │   ├── ReportIncident.jsx      # Anonymous incident submission form
│   │   └── PoliceStations.jsx      # Nearby police stations with call and navigate
│   ├── utils/
│   │   ├── api.js                  # All API calls: crime data, stations, geocoding
│   │   ├── riskCalculator.js       # Risk level logic and message generator
│   │   └── constants.js            # Backup police station data
│   ├── App.jsx                     # Root component, state management, layout
│   ├── main.jsx
│   └── index.css                   # CSS variables, dark/light theme, utility classes
├── index.html
├── package.json
└── vite.config.js
```

---

## How Risk Levels Work

SafeZone calculates risk based on total reported crimes in the selected district this month combined with the current time of day.

| Level | Condition |
|---|---|
| 🟢 Safe Zone | Total crimes below 240 and not late night |
| 🟠 Moderate Risk | Total crimes 240–319, or current time is between 10 PM and 5 AM |
| 🔴 High Risk | Total crimes 320 or above, or late night with crimes above 280 |

---

## How SOS Works

1. User saves up to 3 emergency contacts (name + phone number) — stored in `localStorage`
2. When SOS is pressed, the app opens WhatsApp for each saved contact with the message:

   > 🆘 SOS! I need help. I am currently in [District]. Please call me immediately or contact police at 112.

3. The app then redirects to `tel:112` to place the emergency call

> Note: Browsers cannot send SMS directly. WhatsApp deep links are used as the most reliable cross-platform alternative.

---

## Data Sources

- **Crime statistics** — [data.gov.in District-wise Crime in India](https://data.gov.in/resource/9e0fd36e-f92c-4c86-b0f6-21f633b1b2d4) — community-maintained government open data
- **Police stations** — [OpenStreetMap Overpass API](https://overpass-api.de) — real amenity data for Delhi
- **Reverse geocoding** — [Nominatim](https://nominatim.openstreetmap.org) — converts GPS coordinates to district names

All three sources are free and require no API key.

---

## Disclaimer

Risk scores and crime statistics are estimates based on available open data. SafeZone Delhi is not an official law enforcement tool. Always contact emergency services directly in a crisis. Data accuracy depends on what is reported to the government dataset and OpenStreetMap contributors.

---

## Team

Built by **Rudransh** and **Dhruv**
