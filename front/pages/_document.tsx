import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Browser title</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content="VTuber&apos;s Weekly Stream Time Converter" />
        <meta property="twitter:site" content="@ma_me" />
        <meta property="twitter:description" content="A schedule creation app for VTubers. Set your timezone and automatically calculate broadcast times for fans around the world. complicated calculations! Create the perfect schedule with a few click" />
        <meta property="og:image" content="https://weekly-stream-time-converter.vercel.app/twic.png" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
