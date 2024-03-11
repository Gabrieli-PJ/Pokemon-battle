import '@/styles/globals.css'
import { useState, useEffect, React } from 'react'
import Router from 'next/router'
import NavHome from '@/components/NavHome'
import Footer from '@/components/Footer'
import PropTypes from 'prop-types'
import Loading from '@/components/loading'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600']
})

export default function App ({ Component, pageProps }) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const startLoading = () => setLoading(true)
    const stopLoading = () => setLoading(false)

    // Event listeners para começar e parar o carregamento
    Router.events.on('routeChangeStart', startLoading)
    Router.events.on('routeChangeComplete', stopLoading)
    Router.events.on('routeChangeError', stopLoading)
    // Remove os eventos da lista durante a limpeza
    return () => {
      Router.events.off('routeChangeStart', startLoading)
      Router.events.off('routeChangeComplete', stopLoading)
      Router.events.off('routeChangeError', stopLoading)
    }
  }, [])

  if (loading) {
    return (<div>
      <NavHome />
      <Loading />
      <Footer />
    </div>)
  }

  return (
  <><div className={`${poppins.className}`}>
    <NavHome />
   <Component {...pageProps} />
   <Footer />
   </div>
  </>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
}
