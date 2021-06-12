import { BoxSize } from "../features/civ-filter/tech-tree/tech/tech.component"

enum LocalStorageKey {
    language = 'language',
    civFilterTechSize = 'civFilterTechSize'
}

class LocalStorageService {

    storeLanguage = (language: string) => {
        this.store(LocalStorageKey.language, language)
    }
    
    loadLanguage = (): string | null => {
        return this.load<string>(LocalStorageKey.language)
    }
    
    storeCivFilterTechSize = (techSize: BoxSize) => {
        this.store(LocalStorageKey.civFilterTechSize, techSize)
    }
    
    loadCivFilterTechSize = (): BoxSize | null => {
        return this.load<BoxSize>(LocalStorageKey.civFilterTechSize)
    }

    private store<T>(key: LocalStorageKey, data: T) {
        localStorage.setItem(key, JSON.stringify(data))
    }
    
    private load<T>(key: LocalStorageKey): T | null {
        const data = localStorage.getItem(key) || ''
        return data ? JSON.parse(data) as T : null
    }

}

export default new LocalStorageService()