import React from 'react'

export const SelectLanguage = ({ onClick }) => {
    const [selectedLanguage, setSelectedLanguage] = React.useState("Montenegro")
  return (
    <div className='w-auto md:w-42.5' onClick={onClick}>
        <select className='bg-transparent text-white selectLanguage' name="select" id="selectLang" value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
            <option className={`text-black ${selectedLanguage === "Montenegro" ? "bg-gray-300" : ""}`} value="Montenegro">
                🇲🇪 Crnogorski
            </option>
            <option className={`text-black ${selectedLanguage === "English" ? "bg-gray-300" : ""}`} value="English">
                🇬🇧 English
            </option>
            <option className={`text-black ${selectedLanguage === "Turkish" ? "bg-gray-300" : ""}`} value="Turkish">
                🇹🇷 Türkçe
            </option>
            <option className={`text-black ${selectedLanguage === "Russian" ? "bg-gray-300" : ""}`} value="Russian">
                🇷🇺 Русский
            </option>
        </select>
    </div>
  )
}
