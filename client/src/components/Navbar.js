import React, { useState } from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBBtn,
    MDBNavbarBrand,
    MDBCollapse
} from 'mdb-react-ui-kit';

export default function Navbar() {
    const [showNavColor, setShowNavColor] = useState(false);
    const [showNavColorSecond, setShowNavColorSecond] = useState(false);
    const [showNavColorThird, setShowNavColorThird] = useState(false);

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
                                <MDBNavbarLink aria-current='page' href='#' className='text-dark'>Home  </MDBNavbarLink>
                            </MDBNavbarItem>

                            <MDBNavbarItem>
                                <MDBNavbarLink href='#' className='text-dark'>Party/Election</MDBNavbarLink>
                            </MDBNavbarItem>

                            <MDBNavbarItem>
                                <MDBNavbarLink href='#' className='text-dark'>State</MDBNavbarLink>
                            </MDBNavbarItem>

                            <MDBNavbarItem>
                                <MDBNavbarLink href='#' className='text-dark'>Add Voters</MDBNavbarLink>
                            </MDBNavbarItem>

                          



                        </MDBNavbarNav>
                        <MDBNavbarNav right fullWidth={false} className="border  rounded border-dark mx-5 bg-dark  text-light " >
                            <MDBNavbarItem className="float-end bg-success  mx-3 "  >                                
                                <MDBNavbarLink href='#' className=''>Login</MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem className="float-end mx-3"  >                                
                                <MDBNavbarLink href='#' className=''>Signup</MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem className="float-end  mx-3 bg-danger "  >                                
                                <MDBNavbarLink href='#' className=''>Logout</MDBNavbarLink>
                            </MDBNavbarItem>
                        </MDBNavbarNav>

                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </>
    );
}