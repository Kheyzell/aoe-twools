import React from "react";

import "./lang-selector.css"
import englishFlag from "../../resources/icons/gb.png"
import frenchFlag from "../../resources/icons/fr.png"
import { useTranslation } from "react-i18next";

export interface LangSelectorProps { }
export interface LangSelectorState { }

const LangSelector: React.FC<LangSelectorProps> = (props, state: LangSelectorState) => {
    const { i18n } = useTranslation()
    const currentLanguage = i18n.language

    const onFlagClick = (lang: string) => {
        window.localStorage.setItem('lang', lang)
        i18n.changeLanguage(lang)
    }

    return (
        <div className="LangSelector">
            <img src={englishFlag} className={currentLanguage === 'en' ? 'Selected' : ''} onClick={() => onFlagClick('en')} alt="English" title="English" />
            <img src={frenchFlag} className={currentLanguage === 'fr' ? 'Selected' : ''} onClick={() => onFlagClick('fr')} alt="Français" title="Français" />
        </div>
    );
}

export default LangSelector;