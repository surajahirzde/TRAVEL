import React, { Suspense } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
 import RootLayout from './Helper/Rootlayout'



 const Home = React.lazy(() => import('./Components/Home'))
 const Contact = React.lazy(() => import('./Components/Contact'))
 const Services = React.lazy(() => import('./Components/Services'))
 const About = React.lazy(() => import('./Components/About'))
 const ErrorPage = React.lazy(() => import('./Helper/ErrorPage'))
 const Booking = React.lazy(() => import('./Service/Booking'))

const routes = createBrowserRouter(createRoutesFromElements(
    <Route errorElemet={<ErrorPage />} path="/" element={<RootLayout />}>

        <Route index element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/booking" element={<Booking/>} />
        <Route path="/tickets" element={<ErrorPage />} />
 

    </Route>
))



const App = () => {





    return (
      <Suspense fallback={<div className="loading-screen">Loading...</div>}>
      <RouterProvider router={routes} />
    </Suspense>
    )
}

export default App