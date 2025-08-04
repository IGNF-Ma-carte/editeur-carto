import ol_ext_element from 'ol-ext/util/element'

import contentHTML from './connect.html?raw'
import './connect.scss'

import loginDialog from '../../loginDialog'
import dialog from '../../dialog'
import openAction from '../../actions/actions'

const dialogConnect = ol_ext_element.create('DIALOG', {
  id: 'ConnectDialog',
  className: 'menu-info menu-connect',
  'aria-modal': false,
  html: contentHTML,
  parent: document.body
})

document.body.dataset.disconnected = '';

let button = dialogConnect.querySelector('.disconnected > *');
button.setAttribute('aria-controls', loginDialog.getId());
button.setAttribute('data-fr-opened', false);

let viewMaps = dialogConnect.querySelector('[data-action="open-map"]');
viewMaps.setAttribute('aria-controls', dialog.getId());
viewMaps.setAttribute('data-fr-opened', false);
viewMaps.addEventListener('click', openAction)

dialogConnect.querySelector('.disconnected > *').addEventListener('click', (e) => {
  delete document.body.dataset.disconnected;

  // dialogConnect.querySelector('.connected button.create').focus();
  // e.preventDefault();
  // e.stopPropagation();
});
dialogConnect.querySelectorAll('.connected > button').forEach(button => {
  button.addEventListener('click', () => {
    dialogConnect.close()
  })
});

// dialogConnect.showModal()
dialogConnect.show()

/* DEBUG */
window.dialogConnect = dialogConnect

export default dialogConnect