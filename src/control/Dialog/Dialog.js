import ol_ext_element from 'ol-ext/util/element'
import Utils from "geopf-extensions-openlayers/src/packages/Utils/Helper";

import contentHTML from './dialog.html?raw'

class Dialog {
  constructor(options) {
    this.options = {
      id: 'main-modal-map-editor',
      className: 'fr-modal',
      'aria-labelledby': 'main-modal__title',
      parent: document.body,
      html: contentHTML,
    }

    const dialogOptions = Utils.assign(this.options, options);

    this.dialog = ol_ext_element.create('DIALOG', dialogOptions);

    this.closeBtn = this.dialog.querySelector('#main-modal__close-btn');
    this.closeBtn.setAttribute('aria-controls', this.getId());

    // Titre et contenu de la modale
    this.dialogTitle = this.dialog.querySelector('#main-modal__title');
    this.dialogContent = this.dialog.querySelector('#main-modal__content');

    this.onOpen = typeof dialogOptions.onOpen === 'function' ? dialogOptions.onOpen : () => { };

    this.dialog.addEventListener('dsfr.disclose', this.onOpen);
    this.dialog.addEventListener('dsfr.conceal', (e) => {
      this.dialog.removeEventListener('dsfr.disclose', this.onOpen);
    }, { once: true });
  }

  getDialog() {
    return this.dialog;
  }

  getId() {
    return this.dialog.id;
  }

  setContent({ title, content, footer }) {
    if (title) {
      this.setModalTitle(title);
    }

    if (content) {
      this.setModalContent(content);
    }

    if (Array.isArray(footer)) {
      this.setFooterButtons(footer);
    } else {
      this.setFooterButtons();
    }
  }

  setIcon() {

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

  setFooterButtons(buttons) {
    // Enlève le footer
    let oldFooter = this.dialog.querySelector('.fr-modal__footer');
    if (oldFooter) oldFooter.remove();

    if (!buttons) return;

    const footer = document.createElement('div');
    footer.className = 'fr-modal__footer';

    const btnGroup = document.createElement('div');
    btnGroup.className = 'fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-md';

    buttons.forEach((btnConfig) => {
      const button = document.createElement('button');
      button.classList.add('fr-btn');

      let hasIcon = false;

      for (const attr in btnConfig) {
        const value = btnConfig[attr];

        switch (attr) {
          case 'label':
            button.textContent = value || '';
            break;

          case 'primary':
            if (value !== true) {
              button.classList.add('fr-btn--secondary');
            }
            break;

          case 'icon':
            hasIcon = true;
            if (value) {
              button.classList.add(value);
            }
            break;

          case 'iconPosition':
            if (hasIcon) {
              const position = value === 'right' ? 'right' : 'left';
              button.classList.add(`fr-btn--icon-${position}`);
            }
            break;

          case 'callback':
            if (typeof value === 'function') {
              button.addEventListener('click', value);
            }
            break;

          case 'close':
            if (value) {
              button.setAttribute('aria-controls', this.getId());
              button.setAttribute('data-fr-opened', 'false');
            }
            break;

          default:
            // Ajout d'autres attributs
            button.setAttribute(attr, value);
            break;
        }
      }

      btnGroup.appendChild(button);
    });

    footer.appendChild(btnGroup);
    this.dialog.querySelector('.fr-modal__body')?.appendChild(footer);

    this.dialogFooter = footer;
  }

  /**
   * Ferme le dialog en simulant un click sur le bouton de fermeture
   */
  close() {
    this.closeBtn.click();
  }

  getFooterButtons() {
    return this.dialogFooter
      ? Array.from(this.dialogFooter.querySelectorAll('button'))
      : [];
  }

  getFooterButton(index) {
    const buttons = this.getFooterButtons();
    return buttons[index] || null;
  }

  setOnOpen(onOpen) {
    this.dialog.removeEventListener('dsfr.disclose', this.onOpen);
    if (typeof onOpen === 'function') {
      this.onOpen = onOpen;
      this.dialog.addEventListener('dsfr.disclose', this.onOpen);
    }
  }
}

export default Dialog;
