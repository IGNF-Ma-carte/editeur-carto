import Utils from "geopf-extensions-openlayers/src/packages/Utils/Helper";
import contentHTML from './panel.html?raw'

import './panel.scss';
import Dialog from '../Dialog/Dialog';

/**
 * Bouton à mettre dans le header d'un panneau
 *  
 * @typedef {Object} HeaderButton
 * @property {string} title - Titre du bouton.
 * @property {string} icon - Icône du bouton.
 * @property {string} [className] - Classe à ajouter au bouton.
 * @property {Function} [callback] - Fonction au clic sur le bouton.
 */

/**
 * Panneau d'action diverses.
 */
class Panel extends Dialog {
  constructor(options) {
    super(options)
  }

  /**
   * Initie les sélecteurs CSS utiles dans le reste
   */
  initialize() {
    this.dialogClass = 'ignf-panel'

    super.initialize()

    // Override les valeurs initials
    let options = {
      html: contentHTML,
    }

    Utils.assign(this.options, options);
  }

  /**
   * Créé le dialog en instanciant aussi les 
   * 
   * @param {Object} options Options de création du panneau
   */
  _createDialog(options) {

    super._createDialog(options);

    if (options.position) {
      this.setPosition(options.position);
    }
  }

  setPosition(position) {
    if (position === 'left') {
      this.dialog.classList.add('ignf-panel__left');
      this.dialog.classList.remove('ignf-panel__right');
    } else if (position === 'right') {
      this.dialog.classList.add('ignf-panel__right');
      this.dialog.classList.remove('ignf-panel__left');
    }
  }
}

export default Panel;
