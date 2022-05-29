import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Preloader from 'components/Preloader/Preloader'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
        <Preloader/>
        <Component {...pageProps} />
    </>
  )
}

export default MyApp
