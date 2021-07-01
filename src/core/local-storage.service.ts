import { BoxSize } from "../components/tech/tech.component"
import { TooltipInteractivity } from "../features/civ-filter/civ-filter.slice"

enum LocalStorageKey {
    language = 'language',
    civFilterTechSize = 'civFilterTechSize',
    civFilterTooltipInteractivity = "civFilterTooltipInteractivity"
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
    
    storeCivFilterTooltipInteractivity = (tooltipInteractivity: TooltipInteractivity) => {
        this.store(LocalStorageKey.civFilterTooltipInteractivity, tooltipInteractivity)
    }
    
    loadCivFilterTooltipInteractivity = (): TooltipInteractivity | null => {
        return this.load(LocalStorageKey.civFilterTooltipInteractivity)
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