import { useLanguage } from "@/contexts/language-context";
import { getTranslations } from "@/services/dashboard";
import { TranslationDto } from "@/services/dto/translation.dto";
import { useQuery } from "@tanstack/react-query";

const DEFAULT_LANG = "tr";

type Translations = {
  [key: string]: {
    tr: string;
    en: string;
    [key: string]:
      | {
          tr: string;
          en: string;
        }
      | string;
  };
};

export const translations: Translations = {
  sliders: {
    tr: "Sliderlar",
    en: "Sliders",
    id: {
      tr: "Slider No",
      en: "Slider Id",
    },
    stitle: {
      tr: "Slider Başlığı",
      en: "Slider Title",
    },
    stext: {
      tr: "Slider Metni",
      en: "Slider Text",
    },
    simage: {
      tr: "Slider Resmi",
      en: "Slider Image",
    },
  },

  generals: {
    tr: "Genel",
    en: "Generals",
    id: {
      tr: "No",
      en: "Id",
    },
    slug: {
      tr: "Kategori",
      en: "Category",
    },
    description: {
      tr: "İçerik",
      en: "Description",
    },
    title: {
      tr: "Başlık",
      en: "Title",
    },
    img: {
      tr: "Resim",
      en: "Image",
    },
  },

  menu: {
    tr: "Menü",
    en: "Menu",
    id: {
      tr: "No",
      en: "Id",
    },
    slug: {
      tr: "Slug",
      en: "Slug",
    },
    title: {
      tr: "Başlık",
      en: "Title",
    },
    menu_belong_id: {
      tr: "Üst Menü",
      en: "Parent Menu",
    },
    type_id: {
      tr: "Tip",
      en: "Type",
    },
    route: {
      tr: "Link",
      en: "Link",
    },
    status: {
      tr: "Aktif Mi?",
      en: "Is Active",
    },
  },

  FORM_SUBMIT_CREATE: {
    tr: "Oluştur",
    en: "Create",
  },
  FORM_SUBMIT_UPDATE: {
    tr: "Güncelle",
    en: "Update",
  },
  MENU_DELETE_ALERT_TITLE: {
    tr: "Menüyü Sil",
    en: "Delete Menu",
  },
  MENU_DELETE_ALERT_DESCRIPTION: {
    tr: "Menüyü silmek istediğinize emin misiniz?",
    en: "Are you sure you want to delete the menu?",
  },
  MENU_DELETE_ALERT_CANCEL: {
    tr: "İptal",
    en: "Cancel",
  },
  MENU_DELETE_ALERT_CONFIRMATION: {
    tr: "Sil",
    en: "Delete",
  },
  page: {
    tr: "Sayfalar",
    en: "Pages",
    title: {
      tr: "Başlık",
      en: "Title",
    },
    description: {
      tr: "Açıklama",
      en: "Description",
    },
    image: {
      tr: "Resim",
      en: "Image",
    },
    content: {
      tr: "İçerik",
      en: "Content",
    },
    config_id: {
      tr: "Sayfa Tipi",
      en: "Page Type",
    },
  },
  language: {
    tr: "Diller",
    en: "Languages",
    name: {
      tr: "Dil",
      en: "Language",
    },
    code: {
      tr: "Kod",
      en: "Code",
    },
  },
  menu_type: {
    tr: "Menü Tipleri",
    en: "Menu Types",
    name: {
      tr: "Menü Adı",
      en: "Menu Name",
    },
  },
};

// export const translateDeprecated = (key: string) => {
//   //TODO: get from api
//   if (key.startsWith("page/1")) return "Başlık Bloğu";
//   if (key.startsWith("page/2")) return "Açıklama Bloğu";
//   if (key.startsWith("page/3")) return "Resim Bloğu";
//   if (key.startsWith("page/4")) return "Yazı Editör Bloğu";
//   if (key.startsWith("page/5")) return "HTML Bloğu";

//   const keyCat = key?.split("/")[0];
//   const keyString = key?.split("/")[1];
//   const keys = key.split("/");
//   if (Array.isArray(keys)) {
//     keys.forEach((key, index) => {
//       if (index === 0) {
//       }
//     });
//   }
//   if (keyString) {
//     if (keyString === "created_at") return "Oluşturulma Tarihi";
//     if (keyString === "updated_at") return "Güncellenme Tarihi";
//     if (keyString === "id") return "No";
//     if (keyString === "slug") return "Kod";
//     if (keyString === "language_code") return "Dil";

//     const translatedText =
//       translations[keyCat as keyof typeof translations]?.[
//         keyString as keyof (typeof translations)[typeof keyCat]
//       ];
//     return translatedText?.[DEFAULT_LANG as "tr" | "en"] || key;
//   } else {
//     const keyName = Object.keys(translations).find((table) => {
//       return table === key;
//     });
//     const translatedText = translations[keyName as keyof typeof translations];
//     return translatedText?.[DEFAULT_LANG as "tr" | "en"] || key;
//   }
// };

export function useTranslate() {
  const { data: translations } = useQuery<TranslationDto[]>(
    ["translations"],
    () => getTranslations()
  );
  const { language } = useLanguage();

  function translate(key: string) {
    let translatedText = key;
    if (!translations) return translatedText;
    translations
      .filter((translation) => translation.language_code === language)
      .find((translation) => {
        if (translation.key === key) {
          translatedText = translation.translated_text;
        }
      });
    return translatedText;
  }

  return { translate, translations };
}
