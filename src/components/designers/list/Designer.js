import Template from '../../Template';
import html from './designer.html';
import './designer.css';
import { db } from '../../../services/firebase';
import { getUrl } from '../../../services/cloudinary';

const template = new Template(html);
const designersImages = db.ref('designer-images');

export default class Designer {
  constructor(key, designer) {
    this.key = key;
    this.designer = designer;
    this.designerImages = designersImages.child(key).limitToFirst(1);
  }

  update(designer) {
    this.caption.textContent = `${designer.name} the ${designer.type}`;
    this.image.alt = designer.name;
  }

  render() {
    const dom = template.clone();
    dom.querySelector('a').href = `#designers/${this.key}`;
    this.caption = dom.querySelector('h2');
    this.image = dom.querySelector('img');

    this.update(this.designer);
    
    this.onValue = this.designerImages.on('child_added', data => {
      this.image.src = getUrl(data.val());
    });

    return dom;
  }

  unrender() {
    this.designerImages.off('child_added', this.onValue);
  }
}