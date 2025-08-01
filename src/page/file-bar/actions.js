import openMap from '../dialogs/open-map.html?raw'
import saveMap from '../dialogs/save-map.html?raw'
import renameMap from '../dialogs/rename-map.html?raw'
import shareMap from '../dialogs/share-map.html?raw'


import dialog from '../../dialog';
import Action from './actions/Action';
import openMapAction from './actions/openMap/openMap';
import shareMapAction from './actions/shareMap/shareMap';
import saveMapAction from './actions/saveMap/saveMap';
import renameMapAction from './actions/renameMap/renameMap';


let actions = {
  'open-map': openMapAction,
  'rename-map': renameMapAction,
  'save-map': saveMapAction,
  'share-map': shareMapAction,
}

let openAction = function (e) {
  const actionName = e.target.dataset.action;
  const action = actions[actionName];

  if (action instanceof Action) {
    console.log('action !!')
    action.setAction(dialog);
  } else if (action) {
    dialog.setContent(action);
  }
}

export default openAction;