import * as bcrypt from 'bcrypt'

export const encryptPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (e) {
    console.log(e);
  }
}

export const matchPassword = async (password: string, savedPassword: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (e) {
    console.log(e);
  }
}