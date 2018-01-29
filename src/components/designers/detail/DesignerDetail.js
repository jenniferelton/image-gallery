import Template from '../../Template';
import html from './designer-detail.html';
import './designer-detail.css';
import Images from './Images';
import { db } from '../../../services/firebase';

const template = new Template(html);
const designers = db.ref('designers');

export default class DesignerDetail {
  constructor(key) {
    this.key = key;
    this.designer = designers.child(key);
  }

  render() {
    const dom = template.clone();

    const header = dom.querySelector('h2');
    const name = dom.querySelector('.name');

    this.onValue = this.on('value', data => {
      const designer = data.val();
      header.textContent = `${designer.name} the ${designer.type}`;
      name.textContent = designer.name;
    });

    this.images = new Images(this.key);
    dom.querySelector('section.images').append(this.images.render());

    return dom;
  }

  unrender() {
    designers.child(this.key).off('value', this.onValue);
    this.images.unrender();
  }
}