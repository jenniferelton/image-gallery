import Template from '../Template';
import html from './designers.html';
import './designers.css';
import AddDesigner from './add/AddDesigner';
import DesignerDetail from './detail/DesignerDetail.js';
import DesignerList from './list/DesignerList';
import { removeChildren } from '../dom';

const template = new Template(html);


export default class Designers {
  constructor() {
    this.hashChange = () => this.setChildPage();
    window.addEventListener('hashchange', this.hashChange);
  }
    
  setChildPage() {
    const routes = window.location.hash.split('/');
    const childPage = routes[1] || '';
    if(this.childPage === childPage) return;

    this.childPage = childPage;
    if(this.childComponent) this.childComponent.unrender();
    removeChildren(this.section);

    let childComponent;
    if(childPage === 'add') childComponent = new AddDesigner();
    else if(childPage) childComponent = new DesignerDetail(childPage);
    else childComponent = new DesignerList();

    this.childComponent = childComponent;
    this.section.appendChild(childComponent.render());
  }

  render() {
    const dom = template.clone();
    this.section = dom.querySelector('section');
    this.setChildPage();
    return dom;
  }

  unrender() {
    window.removeEventListener('hashchange', this.hashChange);
  }
}