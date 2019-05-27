import {
  DynamicModule,
  HttpModule,
  MiddlewareConsumer,
  Module,
  Provider,
  Logger,
  NestModule,
} from '@nestjs/common';
import { authenticate } from 'passport';

import { AUTH_CONTROLLERS } from './controllers';
import { AUTH_MIDDLEWARE } from './middleware';
import { AUTH_SERVICES, AUTH_STRATEGY_SERVICES } from './services';
import { PassportMiddleware } from './middleware/passport.middleware';
import { UsersModule } from '../users';

@Module({})
export class AuthModule implements NestModule {
  static forRoot(options?: { providers: Provider[] }): DynamicModule {
    const providers = options && options.providers ? options.providers : [];

    return {
      module: AuthModule,
      imports: [HttpModule, UsersModule],
      // imports: [HttpModule, RuckenCoreModule.forFeature(options), TypeOrmModule.forFeature([...AUTH_ENTITIES])],
      controllers: [...AUTH_CONTROLLERS],
      providers: [
        ...providers,
        ...AUTH_MIDDLEWARE,
        ...AUTH_SERVICES,
        ...AUTH_STRATEGY_SERVICES,
      ],
      exports: [...AUTH_SERVICES],
    };
  }

  public configure(consumer: MiddlewareConsumer) {
    Logger.log('configure');
    // consumer
    //   .apply(
    //     authenticate('signup', { session: false, passReqToCallback: true })
    //   )
    //   .forRoutes('api/auth/signup');
    // consumer
    //   .apply(
    //     authenticate('signin', { session: false, passReqToCallback: true })
    //   )
    //   .forRoutes('api/auth/signin');
    // consumer
    //   .apply(
    //     authenticate('facebook', { session: false, passReqToCallback: true })
    //   )
    //   .forRoutes('api/auth/facebook/token');
    // consumer
    //   .apply(
    //     authenticate(
    //       'google',
    //       { session: false, passReqToCallback: true },
    //       (err: Error, user: any, info: any) => {
    //         console.log('error', err, 'user', user, 'info', info);
    //       }
    //     )
    //   )
    //   .forRoutes('api/auth/:strategy');

    // consumer.apply(PassportMiddleware).forRoutes('*');
  }
}
