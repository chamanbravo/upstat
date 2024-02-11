![](./dashboard.png)

# Upstat
    
> simple and easy-to-use self-hosted status monitoring tool

## ⭐ Features

It needs more features but for now...

-   Monitoring uptime for HTTP(s)
-   Fancy, Reactive, Fast UI/UX
-   Status and Latency Chart

And dozens of smaller features to be added.

## 🔧 How to Install

### 🐳 Docker

```bash
docker compose up
```

Upstat is now running on http://localhost

### 💪🏻 Non-Docker

Requirements:

- Node.js 14 / 16 / 18 / 20.4
- npm 9
- Golang 1.21
- Postgres

```shell
cp .sample.env .env
```

```shell
air
cd web && npm run dev
```

## Tech stack

-   React
-   Shadcn
-   Golang
-   Postgres
