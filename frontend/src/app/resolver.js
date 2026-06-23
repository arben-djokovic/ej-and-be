

export const getLocalizedText = (property, locale) => {
  switch (locale) {
    case "en":
      return {
        title: property.title_en,
        description: property.description_en,
      };

    case "tr":
      return {
        title: property.title_tr,
        description: property.description_tr,
      };

    case "ru":
      return {
        title: property.title_ru,
        description: property.description_ru,
      };

    default:
      return {
        title: property.title,
        description: property.description,
      };
  }
};

export const getPropertyTypeLabel = (type, locale) => {
  const map = {
    apartment: {
      me: "Stan",
      en: "Apartment",
      tr: "Daire",
      ru: "Квартира",
    },
    house: {
      me: "Kuća",
      en: "House",
      tr: "Ev",
      ru: "Дом",
    },
    land: {
      me: "Zemljište",
      en: "Land",
      tr: "Arsa",
      ru: "Земля",
    },
    commercial: {
      me: "Poslovni prostor",
      en: "Commercial space",
      tr: "Ticari alan",
      ru: "Коммерческая недвижимость",
    },
    villa: {
      me: "Vila",
      en: "Villa",
      tr: "Villa",
      ru: "Вилла",
    },
    garage: {
      me: "Garaža",
      en: "Garage",
      tr: "Garaj",
      ru: "Гараж",
    },
  };

  return map[type]?.[locale] || type;
};