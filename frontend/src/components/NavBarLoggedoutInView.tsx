import React from 'react'
import { Button } from 'react-bootstrap'
interface NavBarLoggedInViewProps {
    onSignUpClicked:()=>void,
    onLoginClicked:()=>void,

}

const NavBarLoggedoutInView = ({onSignUpClicked,onLoginClicked}:NavBarLoggedInViewProps) => {

  return (
   <>
   <Button onClick={onSignUpClicked}>Sign up</Button>
   <Button onClick={onLoginClicked}>Log In</Button>
   </>
  )
}

export default NavBarLoggedoutInView