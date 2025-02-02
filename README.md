# Sonar

A modern music streaming application built with Angular 17, providing users with essential features to manage and play their local music library. The application integrates NgRx for state management, ensuring a seamless and maintainable architecture.

## Table of Contents

- [Project Overview](#project-overview)
- [Installation](#installation)
- [Structure](#structure)
- [Features](#features)
- [Technologies](#technologies)

## Project Overview

**Context**:  
Sonar is designed to offer a simple and intuitive platform for users to manage, organize, and play their local music tracks. The application includes a fully functional CRUD system for tracks and an audio player with essential controls.

**Objectives**:  
- Provide a user-friendly interface for managing tracks and playlists.
- Implement a robust state management system using NgRx.
- Ensure smooth audio playback with essential controls using the Web Audio API.
- Use modular and maintainable architecture following Angular best practices.

## Installation

### Prerequisites
- Node.js (v18 or higher)
- Angular CLI (v17)
- Docker (optional, for containerization)

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Yorften/Sonar-v2.git
   cd Sonar-v2/sonar

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application:**
   ```bash
   ng serve
   ```
   The application will be available at `http://localhost:4200`.

4. **Run the backend:**
   ```bash
   cd Sonar-v2/musicapi
   mvn spring-boot:run
   ```
   The API will be available at `http://localhost:8085/api`.

## Structure

The project is organized into a modular structure for better scalability and maintainability. Here's the key folder structure:

```
---src/
    ├── app/
    │   ├── core/          // Shared utilities and core services
    │   │   ├── enums/     // Shared enums
    │   │   ├── player/    // Player state management and components
    │   │   ├── shared/    // Shared components and utilities
    │   │   └── core.module.ts
    │   ├── features/      // Feature modules
    │   │   ├── playlist/  // Playlist module (components, services, state)
    │   │   ├── track/     // Track module (CRUD, components, services, state)
    │   │   └── ...
    │   ├── app-routing.module.ts
    │   └── app.module.ts
```

## Features

- **Track Management (CRUD)**:
  - Add, update, delete, and view tracks with the following details:
    - Song name (validated for maximum length)
    - Artist name (validated for maximum length)
    - Description
    - Auto-calculated song duration
    - Music category

- **Audio Player**:
  - Play, pause, next, previous controls.
  - Volume and progress control.

- **Real-Time Search**:
  - Search tracks dynamically by title.

- **State Management**:
  - Centralized state management with NgRx.
  - Async error handling with effects.
  - Loading states: `loading`, `error`, `success`.

- **File Management**:
  - Store audio files in GridFs of MongoDB.
  - Support for MP3, WAV, OGG formats.
  - Limit file size to 15MB.
  - Optional cover image support (PNG, JPEG, ect...)

- **Responsive Design**:
  - Tailored for desktop and mobile devices.

- **Docker Support**:
  - Docker configuration for containerized deployment.

## Technologies

- **Framework**: Angular 17, Spring Boot
- **State Management**: NgRx
- **Styling**: CSS, TailwindCSS
- **Data Storage**: MongoDB, Localstorage
- **Development Tools**:
  - Node.js
  - Angular CLI