import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import config from './config';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private api_key: string,
    // @Inject('TAKS') private taks: any[],
    // private configService: ConfigService,
    @Inject('PG') private clientPg: Client,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getHello(): string {
    // console.log(this.taks);
    const apikey = this.configService.apiKey;
    const dbname = this.configService.database.name;

    // return `Hello World! ${this.api_key}`;
    return `Hello World! ${apikey}, ${dbname}`;
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}
