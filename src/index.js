const debounce = require('lodash.debounce');
import './css/styles.css';
import {fetchCountries} from './js/fetchCountries.js'

const DEBOUNCE_DELAY = 300;

let getEl = selector => document.querySelector(selector);


getEl('#search-box').addEventListener('input', debounce(getText, DEBOUNCE_DELAY));

function getText(event) {
  const nameCountries = event.target.value
  
  fetchCountries(`${nameCountries.trim()}`)

}



