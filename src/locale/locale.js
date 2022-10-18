import ja from './ja';

import Store from '../store';

export const locales = { ja };

function locale() {
  return locales[Store.lang];
}

export default locale;
