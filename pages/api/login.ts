import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "../../lib/const";

async function login(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === "POST") {

    const { email } = req.body;

    const { password } = req.body;

    const api_data = await axios({
      
      method: "POST",

      url: API_URL + 'login',

      data: {

        email: email,

        password: password,
      },

    });

    const jwt = api_data.data;

    if(jwt.result){

      res.status(200).json(jwt.token);

    }else{

      res.status(405).end("Error al procesar la peticion, intentalo mas tarde");

    }

  } else {

    res.setHeader("Allow", "POST");

    res.status(405).end("Metodo No Permitido");
  }

}

export default login;
