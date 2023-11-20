import { createError } from "../errorUtils/createError";

export const validateEmail = (email:string) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(!emailPattern.test(email)) {
    throw createError('Invalid email', 422);
  }
}
