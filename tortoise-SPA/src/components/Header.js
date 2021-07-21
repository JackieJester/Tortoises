    import React from 'react'
    import { Link } from 'react-router-dom'

    const Header = () => (
      <nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>EMYS ORBICULARIS</Link>
          <Link className='navbar-brand' to='/create'>Add Tortoise</Link>
          <Link className='navbar-brand' to='/show'>Show Tortoises</Link>
        </div>
      </nav>
    )

    export default Header