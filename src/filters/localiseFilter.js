import store from "@/store";
import uk from '../locales/uk.json'
import en from '../locales/en.json'

const locales = {
    'uk-UK': uk,
    'en-US': en
}

export default function localiseFilter (key) {
    const locale = store.getters.info.locale || 'uk-UK'
    return locales[locale][key] || `[Localise error]: key ${key} not found`
}
