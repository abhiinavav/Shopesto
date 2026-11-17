
import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'

const Header = () => {
    return (
        <header className='flex items-center justify-between px-10 md:px-20 py-6 bg-white shadow-sm'>

            {/* Logo */}
            <Link to="/" className='text-2xl font-bold'>
                Shopes<span className='text-orange-500'>too.</span>
            </Link>

            {/* Navigation */}
            <nav className='flex items-center gap-6 md:gap-10 text-gray-700 font-medium'>
                <Link to="/">Home</Link>
                <Link to="/product">Products</Link>

                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/cart" className='flex items-center gap-2 hover:text-orange-500'>
                    <ShoppingCart size={21} />
                    Cart
                </Link>

            </nav>

            {/* Actions */}
            <div className='flex items-center gap-4'>
                <Link to="/login"
                    className='text-gray-700 hover:text-orange-500'>
                    Login
                </Link>

                <Link to="/register"
                    className='bg-orange-500 text-white px-5 py-2 rounded-md hover:bg-orange-600 transition'>
                    Sign Up
                </Link>
            </div>

        </header>
    )
}

export default Header
