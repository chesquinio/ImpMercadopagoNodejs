import mercadopago from "mercadopago";
import { HOST, MERCADOPAGO_API_KEY } from "../config.js";

export const createOrder = async (req, res) => {
  mercadopago.configure({
    access_token: MERCADOPAGO_API_KEY,
  });

  try {
    const result = await mercadopago.preferences.create({
      items: [
        {
          title: "Laptop Lenovo",
          unit_price: 50,
          currency_id: "ARS",
          quantity: 1,
        },
      ],
      notification_url: "https://ngrok.com/s/k8s-ingress/webhook",
      back_urls: {
        success: `${HOST}/success`,
        //failure: `${HOST}/failure`,
        //pending: `${HOST}/pending`,
      },
    });

    console.log(result);

    res.json(result.body);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const receiveWebhook = async (req, res) => {

  try {
    const payment = req.query;
    console.log(payment);
    if (payment.type === "payment") {
      const data = await mercadopage.payment.findById(payment["data.id"]);
      console.log(data);
      //Guardar en base
    }
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500).json({ error: error.message });
  }
};
