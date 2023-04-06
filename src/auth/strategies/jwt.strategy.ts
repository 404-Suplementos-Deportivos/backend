import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import configuration from "src/config/configuration";
import { JwtPayloadModel } from "../models/token.model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: configuration().jwt.secret,
    });
  }

  async validate(payload: JwtPayloadModel): Promise<JwtPayloadModel> {
    return { 
      id: payload.id, 
      email: payload.email, 
      nombre: payload.nombre,
      rol: payload.rol
    };
  }
}