import { TableService } from "@/services/table.service";
import { TranslationService } from "@/services/translation.service";

export async function createTranslations() {
  const translationService = new TranslationService("table-config-script");
  const result = await translationService.createAllBasicTranslations();
  if (result == null) {
    console.log("translations cannot created.");
  } else {
    console.log("Translations successfully created.");
  }
}

createTranslations();
