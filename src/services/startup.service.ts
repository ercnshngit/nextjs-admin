import { LogService } from "./log.service";
import fs from "fs";
import path from "path";
import { ApiRouteConstants } from "../../constants/api-route.constants";

export let apiPaths : string[] = [];

export async function getAllApiPaths(file_path : any, depth : number) : Promise<any>{

    async function findApiPaths(file_path : any, depth : number){
        if(depth == 0){
            return apiPaths;
        }
        fs.readdir(file_path,async (err, dosyalar) => {
            if (err) {
                return 'Dizin okuma hatası:' + err;
            }
            dosyalar.forEach(async dosya => {
                let dosyaYolu = path.join(file_path, dosya);
    
                fs.stat(dosyaYolu, async (err, stats) => {
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
                        await findApiPaths(dosyaYolu, depth - 1);
                    }
                });
            });
        });
    }
}

export class StartupService extends LogService{
    
    async getApiPaths(){
        const file_path = "./src/app/api";
        return apiPaths;
    }
}