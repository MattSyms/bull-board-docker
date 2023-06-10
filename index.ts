import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { FastifyAdapter } from '@bull-board/fastify';
import { Queue } from 'bullmq';
import dotenv from 'dotenv';
import fastify from 'fastify';
import fs from 'fs';

dotenv.config();

const config = {
  queueList: String(process.env.QUEUE_LIST || '').split(',').map((q) => q.trim()).filter((q) => q),
  queuePrefix: String(process.env.QUEUE_PREFIX || ''),
  redisHost: String(process.env.REDIS_HOST || 'redis'),
  redisPort: Number(process.env.REDIS_PORT || 6379),
  redisUser: String(process.env.REDIS_USER || ''),
  redisPassword: String(process.env.REDIS_PASSWORD || ''),
  redisDatabase: Number(process.env.REDIS_DATABASE || 0),
  redisSsl: (process.env.REDIS_SSL || '0') === '1',
  redisSslCa: String(process.env.REDIS_SSL_CA || ''),
  redisSslCert: String(process.env.REDIS_SSL_CERT || ''),
  redisSslKey: String(process.env.REDIS_SSL_KEY || ''),
  redisSslVerify: (process.env.REDIS_SSL_VERIFY || '1') === '1',
};

const queues = config.queueList.map((name) => new BullMQAdapter(
  new Queue(name, {
    connection: {
      host: config.redisHost,
      port: config.redisPort,
      ...(config.redisUser ? { username: config.redisUser } : {}),
      ...(config.redisPassword ? { password: config.redisPassword } : {}),
      db: config.redisDatabase,
      ...(config.redisSsl ? {
        ssl: {
          ...(config.redisSslCa ? { ca: fs.readFileSync(config.redisSslCa).toString() } : {}),
          ...(config.redisSslCert ? { cert: fs.readFileSync(config.redisSslCert).toString() } : {}),
          ...(config.redisSslKey ? { key: fs.readFileSync(config.redisSslKey).toString() } : {}),
          rejectUnauthorized: config.redisSslVerify,
        },
      } : {}),
    },
    prefix: config.queuePrefix,
  }),
));

const serverAdapter = new FastifyAdapter();

createBullBoard({ queues, serverAdapter });

(async () => {
  const url = await fastify()
    .register(serverAdapter.registerPlugin())
    .listen({ host: '0.0.0.0', port: 3000 });

  process.stdout.write(`Server started @ ${url}\n`);
})();
