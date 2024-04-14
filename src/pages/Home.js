/* eslint-disable */
import axios from 'axios';
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Department from '../components/Department';
import Pagination from '../components/Pagination';
import Profiles from '../components/Profiles';
import Search from '../components/Search';

const Home = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalProfile, setTotalProfile] = useState(null);// eslint-disable-next-line
  const [pageLimit, setPageLimit] = useState(5);// eslint-disable-next-line

  const options = ["Development", "HR", "Sales", "Finance", "Testing", "BPO"];

  useEffect(() => {
    loadProfileData(0, 5, 0)
  }, [])

  const loadProfileData = async (start, end, increase,operation) => {
    const response = await axios.get(`http://localhost:5000/profiles?_start=${start}&_end=${end}`);
    if (response.status === 200) {
      setData(response.data)
      if(operation) {
        setCurrentPage(0)
      }else{
        setCurrentPage(currentPage + increase);
      }
    } else {
      toast.error("Something went wrong");
    }
  }

  console.log("data", data);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure that you wanted to delete that profile?")) {
      const response = await axios.delete(`http://localhost:5000/profiles/${id}`);
      if (response.status === 200) {
        toast.success("Profile Deleted Successfully!");
        loadProfileData(0,5,0,"delete");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const excerpt = (str) => {
    if (str.length > 50) {
      str = str.substring(0, 50) + " ... ";
    }
    return str;
  }

  const onInputChange = (e) => {
    if (!e.target.value) {
      loadProfileData(0,5,0);
    }
    setSearchValue(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(`http://localhost:5000/profiles?department=${searchValue}`);
    if (response.status === 200) {
      setData(response.data)
    } else {
      toast.error("Something went wrong");
    }
  }

  const handleDepartment = async (department) => {
    const response = await axios.get(`http://localhost:5000/profiles?department=${department}`);
    if (response.status === 200) {
      setData(response.data);
    } else {
      toast.error("Something went wrong");
    }
  }
  return (
    <>
      <Search searchValue={searchValue} onInputChange={onInputChange} handleSearch={handleSearch}></Search>
      <MDBRow>
        {data.length === 0 && (
          <MDBTypography className='text-center mb-0' tag="h2">
            No  profiles found!
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow>
              {data && data.map((item, index) => (
                <Profiles key={index} {...item} excerpt={excerpt} handleDelete={handleDelete}></Profiles>
              ))}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
        <MDBCol size="3">
          <Department options={options} handleDepartment={handleDepartment}></Department>
        </MDBCol>
      </MDBRow>
      <div className='mt-3'>
        <Pagination currentPage={currentPage} loadProfileData={loadProfileData} pageLimit={pageLimit} data={data} totalProfile={totalProfile}></Pagination>
      </div>
    </>
  )
}

export default Home
