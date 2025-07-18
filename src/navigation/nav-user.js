import ol_ext_element from 'ol-ext/util/element'
import getUid from './getUid'

import html from './nav-user.html?raw'

// Menu
const nav = ol_ext_element.create('DIV', {
  className: 'fr-nav__item',
  parent: ol_ext_element.create('NAV', {
    role: 'navigation',
    className: 'fr-access fr-nav',
    id: getUid('access'),
    parent: document.querySelector('header .fr-header__tools-links')
  })
})

const idMenu = getUid('access')

// Button
ol_ext_element.create('BUTTON', {
  title: 'Mon espace',
  text: 'Mon espace',
  className: 'fr-access__btn fr-nav__btn fr-btn fr-btn--sm fr-icon-account-fill fr-btn--icon-left fr-btn--tertiary-no-outline',
  'aria-expanded': false, 
  'aria-controls': idMenu,
  type: 'button',
  parent: nav
})

// Menu
ol_ext_element.create('DIV', {
  className: 'fr-collapse fr-access__menu fr-menu',
  parent: nav,
  html: html,
  id: idMenu
})
