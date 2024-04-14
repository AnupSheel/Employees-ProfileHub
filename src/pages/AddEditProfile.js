/* eslint-disable */
import axios from 'axios';
import { MDBBtn, MDBInput, MDBValidation } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialState = {
  name: '',
  description: '',
  department: '',
  imageUrl: ''
};

const options = ["Development", "HR", "Sales", "Finance", "Testing", "BPO"];

const AddEditProfile = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [departmentErrMsg, setDepartmentErrMsg] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const { name, description, department, imageUrl } = formValue;

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setEditMode(true);
      getSingleProfile(id);
    } else {
      setEditMode(false);
      setFormValue({ ...initialState })
    }
  }, [id])

  const getSingleProfile = async (id) => {
    const singleProfile = await axios.get(`http://localhost:5000/profiles/${id}`);
    if (singleProfile.status === 200) {
      setFormValue({ ...singleProfile.data });
    } else {
      toast.error("Something went wrong");
    }
  }

  const getDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!department) {
      setDepartmentErrMsg("Please select a department");
    }

    const imageValidation = !editMode ? imageUrl : true;
    if (name && description && imageUrl && department) {
      const currentDate = getDate();
      if(!editMode){
        const updatedProfileData = { ...formValue, date: currentDate };
        const response = await axios.post("http://localhost:5000/profiles", updatedProfileData);
        if (response.status === 201) {
          toast.success("Profile added successfully!");
        } else {
          toast.error("Something went wrong. Please try again!");
        }
      }else{
        const response = await axios.put(`http://localhost:5000/profiles/${id}`, formValue);
        if (response.status === 200) {
          toast.success("Profile updated successfully!");
        } else {
          toast.error("Something went wrong. Please try again!");
        }
      }
      setFormValue({ name: "", description: "", department: "", imageUrl: "" })
      navigate("/")
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onUploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "xdo2ekls");

    try {
      const response = await axios.post("http://api.cloudinary.com/v1_1/dym3wye9y/image/upload", formData);
      setFormValue({ ...formValue, imageUrl: response.data.url });
      toast.info("Image Uploaded Successfully");
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  const onDepartmentChange = (e) => {
    setDepartmentErrMsg(null);
    setFormValue({ ...formValue, department: e.target.value });
  };



  return (
    <MDBValidation className="row g-3" style={{ marginTop: "100px" }} noValidate onSubmit={handleSubmit}>
      <p className="fs-2 fw-bold">{editMode ? "update Profile" : "Add Profile"}</p>
      <div style={{ margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center" }}>
        <MDBInput
          value={name}
          name="name"
          type="text"
          onChange={onInputChange}
          required
          label="Name"
          validation="Please provide person name"
          invalid
        />
        <br />
        <MDBInput
          value={description}
          name="description"
          onChange={onInputChange}
          required
          label="Description"
          validation="Please provide description"
          textarea
          rows={4}
          invalid
        />
        <br />
        {!editMode && (
          <>
            <MDBInput
              type="file"
              onChange={(e) => onUploadImage(e.target.files[0])}
              required
              validation="Please provide person Image"
              invalid
            />
          </>
        )}
        <br />
        <select className="departmentDropdown" onChange={onDepartmentChange} value={department}>
          <option>Please select a department</option>
          {options.map((option, index) => (
            <option value={option} key={index}>{option}</option>
          ))}
        </select>
        {departmentErrMsg && (
          <div className="departmentErrorMsg">{departmentErrMsg}</div>
        )}
        <br />
        <br />
        <MDBBtn type="submit" style={{ marginRight: "10px" }}>{editMode ? "update" : "Add"}</MDBBtn>
        <MDBBtn type="button" color="danger" onClick={() => navigate("/")}>Go Back</MDBBtn>
      </div>
    </MDBValidation>
  );
};

export default AddEditProfile;
