import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

import {
    MDBNavbar,
    MDBContainer,    
    MDBNavbarNav,
    MDBNavbarItem,    
    MDBNavbarBrand,
    MDBCollapse
} from 'mdb-react-ui-kit';
import { positions, useAlert } from 'react-alert'






export default function Navbar() {
    const alert = useAlert()
    const [showNavColor, setShowNavColor] = useState(false);

    // const [showNavColorSecond, setShowNavColorSecond] = useState(false);
    // const [showNavColorThird, setShowNavColorThird] = useState(false);
    const logOut = () => {

        alert.success('loout successfully', {
            position: positions.TOP_CENTER,
            timeout: 5000,
        })
        localStorage.removeItem("userMailId");
        localStorage.removeItem("Token");


    }

    return (
        <>
            <MDBNavbar expand='lg' dark style={{ background: '#FBBF77' }}  >
                <MDBContainer fluid >

                    <MDBNavbarBrand className='text-dark'>LOGO</MDBNavbarBrand>
                    {/* 
                    <MDBNavbarToggler
                        type='button'
                        data-target='#navbarColor02'
                        aria-controls='navbarColor02'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setShowNavColor(!showNavColor)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler> */}

                    <MDBCollapse navbar show={showNavColor} >

                        <MDBNavbarNav fullWidth={false} className='me-auto mb-2 mb-lg-0 '  >                          


                            <MDBNavbarItem className='active'>
                                <Link className='btn' aria-current='page' id="RouterNavLink" to="/"  >Home</Link>
                            </MDBNavbarItem>

                            <MDBNavbarItem className='active'>
                                <Link className='btn' aria-current='page' id="RouterNavLink" to="/officeWork"  >Office Work</Link>
                            </MDBNavbarItem>

                            <MDBNavbarItem>
                                <Link className='btn' id="RouterNavLink" to="/DeclareState"  >Declare State</Link>
                            </MDBNavbarItem>

                            <MDBNavbarItem>
                                <Link className='btn' id="RouterNavLink" to="/stateinfo"  >State Info</Link>
                            </MDBNavbarItem>

                            <MDBNavbarItem>
                                <Link className='btn' id="RouterNavLink" to="/"  >Add Voters</Link>
                            </MDBNavbarItem>



                        </MDBNavbarNav>




                        <MDBNavbarNav right fullWidth={false} className="border rounded border-dark  bg-dark   " >

                            <MDBNavbarItem className="float-end bg-success  mx-3 rounded "  >
                                <Link className='btn' id="RouterNavLink" to="/login"  >Login</Link>
                            </MDBNavbarItem>

                            {
                                localStorage.getItem("userMailId") &&
                                    localStorage.getItem("Token") ?
                                    <MDBNavbarItem className="float-end  mx-3 bg-danger rounded "  >
                                        <Link className='btn' id="RouterNavLink" to="/" onClick={logOut} >Logout</Link>
                                    </MDBNavbarItem>
                                    :
                                    null
                            }

                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </>
    );
}