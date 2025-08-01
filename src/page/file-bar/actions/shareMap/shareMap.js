import Action from '../Action.js';
import carte from '../../../../carte.js';
import content from './shareMap.html?raw';
import './shareMap.scss';

function onDisclose(e) {
  let copyBtns = e.target.querySelectorAll('button.copy');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', copy)
  });
  console.log('on disclose share map')
}

function copy(e) {
  let dataCopy = e.target.dataset.copy;
  let input = document.getElementById(dataCopy);

  console.log(e)
  console.log(dataCopy, input)

  if (input) {
    // Copie la valeur
    navigator.clipboard.writeText(input.value);

    // Change l'icône et le texte affiché
    let copied = 'Copié <span class="fr-ml-1w ri-check-line"></span>'
    e.target.innerHTML = copied;
  }
}

let shareMapAction = new Action({
  title: 'Partager',
  content: content,
  onDisclose: onDisclose
});

export default shareMapAction;