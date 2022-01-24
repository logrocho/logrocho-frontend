import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "../../lib/const";

async function login(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === "POST") {

    const { email } = req.body;

    const { password } = req.body;    

    await axios({
      
      method: "POST",

      url: API_URL + 'login',

      data: {

        email: email,

        password: password,
      },

    }).then(function (response){

      if(response.data.status){

        res.status(200).send(response.data.data);

      }

    }).catch(function (error) {

      if(!error.response.data.status){

        res.status(404).json(error.response.data);

      }

    })

  } else {

    res.setHeader("Allow", "POST");

    res.status(405).end("Metodo No Permitido");
  }

}

export default login;
