import Action from '../Action.js';
import carte from '../../../../carte.js';
import api from 'mcutils/api/api.js';
import content from './saveMap.html?raw';
import ol_ext_element from 'ol-ext/util/element';


function onDisclose(e) {
  let input = e.target.querySelector('[data-field="title"]');
  let title = carte.get('title') || carte.getMap().get('title');
  input.value = title ? title : '';

  let select = e.target.querySelector('[data-field="theme"]');
  api.getThemes((themes) => {
    if (themes.length) {
      addThemes(themes, select);
    }
  });
}

function addThemes(themes, select) {
  Object.keys(themes).forEach(key => {
    let { id, name } = themes[key]
    let option = ol_ext_element.create('option', {
      value: id,
      html: name,
    })
    select.appendChild(option);
  });
}

function saveMap(e) {
  let dialog = saveMapAction.getDialog().getDialog();
  let inputName = dialog.querySelector('[data-field="title"]');
  console.log(inputName.value)
  let select = dialog.querySelector('[data-field="theme"]');
  console.log(select.value)
}

let saveMapAction = new Action({
  title: 'Enregistrer',
  content: content,
  footer: [
    {
      label: "Enregistrer",
      primary: true,
      close: false,
      callback: saveMap,
    },
    {
      label: "Annuler",
      primary: false,
      close: true
    }
  ],
  onDisclose: onDisclose
});

export default saveMapAction;