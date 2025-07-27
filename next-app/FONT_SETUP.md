# Font Setup Instructions

## Current Font Configuration

### Available Fonts

Your project currently has these font files in `public/fonts/`:

#### Comico Font Files:
- `Comico-Regular.woff2` (weight: 400, style: normal)

#### Tex Gyre Heros Font Files:
- `TeXGyreHeros-Regular.woff2` (weight: 400, style: normal)

### Usage in Tailwind

You can use these fonts in your components:

```jsx
// Tex Gyre Heros (default font for main page)
<div className="font-tex-gyre-heros">This uses Tex Gyre Heros</div>

// Comico font
<div className="font-comico">This uses Comico</div>

// Note: Only regular weight (400) is available for both fonts
// font-bold will not work unless you add bold font files
```

### Adding More Font Weights

If you want to add more weights or styles, download the additional font files and update `app/fonts.ts`:

#### For Comico:
- `Comico-Bold.woff2` (weight: 700, style: normal)

#### For Tex Gyre Heros:
- `TeXGyreHeros-Bold.woff2` (weight: 700, style: normal)
- `TeXGyreHeros-Italic.woff2` (weight: 400, style: italic)
- `TeXGyreHeros-BoldItalic.woff2` (weight: 700, style: italic)

### Notes:
- The fonts are configured with CSS variables for optimal performance
- Tex Gyre Heros is set as the default font for the main page
- Currently only regular weight (400) is available for both fonts
- Fonts are optimized with `display: 'swap'` for better loading performance 