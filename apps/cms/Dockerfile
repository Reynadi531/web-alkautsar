FROM alpine:3.22 AS download
ARG POCKETBASE_VERSION=0.40.6
ARG TARGETARCH
RUN apk add --no-cache unzip ca-certificates
ADD https://github.com/pocketbase/pocketbase/releases/download/v${POCKETBASE_VERSION}/pocketbase_${POCKETBASE_VERSION}_linux_${TARGETARCH}.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip pocketbase -d /pb

FROM alpine:3.22
RUN apk add --no-cache ca-certificates
WORKDIR /pb
COPY --from=download /pb/pocketbase /pb/pocketbase
COPY apps/cms/pb_migrations /pb/pb_migrations
COPY apps/cms/pb_hooks /pb/pb_hooks
# Photos used once by the seed migration (pb_migrations/*_data_awal.js).
COPY apps/web/public/images /pb/seed
ENV CMS_SEED_DIR=/pb/seed

VOLUME /pb/pb_data
EXPOSE 8090
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8090", "--dir=/pb/pb_data", "--migrationsDir=/pb/pb_migrations", "--hooksDir=/pb/pb_hooks"]
