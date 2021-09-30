import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from 'src/entitys/user.entity'
import { UserRepository } from './auth.repository'

// 다른 곳에도 사용할 수  있도록 Injectable()을 해줌
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {
    // 부모 컴포넌트의 것을 사용하기 위해 쓰는 super()
    super({
      secretOrKey: 'Secret1234', // 토큰 유효성 체크
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 토큰을 어디서 가져오는지
    })
  }

  async validate(payload) {
    const { username } = payload
    const user: User = await this.userRepository.findOne({ username })

    if (!user) throw new UnauthorizedException()

    return user
  }
}
