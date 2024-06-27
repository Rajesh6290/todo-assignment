import React from 'react'

const Navbar = () => {
    return (
        <nav className='w-full sticky top-0 bg-white p-5 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] z-[999]'>
            <p className='main-container w-full flex items-center justify-center font-semibold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400  text-transparent bg-clip-text text-xl'>
                Todos Services. Make It Easy !
            </p>
        </nav>
    )
}

export default Navbar