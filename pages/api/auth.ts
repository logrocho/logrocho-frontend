import jwt from 'jsonwebtoken';


export function getTokenData(token:string){


    const secretKey = 'pepito';

    const data_token:any = jwt.verify(token,secretKey,{

            algorithms:['HS512']

    }, function(err,decoded){

        if (err) {
            
            return err;
        
        } else {

            return decoded;

        }

    });
    return data_token;
}

