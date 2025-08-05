// import OpenLayers control base and GeoPF utils
import ButtonModal from "../ButtonModal";
import Widget from "geopf-extensions-openlayers/src/packages/Controls/Widget";
import Logger from "geopf-extensions-openlayers/src/packages/Utils/LoggerByDefault";

import './MapHandle.scss'
import html from './content.html?raw'

const logger = Logger.getLogger("MapHandle");

/**
 * @classdesc
 * MapHandle – Extends ButtonModal to create a button with the map name
 * Compatible with GeoPF control patterns (initialize / _initContainer split)
 * 
 * @constructor
 * @extends {ol.control.Control}
 * @alias ol.control.MapHandle
 * @type {ol.control.MapHandle}
 * @param {Object}  options
 * @param {String} [options.id]               - custom id suffix
 * @param {Boolean}[options.collapsed=true]   - start collapsed (dialog closed)
 * @param {String} [options.title="Modal"]   - dialog title (aria‑label & heading)
 * @param {HTMLElement|String} [options.dialogElement] - initial dialog content
 * @param {String[]} [options.buttonClasses]  - extra classes on main button
 *
 * @extends {ol.control.Control}
 */
class MapHandle extends ButtonModal {
  /**
   */
  constructor(options) {
    options = options || {};

    if (!options.dialogElement) options.dialogElement = html;

    super(options);

    if (!(this instanceof MapHandle)) {
      throw new TypeError("ERROR CLASS_CONSTRUCTOR");
    }

    /**
     * Nom de la classe
     * @private
     */
    this.CLASSNAME = "MapHandle";

    this._modalIdCount = 0;

    this.container.classList.add("GPmapHandle")
    this._showButton.classList.add("GPmapHandlePicto")

    return this;
  }

  onPictoClick(e) {
    super.onPictoClick(e);

    this._dialog.style.removeProperty("top");
    this._dialog.style.removeProperty("left");
  }



  /**
   * Retourne la modale liée a un bouton.
   * La modale peut être un 
   * 
   * @param {string} buttonId Id du bouton
   * @param {string|HTMLElement} dialog Élément dialog HTML à lier au bouton
   */
  getButtonDialog(buttonId) {
    let btn = this._dialog.querySelector(`[data-action=${buttonId}]`)
    if (!btn) return;
  }

  /**
   * Ajoute un élément `dialog` à un bouton.
   * La modale peut être une chaîne de caractère ou un élément HTML.
   * La modale est ajouté directement au body.
   * 
   * Si aucun élément n'est donné, cela enlève la modale du
   * bouton et du DOM (s'il existe).
   * La modale doit avoir un bouton de fermeture pour être ajoutée.
   * 
   * @param {string} buttonId Id du bouton
   * @param {string|HTMLElement} modal Élément dialog HTML à lier au bouton
   */
  setButtonDialog(buttonId, modal) {
    let btn = this._dialog.querySelector(`[data-action=${buttonId}]`)
    if (!btn) return;

    // Enlève la modale si elle existe
    if (!modal) {
      let modalId = btn.getAttribute('aria-controls');
      if (!modalId) return;

      let dialog = document.getElementById(modalId);
      if (dialog) {
        btn.removeAttribute('aria-controls');
        document.removeChild(dialog);
      }
      return
    };

    // créé la modale
    let d = modal;
    if (typeof modal === "string") {
      d = this._htmlToNode(modal)
    }

    // N'ajoute pas la modale s'il manque le bouton de fermeture
    let btnClose = d.querySelector('.fr-btn--close');
    if (!btnClose) return;

    // Ajoute l'id de la modale
    let id = this._addModalID('fr-modal');
    d.id = id;
    btnClose.setAttribute('aria-controls', id);
    btn.setAttribute('aria-controls', id);
    btn.setAttribute('data-fr-opened', 'false');

    document.body.appendChild(d);
    return true;
  }

  /**
   * Ajoute une action au clic sur un bouton.
   * 
   * @param {string} buttonId Id du bouton
   * @param {string|HTMLElement} modal Élément dialog HTML à lier au bouton
   */
  setButtonAction(buttonId, action) {
    let btn = this._dialog.querySelector(`[data-action=${buttonId}]`)
    if (!btn) return;

    if (typeof action === 'function') {
      btn.addEventListener('click', action)
    }
  }

  /**
  * Add uuid to the tag ID
  * @param {String} id - id selector
  * @returns {String} uid - id selector with an unique id
  */
  _addModalID(id) {
    const modalId = this._uid ? `${id}-${this._modalIdCount}-${this._uid}` : id;
    this._modalIdCount++;
    return modalId;
  }

  _htmlToNode(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    const nNodes = template.content.childNodes.length;
    if (nNodes !== 1) {
        throw new Error(
            `html parameter must represent a single node; got ${nNodes}. ` +
            'Note that leading or trailing spaces around an element in your ' +
            'HTML, like " <img/> ", get parsed as text nodes neighbouring ' +
            'the element; call .trim() on your input to avoid this.'
        );
    }
    return template.content.firstChild;
}
}

Object.assign(MapHandle.prototype, Widget);

export default MapHandle;

// Expose MapHandle as ol.control.MapHandle (for a build bundle)
if (window.ol && window.ol.control) {
  window.ol.control.MapHandle = MapHandle;
}