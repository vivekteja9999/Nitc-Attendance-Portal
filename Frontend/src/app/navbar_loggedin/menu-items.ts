export const MENU_ITEMS = {
  ADMIN: [
    { title: 'Dashboard', icon: 'fa-solid fa-house', route: '/admin-dashboard' },
    { title: 'Users', icon: 'fa-solid fa-users', route: '/users/edit' },
    { title: 'Keys', icon: 'fa-solid fa-key', route: '/admin/keys' },
    { title: 'Cycles', icon: 'fa-solid fa-bicycle', route: '/admin/cycles' },
    {title:'View Requests',icon:"fa-solid fa-paper-plane",route:"/admin/requests"},
    {title:'Logout',icon:'fa-solid fa-right-from-bracket',action:'logout'}
  ],
  CR: [
    { title: 'Dashboard', icon: 'fa-solid fa-house', route: '/cr-dashboard' },
    { title: 'Keys', icon: 'fa-solid fa-key', route: '/cr/keys' },
    { title: 'Cycles', icon: 'fa-solid fa-bicycle', route: '/cr/cycles' },
    {title:'View Requests',icon:"fa-solid fa-paper-plane",route:"/cr/requests"},
    {title:'Logout',icon:'fa-solid fa-right-from-bracket',action:'logout'}
  ],
  USER: [
    { title: 'Dashboard', icon: 'fa-solid fa-house', route: '/user-dashboard' },
    { title: 'Borrow Cycle', icon: 'fa-solid fa-bicycle', route: '/user/borrow-cycle' },
    { title: 'Get Available Cycles', icon: 'fa-solid fa-list', route: '/user/available-cycles' },
    {title:'View Requests',icon:"fa-solid fa-paper-plane",route:"/user/requests"},
    {title:'Logout',icon:'fa-solid fa-right-from-bracket',action:'logout'}
  ]
};
