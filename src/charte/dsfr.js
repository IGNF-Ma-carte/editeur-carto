// DSFR
import 'dsfrign/dist/core/core.module.min.js';
import 'dsfrign/dist/component/header/header.module.min.js';
import 'dsfrign/dist/component/navigation/navigation.module.min.js';
import 'dsfrign/dist/component/button/button.module.min.js';
import 'dsfrign/dist/component/modal/modal.module.min.js';

import 'dsfrign/dist/dsfr.min.css';
import 'dsfrign/dist/utility/icons/icons.min.css';

import charte from './charte.js'

// Set service
charte.header.setService({
  service: 'Cartes.gouv.fr <span class="fr-badge fr-badge--sm fr-badge--green-emeraude">BETA</span>',
  href: '/',
  title: 'Accueil - Cartes.gouv.fr - IGN France',
})

