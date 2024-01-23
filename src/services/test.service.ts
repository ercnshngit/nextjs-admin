import { BaseService } from "./base.service";

export class TestService extends BaseService{
    constructor(request?: any) {
        super(request);
    }

    async test(){
        try {
            return "test";
        } catch (error) {
            console.log("error : ", error);            
        }
    }
}