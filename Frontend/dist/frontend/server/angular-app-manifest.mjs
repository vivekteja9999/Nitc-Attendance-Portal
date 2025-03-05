
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
    'index.csr.html': {size: 717, hash: 'c849c5ad402e133c942af132a04881d069e86f77ce33b420d7847ae708d9c056', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1230, hash: '3005b5dc67bd994eea2626717d6451caf2fb2bdd328c91579e2e952b3bd2f90f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 6486, hash: '77a2a8d38d4f3f62bfaa8464d1e36cab62a8cae54651eb52cdcf8c9c4c33a531', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'user-dashboard/index.html': {size: 2927, hash: '152cb020a28e20b09fc454d53b35420e25b8877ea0bea549cec129146dbd735d', text: () => import('./assets-chunks/user-dashboard_index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
