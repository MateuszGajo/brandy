import { IUser, IUserLogin, IUserRegister } from "@/interfaces/IUser";
import { Inject, Service } from "typedi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";
import APIError from "../api/Error/APIError";
import { Logger } from "winston";

@Service()
export default class AuthService {
  constructor(
    @Inject("userModel") private userModel: Models.UserModel,
    @Inject("logger") private logger: Logger
  ) {}

  public async signUp(
    userRegister: IUserRegister
  ): Promise<{ user: IUser; accessToken: string; refreshToken: string }> {
    const isEmailRegistered = await this.userModel.findOne({
      email: userRegister.email,
    });
    if (isEmailRegistered) throw new APIError("User already exists", 409);

    const hashedPassword = await bcrypt.hash(userRegister.password, 10);
    const userRecord = await this.userModel.create({
      ...userRegister,
      password: hashedPassword,
    });

    const accessToken = this.generateToken(userRecord, "accessToken");
    const refreshToken = this.generateToken(userRecord, "refreshToken");

    const user = userRecord.toObject();
    Reflect.deleteProperty(user, "password");

    return { user, accessToken, refreshToken };
  }

  public async signIn(
    userLogin: IUserLogin
  ): Promise<{ user: IUser; accessToken: string; refreshToken: string }> {
    console.log("Hello?");
    console.log(this.userModel);
    const userRecord = await this.userModel.findOne({ email: userLogin.email });

    if (!userRecord) {
      throw new APIError("User not registered", 404);
    }

    const validPassword = bcrypt.compare(
      userRecord.password,
      userLogin.password
    );
    if (!validPassword) throw new APIError("Incorrect password", 401);
    this.logger.silly("Password is valid, generating jwt");

    const accessToken = this.generateToken(userRecord, "accessToken");
    const refreshToken = this.generateToken(userRecord, "refreshToken");

    const user = userRecord.toObject();
    Reflect.deleteProperty(user, "password");

    return { user, accessToken, refreshToken };
  }

  public refreshToken(refreshToken: string): { accessToken: string } {
    const validRefreshToken = jwt.verify(refreshToken, config.jwtRefreshSecret);

    if (!validRefreshToken) throw new APIError("Refresh token is invalid", 401);

    const user = jwt.decode(refreshToken) as IUser;

    const accessToken = this.generateToken(user, "accessToken");
    return { accessToken };
  }

  private generateToken(user: IUser, type: "accessToken" | "refreshToken") {
    this.logger.silly(`Generate JWT for userID: ${user._id}`);

    const isAccessToken = type === "accessToken";
    const expiresIn = isAccessToken ? "1h" : "7d";

    const jwtPayload = {
      _id: user._id,
      nick: user.nick,
    };
    const jwtSecret = isAccessToken
      ? config.jwtAccessSecret
      : config.jwtRefreshSecret;
    const jwtOption = {
      expiresIn,
    };

    return jwt.sign(jwtPayload, jwtSecret, jwtOption);
  }
}
