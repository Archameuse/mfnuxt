export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_KEY: string;
      DB_ID: string;
      DB_PLAYERS_ID: string;
      DB_RANGE: string;
      DB_PLAYERS_RANGE: string;
      AUTH_SECRET: string;
      DB_ADMINS_RANGE: string;
      AUTH_ORIGIN: string;
    }
  }
}