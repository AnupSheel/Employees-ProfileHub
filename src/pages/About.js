import { MDBContainer, MDBTypography } from 'mdb-react-ui-kit'
import React from 'react'

const About = () => {
  return (
    <div style={{marginTop:"100px"}}>
      <MDBContainer>
        <MDBTypography note noteColor='primary'> 
        It is a Employee Profile Management Website where you will find Employees profile Details related to different working Department like Development,HR,Sales,Finance,Testing and BPO.
        </MDBTypography>
      </MDBContainer>
    </div>
  )
}

export default About
