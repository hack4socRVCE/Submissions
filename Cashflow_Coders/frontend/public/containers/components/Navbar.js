import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <Fragment>
            <nav className='navbar navbar-expand-lg navbar-light bg-info'>
                <Link className='navbar-brand' to='/' style={{ fontSize: '24px', fontFamily: 'Arial, sans-serif' }}>
                    Cashflow Coders
                </Link>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-toggle='collapse'
                    data-target='#navbarNav'
                    aria-controls='navbarNav'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav ml-auto'>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/dashboard' style={{ fontSize: '18px', fontFamily: 'Arial, sans-serif' }}>
                                Dashboard
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/login' style={{ fontSize: '18px', fontFamily: 'Arial, sans-serif' }}>
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </Fragment>
    );
};

export default Navbar;
