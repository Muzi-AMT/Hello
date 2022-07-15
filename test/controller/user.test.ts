import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('test/controller/user.test.ts', () => {

  it('should GET /api/user/login', async () => {
    // create app
    const app = await createApp<Framework>();


    // make request
    const result = await createHttpRequest(app).get('/api/user/login').query({ username: 'jack',password: 'redballoon' });

    // use expect by jest
    expect(result.status).toBe(200);
    expect(result.body.message).toBe('OK');

    // close app
    await close(app);
  });

});
