import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';

// PassportStrategy → nestjsでStrategyを使いやすくしてくれる
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    // 親クラスのconstructorに設定用オブジェクトを渡す
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // リクエストのどの部分にJWTが記述されているかを指定
      ignoreExpiration: false, // Tokenの有効期限を考慮する設定にする
      secretOrKey: 'secretKey123', // secretKeyを記述
    });
  }

  // 実際の認証処理（処理の中で自動で呼ばれるのでメソッド名は、validateである必要がある）
  async validate(payload: { id: string; name: string }): Promise<User> {
    const { id, name } = payload;
    const user = await this.userRepository.findOne({
      where: { id: id, name: name },
    });
    if (user) {
      // 認証を通過
      return user;
    }
    throw new UnauthorizedException();
  }
}
