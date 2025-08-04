import Dialog from '../control/Dialog/Dialog'

/**
 * Bouton à mettre dans le footer d'une modale
 *  
 * @typedef {Object} FooterButton
 * @property {string} label - Label du bouton.
 * @property {boolean} [primary=false] - Indique si le bouton est un bouton primaire.
 * @property {boolean} [close=false] - Lie le bouton à la fermeture de la modale.
 * @property {Function} [callback] - Fonction au clic sur le bouton.
 */

/**
 * Action à définir pour un bouton ou un autre élément.
 * 
 * @typedef {Object} ActionObject
 * @property {string} title - Titre de la modale.
 * @property {string|HTMLElement} content - Contenu de la modale.
 * @property {string} [icon] - Icône du titre.
 * @property {FooterButton[]} [footer] - Boutons d'actions de la modale.
 * @property {Function} [onOpen] - Fonction à appeler à l'ouverture de la modale.
 */

/**
 * Classe représentant une action complète pour une modale (titre, contenu, pied de page et action à l'ouverture)
 */
class Action {
  /**
   * @param {ActionOptions} options - Options de configuration de l'action
   */
  constructor(options) {
    this.title = options.title || '';
    this.content = options.content || '';
    this.footer = options.footer;
    this.onOpen = typeof options.onOpen === 'function' ? options.onOpen : () => { };
    this.icon = options.icon || '';
  }

  /** @returns {string} */
  get title() {
    return this._title;
  }

  /** @param {string} value */
  set title(value) {
    this._title = value;
  }

  /** @returns {string|HTMLElement} */
  get content() {
    return this._content;
  }

  /** @param {string|HTMLElement} value */
  set content(value) {
    this._content = value;
  }

  /** @returns {ActionButton[]} */
  get footer() {
    return this._footer;
  }

  /** @param {ActionButton[]} buttons */
  set footer(buttons) {
    if (!Array.isArray(buttons)) return;
    this._footer = buttons;
  }

  /** @returns {Dialog} */
  getDialog() {
    return this.dialog;
  }

  /**
   * Ajoute un bouton dans le footer
   * @param {ActionButton} button
   */
  addFooterButton(button) {
    this._footer.push(button);
  }

  /**
   * Récupère le bouton à un index donné
   * @param {number} index
   * @returns {ActionButton|undefined}
   */
  getFooterButton(index) {
    return this._footer[index];
  }


  /**
   * Lie les éléments d'une action à une modale.
   * @param {Dialog} dialog Modale auquelle l'action est liée
   */
  setAction(dialog) {
    this.dialog = dialog;
    dialog.setContent({ title: this.title, content: this.content, footer: this.footer });
    dialog.setIcon(this.icon)
    dialog.setOnOpen(this.onOpen);
  }
}


export default Action