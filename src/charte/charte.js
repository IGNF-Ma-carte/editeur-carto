import ol_ext_element from 'ol-ext/util/element'
import { getUid } from './utils';

/** Header */
class Header {
  constructor() {
    const header = document.querySelector('header');
    this.element = header;
    // Wrapper
    const wrapper = ol_ext_element.create('DIV', {
      className: 'fr-container--fluid',
      parent: ol_ext_element.create('DIV', {
        className: 'fr-header__body',
        parent: header
      })
    })
    this.wrapper = wrapper
    const hbody = ol_ext_element.create('DIV', {
      className: 'fr-header__body-row',
      parent: wrapper
    });

    // Title / logo
    const brand = ol_ext_element.create('DIV', {
      className: 'fr-header__brand fr-enlarge-link', 
      html: ol_ext_element.create('DIV', {
        className: 'fr-header__brand-top'
      }),
      parent: hbody
    })
    ol_ext_element.create('DIV', {
      className: 'fr-header__logo',
      html: '<p class="fr-logo"></p>',
      parent: brand
    })
    this.title = ol_ext_element.create('A', {
      href: '/',
      html: '<p class="fr-header__service-title"></p>',
      parent: ol_ext_element.create('DIV', {
        className: 'fr-header__service',
        parent: brand
      })
    })

    // Tools
    this.tools = ol_ext_element.create('DIV', {
      className: 'fr-header__tools-links',
      parent: ol_ext_element.create('DIV', {
        className: 'fr-header__tools',
        parent: hbody
      }),
    })
    // Nav button
    const idmodal = getUid('modal')

    this.navButton = ol_ext_element.create('BUTTON', {
      id: getUid('button'),
      className: 'fr-btn--menu fr-btn',
      title: 'Menu',
      type: 'button',
      'data-fr-opened': 'false',
      'aria-controls': idmodal,
      parent: ol_ext_element.create('DIV', {
        className: 'fr-header__navbar',
        parent: brand
      })
    })
    // Modal
    const container = ol_ext_element.create('DIV', {
      className: 'fr-container',
      parent: 
      ol_ext_element.create('DIV', {
        className: 'fr-header__menu fr-modal', 
        id: idmodal, 
        'aria-labelledby': this.navButton.id,
        parent: header,
      })
    })
    // Close box
    ol_ext_element.create('BUTTON', {
      type: 'button',
      title: 'Fermer',
      id: getUid('button'),
      'aria-controls': idmodal,
      className: 'fr-btn--close fr-btn',
      text: 'Fermer',
      parent: container
    })
    this.links = ol_ext_element.create('DIV', {
      className: 'fr-header__menu-links',
      parent: container
    })
    this.footer = ol_ext_element.create('DIV', {
      className: 'fr-header__menu-footer',
      html: '<div class="footer-links"></div>',
      parent: container
    })
  }
  /** Set service information
   * @param {*} options
   */
  setService(options) {
    if (options.service) {
      this.title.querySelector('p').innerHTML = options.service
    }
    ['title', 'href'].forEach(k => {
      if (options[k]) {
        this.title.setAttribute(k, options[k])
      }
    })
  }
}

class Footer {
  constructor() {
    this.element = document.querySelector('footer')
    this.links = ol_ext_element.create('UL', {
      className: 'fr-footer__bottom-list',
      parent: ol_ext_element.create('DIV', {
        className: 'fr-container--fluid',
        parent: this.element
      })
    })
    this.addLink('Plan du site', 'https://cartes.gouv.fr/plan-du-site')
    this.addLink('Accessibilité : partiellement conforme', 'https://cartes.gouv.fr/accessibilite')
    this.addLink('Mentions légales', 'https://cartes.gouv.fr/mentions-legales')
    this.addLink('Données personnelles', 'https://cartes.gouv.fr/donnees-personnelles')
    this.addLink('Gestion des cookies', '#')
    this.addLink('Pagetest', '/test')
    this.addButton('Paramètres d\'affichage', {
      icon: 'fr-icon-theme-fill'
    })
  }
  addLink(title, href) {
    ol_ext_element.create('A', {
      className: 'fr-footer__bottom-link',
      text: ' ' + title + ' ',
      href: href,
      parent: ol_ext_element.create('LI', {
        className: 'fr-footer__bottom-item',
        parent: this.links
      })
    })
  }
  addButton(title, options) {
    ol_ext_element.create('BUTTON', {
      className: 'fr-footer__bottom-link fr-link--icon-left fr-px-2v' + (options.icon ? ' '+options.icon : ''),
      text: ' ' + title + ' ',
      parent: ol_ext_element.create('LI', {
        className: 'fr-footer__bottom-item',
        parent: this.links
      })
    })
  }
}

/* FOOTER
    container.innerHTML0 =`
    <div class="fr-header__menu-footer">
      <div class="fr-footer__brand fr-enlarge-link"><a href="/cartes/" class="router-link-active router-link-exact-active" title="Retour à l’accueil" aria-current="page">
        <p class="fr-logo">République<br>Française</p></a>
      </div>
      <div class="fr-footer__content">
        <p class="fr-footer__content-desc">
          Texte optionnel 3 lignes maximum.<br/>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur et vel quam auctor semper. Cras si amet mollis dolor.
        </p>
        <ul class="fr-footer__content-list">
          <li class="fr-footer__content-item">
            <a title="info.gouv.fr - Nouvelle fenêtre" id="footer__link--info" href="https://www.info.gouv.fr" target="_blank" rel="noopener external" class="fr-footer__content-link" data-fr-js-footer-link-actionee="true">info.gouv.fr</a>
          </li>

          <li class="fr-footer__content-item">
            <a title="service-public.fr - Nouvelle fenêtre" id="footer__link--service-public" href="https://www.service-public.fr" target="_blank" rel="noopener external" class="fr-footer__content-link" data-fr-js-footer-link-actionee="true">service-public.fr</a>
          </li>

          <li class="fr-footer__content-item">
            <a title="legifrance.gouv.fr - Nouvelle fenêtre" id="footer__link--legifrance" href="https://www.legifrance.gouv.fr" target="_blank" rel="noopener external" class="fr-footer__content-link" data-fr-js-footer-link-actionee="true">legifrance.gouv.fr</a>
          </li>

          <li class="fr-footer__content-item">
            <a title="data.gouv.fr - Nouvelle fenêtre" id="footer__link--data" href="https://www.data.gouv.fr" target="_blank" rel="noopener external" class="fr-footer__content-link" data-fr-js-footer-link-actionee="true">data.gouv.fr</a>
          </li>
        </ul>
      </div>
      <div class="footer-links">
      </div>
      <div class="fr-footer__bottom-copy">
        <p>
          Sauf mention explicite de propriété intellectuelle détenue par des tiers, les contenus de ce site sont proposés sous 
          <a class="fr-link-licence no-content-after" href="https://github.com/etalab/licence-ouverte/blob/master/LO.md" target="_blank" title="licence etalab-2.0 (nouvelle fenêtre)" rel="noopener noreferrer">
            licence etalab-2.0
          </a>
        </p>
      </div>
    </div>
`
*/
// Page
const charte = {
  header: new Header,
  footer: new Footer
}

// Copy footer > header
charte.header.footer.querySelector('.fr-header__menu-footer .footer-links').innerHTML = charte.footer.element.innerHTML;

export default charte
