import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from 'src/decorators'
import { User } from 'src/entitys/user.entity'
import { AuthService } from './auth.service'
import { AuthCredentialsDTO } from './dto/auth-credential.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  /*
    요청 컨트롤러에 있는 핸들러로 들어왔을 때 DTO에 있는 유효성 조건에 맞게 체크를 해주려면
    ValidationPipe를 꼭 넣어야한다.
  */
  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDTO): Promise<void> {
    return this.authService.signUp(authCredentialsDto)
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDTO): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto)
  }

  /*
    AuthGuard() 요청안에 유저 정보를 넣어줄수있습니다.
  */
  @Post('/test')
  @UseGuards(AuthGuard())
  authTest(@GetUser() user: User) {
    console.log(user)
  }
}
