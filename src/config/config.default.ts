import { MidwayConfig } from '@midwayjs/core';
import * as path from 'path';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1657199024937_6576',
  koa: {
    port: 7001,
  },
  orm: {
    type: 'sqlite',
    database: path.join(__dirname, '../../test.sqlite'),
    synchronize: true,
    logging: true,
  },
  jwt: {
    token: '123456789',
  },
} as MidwayConfig;
