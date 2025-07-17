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

// Handle print button
dialogControl.dialogContent.querySelector('button.fr-icon-printer-line').addEventListener('click', () => {
  // Add ScaleLine on canvas
  carte.getControl('scaleLine').element.style.visibility = 'hidden'
  // Print
  carte.getControl('printDlg').print();
})
carte.getControl('printDlg')._printDialog.on('hide', () => {
  // Remove ScaleLine from canvas
  carte.getControl('scaleLine').element.style.visibility = '';
  carte.getMap().render()
})
