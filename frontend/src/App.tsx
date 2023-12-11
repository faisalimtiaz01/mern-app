


import LoginModule from "./components/LoginModule";
import NavBar from "./components/NavBar";
import SignUpModel from "./components/SignUpModel";
import { useEffect, useState } from "react";
import { User } from "./models/user";
import * as NotesApi from "./network/note_api";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import NotesPage from "./pages/NotesPage";
import PrivacyPage from "./pages/PrivacyPage";
import NotFoundPage from "./pages/NotFoundPage";
import styles from "./styles/app.module.css"

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [showSignUpModel, setshowsignUpModel] = useState(false);
  const [showLoginModel, setShowLoginModel] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const User = await NotesApi.getLoggedInUser();
        setLoggedInUser(User);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <BrowserRouter>
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onLoggeInClicked={() => setShowLoginModel(true)}
        onLoggedOutSucessfull={() => setLoggedInUser(null)}
        onSignUpClicked={() => setshowsignUpModel(true)}
      />
      <Container className={styles.pageContainer}>
        <Routes>
          <Route path='/'
             element={<NotesPage loggedInUser={loggedInUser}/>}
          />
          <Route path='/privacy'
             element={<PrivacyPage />}
          />
          <Route path='/*'
             element={<NotFoundPage  />}
          />
        </Routes>
      </Container>
  
      {showSignUpModel && (
        <SignUpModel
          onDismiss={() => setshowsignUpModel(false)}
          onSignUpSuccessfull={(user) => {
            setLoggedInUser(user);
            setshowsignUpModel(false);
          }}
        />
      )}

      {showLoginModel && (
        <LoginModule
          onDismiss={() => setShowLoginModel(false)}
          onLoginSuccessfull={(user) => {
            setLoggedInUser(user);
            setShowLoginModel(false);
          }}
        />
      )}
    </div>
    </BrowserRouter>
  );
}

export default App;
