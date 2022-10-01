import Head from 'next/head'
import Header from "../components/Header"
import Mean from "../components/Mean"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <div className="">
      <Head>
        <html lang="uz"/>
        <title>Intex Shop</title>
        <meta name="description" content="intex-shop.uz, basseyin sotuvlari" />
        <meta name="google-site-verification" content="Unj3YncAX9bahdNokLwauDi1z_7gK9_OM1AQFh3WOaI" />
        <link rel="icon" type="image" href="/miniLogo.png"/>
        <link rel="apple-touch-icon" href="/miniLogo.png" />
      </Head>
      <Header/>
      <Mean/>
      <Footer />
    </div>
  )
}
