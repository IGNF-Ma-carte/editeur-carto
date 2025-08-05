import Action from '../Action.js';
import content from './importFlow.html?raw';
import './importFlow.scss';

function onOpen(e) {
  let dialog = importFlowAction.getDialog();
  console.log('import flux')
}

const importFlowAction = new Action({
  title: 'Importer un flux',
  icon: 'ri-global-line',
  content: content,
  onOpen: onOpen
})

export default importFlowAction;