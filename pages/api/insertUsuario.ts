import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "../../lib/const";

async function insertUsuario(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    
    const {user_token} = req.cookies;

    await axios({
      method: "POST",

      url: API_URL + `insertUsuario`,

      data: req.body,

      headers: {
        Authorization: `Bearer ${user_token}`,
      },
    })
      .then(function (response) {
        if (response.data.status) {
          res.status(200).send(response.data);
        }
      })
      .catch(function (error) {
        if (!error.response.data.status) {
          res.status(404).json(error.data);
        }
      });
  } else {
    res.setHeader("Allow", "POST");

    res.status(405).end("Metodo No Permitido");
  }
}

export default insertUsuario;
