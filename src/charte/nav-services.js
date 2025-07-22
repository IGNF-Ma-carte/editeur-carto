import { Menu } from './utils'

// Menu
const account = new Menu ({
  icon: 'fr-icon-menu-fill',
  text: 'Services',
})

account.addMenu([
  {
    type: 'link',
    label: 'Explorer les cartes',
    icon: 'fr-icon-road-map-line',
    url: '#',
  },{
    type: 'link',
    label: 'Rechercher une donnée',
    icon: 'fr-icon-search-line',
    url: '#',
  },{
    type: 'link',
    label: 'Diffuser une donnée',
    icon: 'fr-icon-upload-line',
    url: '#',
  },{
    type: 'link',
    label: 'Créer une carte',
    icon: 'fr-icon-pen-nib-line',
    url: '#',
  },{
    type: 'link',
    label: 'Contribuer',
    icon: 'fr-icon-message-2-line',
    url: '#',
  },{
    type: 'link',
    label: 'Géocoder',
    icon: 'fr-icon-code-s-slash-line',
    url: '#',
  },{
    type: 'link',
    label: 'Documentation',
    icon: 'fr-icon-file-text-line',
    url: '#',
  },{
    type: 'option',
    action: 'disconnect',
    label: 'Découvrir cartes.gouv',
    title: 'Découvrir cartes.gouv',
    href: '#',
    icon : 'fr-icon-external-link-line fr-btn--icon-right'
  }
])
