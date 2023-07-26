import mp from "mercadopago";
import { BaseUrl, FrontUrl, TokenMP } from "../config.js";
import generateSecureRandomId from "../helpers/generateID.js";

const { configure, preferences } = mp;

configure({
  access_token: TokenMP,
});

export const createPreference = async (req, res) => {
  const { email } = req.user;

  try {
    const items = req.body;

    const external_reference = generateSecureRandomId(20);

    const createdPreference = await preferences.create({
      items,
      back_urls: {
        success: FrontUrl + "success",
        pending: FrontUrl + "pending",
        failure: FrontUrl + "failure",
      },
      notification_url: BaseUrl + "mp/webhook",
      external_reference,
      auto_return: "approved",
      payer: { email },
    });

    console.log(createdPreference);

    res.json(createdPreference);
  } catch (error) {}
};

export const webhook = (req, res) => {
  res.status(200).send("ok");
};
