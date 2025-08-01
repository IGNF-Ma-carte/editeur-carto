import ol_ext_element from 'ol-ext/util/element'

import contentHTML from './connect.html?raw'
import './connect.scss'

console.log('ok')

const dialogConnect = ol_ext_element.create('DIALOG', {
  id: 'ConnectDialog',
  className: 'menu-info menu-connect',
  'aria-modal': false,
  html: contentHTML,
  parent: document.body
})

document.body.dataset.disconnected = '';

dialogConnect.querySelector('.disconnected a').addEventListener('click', (e) => {
  delete document.body.dataset.disconnected;
  dialogConnect.querySelector('.connected button.create').focus();
  e.preventDefault();
  e.stopPropagation();
});
dialogConnect.querySelector('button.create').addEventListener('click', () => {
  dialogConnect.close()
})

dialogConnect.showModal()
// dialogConnect.show()

/* DEBUG */
window.dialogConnect = dialogConnect

export default dialogConnect