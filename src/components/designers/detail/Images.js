import Template from '../../Template';
import html from './images.html';
import Image from './Image';
import { db, storage } from '../../../services/firebase';

const template = new Template(html);
const designersImages = db.ref('designer-images');
const designerImageStorage = storage.ref('designers');

export default class Images {
  constructor(key) {
    this.designerImages = designersImages.child(key);
    this.imageStorage = designerImageStorage.child(key);
  }

  handleUpload(file) {
    const designerImage = this.designerImages.push();
    const uploadTask = this.imageStorage.child(designerImage.key).put(file);
    
    uploadTask.on('state_changed', (/*snapshot*/) => {
    }, err => {
     
      console.error(err);
    }, () => {
      const downloadUrl = uploadTask.snapshot.downloadURL;
      this.fileInput.value = null;
      designerImage.set(downloadUrl);
    });
  }

  handleEmbed(url) {
    const designerImage = this.designerImages.push();
    designerImage.set(url);
  }

  handleRemove(imageKey) {
    this.designerImages.child(imageKey).remove();
    const storage = this.imageStorage.child(imageKey);
    storage.delete()
      .catch(err => {
        if(err.code === 'storage/object-not-found') return;
        console.error(err);
      });
  }

  render() {
    const dom = template.clone();
    
    this.fileInput = dom.querySelector('input[type=file]');
    this.fileInput.addEventListener('change', event => {
      const files = event.target.files;
      if(!files || !files.length) return;
      this.handleUpload(files[0]);
    });

    const embedForm = dom.querySelector('form');
    embedForm.addEventListener('submit', event => {
      event.preventDefault();
      this.handleEmbed(event.target.elements.url.value);
    });

    const ul = dom.querySelector('ul');
    const map = new Map();

    this.childAdded = this.designerImages.on('child_added', data => {
      const image = new Image(data.val(), () => this.handleRemove(data.key));
      const imageDom = image.render();
      map.set(data.key, {
        nodes: [...imageDom.childNodes],
        component: image
      });
      ul.appendChild(imageDom);
    });

    this.childRemoved = this.designerImages.on('child_removed', data => {
      const toRemove = map.get(data.key);
      toRemove.nodes.forEach(node => node.remove());
      
    });

    return dom;
  }

  unrender() {
    this.designerImages.on('child_added', this.childAdded);
    this.designerImages.on('child_removed', this.childRemoved);
  }
}