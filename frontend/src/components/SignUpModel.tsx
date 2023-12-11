import React, { useState } from "react";
import { User } from "../models/user";
import { useForm } from "react-hook-form";
import { signUpCredntials } from "../network/note_api";
import * as NotesApi from "../network/note_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputfield from "./form/TextInputfield";
import styleUtils from "../styles/utils.module.css";
import { ConflictError } from "../errors/htttp_errors";

interface SignupModelProps {
  onDismiss: () => void;
  onSignUpSuccessfull: (user: User) => void;
}

const SignUpModel = ({ onDismiss, onSignUpSuccessfull }: SignupModelProps) => {

  const [errorText,setErrorText] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signUpCredntials>();

  async function onSumit(credentials: signUpCredntials) {
    try {
      const newUser = await NotesApi.signUp(credentials);
      onSignUpSuccessfull(newUser);
    } catch (error) {
 if(error instanceof ConflictError){
   setErrorText(error.message)
 }
 else{
  alert(error);
 }

    
      console.error(error);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>sign Up</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {
          errorText &&  
          <Alert variant="danger">
            {errorText}
          </Alert>
        }
        <Form onSubmit={handleSubmit(onSumit)}>
          <TextInputfield
            name="username"
            label="Username"
            type="text"
            placeholder="username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />

          {/*email input */}

          <TextInputfield
            name="email"
            label="email"
            type="email"
            placeholder="email"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.email}
          />

          {/*  */}

          <TextInputfield
            name="password"
            label="password"
            type="password"
            placeholder="password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className={styleUtils.width180}
          >
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModel;
