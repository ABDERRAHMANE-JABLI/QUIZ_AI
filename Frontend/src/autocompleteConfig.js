// autocompleteConfig.js

function disableAutocomplete() {
    const inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].setAttribute('autocomplete', 'off');
    }
  }
  
  export default disableAutocomplete;
  