
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/user-dashboard"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 717, hash: '702ab1abcd2bfd728dc0cb0e8f511022e913280a2c35b5287a555b0f9ad668aa', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1230, hash: 'cce3ff744b3a1d73219ca644e9175b0467177ab85e6df920119d0b3d4dd618df', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'user-dashboard/index.html': {size: 5827, hash: '47e9c8e7d9021b4f1e4f2b3a2dfd7915538738cb862d36d32c60e90345d49f0a', text: () => import('./assets-chunks/user-dashboard_index_html.mjs').then(m => m.default)},
    'index.html': {size: 5827, hash: '47e9c8e7d9021b4f1e4f2b3a2dfd7915538738cb862d36d32c60e90345d49f0a', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
