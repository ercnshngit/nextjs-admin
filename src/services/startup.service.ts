import { LogService } from "./log.service";
import fs from "fs";
import path from "path";
import { ApiRouteConstants } from "../../constants/api-route.constants";


export function getAllApiPaths(file_path : any, depth : number){
    let apiPaths : string[] = [];
    let copied_apies : string[] = [];
    const stack: { dizin: string; derinlik: number }[] = [{ dizin: file_path, derinlik: depth }];
    copied_apies.push("first");
    while(true){
        const { dizin, derinlik } = stack.pop()!;
        if(depth == 0){
            break;
        }
        try {
            const dosyalar = fs.readdirSync(file_path);
            dosyalar.forEach(dosya => {
                const dosyaYolu = path.join(file_path, dosya);
                try {
                    const stats = fs.statSync(dosyaYolu);
                    if (stats.isFile()) {
                        console.log('Dosya:', dosyaYolu);
                        apiPaths.push(dosyaYolu);
                    } else if (stats.isDirectory()) {
                        // Eğer alt dizinse, bu dizinin içindeki dosyaları da al
                        stack.push({ dizin: dosyaYolu, derinlik: derinlik - 1 });
                    }
                } catch (err) {
                    console.error('Dosya durumu kontrol hatası:', err);
                }
            });
        } catch (err) {
            console.error('Dizin okuma hatası:', err);
        }
        /*
        try {
            
            fs.readdir(file_path,(err, dosyalar) => {
                console.log("dosyaYolu :", file_path);
                if (err) {
                    return 'Dizin okuma hatası:' + err;
                }
                dosyalar.forEach(dosya => {
                    let dosyaYolu = path.join(file_path, dosya);
                    fs.stat(dosyaYolu, (err, stats) => {
                        if (err) {
                            return 'Dosya durumu kontrol hatası:' + err;
                        }
        
                        if (stats.isFile()) {
                            if(dosyaYolu.endsWith("route.ts")){
                                dosyaYolu = dosyaYolu.replace("src\\app\\api\\","").replaceAll("\\","/").replace("/route.ts","");
                                if(dosyaYolu.includes("[") && dosyaYolu.includes("]")){
                                    dosyaYolu = dosyaYolu.replaceAll(/\[.*?\]/g, ApiRouteConstants.PARAM);
                                }
                                apiPaths.push(dosyaYolu);
                            }
                        } else if (stats.isDirectory()) {
                            //console.log('Dizin:', dosyaYolu);
        
                            // Eğer alt dizinse, bu dizinin içindeki dosyaları da al
                            --depth
                        }
                    });
                });
            });
        } catch (error) {
            console.log("error :", error);
        }*/
        
    }
    console.log("apiss :", apiPaths);
    return apiPaths;
}

export class StartupService extends LogService{
    
}