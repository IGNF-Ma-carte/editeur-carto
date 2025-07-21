import { Menu } from './utils'

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
    href: '#',
    icon : 'fr-icon-dashboard-3-line'
  }, {
    type: 'link',
    label: 'Mon compte',
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
  // Disconnect user
  account.getAllMenu('disconnect').forEach(m => {
    m.link.addEventListener('click', () => console.log('DISCONNECTED'))
  })
}, 100)