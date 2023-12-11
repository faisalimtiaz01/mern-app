
import { ConflictError, unAuthorizedError } from "../errors/htttp_errors";
import { Note } from "../models/note";
import { User } from "../models/user";



async function fetchData(input: RequestInfo , init?: RequestInit ){
    console.log(input, init)

    const response  = await fetch(input,init)

    if(response.ok){
     return response;
    }
    else{
        const errorody = await response.json()
        const errormessage = errorody.error;
        if(response.status === 401){
            throw new unAuthorizedError(errormessage)
        }
        else if(response.status === 401) {

            throw new ConflictError(errormessage)
        }else{
            throw Error("Request failed with status:"+ response.status+"message" + errormessage);
        }
     
    }

};

export async function getLoggedInUser():Promise<User> {
    const response = await fetchData("/api/users",{method:"GET"});
    return response.json();
    
}

export interface signUpCredntials {
    username:string,
    email:string,
    password:string
}

export async function signUp(credentials:signUpCredntials):Promise<User> {

    const response = await fetchData("/api/users/signup", {method:"POST",headers:{
        "content-Type" : "application/json"
    },
    body:JSON.stringify(credentials)
    

})
return response.json();
    
}

export interface LoginCredentials{
    username:string,
    password:string
} 

export async function Login(credentials:LoginCredentials):Promise<User> {

    
    const response = await fetchData("/api/users/login", {method:"POST",headers:{
        "content-Type" : "application/json"
    },
    body:JSON.stringify(credentials)
    

})
return response.json();
    
}

export async function logout() {

    await fetchData("/api/users/logout",{method:"POST"})
    
}



export async function fetchNodes():Promise<Note[]>{

    const response = await fetchData('/api/notes',{method:"GET"});
    return  response.json();

}


export interface NoteInput {
title:string,
text?:string

}


export async function createNote(note:NoteInput):Promise<Note> {
   const response = await fetchData("/api/notes",{


    method:"POST",
    headers:{
        "Content-Type": "application/json"
    },
    body:JSON.stringify(note),

   }
   )
   return response.json()
}

export async function updateNote(noteId:string,note:NoteInput):Promise<Note>{
    
    const response = await fetchData("/api/notes/" + noteId,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(note),
    })
    return response.json()
}

export async function deleteNote(noteId:string){
    await fetchData(`/api/notes/${noteId}`, {method:"DELETE"});

}
