import React from 'react'
import styles from "../styles/NotesPage.module.css";
import { Container } from 'react-bootstrap'
import NodeLoginPageView from "../components/NodeLoginPageView";
import Notepagelogoutview from "../components/Notepagelogoutview";
import { User } from '../models/user';

interface NotesPageProps {
    loggedInUser:User | null,
}

const NotesPage = ({loggedInUser}:NotesPageProps) => {
  return (
    <Container className={styles.NotesPage}>
    <>{loggedInUser ? <NodeLoginPageView /> : <Notepagelogoutview />}</>
  </Container>
  )
}

export default NotesPage