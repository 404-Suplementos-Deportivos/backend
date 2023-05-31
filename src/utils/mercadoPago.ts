import configuration from "src/config/configuration";
const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: configuration().mercadoPago.accessToken,
});

export default async function mercadoPago() {
  return mercadopago;
}