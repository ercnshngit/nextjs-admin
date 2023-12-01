
export class ErrorMessages {

   static COMPONENT_NOT_FOUND_ERROR() {
      return {
         TR: "Component bulunamadı.",
         EN: "Component not found."
      }
   }

   static BELONG_COMPONENT_NOT_FOUND_ERROR() {
      return {
         TR: "Bağlı component bulunamadı.",
         EN: "Belong component not found."
      }
   }

   static CREATE_FAILED_ERROR() {
      return {
         TR: "Oluşturma işlemi başarısız.",
         EN: "Create failed."
      }
   }

   static FILE_NOT_FOUND_ERROR() {
      return {
         TR: "Dosya bulunamadı.",
         EN: "File not found."
      }
   }

   static FILE_TYPE_NOT_FOUND_ERROR() {
      return {
         TR: "Dosya tipi bulunamadı.",
         EN: "File type not found."
      }
   }

   static USER_NOT_FOUND_ERROR() {
      return {
         TR: "Kullanıcı bulunamadı.",
         EN: "User not found."
      }
   }
   static REGISTER_ERROR() {
      return {
         TR: "Girdiğiniz e-mail üzerine kayıtlı bir hesap bulunmaktadır.",
         EN: "There is no account registered on the e-mail you entered."
      }
   }
   static PASSWORD_CHANGE_ERROR() {
      return {
         TR: "kullanıcı şifresi değiştirilemedi.",
         EN: "User password could not be changed."
      }
   }
   static LOGIN_ERROR() {
      return {
         TR: "Girdiğiniz hesap bilgileri yanlış.",
         EN: "The account information you entered is incorrect."
      }
   }
   static WRONG_PASSWORD_ERROR() {
      return {
         TR: "Eski sifrenizi yanlış girdiniz.",
         EN: "You entered your old password incorrectly."
      }
   }
   static SAME_PASSWORD_ERROR() {
      return {
         TR: "Eski sifreniz ile yeni şifreniz aynı olamaz.",
         EN: "Your old password cannot be the same as your new password."
      }
   }
   /*
   static PERMISSION_ERROR(roles: Roles[]) {
      let role_names = "";
      roles.forEach(element => {
         role_names += element.name + " / ";
      });
      role_names = role_names.substring(0, role_names.length - 3);
      return {
         TR: "Bu işlemi yapmak için " + role_names + " yetkisine sahip olmalısınız.",
         EN: "You must have " + role_names + " authority to do this."
      }
   }*/
   static ROLES_NOT_FOUND_ERROR(roles_ids: number[]) {
      let role_ids = "";
      roles_ids.forEach(element => {
         role_ids += element + " / ";
      });
      role_ids = role_ids.substring(0, role_ids.length - 3);
      return {
         TR: role_ids + " id'li roller bulunamadı.",
         EN: "Roles with id " + role_ids + " not found."
      }
   }
   static USER_PHOTO_NOT_FOUND() {
      return {
         tr: "Silinmek istenilen fotoğraf kullanıcıya ait değil.",
         en: "The photo to be deleted does not belong to the user."
      }
   }
   static FILE_UPLOAD_ERROR() {
      return {
         tr: "Dosya yüklenemedi.",
         en: "The file cannot upload."
      }
   }
   static PHOTO_TYPE_NOT_FOUND() {
      return {
         tr: "Fotoğraf tipi bulunamadı.",
         en: "No photo type found."
      }
   }
   static PHOTO_NOT_FOUND() {
      return {
         tr: "Fotoğraf bulunamadı.",
         en: "No photo found."
      }
   }
   static PHOTO_PATH_NOT_FOUND() {
      return {
         tr: "Fotoğraf dosya yolu bulunamadı.",
         en: "No photo file path found."
      }
   }
   static FILE_FORMAT_ERROR() {
      return {
         tr: "Dosya formatı hatalı.",
         en: "File format error."
      }
   }

   static UPDATE_FAILED_ERROR() {
      return {
         tr: "Güncelleme işlemi başarısız.",
         en: "Update failed."
      }
   }

   static DELETE_FAILED_ERROR() {
      return {
         tr: "Silme işlemi başarısız.",
         en: "Delete failed."
      }
   }
   static INSERT_FAILED_ERROR() {
      return {
         tr: "Ekleme işlemi başarısız.",
         en: "Insert failed."
      }
   }
   static BLOCK_NOT_FOUND_ERROR() {
      return {
         tr: "Block bulunamadı.",
         en: "Block not found."
      }
   }
   static BLOCK_COMPONENT_NOT_FOUND_ERROR() {
      return {
         tr: "Block component bulunamadı.",
         en: "Block component not found."
      }
   }
   static TYPE_NOT_FOUND_ERROR() {
      return {
         tr: "Tip bulunamadı.",
         en: "Type not found."
      }
   }
   static TABLE_NOT_FOUND_ERROR() {
      return {
         tr: "Tablo bulunamadı.",
         en: "Table not found."
      }
   }
   static TABLE_CANNOT_CREATED_ERROR() {
      return {
         tr: "Tablo oluşturulamadı.",
         en: "Table cannot create."
      }
   }
   static TABLE_UPDATE_FAILED_ERROR() {
      return {
         tr: "Tablo güncellenemedi.",
         en: "Table cannot update."
      }
   }
}

export class ConfirmMessages {

   static INSERT_SUCCESS_CONFIRM() {
      return {
         TR: "Ekleme işlemi başarılı.",
         EN: "Insert successful."
      }
   }

   static DELETE_SUCCESS_CONFIRM() {
      return {
         tr: "Silme işlemi başarılı.",
         en: "Delete successful."
      }
   }

   static REGISTER_SUCCESS() {
      return {
         TR: "Kayıt işlemi başarılı.",
         EN: "Registration successful."
      }
   }
   static PASSWORD_CHANGE_SUCCESS() {
      return {
         TR: "Şifre değiştirme işlemi başarılı.",
         EN: "Password change successful."
      }
   }
   static LOGIN_SUCCESS() {
      return {
         TR: "Giriş işlemi başarılı.",
         EN: "Login successful."
      }
   }
   static ROLE_CREATE_SUCCESS() {
      return {
         TR: "Rol oluşturma işlemi başarılı.",
         EN: "Role create successful."
      }
   }
   static FILE_UPLOAD_CONFIRM() {
      return {
         tr: "Dosya başarıyla yüklendi.",
         en: "The file has been successfully updated."
      }
   }
   static UPDATE_SUCCESS_CONFIRM() {
      return {
         tr: "Güncelleme işlemi başarılı.",
         en: "Update successful."
      }
   }
   static TABLE_UPDATE_SUCCESS_CONFIRM() {
      return {
         tr: "Tablo güncelleme işlemi başarılı.",
         en: "Table update successful."
      }
   }
   static TABLE_DELETE_SUCCESS_CONFIRM() {
      return {
         tr: "Tablo silme işlemi başarılı.",
         en: "Table delete successful."
      }
   }
   static TABLE_CONFIG_DATA_UPDATE_SUCCESS_CONFIRM() {
      return {
         tr: "Tablo config data güncelleme işlemi başarılı.",
         en: "Table config data update successful."
      }
   }
}