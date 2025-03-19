export const MENU_ITEMS = {
  ADMIN: [
    { title: 'Dashboard', icon: 'fa-solid fa-house', route: '/admin/dashboard' },
    { title: 'Users', icon: 'fa-solid fa-users', route: '/admin/users/edit' },
    { title: 'Keys', icon: 'fa-solid fa-key', route: '/admin/keys/list' },
    { title: 'Cycles', icon: 'fa-solid fa-bicycle', route: '/admin/cycles' },
    {title:'View Requests',icon:"fa-solid fa-paper-plane",route:"/admin/requests"},
    {title:'Logout',icon:'fa-solid fa-right-from-bracket',action:'logout'}
  ],
  CR: [
    { title: 'Dashboard', icon: 'fa-solid fa-house', route: '/cr/dashboard' },
    { title: 'Borrow Key', icon: 'fa-solid fa-key', route: '/key/borrow' },
    { title: 'Return Key', icon: 'fa-solid fa-key', route: '/key/return' },
    { title: 'Borrow Cycle', icon: 'fa-solid fa-bicycle', route: '/cycles/borrow' },
    { title: 'Return Cycle', icon: 'fa-solid fa-bicycle', route: '/cycles/return' },
    {title:'View Requests',icon:"fa-solid fa-paper-plane",route:"/cr/requests"},
    {title:'Logout',icon:'fa-solid fa-right-from-bracket',action:'logout'}
  ],
  USER: [
    { title: 'Dashboard', icon: 'fa-solid fa-house', route: '/user/dashboard' },
    { title: 'Borrow Cycle', icon: 'fa-solid fa-bicycle', route: '/cycles/borrow' },
    { title: 'Return Cycle', icon: 'fa-solid fa-bicycle', route: '/cycles/return' },
    {title:'View Requests',icon:"fa-solid fa-paper-plane",route:"/user/requests"},
    {title:'Logout',icon:'fa-solid fa-right-from-bracket',action:'logout'}
  ]
};
