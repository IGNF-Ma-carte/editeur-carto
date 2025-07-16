import ButtonModal from '../control/ButtonModal';
import carte from '../carte.js'

import content from './menu.html?raw'

/* Menu dialog */
const dialogControl = new ButtonModal({
  position: 'top-left',
  // closable: true,
  buttonClasses: ['gpf-btn-icon-map-modal'],
  dialogElement: content,
});

carte.addControl('popover', dialogControl);
dialogControl.dialogContent.querySelector('button.fr-icon-printer-line').addEventListener('click', () => {
  carte.getControl('scaleLine').element.style.visibility = 'hidden'
  carte.getControl('printDlg').print();
})
carte.getControl('printDlg')._printDialog.on('hide', () => {
  carte.getControl('scaleLine').element.style.visibility = '';
  carte.getMap().render()
})
