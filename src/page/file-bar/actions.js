import openMap from '../dialogs/open-map.html?raw'
import saveMap from '../dialogs/save-map.html?raw'
import renameMap from '../dialogs/rename-map.html?raw'
import shareMap from '../dialogs/share-map.html?raw'

import dialog from '../../dialog';

const actions = {
  'open-map': {
    title: 'Ouvrir une carte',
    content: openMap,
  },
  'save-map': {
    title: 'Enregistrer',
    content: saveMap,
    footer: [
      {
        label: "Enregistrer",
        primary: true,
        close: false
      },
      {
        label: "Annuler",
        primary: false,
        close: true
      }
    ]
  },
  'rename-map': {
    title: 'Renommer',
    content: renameMap,
    footer: [
      {
        label: "Enregistrer",
        primary: true,
        close: false
      },
      {
        label: "Annuler",
        primary: false,
        close: true
      }
    ]
  },
  'share-map': {
    title: 'Partager',
    content: shareMap,
  },
}

let openAction = function (e) {
  const action = e.target.dataset.action;
  const actionContent = actions[action];
  if (actionContent) {
    dialog.setContent(actionContent)
  }
}

export default openAction;