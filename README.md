# Bull Dashboard on Docker

Docker image running [Bull Dashboard](https://github.com/felixmosh/bull-board) on [Fastify](https://www.fastify.io).

Version tags follow versionning of [@bull-board/fastify](https://www.npmjs.com/package/@bull-board/fastify).

GitHub repository: [MattSyms/bull-board-docker](https://github.com/MattSyms/bull-board-docker).

Docker Hub repository: [mattsyms/bull-board](https://hub.docker.com/r/mattsyms/bull-board).

## Usage

Run a Bull Dashboard container with UI published at <http://localhost:3000>:

```
docker run \
  -p 3000:3000 \
  -e QUEUE_LIST="queueName, anotherQueueName" \
  mattsyms/bull-board
```

## Configuration

| Environment variable | Description                | Default |
| -------------------- | -------------------------- | ------- |
| QUEUE_LIST           | List of queue names.       |         |
| QUEUE_PREFIX         | Prefix for all queue keys. |         |
| REDIS_HOST           | Redis host.                | redis   |
| REDIS_PORT           | Redis port.                | 6379    |
| REDIS_USER           | Redis user.                |         |
| REDIS_PASSWORD       | Redis password.            |         |
| REDIS_DATABASE       | Redis database.            | 0       |
| REDIS_SSL            | Enable SSL.                | 0       |
| REDIS_SSL_CA         | Path to SSL ca file.       |         |
| REDIS_SSL_CERT       | Path to SSL cert file.     |         |
| REDIS_SSL_KEY        | Path to SSL key file.      |         |
| REDIS_SSL_VERIFY     | Verify SSL certificate.    | 1       |
