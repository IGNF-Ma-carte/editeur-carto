import './version'
import './charte/dsfr.js'
import './charte/navigation.js'

import carte from './carte.js'
// import './page/menu/menu.js'

import './page/connect.js'
import './page/edit-bar/edit-bar.js'
import './page/step-bar/step-bar.js'
import './page/file-bar/file-bar.js'

// Custom CSS
import 'remixicon/fonts/remixicon.css'
import './css/icons.scss';
import './css/index.scss';
import './css/control.scss'

/* DEBUG */
window.carte = carte
/**/

import dialog from './dialog.js'
dialog.getDialog().addEventListener('dsfr.disclose', (e) => { console.log(e) })