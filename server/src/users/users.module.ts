import {
  DynamicModule,
  HttpModule,
  MiddlewareConsumer,
  Module,
  Provider,
  Logger,
  NestModule,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { USERS_ENTITIES } from './entities';
import { USERS_SERVICES } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([...USERS_ENTITIES])],
  providers: [...USERS_SERVICES],
  exports: [...USERS_SERVICES],
})
export class UsersModule implements NestModule {
  // static forRoot(options?: { providers: Provider[] }): DynamicModule {
  //   const providers = options && options.providers ? options.providers : [];

  //   return {
  //     module: UsersModule,
  //     imports: [HttpModule],
  //     // imports: [HttpModule, RuckenCoreModule.forFeature(options), TypeOrmModule.forFeature([...AUTH_ENTITIES])],
  //     // controllers: [...AUTH_CONTROLLERS],
  //     providers: [
  //       ...providers,
  //       // ...AUTH_MIDDLEWARE,
  //       ...USERS_SERVICES,
  //     ],
  //     exports: [...USERS_SERVICES],
  //   };
  // }

  public configure(consumer: MiddlewareConsumer) {
    Logger.log('configure');
  }
}
