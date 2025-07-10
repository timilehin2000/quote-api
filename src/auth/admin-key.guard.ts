import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class AdminKeyGuard implements CanActivate {
  private readonly adminKey = process.env.ADMIN_API_KEY;

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-admin-key'];

    if (!apiKey || apiKey !== this.adminKey) {
      throw new HttpException(
        'Invalid or missing API key',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return true;
  }
}
