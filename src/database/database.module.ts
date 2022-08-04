import { Module, Global } from '@nestjs/common';

// Ejemplo privider useValue
const API_KEY = 'APK12345678';
const API_KEY_PROD = 'PRODAPK987654';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.MODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
