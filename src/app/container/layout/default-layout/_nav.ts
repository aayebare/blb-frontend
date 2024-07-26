import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Contractors'
  },
  {
    name: 'Add Contractor',
    url: '/add-contractor',
    iconComponent: { name: 'cil-drop' }
  },
  {
    name: 'All Contractors',
    url: '/contractors',
    linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Users',
    title: true
  },
  {
    name: 'All Users',
    url: '/users',
    iconComponent: { name: 'cil-puzzle' },
  },
  {
    name: 'Add New User',
    url: '/add-new-user',
    iconComponent: { name: 'cil-cursor' },

  },
  
];
