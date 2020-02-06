import get from "lodash/get"
import set from "lodash/set"

class Store {
  private listenerFunctions: (path: string, value: any) => void
  private value: {[key: string]: any}
  
  constructor(initialValue: {[key: string]: any} = {}) {
    this.value = initialValue;
  }

  registerListener(path: string, func: (path: string, value: any) => void) {
    if (!Array.isArray(this.value[path])) {
      this.value[path] = [];
    }
    
    this.value[path].push(func);
  }
  
  setValue(path: string, newValue: string) {
    set(path,newValue);
    if (!Array.isArray(this.value[path])) {
      return
    }
    
    this.value[path].forEach(callbackFunction => {
      callbackFunction(path, newValue);
    });
  }
}

const store = new Store();

function a(path, newValue) {
  console.log(newValue);
}

store.registerListener('a', a);

store.setValue('a', 'not a');

store.setValue('a', 'a');

store.setValue('a', 'not a');
