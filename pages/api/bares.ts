import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import {  API_URL } from "../../lib/const";

async function bares(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === "GET") {
    
    const { limit } = req.query ?? 9999999999;

    const { offset } = req.query ?? 0;

    const { key } = req.query ?? "";

    const { order } = req.query ?? "id";

    const { direction } = req.query ?? "ASC";

    await axios({

      method: "GET",

      url:

        API_URL + `bares?limit=${limit}&offset=${offset}&key=${key}&order=${order}&direction=${direction}`,

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

    res.setHeader("Allow", "GET");

    res.status(405).end("Metodo No Permitido");

  }
}

export default bares;
