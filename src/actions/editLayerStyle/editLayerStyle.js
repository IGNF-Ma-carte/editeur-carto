import Action from '../Action.js';
import content from './editLayerStyle.html?raw';
import carte from '../../carte.js';
import ol_ext_element from 'ol-ext/util/element';
import './editLayerStyle.scss';
import { htmlToNode } from '../../charte/utils.js';

function onOpen(e) {
  let dialog = editLayerStyleAction.getDialog();
  console.log(dialog)
}

let editLayerStyleAction = new Action({
  title: 'Catalogue de cartes',
  icon: 'fr-icon-ign-map-line',
  content: content,
  onOpen: onOpen
})

export default editLayerStyleAction;