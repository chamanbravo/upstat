#!/bin/bash

set -e

# Create the database
PGPASSWORD=$PASSWORD psql -h $POSTGRES_HOST -p $POSTGRES_PORT -U $POSTGRES_USER -c "CREATE DATABASE $DB_NAME;"

echo "Database '$DB_NAME' created successfully."
