const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(
  '/',
  createProxyMiddleware({
    target: 'https://www.swiggy.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/dapi/restaurants/list/v5',
      '^/': '/', // This will proxy other paths correctly
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log('Proxying request:', req.url);
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log('Received response from target:', proxyRes.statusCode);
    },
    onError: (err, req, res) => {
      console.error('Proxy error:', err);
      res.status(500).send('Proxy error');
    }
  })
);

app.listen(5000, () => {
  console.log('Proxy server is running on http://localhost:5000');
});
