# Upstat API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
All API endpoints require authentication via session cookie or Bearer token.

## Endpoints

### Monitors

#### List all monitors
```http
GET /monitors
```

**Response:** `200 OK`
```json
{
  "monitors": [
    {
      "id": "string",
      "name": "string",
      "url": "string",
      "type": "http" | "ping" | "port",
      "interval": 60,
      "active": true,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### Create a monitor
```http
POST /monitors
```

**Body:**
```json
{
  "name": "My Website",
  "url": "https://example.com",
  "type": "http",
  "interval": 60
}
```

**Response:** `201 Created`

#### Get monitor details
```http
GET /monitors/:id
```

**Response:** `200 OK`

#### Update a monitor
```http
PUT /monitors/:id
```

**Response:** `200 OK`

#### Delete a monitor
```http
DELETE /monitors/:id
```

**Response:** `204 No Content`

### Status Pages

#### List status pages
```http
GET /status-pages
```

**Response:** `200 OK`

#### Create a status page
```http
POST /status-pages
```

**Body:**
```json
{
  "name": "My Status Page",
  "slug": "my-status",
  "monitors": ["monitor-id-1", "monitor-id-2"]
}
```

**Response:** `201 Created`

### Incidents

#### List incidents
```http
GET /incidents?monitorId=xxx&status=open
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `monitorId` | string | Filter by monitor ID |
| `status` | string | Filter by status: open, investigating, resolved |

**Response:** `200 OK`

## Error Responses

All errors follow this format:
```json
{
  "error": {
    "code": "string",
    "message": "string"
  }
}
```

| Status | Code | Description |
|--------|------|-------------|
| 400 | BAD_REQUEST | Invalid request body or parameters |
| 401 | UNAUTHORIZED | Missing or invalid authentication |
| 404 | NOT_FOUND | Resource not found |
| 429 | RATE_LIMITED | Too many requests |
| 500 | INTERNAL_ERROR | Server error |
