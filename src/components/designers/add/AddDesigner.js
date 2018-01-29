import Template from '../../Template';
import html from './add-designer.html';
import './add-designer.css';
import { db } from '../../../services/firebase';

const template = new Template(html);
const designers = db.ref('designers');

export default class AddDesigner {
  constructor(onAdd) {
    this.onAdd = onAdd;
  }

  handleSubmit(form) {
    this.error.textContent = '';

    const data = new FormData(form);
    const designer = {};
    data.forEach((value, key) => designer[key] = value);    
    
    const ref = designers.push();
    ref.set(designer)
      .then(() => window.location.hash = `#designers/${ref.key}`)
      .catch(err => this.error.textContent = err);
  }

  render() {
    const dom = template.clone();
    this.error = dom.querySelector('.error');

    this.form = dom.querySelector('form');
    this.form.addEventListener('submit', event => {
      event.preventDefault();
      this.handleSubmit(event.target);
    });

    dom.querySelector('button[type=button]').addEventListener('click', event => {
      event.preventDefault();
      window.location.hash = '#designers';
    });

    return dom;
  }

  unrender() {
  }
}