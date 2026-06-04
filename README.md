# Progress Tracker

## Overview

Progress Tracker is a modern productivity application built with Next.js that helps users track focused work sessions against a predefined time goal.

Users can create a task, define a target duration, start a timer, pause and resume sessions, and visualize progress through an interactive circular timeline chart. The application also records pause history and displays session analytics in a clean dashboard interface.

## Features

### Task Management

* Create and update task titles
* Define a target duration in hours
* Adjust goals dynamically while working

### Session Tracking

* Start work sessions
* Pause and resume sessions
* Real-time elapsed time tracking
* Persistent session state using Local Storage

### Progress Visualization

* Interactive circular timeline chart
* Visual representation of completed and remaining time
* Dedicated chart segments for pause periods
* Clean and responsive dashboard layout

### Analytics

* Progress percentage
* Target time overview
* Pause count tracking
* Pause history log with timestamps

### User Experience

* Responsive design
* Glassmorphism-inspired interface
* Custom productivity dashboard
* Modern blue-themed design system

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Visualization

* Recharts

### Storage

* Browser Local Storage

## Project Structure

```text
app/
├── page.tsx

components/
├── ProgressTracker.tsx
├── CircularTimer.tsx
├── PauseHistory.tsx
```

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project:

```bash
cd progress-tracker
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Usage

1. Enter a task name.
2. Set a target number of hours.
3. Start a session.
4. Pause and resume whenever needed.
5. Monitor progress through the circular timeline visualization.
6. Review pause history and session statistics.

## Future Improvements

* Multiple task management
* Daily and weekly analytics
* Focus score calculation
* Session categories and tags
* Data export functionality
* Cloud synchronization
* User authentication
* Team productivity tracking
* Dark and light themes
* Historical performance reports

## Learning Objectives

This project demonstrates:

* React Hooks
* State Management
* TypeScript Interfaces
* Component Architecture
* Data Visualization
* Local Storage Persistence
* Responsive UI Design
* Dashboard Development
* Modern Next.js Development Practices

## License

This project is available for educational and personal use.
