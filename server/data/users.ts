import { IUserRegister } from "@/interfaces/IUser";
import bcrypt from "bcrypt";
import faker from "@faker-js/faker";

export default async (
  password: string,
  userNumber: number
): Promise<IUserRegister[]> => {
  const hashPassword = await bcrypt.hash(password, 10);
  return Array.from(new Array(userNumber)).map(() => {
    return {
      nick: faker.name.findName(),
      email: faker.internet.email(),
      password: hashPassword,
    };
  });
};
