import { StrategyOptions } from 'passport-google-oauth2';

export const DEFAULT_GOOGLE_OAUTH2_CONFIG: StrategyOptions = {
  clientID: '',
  clientSecret: '',
  callbackURL: 'http://localhost:4200/auth/google',
};

export const GOOGLE_OAUTH2_CONFIG_TOKEN = 'GoogleOAuth2Config';
