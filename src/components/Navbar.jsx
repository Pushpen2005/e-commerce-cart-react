import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { FaCaretDown } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { IoCartOutline } from 'react-icons/io5'
import { CgClose } from 'react-icons/cg'
import { useState } from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { useCart } from '../context/CartContext.jsx'



const Navbar = ({ location,getLocation }) => {
    const[openDropdown,setOpenDropdown] = useState(false);
    const toggleDropdown = ()=>{
        setOpenDropdown(!openDropdown)
    }
const { cart } = useCart();
const totalProducts = cart.length;
    return (
        <div className='bg-linear-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] py-3 shadow-2xl w-full h-19 px-4 md:px-0 flex justify-between items-center'>

            <div className="max-w-6xl mx-10 flex justify-baseline items-center  w-full">

                {/* Logo Section */}
                <div className='flex gap-7 items-center' >
                    <Link to={'/'}><h1 className="font-bold text-3xl text-white" ><span className="text-blue-700">F</span>astro</h1></Link>
                </div>
                <div className="flex gap-1 cursor-pointer text-gray-400 items-center" >
                    <MapPin className='text-blue-700' />
                    <span className='font-semibold'>
                        {location ? (
                            <div className='-y-2 ' >
                                <p>{location.country}</p>
                                <p>{location.city}</p>
                            </div>
                        ) : (
                            "Add Address"
                        )}
                    </span>

                    <FaCaretDown onClick={toggleDropdown} />
                </div>
                {
                        openDropdown ? <div className='w-[250px] h-max shadow-2xl z-50 bg-white fixed top-16 left-60 border-2 p-5 border-gray-100 rounded-md'>
                         <h1 className='font-semibold mb-4 text-xl flex justify-between'>Change Location <span onClick={toggleDropdown}><CgClose/></span></h1>
                         <button onClick={getLocation} className='bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-400'>Detect my location</button>
                        </div> : null
                    }
            </div>
            {/* menu section */}
            <nav className='flex gap-7 items-center text-xl font-semibold pr-5 text-white'>
                <ul className='flex gap-7 items-center text-xl font-semibold text-white'>
                    <NavLink to={'/'} className={({ isActive }) => `${isActive ? "border-b-2 transition-all border-red-500" : "text-black"} cursor-pointer`}><li>Home</li></NavLink>
                    <NavLink to={"/products"} className={({ isActive }) => `${isActive ? "border-b-2 transition-all border-red-500" : "text-black"} cursor-pointer`}><li>Products</li></NavLink>
                    <NavLink to={"/about"} className={({ isActive }) => `${isActive ? "border-b-2 transition-all border-red-500" : "text-black"} cursor-pointer`}><li>About</li></NavLink>
                    <NavLink to={"/contact"} className={({ isActive }) => `${isActive ? "border-b-2 transition-all border-red-500" : "text-black"} cursor-pointer`}><li>Contact</li></NavLink>
                </ul>
                <Link to={'/cart'} className='relative' >
                    <IoCartOutline className='h-7 w-7 cursor-pointer' />
                    <span className='text-white-100 bg-blue-600 px-2 rounded-full absolute -top-5 -right-4 ' >{totalProducts}</span>
                </Link >
                <div className='ml-4 flex items-center'>
                    <SignedOut>
                        <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer text-sm whitespace-nowrap" />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>

            </nav>

        </div >
    )
}

export default Navbar
