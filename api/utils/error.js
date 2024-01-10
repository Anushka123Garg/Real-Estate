export const errorHandler = (statusCode,message)=> {
    //error created bu us : a manual error
    const error = new Error()
    error.statusCode = statusCode;
    error.message = message;
    return error;
}