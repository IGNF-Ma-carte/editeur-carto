
import carte from '../../carte.js'

import Bar from 'ol-ext/control/Bar'
import TextButton from 'ol-ext/control/TextButton'
import Button from 'ol-ext/control/Button'
import Toggle from 'ol-ext/control/Toggle'

import CustomButton from '../../control/CustomButton/CustomButton.js'
import CustomBar from '../../control/CustomBar/CustomBar.js'
import CustomToggle from '../../control/CustomToggle/CustomToggle.js'

import Draw from 'ol/interaction/Draw.js';
import Modify from 'ol/interaction/Modify.js';
import VectorStyle from 'mcutils/layer/VectorStyle.js'
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';

import './edit-bar.scss'
import { Control } from 'ol/control.js'

// Couche de test
let vector = new VectorStyle({
  type: 'Vector',
  title: 'Vecteur', source: new VectorSource()
})

carte.on('read', () => {
  carte.getMap().addLayer(vector);
  carte.getMap().addLayer(vector.getLayer());
  carte.getControl('layerSwitcher').addLayer(vector.getLayer())
  console.log("VectorStyle = VectorLayer ?", vector instanceof VectorLayer)
  console.log("LayerSwithcer = ol.Control ?", carte.getControl('layerSwitcher') instanceof Control)
  carte.getSelect().on('select', (e) => console.log(e))
})

// Bar ajout de donnée
let catalogue = new CustomButton({
  className: 'button-hint',
  buttonClasses: ['fr-btn', 'fr-btn--tertiary-no-outline', 'ri-book-open-line'],
  buttonAttributes: {
    title: "Importer une donnée de cartes.gouv",
    'aria-label': "Importer une donnée de cartes.gouv",
  },
  handleClick: function () {
    info("Center: " + carte.map.getView().getCenter() + " - zoom: " + carte.map.getView().getZoom());
  }
});

let flux = new CustomButton({
  className: 'button-hint',
  buttonClasses: ['fr-btn', 'fr-btn--tertiary-no-outline', 'ri-global-line'],
  buttonAttributes: {
    title: "Importer un flux",
    'aria-label': "Importer un flux",
  },
  handleClick: function () {
    info("Center: " + carte.map.getView().getCenter() + " - zoom: " + carte.map.getView().getZoom());
  }
});

let file = new CustomButton({
  className: 'button-hint',
  buttonClasses: ['fr-btn', 'fr-btn--tertiary-no-outline', 'ri-file-upload-line'],
  buttonAttributes: {
    title: "Importer une donnée locale",
    'aria-label': "Importer une donnée locale",
  },
  handleClick: function () {
    info("Center: " + carte.map.getView().getCenter() + " - zoom: " + carte.map.getView().getZoom());
  }
});

let addDataBar = new CustomBar({
  controls: [
    catalogue,
    flux,
    file,
  ]
});

// Interaction de select
let selectToggle = new CustomToggle({
  className: 'button-hint ol-custom-button ol-custom-toggle',
  buttonClasses: ['fr-btn', 'fr-btn--tertiary-no-outline', 'ri-cursor-line'],
  buttonAttributes: {
    title: "Activer la sélection sur la carte",
    'aria-label': "Activer la sélection sur la carte",
  },
  interaction: carte.getSelect(),
  active: true,
  onToggle: function () {
    carte.getSelect().getFeatures().clear()
    console.log(carte.getSelect().getActive())
  }
});


// Interactions de dessins
let getDraw = function (type) {
  let draw = new Draw({
    source: new VectorSource(),
    type: type,
  })
  return draw
}

let drawPointInteraction = getDraw('Point');
let drawLineStringInteraction = getDraw('LineString');
let drawPolygonInteraction = getDraw('Polygon');
let draws = [drawPointInteraction, drawLineStringInteraction, drawPolygonInteraction]

draws.forEach(draw => {
  draw.on('drawend', e => {
    vector.getSource().addFeature(e.feature);
  })
})

let point = new CustomToggle({
  className: 'button-hint ol-custom-button dsfr-btn',
  html: '<i class="fr-mr-1w ri-1x ri-map-pin-line"></i>Point',
  buttonClasses: ['fr-btn', 'fr-btn--tertiary-no-outline', 'fr-btn--icon-left'],
  interaction: drawPointInteraction,
});
let line = new CustomToggle({
  className: 'button-hint ol-custom-button dsfr-btn',
  html: '<i class="fr-mr-1w ri-1x ri-guide-line"></i>Ligne',
  buttonClasses: ['fr-btn', 'fr-btn--tertiary-no-outline', 'fr-btn--icon-left'],
  interaction: drawLineStringInteraction,
});
let polygon = new CustomToggle({
  className: 'button-hint ol-custom-button dsfr-btn',
  html: '<i class="fr-mr-1w ri-1x ri-shape-line"></i>Surface',
  buttonClasses: ['fr-btn', 'fr-btn--tertiary-no-outline', 'fr-btn--icon-left'],
  // html:'Point',
  // buttonClasses: ['fr-btn', 'fr-icon-map-pin-2-line','fr-btn--tertiary-no-outline', 'fr-btn--icon-left'],
  interaction: drawPolygonInteraction,
});

let drawBar = new CustomBar({
  className: 'ol-bar--separator',
  toggleOne: true,
  controls: [
    point,
    line,
    polygon
  ]
})


let drawToggle = new CustomToggle({
  className: 'button-hint ol-custom-button',
  buttonClasses: ['fr-btn', 'fr-btn--tertiary-no-outline', 'ri-pen-nib-line'],
  bar: drawBar,
});


// Interaction de mesure

let a = new CustomToggle({
  className: 'button-hint ol-custom-button dsfr-btn',
  html: '<i class="fr-mr-1w ri-1x ri-map-pin-line"></i>Mesurer une distance',
  buttonClasses: ['fr-btn', 'fr-btn--tertiary-no-outline', 'fr-btn--icon-left'],
  // interaction: drawPointInteraction,
});
let b = new CustomToggle({
  className: 'button-hint ol-custom-button dsfr-btn',
  html: '<i class="fr-mr-1w ri-1x ri-guide-line"></i>Mesurer une surface',
  buttonClasses: ['fr-btn', 'fr-btn--tertiary-no-outline', 'fr-btn--icon-left'],
  // interaction: drawLineStringInteraction,
});
let c = new CustomToggle({
  className: 'button-hint ol-custom-button dsfr-btn',
  html: '<i class="fr-mr-1w ri-1x ri-map-pin-5-line"></i>Mesurer une isochrone',
  buttonClasses: ['fr-btn', 'fr-btn--tertiary-no-outline', 'fr-btn--icon-left'],
  // html:'Point',
  // buttonClasses: ['fr-btn', 'fr-icon-map-pin-2-line','fr-btn--tertiary-no-outline', 'fr-btn--icon-left'],
  // interaction: drawPolygonInteraction,
});

let measureBar = new CustomBar({
  className: 'ol-bar--separator',
  toggleOne: true,
  controls: [
    a,
    b,
    c
  ]
})

let measureToggle = new CustomToggle({
  className: 'button-hint ol-custom-button',
  buttonClasses: ['fr-btn', 'fr-btn--tertiary-no-outline', 'ri-ruler-line'],
  handleClick: function () {
    info("Center: " + carte.map.getView().getCenter() + " - zoom: " + carte.map.getView().getZoom());
  },
  bar:measureBar
});

// Barre d'interaction

let interactionBar = new CustomBar({
  toggleOne: true,
  controls: [
    drawToggle,
    measureToggle,
  ]
})

// Bar d'édition
let editDataBar = new CustomBar({
  controls: [
    selectToggle,
    interactionBar,
  ]
})

// Bar principale
let mainbar = new CustomBar({
  className: 'ol-bar--separator',
  toggleOne: true,
  controls: [carte.getControl('layerSwitcher'), addDataBar, editDataBar]
})


// Show info
function info(i) {
  console.log(i || "");
}

carte.addControl('mainBar', mainbar)

mainbar.setPosition('right')