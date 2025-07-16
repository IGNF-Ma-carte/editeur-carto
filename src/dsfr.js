// DSFR
import 'dsfrign/dist/core/core.module.min.js';
import 'dsfrign/dist/component/header/header.module.min.js';
import 'dsfrign/dist/component/navigation/navigation.module.min.js';
import 'dsfrign/dist/component/button/button.module.min.js';
import 'dsfrign/dist/component/modal/modal.module.min.js';

import 'dsfrign/dist/dsfr.min.css';
import 'dsfrign/dist/utility/icons/icons.min.css';

// Copy footer > header
const footer = document.querySelector('footer')
document.querySelector('.fr-header__menu-footer .footer-links').innerHTML = footer.innerHTML;