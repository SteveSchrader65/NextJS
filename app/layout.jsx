// FIREBASE: https://console.firebase.google.com/project/oneringrentals/firestore/databases/-default-/data/~2FpropertyData~2F0f8SvY9IIcpVQRRVvZCo

import { StatesProvider } from "./hooks/useStates"
import {Inter} from "next/font/google"
import Header from "./components/Header"
import Footer from "./components/Footer"
import "./globals.css"
import "bootstrap/dist/css/bootstrap.css"

const inter = Inter({subsets: ["latin"]})

export const metadata = {
  title: "One Ring",
  description:
    "Assessment3 for Web Application Development. This site recreates the One Ring Rentals web-site, using NextJS and Firebase.",
}

export default function RootLayout({children}) {

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={inter.className}>
        <StatesProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </StatesProvider>
      </body>
    </html>
  )
}
