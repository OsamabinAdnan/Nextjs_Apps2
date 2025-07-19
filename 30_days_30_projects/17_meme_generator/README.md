# Meme Generator

A modern, interactive meme generator built with Next.js and TypeScript. This application allows users to create custom memes by adding draggable text to popular meme templates.

![Meme Generator Demo](./public/demo.png)

## Features

- 🖼️ Browse through a collection of popular meme templates
- ✏️ Add custom text to memes
- 🖱️ Drag and position text anywhere on the meme
- 💾 Download customized memes
- 🎨 Clean, modern UI using Tailwind CSS
- 📱 Responsive design that works on all devices
- ⚡ Fast and efficient with client-side rendering
- 🔄 Load more memes as needed

## Tech Stack

- **Framework**: Next.js 13+
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Image Generation**: html2canvas
- **Drag & Drop**: react-draggable
- **API**: imgflip API for meme templates

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

## Usage Guide

1. **Browse Memes**: 
   - Scroll through the meme template carousel
   - Click "Load More" to see additional templates

2. **Select a Meme**:
   - Click any template to select it for customization
   - The selected meme will appear in the customization section

3. **Add Text**:
   - Type your custom text in the textarea
   - The text will appear on the meme immediately

4. **Position Text**:
   - Click and drag the text to position it anywhere on the meme
   - The text stays within the meme boundaries

5. **Download**:
   - Click "Download Meme" to save your creation
   - The meme will be saved as a high-quality PNG file

## Project Structure

```
components/
├── meme-generator.tsx    # Main meme generator component
└── ui/                  # UI components
    ├── button.tsx
    ├── card.tsx
    ├── label.tsx
    └── textarea.tsx
```

## Component Features

The `MemeGenerator` component includes:

- **Meme Management**
  - Fetches memes from imgflip API
  - Implements pagination with "Load More"
  - Handles meme selection

- **Text Customization**
  - Draggable text positioning
  - Text styling with shadow for visibility
  - Responsive text container

- **Image Processing**
  - High-quality image generation
  - Proper CORS handling
  - Efficient blob URL management

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment

You can deploy this application using:

### Vercel (Recommended)
1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically configure the build settings
4. Deploy!

### Manual Deployment
1. Build the application:
```bash
npm run build
```
2. Start the production server:
```bash
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- [imgflip API](https://api.imgflip.com/) for providing meme templates
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Next.js](https://nextjs.org) team for the amazing framework
