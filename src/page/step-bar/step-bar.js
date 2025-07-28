
import carte from '../../carte.js'
import dialog from '../../dialog.js';

import CustomButton from '../../control/CustomButton/CustomButton.js'
import CustomBar from '../../control/CustomBar/CustomBar.js'
import CustomToggle from '../../control/CustomToggle/CustomToggle.js'

import './step-bar.scss'
import openAction from '../file-bar/actions.js'

// Barre ajout de donnée
let createmap = new CustomToggle({
  html: 'Création',
  autoActivate:true,
  className: 'action-button ol-custom-button',
  buttonClasses: ['fr-btn', 'fr-btn--tertiary-no-outline'],
  buttonAttributes: {
    title: "Gérer le contenu de la carte",
    'aria-label': "Gérer le contenu de la carte",
  },
  onToggle: function () {
    if (createmap.getActive()) {
      storymap.set('autoActivate', false);
      createmap.set('autoActivate', true);
    }
    info("Création de la map");
  }
});

let storymap = new CustomToggle({
  html:'Mise en page',
  className: 'action-button ol-custom-button',
  autoActivate:true,
  buttonClasses: ['fr-btn', 'fr-btn--tertiary-no-outline'],
  buttonAttributes: {
    title: "Gérer la mise en page de la carte",
    'aria-label': "Gérer la mise en page de la carte",
  },
  onToggle: function () {
    if (storymap.getActive()) {
      storymap.set('autoActivate', true);
      createmap.set('autoActivate', false);
    }
    info("Stroymap");
  }
});

let save = new CustomButton({
  className: 'button-hint',
  buttonClasses: ['fr-btn', 'fr-btn--tertiary-no-outline', 'ri-save-line'],
  buttonAttributes: {
    type: 'button',
    title: "Enregistrer la carte",
    'aria-label': "Enregistrer la carte",
    'data-action': 'save-map',
    'aria-controls': dialog.getId(),
    'data-fr-opened': 'false'
  },
  handleClick: openAction
});

let share = new CustomButton({
  className: 'button-hint',
  buttonClasses: ['fr-btn', 'fr-btn--tertiary-no-outline', 'ri-send-plane-line'],
  buttonAttributes: {
    type: 'button',
    title: "Partager la carte",
    'aria-label': "Partager la carte",
    'data-action': 'share-map',
    'aria-controls': dialog.getId(),
    'data-fr-opened': 'false'
  },
  handleClick: openAction
});

let modeBar = new CustomBar({
  className: '',
  toggleOne: true,
  autoActivate: true,
  controls: [createmap, storymap]
})

// Barre principale
let mainbar = new CustomBar({
  className: 'ol-bar--separator ol-bar--row',
  controls: [modeBar, save, share]
})


// Show info
function info(i) {
  console.log(i || "");
}

carte.addControl('stepBar', mainbar)

mainbar.setPosition('top-right')