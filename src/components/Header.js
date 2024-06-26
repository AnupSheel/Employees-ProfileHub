import {
    MDBCollapse,
    MDBContainer,
    MDBIcon,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarNav,
    MDBNavbarToggler
} from 'mdb-react-ui-kit';
import React, { useState } from 'react';

const Header = () => {
    const [show, setShow] = useState(false);
    return (
        <div>
            <MDBNavbar expand='lg' light style={{ backgroundColor: '#541b1b' }}>
                <MDBContainer fluid>
                    <MDBNavbarBrand href='/' style={{color:"white"}}>
                        <img src="/images//logo.png" alt='logo' style={{height:"30px",backgroundColor:"white"}}></img>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler
                        type='button'
                        data-target='#navbarColor02'
                        aria-controls='navbarColor02'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        style={{color:"#fff"}}
                        onClick={() => setShow(!show)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>
                    <MDBCollapse show={show} navbar>
                        <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
                            <MDBNavbarItem className='active'>
                                <MDBNavbarLink aria-current='page' href='/' style={{ color: "#fff" }}>
                                    Home
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/addProfile' style={{ color: "#fff" }}>Add Profile</MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/about' style={{ color: "#fff" }}>About</MDBNavbarLink>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </div>
    )
}

export default Header
