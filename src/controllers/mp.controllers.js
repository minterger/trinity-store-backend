import mp from "mercadopago";
import { FrontUrl, TokenMP } from "../config.js";
import generateSecureRandomId from "../helpers/generateID.js";

export const createPreference = async (req, res) => {
  const { email } = req.user;

  mp.configure({
    access_token: TokenMP,
  });
  try {
    const items = req.body;

    const external_reference = generateSecureRandomId(20);

    const notification_url = `${req.protocol}://${req.hostname}/mp/webhook`;

    const createdPreference = await mp.preferences.create({
      items,
      back_urls: {
        success: FrontUrl + "success",
        pending: FrontUrl + "pending",
        failure: FrontUrl + "failure",
      },
      notification_url,
      external_reference,
      auto_return: "approved",
      payer: { email },
    });

    res.status(201).json({
      status: "created",
      init_point: createdPreference.body.init_point,
      external_reference,
    });
  } catch (error) {
    res.status(500).send("error al crear la preferencia");
  }
};

export const webhook = (req, res) => {
  res.status(200).send("ok");
};
