import { Menu } from './utils'

// Menu
const account = new Menu ({
  icon: 'fr-icon-question-fill',
  text: 'Aide',
})

account.addMenu([
  {
    type: 'link',
    label: 'Questions fréquentes',
    icon: 'fr-icon-question-mark',
    url: '#',
  },{
    type: 'link',
    label: 'Documentation',
    icon: 'fr-icon-file-text-line',
    url: '#',
  },{
    type: 'link',
    label: 'Nous ocntacter',
    icon: 'fr-icon-mail-line',
    url: '#',
  }
])
