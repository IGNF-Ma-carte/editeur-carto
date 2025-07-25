// Ma Carte
import Carte from './mcutils/Carte';

import 'ol-ext/dist/ol-ext.css'
import 'mcutils/Carte.css';

// Extensions géoplateforme
import 'geoportal-access-lib/dist/GpServices.js';

import 'geopf-extensions-openlayers/src/packages/CSS/DSFRgeneralWidget.css';
import 'geopf-extensions-openlayers/css/Dsfr.css';

// The Carte
const carte = new Carte({
  target: 'map',
  // Default Carte
  url: import.meta.env.BASE_URL + 'carte/template.carte'
})

carte.on('read', () => {
  // Transforme le bouton de LayerSwitcher
  let switcherBtn = document.querySelector("[id^=GPshowLayersListPicto]")
  console.log(switcherBtn)
  switcherBtn.classList.remove('fr-btn--tertiary', 'gpf-btn--tertiary')
  switcherBtn.classList.add('gpf-btn--primary')
  /* Do something */
})

export default carte