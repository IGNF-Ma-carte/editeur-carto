import Action from '../Action.js';
import content from './importLocal.html?raw';
import carte from '../../carte.js';
import ol_ext_element from 'ol-ext/util/element';
import './importLocal.scss';
import { htmlToNode } from '../../charte/utils.js';

function onOpen(e) {
  let dialog = importLocalAction.getDialog();
  console.log(dialog)
}

let importLocalAction = new Action({
  title: 'Importer une donnée locale',
  icon: 'ri-file-upload-line',
  content: content,
  onOpen: onOpen
})

export default importLocalAction;