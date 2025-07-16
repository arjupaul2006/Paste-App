import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row gap-7 justify-evenly'>
      <NavLink to={"/"} className={({isActive}) => isActive ? "underline underline-offset-1" : ""}>
        Home
      </NavLink>

      <NavLink to={"/pastes"} className={({isActive}) => isActive ? "underline underline-offset-1" : ""}>
        Pastes
      </NavLink>
    </div>
  )
}

export default Navbar
