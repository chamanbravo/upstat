-- +goose Up
-- +goose StatementBegin
CREATE TABLE incidents (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    is_positive BOOLEAN DEFAULT true,
    monitor_id INTEGER REFERENCES monitors(id) ON DELETE CASCADE NOT NULL
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE incidents;
-- +goose StatementEnd
