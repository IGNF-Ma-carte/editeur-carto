import ol_ext_element from 'ol-ext/util/element'
import Utils from "geopf-extensions-openlayers/src/packages/Utils/Helper";
import { getUid } from '../../charte/utils';
import contentHTML from './panel.html?raw'

import './panel.scss';

const dsfrPrefix = 'fr-icon'
const remixIconPrefix = 'ri-'


/**
 * Bouton à mettre dans le header d'un panneau
 *  
 * @typedef {Object} HeaderButton
 * @property {string} title - Titre du bouton.
 * @property {string} icon - Icône du bouton.
 * @property {string} [className] - Classe à ajouter au bouton.
 * @property {Function} [callback] - Fonction au clic sur le bouton.
 */

class Panel {
  constructor(options) {

    this.initialize();

    this.options = {
      id: getUid('fr-panel'),
      className: this.dialogClass,
      parent: document.body,
      html: contentHTML,
    };

    // this.options = Utils.assign(this.options, {className:options.className, id:options.id})

    this.dialog = ol_ext_element.create('DIALOG', this.options);
    
    const panelOptions = Utils.assign(this.options, options);

    this._createDialog(panelOptions);
  }

  /**
   * Initie les sélecteurs CSS utiles dans le reste
   */
  initialize() {
    this.dialogClass = 'ign-panel';

    const btnGroup = `.${ this.dialogClass }__buttons`;

    this.selectors = {
      TITLE: `.${this.dialogClass}__title-name`,
      BUTTON_GROUP: btnGroup,
      BUTTONS: `.${this.dialogClass}__buttons > button`,
      BTN_CLOSE: `${btnGroup} > button.close`,
      ICON: `.${this.dialogClass}__title-icon`,
      BODY: `.${this.dialogClass}__body`,
      OPEN_EVENT: 'panel:open',
      CLOSE_EVENT: 'panel:close'
    };
  }

  /**
   * Créé le dialog en instanciant aussi les 
   * 
   * @param {Object} options Options de création du panneau
   */
  _createDialog(options) {
    let dialog = this.dialog;

    this.closeBtn = this.selectElement(this.selectors.BTN_CLOSE);
    this.closeBtn.setAttribute('aria-controls', this.getId());
    this.closeBtn.addEventListener('click', () => {
      dialog.close();
    });

    // Titre et contenu de la modale
    this.dialogTitle = this.selectElement(this.selectors.TITLE);
    this.dialogIcon = this.selectElement(this.selectors.ICON);
    this.dialogContent = this.selectElement(this.selectors.BODY);

    if (options.title) {
      this.dialogTitle.innerHTML = options.title;
    }
    if (options.icon) {
      this.setIcon(options.icon, this.dialogIcon);
    }
    if (options.position) {
      this.setPosition(options.position);
    }

    this.onOpen = typeof options.onOpen === 'function' ? options.onOpen : (e) => {console.log(e) };

    this.dialog.addEventListener(this.selectors.OPEN_EVENT, this.onOpen);
    this.dialog.addEventListener(this.selectors.CLOSE_EVENT, () => {
      this.dialog.removeEventListener(this.selectors.OPEN_EVENT, this.onOpen);
    }, { once: true });
  }

  _removeClasses(element, prefix) {
    if (!element instanceof Element) return;
    for (let i = element.classList.length - 1; i > 0; i--) {
      const c = element.classList[i];
      if (c.startsWith(prefix)) {
        element.classList.remove(c);
      }
    }
  }


  /**
   * Sélectionne le premier élément du dialog correspondant
   * au sélecteur CSS.
   * 
   * @param {string} selector Sélecteur CSS.
   * @returns {Element} Premier élément correspondant au sélecteur.
   */
  selectElement(selector) {
    return this.dialog.querySelector(selector);
  }

  /**
   * Sélectionne tous les éléments du dialog correspondant
   * au selecteur CSS.
   * 
   * @param {string} selector Sélecteur CSS
   * @returns {NodeList} Liste des élements correspondant au sélecteur
   */
  selectAllElements(selector) {
    this.dialog.querySelector();
    return this.dialog.querySelectorAll(selector);
  }

  getDialog() {
    return this.dialog;
  }

  getId() {
    return this.dialog.id;
  }

  setPosition(position) {
    if (position === 'left') {
      this.dialog.classList.add('ign-panel__left');
      this.dialog.classList.remove('ign-panel__right');
    } else if (position === 'right') {
      this.dialog.classList.add('ign-panel__right');
      this.dialog.classList.remove('ign-panel__left');
    }
  }

  setIcon(icon, element = this.dialogIcon) {
    let a;
    switch (true) {
      case icon.startsWith(dsfrPrefix):
        this._removeClasses(element, dsfrPrefix);
        a = ['fr-icon', 'fr-icon--sm', icon];
        element.classList.add(...a);
        break;
      case icon.startsWith(remixIconPrefix):
        this._removeClasses(element, remixIconPrefix);
        a = ['ri-1x', icon];
        element.classList.add(...a);
        break;
      default:
        element.className = icon;
    }
  }

  setContent({ title, content, footer }) {
    if (title) {
      this.setModalTitle(title);
    }

    if (content) {
      this.setModalContent(content);
    }
  }


  getModalTitle() {
    return this.dialogTitle ? this.dialogTitle.textContent : '';
  }

  setModalTitle(title) {
    if (this.dialogTitle && typeof title === 'string') {
      this.dialogTitle.textContent = title;
    }
  }

  getModalContent() {
    return this.dialogContent ? this.dialogContent.innerHTML : '';
  }

  setModalContent(content) {
    if (!this.dialogContent) return;

    this.dialogContent.innerHTML = '';

    if (typeof content === 'string') {
      this.dialogContent.innerHTML = content;
    } else if (content instanceof HTMLElement) {
      this.dialogContent.appendChild(content);
    }
  }

  getHeaderButtons() {
    return this.selectAllElements(this.selectors.BUTTONS);
  }

  getHeaderButton(index) {
    let buttons = this.selectAllElements(this.selectors.BUTTONS);
    return buttons.item(index);
  }

  /**
   * Ajoute un bouton au header.
   * Si aucun bouton n'est donné, enlève tous les boutons sauf le bouton de fermeture.
   * 
   * @param {HeaderButton} button bouton à ajouter au header
   */
  setHeaderButton(button) {
    let buttonGroup = this.selectElement(this.selectors.BUTTON_GROUP);
    let btnClose = this.selectElement(this.selectors.BTN_CLOSE);

    if (!button) {
      buttonGroup.replaceChildren(btnClose);
    } else {
      const btnClass = button.className ? button.className : '';
      const className = 'fr-btn fr-btn--tertiary-no-outline ' + btnClass;
      const btnOptions = {
        type: 'button',
        className: className,
        title: button.title,
        'aria-label': button.title,
        parent: buttonGroup,
        click: button.callback,
      };

      let btn = ol_ext_element.create('button', btnOptions);
      this.setIcon(button.icon, btn);

      buttonGroup.insertBefore(btn, this.selectElement(this.selectors.BUTTONS))
    }
  }

  /**
   * Ferme le dialog en simulant un clic sur le bouton de fermeture
   */
  close() {
    this.closeBtn.click();
    this.dialog.dispatchEvent(new Event(this.selectors.CLOSE_EVENT, this));
  }

  /**
   * Ouvre le panel
   */
  open() {
    this.dialog.show();
    this.dialog.dispatchEvent(new Event(this.selectors.CLOSE_EVENT, this));
  }

  setOnOpen(onOpen) {
    this.dialog.removeEventListener(this.selectors.OPEN_EVENT, this.onOpen);
    if (typeof onOpen === 'function') {
      this.onOpen = onOpen;
      this.dialog.addEventListener(this.selectors.OPEN_EVENT, this.onOpen);
    }
  }
}

export default Panel;
