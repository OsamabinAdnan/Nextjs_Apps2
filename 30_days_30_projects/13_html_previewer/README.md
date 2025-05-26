# HTML Previewer

A modern, responsive HTML code previewer built with Next.js and GSAP animations. This application allows users to write HTML code and see the preview in real-time, featuring a beautiful animated background and a clean, user-friendly interface.

## Features

- 🎨 Real-time HTML preview
- 🌓 Dark/Light mode support
- 🎭 Animated background with GSAP
- 📱 Fully responsive design
- 🎯 Predefined HTML templates
- 🌟 Modern glass-morphism UI

## Screenshots

![HTML Previewer](/public/screenshot.png)


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Technologies Used

- Next.js 15
- React 19
- GSAP (GreenSock Animation Platform)
- Tailwind CSS
- Shadcn/ui Components
- TypeScript

## Usage

1. Enter your HTML code in the textarea
2. Click "Generate Preview" to see the result
3. Use "Paste HTML" to load a predefined template
4. The preview updates will be shown in the preview area below
5. Toggle between dark and light modes using the theme toggle button

## Responsive Design

The application is fully responsive and works well on:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 💻 Desktops (1024px and up)

## Animation Features

The background features three animated shapes:
- A floating circle with blue tint
- A rotating square with purple tint
- A morphing triangle with green tint

All shapes move independently with GSAP animations for a dynamic, engaging user experience.

## Project Structure

```
13_html_previewer/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── html-previewer.tsx    # Main component
│   ├── Predefined_Html.ts    # HTML templates
│   ├── ThemeToggle.tsx      # Dark/Light mode toggle
│   └── ui/                   # UI components
└── public/                   # Static assets
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Contact

**Osama bin Adnan**
