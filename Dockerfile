# Build Stage
FROM golang:1.21.3 AS build
WORKDIR /app
COPY . .
RUN go mod download \
    && CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Release Stage
FROM alpine:3.18 AS release
WORKDIR /app
COPY --from=build /app/main .
RUN apk --no-cache add dumb-init ca-certificates
EXPOSE 8000
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["./main"]
