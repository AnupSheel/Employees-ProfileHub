import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import React from 'react';
import { Link } from 'react-router-dom';
import Badge from './Badge';

const Profiles = ({name,department,description,id,imageUrl,excerpt,handleDelete}) => {
  return (
    <MDBCol size="4">
        <MDBCard className='h-100 mt-2' style={{maxWidth:"22rem"}}>
            <MDBCardImage src={imageUrl} alt={name} position='top' style={{maxWidth:"100%",height:"180px"}} />
            <MDBCardBody>
                <MDBCardTitle>{name}</MDBCardTitle>
                <MDBCardText>{excerpt(description)}</MDBCardText>
                <Link to={`/profile/${id}`}>Read more...</Link>
                <Badge>{department}</Badge>
                <span>
                    <MDBBtn className='mt-1' tag="a" color='none' onClick={()=>handleDelete(id)}>
                        <MDBIcon fas icon='trash' style={{color:"#dd4b39"}} size='lg'></MDBIcon>
                    </MDBBtn>
                    <Link to={`/editProfile/${id}`}>
                    <MDBIcon fas icon='edit' style={{color:"#55acee",marginLeft:"10px"}} size='lg'></MDBIcon>
                    </Link>
                </span>
            </MDBCardBody>
        </MDBCard>
    </MDBCol>
  )
}

export default Profiles
