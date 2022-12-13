import '../styles/TileMap.css'
import type { AppProps } from 'next/app'
import { Router } from 'next/router'
import NProgress from 'nprogress' //nprogress module
import { Provider } from 'react-redux'

import store from '../state/store'
import Layout from '../components/Layout'

import '/styles/nprogress.css' //styles of nprogress
import '../styles/globals.css'

NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => {
  return NProgress.start()})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
export default MyApp
