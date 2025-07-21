import { Menu } from './utils'

import './nav-user.scss'

// Menu
const account = new Menu ({
  icon: 'fr-icon-account-fill',
  action: 'connect',
  text: 'Mon espace',
})

/* User menu */
account.addMenu([
  {
    type: 'description',
    label: 'Nom utilisateur',
    action: 'user',
    info: 'nobody@email.com'
  }, {
    type: 'link',
    label: 'Tableau de bord',
    action: 'board',
    href: '#',
    icon : 'fr-icon-dashboard-3-line'
  }, {
    type: 'link',
    label: 'Mon compte',
    action: 'account',
    href: '#',
    icon : 'fr-icon-user-line'
  }, {
    type: 'option',
    action: 'disconnect',
    label: 'Se déconnecter',
    title: 'Se déconnecter',
    href: '#',
    icon : 'fr-icon-logout-box-r-line'
  }
])

// Set user account
account.setMenu('user', {
  info: 'adresseutilisateur@email.com'
})

console.log('Menu disconnect', account.getMenu('disconnect'))

// Get info when ready
setTimeout(() => {
  console.log('Menu disconnect', account.getAllMenu('disconnect'))
  // Connect / disconnect user
  account.getAllMenu('disconnect').forEach(m => {
    m.link.addEventListener('click', () => {
      const connected = m.element.dataset.connected === 'false'; 
      account.setAllMenu('user', {
        info: connected ? 'toto@ign.fr' : 'not connected...'
      })
      account.setAllMenu('disconnect', {
        label: connected ? 'Se déconnecter' : 'Se connecter...',
        title: connected ? 'Se déconnecter' : 'Se connecter...',
        data: {
          connected: connected,
          parent: {
            connected: connected
          }
        },
      })
    })
  })
}, 100)