import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticationGuard } from './guards/auth.guard';

@UseGuards(AuthenticationGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  someProtectedRoute(@Req() req) {
    return { message: 'Accessed Resource', userId: req.userId };
  }
}
