import { ApiAdapter } from '../config/apiAdapter';

export class SCMService {

    SCMData(callback) {
        setTimeout(apiServiceCall, 30000);
        function apiServiceCall() {
            new ApiAdapter().get(`${process.env.APIGATEWAY}/web/scm`).then(
                (data:any) => {
                    callback(data)
                }).catch(error => {
                    callback(error)

                });
        }
    }

}