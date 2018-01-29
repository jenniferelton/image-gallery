import html from './designer-list.html';
import './designer-list.css';
import Template from '../../Template';
import Designer from './Designer';
import { db } from '../../../services/firebase';

const template = new Template(html);
const designers = db.ref('designers');

export default class DesignerList {
  
  render() {
    const dom = template.clone();
    
    const ul = dom.querySelector('ul');

    const map = new Map();

    this.childAdded = designers.on('child_added', data => {
      const designer = new Designer(data.key, data.val());
      const designerDom = designer.render();
      map.set(data.key, {
        component: designer,
        nodes: [...designerDom.childNodes]
      });

      ul.appendChild(designerDom);
    });

    this.childRemoved = designers.on('child_removed', data => {
      const toRemove = map.get(data.key);
      map.delete(data.key);
      toRemove.nodes.forEach(node => node.remove());
      toRemove.component.unrender();
    });

    this.childChange = designers.on('child_changed', data => {
      map.get(data.key).component.update(data.val());
    });

    return dom;
  }

  unrender() {
    designers.off('child_added', this.childAdded);
    designers.off('child_removed', this.childRemoved);
    designers.off('child_changed', this.childChange);
  }
}