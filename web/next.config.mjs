const API_HOST =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
    : "http://backend:8000";

const nextConfig = {
  trailingSlash: true,
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/:path*/",
        destination: `${API_HOST}/api/:path*/`,
      },
    ];
  },
};

export default nextConfig;
