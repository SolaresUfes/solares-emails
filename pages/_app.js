import { Provider } from 'next-auth/client'
import { EmailsDataProvider } from '../contexts/EmailsDataContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <EmailsDataProvider>
        <Component {...pageProps} />
      </EmailsDataProvider>
    </Provider>
  )
}

export default MyApp
