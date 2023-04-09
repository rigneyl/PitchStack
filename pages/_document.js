import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="Pitch Stack" key="title"/>
        <meta property="og:description" content="built by luke" key="description"/>
        <meta
          property="og:image"
          content="https://freeimage.host/i/HkwzIOG"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
