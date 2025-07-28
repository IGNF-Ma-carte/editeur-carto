import MapHandle from '../../control/MapHandle/MapHandle';
import carte from '../../carte.js'

import './menu.scss'
// Download
import FileSaver from 'file-saver'

import content from './menu.html?raw'
import elem from '../dialogs/dialog.html?raw'
import openMap from '../dialogs/open-map.html?raw'
import saveMap from '../dialogs/save-map.html?raw'
import renameMap from '../dialogs/rename-map.html?raw'
import shareMap from '../dialogs/share-map.html?raw'

/* Menu dialog */
const dialogControl = new MapHandle({
  position: 'top-left',
  buttonClasses: ['gpf-btn-icon-map-modal'],
  info: true,
  infoContent: carte.get('title')
});
carte.addControl('popover', dialogControl);

let createNewMap = function (e) {
  window.open(import.meta.env.BASE_URL, '_blank').focus();
}

let previewMap = function (e) {
  console.log("ouvre la visualisation")
}

let exportMap = function (e) {
  const data = carte.write(e.shiftKey);

  const blob = new Blob([JSON.stringify(data, null, e.ctrlKey ? undefined : ' ')], { type: "text/plain;charset=utf-8" });
  FileSaver.saveAs(blob, "carte.carte");
}


// Handle buttons
dialogControl.setButtonDialog('open-map', openMap)
dialogControl.setButtonDialog('save-map', saveMap)
dialogControl.setButtonDialog('rename-map', renameMap)
dialogControl.setButtonDialog('share-map', shareMap)

dialogControl.setButtonAction('create-map', createNewMap)
dialogControl.setButtonAction('preview-map', previewMap)
dialogControl.setButtonAction('export-map', exportMap)


// Handle print button
dialogControl.dialogContent.querySelector('[data-action=print-map]').addEventListener('click', () => {
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