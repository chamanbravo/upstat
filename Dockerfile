FROM golang:1.21.3 AS build
WORKDIR /app
COPY . .
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .
RUN chmod +x ./startup.sh

FROM alpine:latest as release
WORKDIR /app
COPY --from=build /app/main .
RUN apk -U upgrade \
    && apk add --no-cache dumb-init ca-certificates \
    && chmod +x /app/main
EXPOSE 8000
CMD ["./main"]