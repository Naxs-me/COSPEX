'use babel';

export default class MySecondPackageView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('my-second-package');
    // Create message element
    //const message = document.createElement('div');
    //message.textContent = 'The MySecondPackage package is Alive! It\'s ALIVE!';
    //message.classList.add('message');
    //this.element.appendChild(message);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  display_array(data){
    const user_created_array_envelop = document.createElement("div");
    var text = document.createTextNode(data);
    user_created_array_envelop.appendChild(text);
    user_created_array_envelop.classList.add('user_created_array_envelop');
    this.element.appendChild(user_created_array_envelop);
  }

  empty_array(){
    this.element.removeChild(this.element.lastChild);
  }


}
