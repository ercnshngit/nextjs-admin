export class ServerMessages {
  static 200 = "OK";
  static 201 = "Created";
  static 202 = "Accepted";
  static 203 = "Non-Authoritative Information";
  static 204 = "No Content";
  static 205 = "Reset Content";

  static 400 = "Bad Request";
  static 401 = "Unauthorized";
  static 402 = "Payment Required";
  static 403 = "Forbidden";
  static 404 = "Not Found";
  static 405 = "Method Not Allowed";
  static 406 = "Not Acceptable";

  static 500 = "Internal Server Error";
}

export class ErrorMessages {
  static DUPLICATE_CODE_ERROR() {
    return {
      TR: "Bu kod daha önce kullanılmış.",
      EN: "This code has been used before.",
    };
  }

  static NOT_FOUND_ERROR() {
    return {
      TR: "Bulunamadı.",
      EN: "Not found.",
    };
  }
  static MENU_BELONG_DELETE_ERROR() {
    return {
      TR: "Bu menüye ait alt menüler bulunmaktadır. Lütfen önce alt menüleri siliniz.",
      EN: "There are submenus belonging to this menu. Please delete the submenus first.",
    };
  }

  static MENU_NOT_FOUND_ERROR() {
    return {
      TR: "Menü bulunamadı.",
      EN: "Menu not found.",
    };
  }

  static COMPONENT_NOT_FOUND_ERROR() {
    return {
      TR: "Component bulunamadı.",
      EN: "Component not found.",
    };
  }

  static BELONG_COMPONENT_NOT_FOUND_ERROR() {
    return {
      TR: "Bağlı component bulunamadı.",
      EN: "Belong component not found.",
    };
  }

  static CREATE_FAILED_ERROR() {
    return {
      TR: "Oluşturma işlemi başarısız.",
      EN: "Create failed.",
    };
  }

  static FILE_NOT_FOUND_ERROR() {
    return {
      TR: "Dosya bulunamadı.",
      EN: "File not found.",
    };
  }

  static FILE_TYPE_NOT_FOUND_ERROR() {
    return {
      TR: "Dosya tipi bulunamadı.",
      EN: "File type not found.",
    };
  }

  static USER_NOT_FOUND_ERROR() {
    return {
      TR: "Kullanıcı bulunamadı.",
      EN: "User not found.",
    };
  }
  static REGISTER_ERROR() {
    return {
      TR: "Girdiğiniz e-mail üzerine kayıtlı bir hesap bulunmaktadır.",
      EN: "There is no account registered on the e-mail you entered.",
    };
  }
  static PASSWORD_CHANGE_ERROR() {
    return {
      TR: "kullanıcı şifresi değiştirilemedi.",
      EN: "User password could not be changed.",
    };
  }
  static LOGIN_ERROR() {
    return {
      TR: "Girdiğiniz hesap bilgileri yanlış.",
      EN: "The account information you entered is incorrect.",
    };
  }
  static WRONG_PASSWORD_ERROR() {
    return {
      TR: "Girdiğiniz şifre yanlış.",
      EN: "The password you entered is incorrect.",
    };
  }
  static WRONG_OLD_PASSWORD_ERROR() {
    return {
      TR: "Eski sifrenizi yanlış girdiniz.",
      EN: "You entered your old password incorrectly.",
    };
  }
  static SAME_PASSWORD_ERROR() {
    return {
      TR: "Eski sifreniz ile yeni şifreniz aynı olamaz.",
      EN: "Your old password cannot be the same as your new password.",
    };
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
    roles_ids.forEach((element) => {
      role_ids += element + " / ";
    });
    role_ids = role_ids.substring(0, role_ids.length - 3);
    return {
      TR: role_ids + " id'li roller bulunamadı.",
      EN: "Roles with id " + role_ids + " not found.",
    };
  }
  static USER_PHOTO_NOT_FOUND() {
    return {
      tr: "Silinmek istenilen fotoğraf kullanıcıya ait değil.",
      en: "The photo to be deleted does not belong to the user.",
    };
  }
  static FILE_UPLOAD_ERROR() {
    return {
      tr: "Dosya yüklenemedi.",
      en: "The file cannot upload.",
    };
  }
  static PHOTO_TYPE_NOT_FOUND() {
    return {
      tr: "Fotoğraf tipi bulunamadı.",
      en: "No photo type found.",
    };
  }
  static PHOTO_NOT_FOUND() {
    return {
      tr: "Fotoğraf bulunamadı.",
      en: "No photo found.",
    };
  }
  static PHOTO_PATH_NOT_FOUND() {
    return {
      tr: "Fotoğraf dosya yolu bulunamadı.",
      en: "No photo file path found.",
    };
  }
  static FILE_FORMAT_ERROR() {
    return {
      tr: "Dosya formatı hatalı.",
      en: "File format error.",
    };
  }

  static UPDATE_FAILED_ERROR() {
    return {
      tr: "Güncelleme işlemi başarısız.",
      en: "Update failed.",
    };
  }

  static DELETE_FAILED_ERROR() {
    return {
      tr: "Silme işlemi başarısız.",
      en: "Delete failed.",
    };
  }
  static INSERT_FAILED_ERROR() {
    return {
      tr: "Ekleme işlemi başarısız.",
      en: "Insert failed.",
    };
  }
  static BLOCK_NOT_FOUND_ERROR() {
    return {
      tr: "Block bulunamadı.",
      en: "Block not found.",
    };
  }
  static BLOCK_COMPONENT_NOT_FOUND_ERROR() {
    return {
      tr: "Block component bulunamadı.",
      en: "Block component not found.",
    };
  }
  static TYPE_NOT_FOUND_ERROR() {
    return {
      tr: "Tip bulunamadı.",
      en: "Type not found.",
    };
  }
  static TABLE_NOT_FOUND_ERROR() {
    return {
      tr: "Tablo bulunamadı.",
      en: "Table not found.",
    };
  }
  static TABLE_CANNOT_CREATED_ERROR() {
    return {
      tr: "Tablo oluşturulamadı.",
      en: "Table cannot create.",
    };
  }
  static TABLE_UPDATE_FAILED_ERROR() {
    return {
      tr: "Tablo güncellenemedi.",
      en: "Table cannot update.",
    };
  }
  static TABLE_CANNOT_DELETED_ERROR() {
    return {
      tr: "Tablo silinemedi.",
      en: "Table cannot delete.",
    };
  }
  static REGISTER_ERROR_REQUIRED_FIELDS() {
    return {
      tr: "Lütfen gerekli alanları doldurunuz.",
      en: "Please fill in the required fields.",
    };
  }
  static CHANGE_PASSWORD_ERROR_REQUIRED_FIELDS() {
    return {
      tr: "Lütfen gerekli alanları doldurunuz. ( email , eski şifre , yeni şifre )",
      en: "Please fill in the required fields. ( email , old password , new password )",
    };
  }
  static OLD_PASSWORD_NOT_MATCH_ERROR() {
    return {
      tr: "Eski şifreniz yanlış.",
      en: "Your old password is incorrect.",
    };
  }
  static OLD_PASSWORD_AND_NEW_PASSWORD_NOT_SAME_ERROR() {
    return {
      tr: "Eski şifreniz ile yeni şifreniz aynı olamaz.",
      en: "Your old password cannot be the same as your new password.",
    };
  }
  static UNAUTHORIZED_ERROR() {
    return {
      tr: "Yetkisiz işlem.",
      en: "Unauthorized operation.",
    };
  }
  static TOKEN_EXPIRED_ERROR() {
    return {
      tr: "Token süresi dolmuş.",
      en: "Token expired.",
    };
  }
  static TOKEN_INVALID_ERROR() {
    return {
      tr: "Token geçersiz.",
      en: "Token invalid.",
    };
  }
  static USER_ALREADY_EXISTS_ERROR() {
    return {
      tr: "Bu e-mail adresi ile kayıtlı kullanıcı zaten mevcut.",
      en: "There is already a registered user with this e-mail address.",
    };
  }
  static ALREADY_EXISTS_ERROR() {
    return {
      tr: "Zaten Mevcut",
      en: "Already Exist",
    };
  }
  static JWT_ACCESS_SECRET_NOT_FOUND_ERROR() {
    return {
      tr: "Jwt access secret bulunamadı.",
      en: "Jwt access secret not found.",
    };
  }
  static ACOOUNTS_DIFFERENT_ERROR() {
    return {
      tr: "Hesaplar farklı.",
      en: "Accounts different.",
    };
  }
  static CRUD_OPTION_NOT_FOUND_ERROR() {
    return {
      tr: "Crud option bulunamadı.",
      en: "Crud option not found.",
    };
  }
  static CRUD_OPTION_CREATE_FAILED_ERROR() {
    return {
      tr: "Crud option oluşturulamadı.",
      en: "Crud option cannot create.",
    };
  }
  static CRUD_OPTION_UPDATE_FAILED_ERROR() {
    return {
      tr: "Crud option güncellenemedi.",
      en: "Crud option cannot update.",
    };
  }
  static CRUD_OPTION_DELETE_FAILED_ERROR() {
    return {
      tr: "Crud option silinemedi.",
      en: "Crud option cannot delete.",
    };
  }
  static DATABASE_TABLE_COLUMN_UPDATE_FAILED_ERROR() {
    return {
      tr: "Database table column güncellenemedi.",
      en: "Database table column cannot update.",
    };
  }

  static COLUMN_RELATION_NOT_FOUND_ERROR() {
    return {
      tr: "Column relation bulunamadı.",
      en: "Column relation not found.",
    };
  }
  static TABLE_CONFIG_UPDATE_FAILED_ERROR() {
    return {
      tr: "Table config güncellenemedi.",
      en: "Table config cannot update.",
    };
  }
  static PERMISSION_ERROR() {
    return {
      tr: "Bu işlemi yapmak için yetkiniz bulunmamaktadır.",
      en: "You do not have permission to do this.",
    };
  }
  static MENU_BELONG_ID_NOT_SAME_ERROR() {
    return {
      tr: "Menüye ait id'ler aynı olmalıdır.",
      en: "Menu belong id must be the same.",
    };
  }
}

export class ConfirmMessages {
  static INSERT_SUCCESS_CONFIRM() {
    return {
      TR: "Ekleme işlemi başarılı.",
      EN: "Insert successful.",
    };
  }

  static DELETE_SUCCESS_CONFIRM() {
    return {
      tr: "Silme işlemi başarılı.",
      en: "Delete successful.",
    };
  }

  static REGISTER_SUCCESS() {
    return {
      TR: "Kayıt işlemi başarılı.",
      EN: "Registration successful.",
    };
  }
  static PASSWORD_CHANGE_SUCCESS() {
    return {
      TR: "Şifre değiştirme işlemi başarılı.",
      EN: "Password change successful.",
    };
  }
  static LOGIN_SUCCESS() {
    return {
      TR: "Giriş işlemi başarılı.",
      EN: "Login successful.",
    };
  }
  static ROLE_CREATE_SUCCESS() {
    return {
      TR: "Rol oluşturma işlemi başarılı.",
      EN: "Role create successful.",
    };
  }
  static FILE_UPLOAD_CONFIRM() {
    return {
      tr: "Dosya başarıyla yüklendi.",
      en: "The file has been successfully updated.",
    };
  }
  static UPDATE_SUCCESS_CONFIRM() {
    return {
      tr: "Güncelleme işlemi başarılı.",
      en: "Update successful.",
    };
  }
  static TABLE_UPDATE_SUCCESS_CONFIRM() {
    return {
      tr: "Tablo güncelleme işlemi başarılı.",
      en: "Table update successful.",
    };
  }
  static TABLE_DELETE_SUCCESS_CONFIRM() {
    return {
      tr: "Tablo silme işlemi başarılı.",
      en: "Table delete successful.",
    };
  }
  static TABLE_CONFIG_DATA_UPDATE_SUCCESS_CONFIRM() {
    return {
      tr: "Tablo config data güncelleme işlemi başarılı.",
      en: "Table config data update successful.",
    };
  }
  static TABLE_CONFIG_DELETE_SUCCESS_CONFIRM() {
    return {
      tr: "Tablo config silme işlemi başarılı.",
      en: "Table config delete successful.",
    };
  }
  static TABLE_CONFIG_CREATE_SUCCESS_CONFIRM() {
    return {
      tr: "Tablo config oluşturma işlemi başarılı.",
      en: "Table config create successful.",
    };
  }
  static TABLE_CONFIG_UPDATE_SUCCESS_CONFIRM() {
    return {
      tr: "Tablo config güncelleme işlemi başarılı.",
      en: "Table config update successful.",
    };
  }
  static CRUD_OPTION_CREATE_SUCCESS_CONFIRM() {
    return {
      tr: "Crud option oluşturma işlemi başarılı.",
      en: "Crud option create successful.",
    };
  }
  static CRUD_OPTION_UPDATE_SUCCESS_CONFIRM() {
    return {
      tr: "Crud option güncelleme işlemi başarılı.",
      en: "Crud option update successful.",
    };
  }
  static CRUD_OPTION_DELETE_SUCCESS_CONFIRM() {
    return {
      tr: "Crud option silme işlemi başarılı.",
      en: "Crud option delete successful.",
    };
  }
}
