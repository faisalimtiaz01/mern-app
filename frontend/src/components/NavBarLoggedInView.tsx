
import React from 'react'
import { User } from '../models/user'
import * as NoteApis from '../network/note_api'
import { Button, Navbar } from 'react-bootstrap';
 
interface NavBarLoggedInViewProps {
    user:User,
    onLoggeoutSuccessful:()=>void,
}

const NavBarLoggedInView = ({user,onLoggeoutSuccessful}:NavBarLoggedInViewProps) => {

    async function logout() {
        try {
            await NoteApis.logout();
            onLoggeoutSuccessful();
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }
  return (
<>
   
   <Navbar.Text className='me-2' >Signed in as:{user.username} </Navbar.Text>
   <Button onClick={logout}>Log Out</Button>

</>
  )
}

export default NavBarLoggedInView