import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  Post,
  Body,
  Logger,
  Param,
  Res,
  Next,
} from '@nestjs/common';

import { authenticate } from 'passport';
import { AuthStrategy } from '../services/strategies';
import { Request, Response, NextFunction } from 'express';

@Controller('auth')
export class AuthController {
  @Get()
  getAll() {
    return { status: 'success' };
  }

  @HttpCode(HttpStatus.OK)
  @Get(':strategy(google)')
  async handleAuthenticateRequest(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
    @Param('strategy') strategy: AuthStrategy = 'local'
  ): Promise<any> {
    Logger.log(
      strategy,
      AuthController.name + ':handleAuthenticateRequest#origin'
    );

    authenticate(
      strategy,
      { session: false },
      (err: Error, user: any, info: any) => {
        console.log('error', err, 'user', user, 'info', info);
      }
    )(req, res, next);
    // return authenticate(
    //   strategy,
    //   { session: false },
    //   (err: Error, user: any, info: any) => {
    //     console.log('error', err, 'user', user, 'info', info);

    //     if (err) {
    //       res.status(400).send(info);
    //     } else if (!user && info && info.flow === 'registration') {
    //       res.status(200).json(info);
    //     } else {
    //       // Remove sensitive data before login
    //       user.password = undefined;
    //       user.salt = undefined;

    //       req.logIn(user, err => {
    //         if (err) {
    //           res.status(400).send(err);
    //         } else {
    //           // const token = jwt.sign({ id: user._id }, config.secret, {
    //           //   expiresIn: '86400s', // in seconds
    //           // });
    //           // res.json({
    //           //   access_token: token,
    //           //   token_type: 'Bearer',
    //           //   expires_in: 86400,
    //           // });
    //         }
    //       });
    //     }
    //   }
    // );
  }
}
