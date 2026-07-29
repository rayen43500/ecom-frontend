import React from 'react'
import Helmet from "react-helmet";
function MataData({title}) {
  return (
  <Helmet>
     <title>{title ? `${title} - WORKSHOOP` : "WORKSHOOP"}</title>

  </Helmet>
  )
}

export default MataData