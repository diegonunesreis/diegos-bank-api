import bcryptjs from "bcryptjs";

export const createPasswordHash = async (password) =>
  bcryptjs.hash(password, 8);

export const checkPassword = async (s, hash) =>
  bcryptjs.compare(s, hash);