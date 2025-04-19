export const MENU_ITEMS = {
  ADMIN: [
    { title: 'Dashboard', icon: 'fa-solid fa-house', route: '/admin/dashboard' },
    { title: 'Users', icon: 'fa-solid fa-users', route: '/admin/users/edit' },
    { title: 'Subject Registration', icon: 'fa-solid fa-book-open', route: '/admin/subjects' }, // 📚 Book icon for subjects
    { title: 'Class Registration', icon: 'fa-solid fa-school', route: '/admin/class' }, // 🏫 School icon for classrooms
    { title: 'Subj/Class Modify', icon: 'fa-solid fa-rotate-right', route: '/admin/sc_modify' },
    { title: 'Logout', icon: 'fa-solid fa-right-from-bracket', action: 'logout' } ,
   
  ],
  CR: [
    { title: 'Dashboard', icon: 'fa-solid fa-house', route: '/cr/dashboard' },
    { title: 'Take Semester Subjects', icon: 'fa-solid fa-book-open', route: '/cr/update_subjects' },
    { title: 'Modify Teaching Subjects', icon: 'fa-solid fa-school', route: '/cr/modify_teaching_subjects' },
    {title:'Logout',icon:'fa-solid fa-right-from-bracket',action:'logout'}
  ] ,
  USER: [
    { title: 'Dashboard', icon: 'fa-solid fa-house', route: '/user/dashboard' },
    { title: 'Take Semester Subjects', icon: 'fa-solid fa-book-open', route: '/cr/update_subjects' },
    { title: 'Modify Studying Subjects', icon: 'fa-solid fa-school', route: '/cr/modify_teaching_subjects' },
    {title:'Logout',icon:'fa-solid fa-right-from-bracket',action:'logout'}
  ]
};
