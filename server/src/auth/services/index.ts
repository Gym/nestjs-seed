import { GoogleStrategy, JwtStrategy } from './strategies';

import { AuthService } from './auth.service';
import { TokenService } from './token.service';

export * from './auth.service';
export * from './token.service';

export const AUTH_SERVICES = [
  AuthService,
  TokenService,
  // OauthTokensAccesstokensService,
];

export const AUTH_STRATEGY_SERVICES = [
  GoogleStrategy,
  // JwtStrategy,
];
