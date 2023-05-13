declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
      DATABASE_URL: string;
      SEMANTLE_API_URL: string;
    }
  }
}
