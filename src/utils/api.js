import { GET } from "../constants/api";
import axios from "axios";

export default async ({ method = GET, url, params }) => {
  return axios({
    headers: { "Content-Type": "application/json" },
    method,
    url,
    data: params
  })
    .then(response => {
      return { ok: true, payload: response.data.payload };
    })
    .catch(error => {
      const { response, request } = error;

      if (response) {
        return {
          ok: false,
          error: "SERVER_ERROR",
          message: response.data.message
        };
      }

      if (request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        return {
          ok: false,
          error: "SERVICE_UNAVAILABLE",
          message: "Serveur injoinable"
        };
      }

      return {
        ok: false,
        error: "INTERNAL_ERROR",
        message: "Erreur interne"
      };
    });
};
