
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
  },
  {
    "renderMode": 2,
    "route": "/admin-dashboard"
  },
  {
    "renderMode": 2,
    "route": "/cr-dashboard"
  },
  {
    "renderMode": 2,
    "route": "/cycles/register"
  },
  {
    "renderMode": 2,
    "route": "/keys/register"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 2867, hash: '26e9317e5e2b74916503db9ccbe8abd210276790496932a30330021990472b9a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 3210, hash: '30f5ef6a8f468392d48d1c056ceb32a210b02b9709a9d2e7333926b6de4928b3', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'user-dashboard/index.html': {size: 3044, hash: '59e7c20f58c059773a02d7cef6f9c2e5f4bd5b89b91b13a1421d010e074242b5', text: () => import('./assets-chunks/user-dashboard_index_html.mjs').then(m => m.default)},
    'index.html': {size: 10478, hash: 'fc75a7088a47d0dec23f8f25b5868bf58170a3b3dbe866a90dbb1fc2b53b2bc3', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'cycles/register/index.html': {size: 3044, hash: '59e7c20f58c059773a02d7cef6f9c2e5f4bd5b89b91b13a1421d010e074242b5', text: () => import('./assets-chunks/cycles_register_index_html.mjs').then(m => m.default)},
    'admin-dashboard/index.html': {size: 3044, hash: '59e7c20f58c059773a02d7cef6f9c2e5f4bd5b89b91b13a1421d010e074242b5', text: () => import('./assets-chunks/admin-dashboard_index_html.mjs').then(m => m.default)},
    'keys/register/index.html': {size: 3044, hash: '59e7c20f58c059773a02d7cef6f9c2e5f4bd5b89b91b13a1421d010e074242b5', text: () => import('./assets-chunks/keys_register_index_html.mjs').then(m => m.default)},
    'cr-dashboard/index.html': {size: 3044, hash: '59e7c20f58c059773a02d7cef6f9c2e5f4bd5b89b91b13a1421d010e074242b5', text: () => import('./assets-chunks/cr-dashboard_index_html.mjs').then(m => m.default)},
    'styles-CFI7VGRS.css': {size: 7422, hash: 'SQCuNqJL+/U', text: () => import('./assets-chunks/styles-CFI7VGRS_css.mjs').then(m => m.default)}
  },
};
