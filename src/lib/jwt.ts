import jwt, { JwtPayload } from "jsonwebtoken"

interface SignOption {
  expiresIn?: any
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: '1Hr',
}

export function signJwtAccessToken(payload: JwtPayload, options: SignOption = DEFAULT_SIGN_OPTION) {
  const secretKey = process.env.SECRET_KEY || ""
  const token = jwt.sign(payload, secretKey, options)
  return token
}

export function verifyJwt(token: string) {
  try {
    const secretKey = process.env.SECRET_KEY || ""
    const decoded = jwt.verify(token, secretKey)
    return decoded as JwtPayload
  } catch (error) {
    console.error(error)
  }
}