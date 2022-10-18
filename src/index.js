import './utils/math';
import { luckysheet } from './core';
import __firefox from './utils/polyfill';

// Polyfill Event In Firefox
if(window.addEventListener && (navigator.userAgent.indexOf('Firefox') > 0)) __firefox();

module.exports = luckysheet;
