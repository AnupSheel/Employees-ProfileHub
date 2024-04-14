/* eslint-disable */
import axios from 'axios';
import { MDBContainer, MDBIcon, MDBTypography } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Badge from '../components/Badge';

const Profile = () => {
  const [profile, setProfile] = useState();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleProfile();
    }
  }, [id]);

  const getSingleProfile = async () => {
    const response = await axios.get(`http://localhost:5000/profiles/${id}`);
    if (response.status === 200) {
      setProfile(response.data);
    } else {
      toast.error("Something went wrong");
    }
  };

  const styleInfo = {
    display: "inline",
    marginLeft: "5px",
    float: "right",
    marginTop: "7px"
  }
  return (
    <MDBContainer style={{ border: "1px solid #d1ebe8" }}>
      <Link to="/">
        <strong style={{ float: "left", color: "black" }} className='mt-3'>Go Back</strong>
      </Link>
      <MDBTypography tag="h2" className='text-muted mt-2' style={{ display: "inline-block" }}>
        {profile && profile.name}
      </MDBTypography>
      <img src={profile && profile.imageUrl} className='img-fluid rounded' alt={profile && profile.name} style={{ width: "100%", maxHeight: "600px" }} />
      <div style={{ marginTop: "20px" }}>
        <div style={{ height: "43px", background: "#f6f6f6" }}>
          <MDBIcon style={{ float: "left" }} className='mt-3' far icon='calendar-alt' size='lg'></MDBIcon>
          <strong style={{ float: "left", marginTop: "12px", marginLeft: "2px" }}>{profile && profile.date}</strong>
          <Badge styleInfo={styleInfo}>{profile && profile.department}</Badge>
        </div>
        <MDBTypography className='lead md-0'>
          {profile && profile.description}
        </MDBTypography>
      </div>
    </MDBContainer>
  )
}

export default Profile
