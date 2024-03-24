FROM golang:1.21.3-alpine AS build
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
ARG DB_TYPE
ARG CGO_ENABLED
RUN if [ "$DB_TYPE" = "sqlite" ]; then \
    apk -U upgrade \
    && apk add --no-cache build-base; \
    fi
RUN CGO_ENABLED=$CGO_ENABLED GOOS=linux go build -a -installsuffix cgo -o main .
RUN if [ "$DB_TYPE" = "postgres" ]; then \
    chmod +x ./startup.sh; \
    fi

FROM alpine:latest as release
WORKDIR /app
ARG DB_TYPE
COPY --from=build /app/main .
RUN apk -U upgrade \
    && apk add --no-cache dumb-init ca-certificates \
    && chmod +x /app/main
RUN if [ "$DB_TYPE" = "sqlite" ]; then \
    apk add --no-cache sqlite \
    && sqlite3 /var/lib/sqlite_data/upstat.db; \
    fi
EXPOSE 8000
CMD ["./main"]