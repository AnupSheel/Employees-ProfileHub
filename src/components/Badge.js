import { MDBBadge } from 'mdb-react-ui-kit'
import React from 'react'

const Badge = ({children,styleInfo}) => {
    const colorKey = {
        Development: "primary",
        HR:"success",
        Sales:"danger",
        Finance: "warning",
        Testing:"info",
        BPO:"dark"
    }
  return (
    <h5 style={styleInfo}>
      <MDBBadge color={colorKey[children]}>{children}</MDBBadge>
    </h5>
  )
}

export default Badge
