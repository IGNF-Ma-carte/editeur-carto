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

    let hasIcon = false;

    buttons.forEach((btnConfig) => {
      const button = document.createElement('button');
      button.classList.add('fr-btn');
      button.textContent = btnConfig.label || '';

      // Hiérarchie du bouton
      if (btnConfig.primary !== true) {
        button.classList.add('fr-btn--secondary');
      }

      // Icône du bouton (optionnel)
      if (btnConfig.icon) {
        hasIcon = true;
        button.classList.add(btnConfig.icon);
        const position = btnConfig.iconPosition === 'right' ? 'right' : 'left';
        button.classList.add(`fr-btn--icon-${position}`);
      }

      // Callback (possible de le mettre plus tard)
      if (typeof btnConfig.callback === 'function') {
        button.addEventListener('click', btnConfig.callback);
      }

      // Raccourci pour fermer la modale
      if (btnConfig.close) {
        button.setAttribute('aria-controls', this.getId());
        button.setAttribute('data-fr-opened', 'false');
      }

      btnGroup.appendChild(button);
    });

    // // Place les icônes à gauche
    // if (hasIcon) {
    //   btnGroup.classList.add('fr-btns-group--icon-left');
    // }

    footer.appendChild(btnGroup);
    this.dialog.querySelector('.fr-modal__body')?.appendChild(footer);

    // Save reference for later
    this.dialogFooter = footer;
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
}

export default Dialog;
