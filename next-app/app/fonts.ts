import localFont from 'next/font/local'

export const comico = localFont({
  src: [
    {
      path: '../public/fonts/Comico-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-comico',
  display: 'swap',
  preload: true,
})

export const texGyreHeros = localFont({
  src: [
    {
      path: '../public/fonts/TeXGyreHeros-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/TeXGyreHeros-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-tex-gyre-heros',
  display: 'swap',
  preload: true,
}) 