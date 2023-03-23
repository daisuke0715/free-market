import { AuthGuard } from '@nestjs/passport';

// このGuardが適応されたリクエストハンドラはjwt認証に通っていない場合、実行されなくなる
export class JwtAuthGuard extends AuthGuard('jwt') {}
