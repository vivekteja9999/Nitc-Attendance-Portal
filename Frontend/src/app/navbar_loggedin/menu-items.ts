export const MENU_ITEMS = {
  ADMIN: [
    { title: 'Dashboard', icon: 'fa-solid fa-house', route: '/admin-dashboard' },
    { title: 'Users', icon: 'fa-solid fa-users', route: '/admin/users' },
    { title: 'Keys', icon: 'fa-solid fa-key', route: '/admin/keys' },
    { title: 'Cycles', icon: 'fa-solid fa-bicycle', route: '/admin/cycles' }
  ],
  CR: [
    { title: 'Dashboard', icon: 'fa-solid fa-house', route: '/cr-dashboard' },
    { title: 'Keys', icon: 'fa-solid fa-key', route: '/cr/keys' },
    { title: 'Cycles', icon: 'fa-solid fa-bicycle', route: '/cr/cycles' }
  ],
  USER: [
    { title: 'Dashboard', icon: 'fa-solid fa-house', route: '/user-dashboard' },
    { title: 'Borrow Cycle', icon: 'fa-solid fa-bicycle', route: '/user/borrow-cycle' },
    { title: 'Get Available Cycles', icon: 'fa-solid fa-list', route: '/user/available-cycles' }
  ]
};
