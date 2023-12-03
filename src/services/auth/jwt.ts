import { config } from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';

config();

// Usually I keep the token between 5 minutes - 15 minutes
export function generateAccessToken(user : any) {
    const accessSecret: Secret = process.env.JWT_ACCESS_SECRET == undefined ? 'S3CR3TB0ZUK' : process.env.JWT_ACCESS_SECRET;
    return jwt.sign(
        {
            id: user.id,
            role: user.role_id
        },
        accessSecret,
        {
            expiresIn: '24h'
        }
    );
}

/*
export function generateRefreshToken(user : any, jti : any) {
    return jwt.sign({
      userId: user.id,
      jti
    }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '8h',
    });
}
*/

export function generateTokens(user : any) {
    const accessToken = generateAccessToken(user);

    return {
      accessToken,
    };
}

