# Home Page Components

This directory contains modular components for the Forever Fest home page. Each component can be individually edited, customized, and reordered as needed.

## Components

### Layout Components
- **`HomePageLayout`** - Main page wrapper with gradient background
- **`MainContent`** - Container for main content area with responsive padding

### Content Components
- **`Navigation`** - Top navigation bar with menu items
- **`Header`** - Sean & Eva logo with city skyline (uses external SVG)
- **`DiscoBalls`** - Decorative disco ball elements positioned absolutely
- **`MainTitle`** - Main "Forever Fest" title with couple photo overlay
- **`CitySkyline`** - Bottom city skyline decoration
- **`EventDetails`** - Date, time, venue, and attire information
- **`Description`** - Wedding description and RSVP note
- **`CountdownTimer`** - Live countdown timer to the event
- **`RSVPButton`** - Call-to-action RSVP button

## Usage

### Basic Usage
```tsx
import {
  Navigation,
  Header,
  MainTitle,
  EventDetails,
  Description,
  CountdownTimer,
  RSVPButton,
  HomePageLayout,
  MainContent,
} from "@/components/home"

export default function HomePage() {
  return (
    <HomePageLayout>
      <Navigation />
      <Header />
      <MainContent>
        <MainTitle />
        <EventDetails />
        <Description />
        <CountdownTimer />
        <RSVPButton />
      </MainContent>
    </HomePageLayout>
  )
}
```

### Customizing Components

Each component accepts props for customization:

```tsx
// Custom navigation items
<Navigation className="custom-nav-styles" />

// Custom header styling
<Header className="custom-header-styles" />

// Custom event details
<EventDetails 
  month="JUNE"
  year="2025"
  day="15"
  time="7:00 PM-12:00 AM"
  venue="Custom Venue"
  attire="Black Tie"
/>

// Custom countdown initial time
<CountdownTimer 
  initialTime={{
    days: 100,
    hours: 12,
    minutes: 30,
    seconds: 45
  }}
/>

// Custom RSVP button
<RSVPButton 
  text="Reserve Your Spot"
  onClick={() => console.log('RSVP clicked')}
/>
```

### Reordering Components

Simply change the order of components in your JSX:

```tsx
<MainContent>
  <EventDetails />      {/* Show event details first */}
  <MainTitle />         {/* Then the main title */}
  <Description />
  <CountdownTimer />
  <RSVPButton />
</MainContent>
```

### Conditional Rendering

You can conditionally show/hide components:

```tsx
<MainContent>
  <MainTitle />
  {showEventDetails && <EventDetails />}
  <Description />
  {showCountdown && <CountdownTimer />}
  <RSVPButton />
</MainContent>
```

## File Structure

```
components/home/
├── README.md
├── index.ts                 # Export all components
├── HomePageLayout.tsx       # Main page layout wrapper
├── MainContent.tsx          # Main content container
├── Navigation.tsx           # Navigation component
├── Header.tsx               # Header with names and skyline
├── DiscoBalls.tsx           # Decorative disco balls
├── MainTitle.tsx            # Main title with photo
├── CitySkyline.tsx          # City skyline decoration
├── EventDetails.tsx         # Event information
├── Description.tsx          # Wedding description
├── CountdownTimer.tsx       # Countdown timer
└── RSVPButton.tsx           # RSVP button
```

## Styling

All components use Tailwind CSS classes and can be customized by:
1. Passing `className` props to override styles
2. Modifying the component files directly
3. Using CSS modules or styled-components if preferred

## State Management

- **`CountdownTimer`** manages its own countdown state
- Other components are stateless and accept props for customization
- You can lift state up to the parent component if needed for coordination between components
