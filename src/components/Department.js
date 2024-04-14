import { MDBCard, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import React from 'react';

const Department = ({handleDepartment,options}) => {
  return (
    <MDBCard style={{width:"18rem",marginTop: "20px"}}>
        <h4>Departments</h4>
        <MDBListGroup flush>
            {options.map((item,index)=> (
                <MDBListGroupItem key={index} style={{cursor:"pointer"}} onClick={()=>handleDepartment(item)}>
                    {item}
                </MDBListGroupItem>
            ))}
        </MDBListGroup>
    </MDBCard>
  )
}

export default Department
