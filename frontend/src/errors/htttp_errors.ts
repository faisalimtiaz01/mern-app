

class HttpError extends Error {
    constructor(message?:string){
        super(message);
        this.name= this.constructor.name
    }
}

// *status code: 401

export class unAuthorizedError extends HttpError {}

export class ConflictError extends HttpError{}

// add more error classes if you dustangustion
