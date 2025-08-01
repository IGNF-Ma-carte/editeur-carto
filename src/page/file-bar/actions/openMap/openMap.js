import Action from '../Action.js';
import content from './openMap.html?raw';
import cardTemplate from './cardMapTemplate.html?raw';
import api from 'mcutils/api/api.js';
import ol_ext_element from 'ol-ext/util/element';
import './openMap.scss';
import { htmlToNode } from '../../../../charte/utils.js';

const defaultImagePath = 'img/alt-image.png';

const footer = [
  {
    label: "Ouvrir",
    primary: true,
    close: false,
    callback: openMap
  },
  {
    label: "Annuler",
    primary: false,
    close: true
  }
];

function onDisclose(e) {
  let dialogContent = e.target.querySelector('#main-modal__content');

  if (getUserMaps(dialogContent)) {
    let dialog = openMapAction.getDialog();
    dialog.setFooterButtons(footer)
  }

}

function getUserMaps(parent) {
  let list = ol_ext_element.create('div', {
    className: 'map-list'
  })

  list.appendChild(createMapCard({
    title : 'Ma carte génial',
    timestamp : Date.now()
  }));


  list.appendChild(createMapCard({
    title : 'Ma carte génial 2',
    timestamp : Date.now()
  }));


  list.appendChild(createMapCard({
    title : 'Ma carte génial 3',
    timestamp : Date.now()
  }));

  parent.replaceChildren(list)

  return true
}

function selectCard(e) {
  if (e.type === 'click' || (e.type === 'keyup' && (e.code === 'Enter' || e.code === 'Space'))) {
    console.log(e)
    // Déselctionne les autres éléments s'il y'en a
    let dialog = openMapAction.getDialog().getDialog();
    let currents = dialog.querySelectorAll('[aria-current="true"]')
    currents.forEach(card => {
      card.ariaCurrent = false
    });

    let target;
    if (e.target.classList.contains('ol-map-card')) target = e.target;
    else target = e.target.closest('.ol-map-card');
    
    target.ariaCurrent = true;
  }
}


/**
 * 
 * @param {string} title 
 * @param {string} timestamp 
 * @param {string} img 
 * @returns {ChildNode}
 */
function createMapCard({ title, timestamp, img }) {
  let src = img ? img : defaultImagePath;
  let mapTitle = title ? title : '';
  let date = new Date(timestamp);
  let dateStr = '';
  if (date) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    };

    dateStr = date.toLocaleDateString('fr-FR', options)
  }

  let template = cardTemplate.replace('$IMG_SRC', src);
  template = template.replace('$MAP_TITLE', mapTitle);
  template = template.replace('$TIMESTAMP', dateStr);

  let card = htmlToNode(template);

  card.addEventListener('click', selectCard);
  card.addEventListener('keyup', selectCard);

  return card;
}

function openMap(e) {
  console.log(e)
}

let openMapAction = new Action({
  title: 'Ouvrir une carte',
  content: content,
  onDisclose: onDisclose
})

export default openMapAction;