import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './auth.repository'
import { AuthCredentialsDTO } from './dto/auth-credential.dto'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDTO): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto)
  }

  async signIn(authCredentialsDto: AuthCredentialsDTO): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto
    const user = await this.userRepository.findOne({ username })
    const comparedPassowrd = await bcrypt.compare(password, user.password)
    if (user && comparedPassowrd) {
      // 유저 토큰 생성 ( Secret + Payload)
      const payload = { username } // 중요한 정보는 넣지 말아야한다.
      const accessToken = await this.jwtService.sign(payload)

      return { accessToken }
    } else {
      throw new UnauthorizedException('login faild')
    }
  }
}
