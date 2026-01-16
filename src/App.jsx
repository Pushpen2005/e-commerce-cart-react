import React from 'react'
import './App.css'
import { BrowserRouter,Routes,Route   } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Cart from './pages/Cart.jsx'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { DataProvider } from './context/DataContext.jsx'
import { ClerkProvider } from '@clerk/clerk-react'  
import Footer from './components/Footer.jsx'



const App = () => {
  const[location,setLocation] = useState(null)

 
    const getlocation = async() => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const {latitude,longitude} = position.coords
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        try{
          const location = await axios.get(url)

          setLocation({
          city: location.data.address.city || location.data.address.town,
          country: location.data.address.country
        })
        }
        catch(err){
          console.log(err)
        }
      })
    }

    useEffect(() => {
      getlocation()
    }, [])

  return (
    <DataProvider>
      <BrowserRouter>
        <Navbar location={location} getLocation={getlocation} />
        <Routes>
          <Route path='/' element={<Home  />} />
          <Route path='/products' element={<Products />} />
          <Route path='/about' element={<About />} /> 
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </DataProvider>
  )
}

export default App
