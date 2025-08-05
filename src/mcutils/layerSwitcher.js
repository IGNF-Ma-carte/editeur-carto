
import { LayerSwitcher } from 'geopf-extensions-openlayers';
import carte from '../carte';
import leftPanel from '../leftPanel';


function openMapDialog(e, instance, layer, options) {
  leftPanel.setDialogTitle('Couche : ' + layer.get('name'))
  leftPanel.open();
  console.log(e, instance, layer, options);
}

const switcher = new LayerSwitcher({
  options: {
    position: 'top-right',
    collapsed: true,
    panel: true,
    counter: true,
    allowEdit: true,
    advancedTools: [
      // icone par defaut
      {
        label: 'Sélectionner la couche',
        icon: 'fr-icon-cursor-line',
        cb: (e, instance, layer, options) => {
          carte.selectedLayer = layer;
          carte.dispatchEvent({
            type: 'selected:layer:change',
            layer: layer,
            options: options,
          })
          openMapDialog(e, instance, layer, options);
        }
      },
    ]
  }
});

export default switcher;