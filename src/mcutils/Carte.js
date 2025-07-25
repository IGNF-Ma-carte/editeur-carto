import Carte from 'mcutils/Carte';
import {
  GeoportalZoom,
  LayerSwitcher,
  SearchEngine,
} from 'geopf-extensions-openlayers';

/** GPP Carte overwrite Carte options / controls
 */
class GPPCarte extends Carte {
  /** Constructor 
   * @param {*} options
   *  @param {string|Element} [options.target]
   *  @param {string} options.key GPP api key
   *  @param {string} options.url carte file url
   *  @param {string} options.id carte id
   */
  constructor(options) {
    super(options);
    
    // Remove ScaleLine from canvas
    this.getControl('scaleLine').element.style.visibility = ''
    this.getMap().render()

    // Remove controls      
    const keyToExcludes = [
      'dialog',
      'title',
      // 'attribution',
      // 'layerSwitcher',
      'mousePosition',
      'legend',
      'permalink',
      'scaleLine',
      'ctrlbar',
      'printDlg'
    ]
    // Remove existing controls
    for (const key in this._controls) {
      const ctrl = this._controls[key];
      if (!keyToExcludes.includes(key)) {
        this.map.removeControl(ctrl);
        delete this._controls[key];
      }
    }
    // Set GPP controls
    const controls = {
      layerSwitcher: new LayerSwitcher({
        options: {
          position: 'top-right',
          collapsed: true,
          panel: true,
          counter: true,
          allowEdit: true
        }
      }),
      search: new SearchEngine({
        collapsed: true,
        collapsible: true,
        position: 'center'
      }),
      zoom: new GeoportalZoom({
        position: 'bottom-right'
      })
    }

    // Add GPP controls
    Object.keys(controls).forEach(key => {
      try {
        this.addControl(key, controls[key])
      } catch (error) {
        console.error(error)
      }
    });
  }

  /** Add a new control
   * @param {string} name
   */
  addControl = function (controlName, control) {
    if (!this._controls[controlName]) {
      this._controls[controlName] = control;
      this.map.addControl(control);
    } else {
      throw new Error('Un contrôle du même nom existe déjà');
    }
  }

  /** Carte is ready
   */
  setReady = ()=> {
    Carte.prototype.setReady.call(this);
    // Remove ScaleLine from canvas
    this.getControl('scaleLine').element.style.visibility = ''
    this.getMap().render()
  }
}

export default GPPCarte