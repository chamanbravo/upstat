-- +goose Up
-- +goose StatementBegin
CREATE EXTENSION pgcrypto;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(32) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password text NOT NULL
);

CREATE TABLE monitors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    url VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    method VARCHAR(50) NOT NULL,
    frequency INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL
);

CREATE TABLE heartbeats (
    id SERIAL PRIMARY KEY,
    monitor_id INTEGER REFERENCES monitors(id) ON DELETE CASCADE NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    status VARCHAR(50) NOT NULL,
    latency INTEGER NOT NULL,
    message TEXT NOT NULL
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE users;
DROP TABLE monitors;
DROP TABLE heartbeats;
-- +goose StatementEnd
