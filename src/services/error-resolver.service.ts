import cors from "@/utils/cors";

export class ErrorResolverService{
    request : any;

    constructor(request : any) {
        this.request = request;
    }

    async resolve(error : any) {
        try {
            if(error instanceof Response){
                return cors(this.request, error);
            }
            const res = new Response(
                JSON.stringify({ status: "error", message: error }),
                { status: 500 }
            );
            return cors(this.request, res);
        } catch (error) {
            console.log("error : ", error);
            const res = new Response(
                JSON.stringify({ status: "error", message: error }),
                { status: 500 }
            );
            return cors(this.request, res);
        }
    }
}