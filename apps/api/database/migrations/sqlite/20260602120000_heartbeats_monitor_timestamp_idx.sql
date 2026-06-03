-- +goose Up
-- +goose StatementBegin
CREATE INDEX IF NOT EXISTS idx_heartbeats_monitor_timestamp
    ON heartbeats(monitor_id, timestamp);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP INDEX IF EXISTS idx_heartbeats_monitor_timestamp;
-- +goose StatementEnd
