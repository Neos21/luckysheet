import ja from './ja';
import en from './en'
import zh from './zh'
import es from './es'
import zh_tw from './zh_tw'
import Store from '../store';

export const locales = {ja,en,zh,es,zh_tw}

function locale(){
    return locales[Store.lang];
}

export default locale;