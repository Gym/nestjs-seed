import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

import { authenticate } from 'passport';

@Injectable()
export class PassportMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void): void {
    Logger.log(req.params, PassportMiddleware.name + ':middleware');

    next();
  }
}
