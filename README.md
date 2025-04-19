# dressassistant.ai - Weather-Based Clothing Recommendations

A Next.js application that provides clothing recommendations based on weather forecasts for the next seven days. The app allows users to enter their location in various formats - from direct city names to descriptive phrases like "The Windy City" or "home of Harvard" - and then provides tailored clothing suggestions.

## Features

- Natural language location input with flexible parsing
- 7-day weather forecast display
- Daily clothing recommendations based on temperature, precipitation, and other weather factors
- User authentication and account management with Supabase
- Search history tracking for authenticated users
- Responsive design that works on mobile and desktop

## Technology Stack

- **Framework**: Next.js 15 with React 19 (using React Compiler)
- **Language**: TypeScript
- **State Management**: React hooks
- **UI Components**:
  - Shadcn UI (with Radix UI primitives)
  - Lucide React for icons
  - QWeather Icons for weather visualization
- **Styling**:
  - Tailwind CSS v4 with animations
  - Class Variance Authority (CVA) for component variants
  - Tailwind Merge for class name merging
- **Backend & Authentication**:
  - Supabase for database and authentication
- **APIs**:
  - Anthropic API for descriptive location finding
  - OpenStreetMap Nominatim API for geocoding (free and open source)
  - Open-Meteo for weather forecasts (free and open source)
- **Development Tools**:
  - Biome for linting and formatting
  - PNPM for package management
  - Next.js Turbo for faster development builds
- **Theming**: next-themes for light/dark mode support
- **Deployment**: Vercel

## Getting Started

### Setting up Supabase

1. Create a new project at [Supabase](https://supabase.com)
2. After your project is created, find your project URL and anon key in Project Settings > API
3. Create a `.env.local` file with the following:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Anthropic (for descriptive location parsing)
ANTHROPIC_API_KEY=your-anthropic-api-key
ANTHROPIC_MODEL=claude-3-haiku-20240307

# Weather API
OPENMETEO_API_URL=https://api.open-meteo.com/v1/forecast
```

### Setting up the database

Install dependencies:

```bash
pnpm install
```

```bash
# Login to Supabase
pnpm supabase login

# Link to your project
pnpm db:link

# Apply the migrations
pnpm db:push
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## How It Works

1. User enters their location in an open text field
2. The application parses the location using:
   - Direct geocoding via Nominatim API
   - Pattern matching for common descriptive locations
3. Weather forecast is fetched using Open-Meteo API
4. Clothing recommendations are generated based on temperature, precipitation, wind, and other weather conditions
5. Results are displayed in a 7-day forecast view
6. For authenticated users, search history is saved to the Supabase database
7. Users can view their search history on the "My History" page

## License

MIT

## Credits

- Weather information: [Open-Meteo](https://open-meteo.com/)
- Weather icons: https://icons.qweather.com/en/
