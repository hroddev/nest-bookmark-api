import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { Prisma } from "@prisma/client";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
    ) { }

    async signup(dto: AuthDto) {
        try {
            // generate the password hash
            const hash = await argon.hash(dto.password)

            // save de user in the db
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                }
            })
            delete user.hash
            // return the create user
            return this.signToken(user.id, user.email)

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw error
        }
    }

    async signin(dto: AuthDto) {

        // find the user
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        // If the user does not exist
        if (!user) {
            throw new ForbiddenException('Credentials Incorrect')
        }
        // compare password
        const pwMatches = await argon.verify(user.hash, dto.password)
        if (!pwMatches) {
            throw new ForbiddenException('Credentials Incorrect')
        }

        return this.signToken(user.id, user.email)
    }

    async signToken(userId: number, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email
        }

        const secret = this.config.get('JWT_SECRET')

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret
        })

        return { access_token: token }
    }
}