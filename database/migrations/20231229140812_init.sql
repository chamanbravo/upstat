-- +goose Up
-- +goose StatementBegin
CREATE EXTENSION pgcrypto;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(32) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    firstname VARCHAR(32),
    lastname VARCHAR(32),
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
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status_code VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    latency INTEGER NOT NULL,
    message TEXT NOT NULL
);

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    provider VARCHAR(50) NOT NULL,
    data json NOT NULL
)

CREATE TABLE notifications_monitors (
    monitor_id INTEGER REFERENCES monitors(id) ON DELETE CASCADE NOT NULL,
    notification_id INTEGER REFERENCES notifications(id) ON DELETE CASCADE NOT NULL,
    PRIMARY KEY (monitor_id, notification_id)
)
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE users;
DROP TABLE monitors;
DROP TABLE heartbeats;
DROP TABLE notifications;
DROP TABLE notifications_monitors;
-- +goose StatementEnd
