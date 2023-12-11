import React, { useState } from "react";
import { User } from "../models/user";
import { useForm } from "react-hook-form";
import { LoginCredentials } from "../network/note_api";
import * as NotesApi from "../network/note_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputfield from "./form/TextInputfield";
import styleUtils from "../styles/utils.module.css";
import { unAuthorizedError } from "../errors/htttp_errors";

interface loginModelProps {
  onDismiss: () => void;
  onLoginSuccessfull: (user: User) => void;
}

const LoginModule = ({ onDismiss, onLoginSuccessfull }: loginModelProps) => {
  const [errorText,setErrorText] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  async function onSubmit(credentials: LoginCredentials) {
    try {
      const user = await NotesApi.Login(credentials);
      onLoginSuccessfull(user);
    } catch (error) {
      if(error instanceof unAuthorizedError){
        setErrorText(error.message)
      } else{
        alert(error);
      }
      
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Log in</Modal.Title>
      </Modal.Header>
      <Modal.Body>


    {
      errorText && <Alert variant="danger">
        {errorText}
      </Alert>
    }
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputfield
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />

          <TextInputfield
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className={styleUtils.width180}
          >
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModule;
