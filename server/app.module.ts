import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { AuthModule } from './src/auth';
import { DEFAULT_JWT_CONFIG, JWT_CONFIG_TOKEN } from './src/auth/configs';
import {
  GOOGLE_OAUTH2_CONFIG_TOKEN,
  DEFAULT_GOOGLE_OAUTH2_CONFIG,
} from './src/auth/configs/google-oauth2.config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import connectionOptions from './ormconfig';

const authConfig = {
  providers: [
    {
      provide: JWT_CONFIG_TOKEN,
      useValue: {
        ...DEFAULT_JWT_CONFIG,
        authHeaderPrefix:
          process.env.JWT_AUTH_HEADER_PREFIX ||
          DEFAULT_JWT_CONFIG.authHeaderPrefix,
        expirationDelta:
          process.env.JWT_EXPIRATION_DELTA ||
          DEFAULT_JWT_CONFIG.expirationDelta,
        secretKey: process.env.JWT_SECRET_KEY || DEFAULT_JWT_CONFIG.secretKey,
      },
    },
    {
      provide: GOOGLE_OAUTH2_CONFIG_TOKEN,
      useValue: {
        ...DEFAULT_GOOGLE_OAUTH2_CONFIG,
        clientID: process.env.GOOGLE_CLIENT_ID || 'none',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'none',
        callbackURL: process.env.GOOGLE_OAUTH_REDIRECT_URI || 'google',
        scope: ['profile', 'email'],
      },
    },
  ],
};

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      viewsPath: join(process.cwd(), 'dist/browser'),
      bundle: require('../server/main'),
      liveReload: true,
    }),

    TypeOrmModule.forRoot(connectionOptions),
    PassportModule.register({ defaultStrategy: 'google' }),
    AuthModule.forRoot(authConfig),
  ],
})
export class ApplicationModule {}
