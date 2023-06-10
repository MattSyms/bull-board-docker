ARG image=node:18-alpine

FROM $image AS build

COPY index.ts /
COPY package.json /
COPY tsconfig.json /

RUN yarn && \
    yarn build

FROM $image

COPY --from=build /index.js /
COPY --from=build /package.json /
COPY --from=build /yarn.lock /

RUN yarn --production

ENV NODE_ENV=production

ENTRYPOINT ["node", "."]
