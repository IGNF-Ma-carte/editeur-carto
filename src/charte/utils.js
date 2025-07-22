import ol_ext_element from 'ol-ext/util/element'

/** Menu options
 * @typedef {Object} MenuOptions
 * @property {string} type menu type description|link|option
 * @property {string} label 
 * @property {string} info information for type description
 * @property {string} href information for type link
 * @property {string} icon
 * @property {string} action 
 */

let currentId = 0;

/** Get element Uid
 * @param {string} type
 * @param {*} obj
 */
function getUid(type, obj) {
  let id = (type || 'default') + '-' + (++currentId)
  if (obj) {
    if (obj._uid) {
      return obj._uid
    } 
    if (obj.getAttribute && obj.getAttribute('id')) {
      return obj.getAttribute('id')
    }
    if (parent.id) {
      return parent.id
    }
    if (obj.setAttribute) {
      obj.setAttribute('id', id)
    } else {
      obj._uid = id;
    }
  }
  return id
}



/** Menu */
class Menu {
  constructor(options) {
    const nav = this.element = ol_ext_element.create('DIV', {
      className: 'fr-nav__item',
      parent: ol_ext_element.create('NAV', {
        role: 'navigation',
        className: 'fr-access fr-nav',
        id: getUid('access'),
        parent: document.querySelector('header .fr-header__tools-links')
      })
    })
    this._action = options.action;
    if (options.action) {
      nav.dataset.action = options.action
    }

    const idMenu = getUid('access')

    // Button
    ol_ext_element.create('BUTTON', {
      text: options.text,
      title: options.title || options.text,
      className: 'fr-access__btn fr-nav__btn fr-btn fr-btn--sm fr-btn--icon-left fr-btn--tertiary-no-outline ' + options.icon,
      'aria-expanded': false, 
      'aria-controls': idMenu,
      type: 'button',
      parent: nav
    })

    // Menu
    const menu = ol_ext_element.create('DIV', {
      className: 'fr-collapse fr-access__menu fr-menu',
      parent: nav,
      id: idMenu
    })
    this._menuList = ol_ext_element.create('UL', {
      className: 'fr-menu__list',
      parent: menu
    })
  }
  /** Get Menu
   * @param {string|Element} action
   */
  getMenu(action) {
    let li = action;
    if (typeof(action) === 'string'){
      li = this._menuList.querySelector('li[data-action="'+action+'"]');
    }
    return {
      parent: this.element,
      element: li,
      type: li.dataset.type,
      link: li.querySelector('a')
    }
  }
  /** Get all menu in the page
   * @param {string} action
   */
  getAllMenu(action) {
    const parent = document.querySelectorAll('[data-action="' + this._action + '"]')
    const info = []
    parent.forEach(p => {
      const li = p.querySelector('li[data-action="'+action+'"]');
      const m = this.getMenu(li)
      m.parent = p;
      info.push(m)
    })
    return info
  }
  /** SetMenu info
   * 
   */
  setMenu(action, options) {
    let m = action
    if (typeof(action) === 'string') {
      m = this.getMenu(action)
    }
    if (!m) return;
    // Set data
    if (options.data) {
      Object.keys(options.data).forEach(d => {
        console.log(d)
        if (d==='parent') {
          Object.keys(options.data.parent).forEach(dp => {
            console.log(m.parent)
            m.parent.dataset[dp] = options.data.parent[dp]
          })
        } else {
          m.element.dataset[d] = options.data[d]
        }
      })
    }
    // Set menu info
    switch(m.type) {
      case 'description': {
        if (options.label) {
          m.element.querySelector('.fr-description__label').innerText = options.label
        }
        if (options.info) {
          m.element.querySelector('.fr-description__info').innerText = options.info
        }
        break;
      }
      case 'link': 
      case 'option': {
        const a = m.element.querySelector('a');
        ['title', 'href'].forEach(k => {
          if (options[k]) a[k] = options[k]
        })
        if (options.label) {
          a.innerText = options.label
        }
        break;
      }
    }
  }
  setAllMenu(action, options) {
    this.getAllMenu(action).forEach(m => this.setMenu(m, options))
  }
  /** Add a new menu
   * @param { MenuOptions|Array<MenuOptions> }
   */
  addMenu(options) {
    if (Array.isArray(options)) {
      options.forEach(o => this.addMenu(o));
      return ;
    }
    const li = ol_ext_element.create('LI', {
      className: 'fr-menu__item',
      'data-type': options.type,
      parent: this._menuList
    })
    if (options.action) {
      li.dataset.action = options.action
    }
    switch(options.type) {
      case 'description': {
        const desc = ol_ext_element.create('DIV', {
          className: 'fr-description',
          id: getUid('description'),
          parent: li
        })
        ol_ext_element.create('DIV', {
          className: 'fr-description__label fr-text--bold fr-text--sm fr-text-action-high--grey',
          text: options.label,
          parent: desc
        })
        ol_ext_element.create('DIV', {
          className: 'fr-description__info fr-text--xs fr-text-mention--grey',
          text: options.info,
          parent: desc
        })
        break;
      }
      case 'link': {
        ol_ext_element.create('A', {
          id: getUid('access__link'),
          className: (options.icon || '') + ' fr-link--icon-left fr-access__link fr-nav__link fr-access__link fr-nav__link',
          title: options.title || '',
          text: options.label || 'no label',
          href: options.href,
          parent: li
        })
        break;
      }
      case 'option': {
        li.classList.add('fr-menu__option')
        const opt = ol_ext_element.create('DIV', {
          className: 'fr-option',
          parent: li
        })
        ol_ext_element.create('A', {
          id: getUid('access__link'),
          className: (options.icon || '') + ' fr-option__btn fr-btn fr-btn--sm fr-btn--icon-left fr-btn--tertiary',
          title: options.title || '',
          text: options.label || 'no label',
          href: options.href,
          parent: opt
        })
        break;
      }
    }
  }
}



export { Menu, getUid }