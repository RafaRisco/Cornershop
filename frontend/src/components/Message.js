import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'

function Message({variant, children}){

  const[display, setDisplay] = useState(true)

  useEffect(() => {
    setTimeout(() => setDisplay(false), 6000);
  })

  return (
    <Alert variant={variant} className={display ? ('text-center') : ('text-center d-none')}>
      {children}
    </Alert>
  )
}

export default Message