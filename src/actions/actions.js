import dialog from '../dialog';
import leftPanel from '../leftPanel';
import Action from './Action';
import openMapAction from './openMap/openMap';
import shareMapAction from './shareMap/shareMap';
import saveMapAction from './saveMap/saveMap';
import renameMapAction from './renameMap/renameMap';
import importCatalogAction from './importCatalog/importCatalog';
import importLocalAction from './importLocal/importLocal';
import rightPanel from '../rightPanel';
import Panel from '../control/Panel/Panel';


let actions = {
  'open-map': openMapAction,
  'rename-map': renameMapAction,
  'save-map': saveMapAction,
  'share-map': shareMapAction,
  'import-catalog': importCatalogAction,
  'import-local': importLocalAction,
}

let openAction = function (e) {
  const actionName = e.target.dataset.action;
  const action = actions[actionName];

  let d;

  if (actionName.startsWith('import')) d = rightPanel;
  else d = dialog;

  if (action instanceof Action) {
    action.setAction(d);
    if (d instanceof Panel) {
      d.open()
    }
  } else if (action) {
    d.setContent(action);
  }
}

export default openAction;