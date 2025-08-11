export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: NavigationItem[];
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-group',
    children: [

      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/home',
        icon: 'feather icon-home'
      },
      {
        id: 'Stock',
        title: 'Stock',
        type: 'item',
        url: '/stock',
        icon: 'feather icon-layers'
      },
      {
        id: 'documents',
        title: 'Documents',
        type: 'item',
        url: '/documents',
        icon: 'feather icon-clipboard'
      },
      {
        id: 'production',
        title: 'Production',
        type: 'item',
        url: '/production',
        icon: 'feather icon-credit-card'
      },
      {
        id: 'Contrôle Qualité',
        title: 'Contrôle Qualité',
        type: 'item',
        url: '/qualite',
        icon: 'feather icon-eye'
      }


    ]

  },
  {
    id: 'settings',
    title: 'Settings',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'user-management',
        title: 'Users Management',
        type: 'collapse',
        icon: 'feather icon-users',
        children: [
          {
            id: 'users-list',
            title: 'Users List',
            type: 'item',
            url: '/user/users-list'
          },
          {
            id: 'add-user',
            title: 'New User',
            type: 'item',
            url: '/user/create-user'
          },
        ]
      },
      {
        id: 'logs',
        title: 'Logs',
        type: 'item',
        url: '/logs',
        icon: 'feather icon-file-text'
      },
      {
        id: 'site-configurations',
        title: 'Configuration ',
        type: 'collapse',
        url: '/site-configurations',
        icon: 'feather icon-settings',

      }
    ]
  },






];
