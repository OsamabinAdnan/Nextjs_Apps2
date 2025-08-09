# GitHub Profile Viewer

A modern, responsive web application built with Next.js that allows users to search and view GitHub profiles and repositories in an elegant interface.

[GitHub Profile Viewer](/public/image.png)

## Features

- 🔍 Search for any GitHub user by username
- 👤 View detailed user profile information including:
  - Profile picture
  - Bio
  - Location
  - Follower and following counts
- 📚 Browse through user repositories with details such as:
  - Repository name and description
  - Star count
  - Fork count
- ✨ Beautiful UI with:
  - Glassmorphism design
  - Smooth animations
  - Responsive layout
  - Loading states
- 🎨 Modern design with gradient backgrounds and card-based layout

## Tech Stack

- **Framework:** Next.js 15.4
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** 
  - Radix UI primitives
  - Custom shadcn-style components
- **Icons:** Lucide React
- **Loading States:** React Spinners

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd github-profile-viewer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Enter a GitHub username in the search field
2. Click the "Search" button or press Enter
3. View the user's profile information and repositories
4. Click on repository links to visit them on GitHub

## Development

- `npm run dev`: Starts the development server with Turbopack
- `npm run build`: Creates a production build
- `npm run start`: Runs the production build
- `npm run lint`: Runs ESLint to check code quality

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
