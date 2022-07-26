import Redis from 'redis';
import { makeCode } from './mail-service.js';
const redisClient = Redis.createClient({
  url: process.env.REDIS_URL
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();
const DEFAULT_EXPIRATION = 180;

async function setMail(mail) {
  const code = await makeCode();
  redisClient.setEx(`code:${mail}`, DEFAULT_EXPIRATION, JSON.stringify(code));
  return code;
}

async function getCodebyMail(mail) {
  const result = await redisClient.get(`code:${mail}`, async (error, code) => {
    if (error) next(error);
    if (code != null) {
      return JSON.stringify(code);
    } else {
      const result = {
        message: `유효기간이 다 지났습니다. 다시 인증해주세요.`,
      };
      return res.send(result);
    }
  });
  return result;
}
export { setMail, getCodebyMail };
