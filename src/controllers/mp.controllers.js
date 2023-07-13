import { configure, preferences } from "mercadopago";

configure({
  access_token: process.env.MP_TOKEN,
});

export const createPreference = async (req, res) => {
  const base_url = process.env.BASE_URL;

  try {
    const items = req.body;

    const preference = {
      items,
      back_urls: {
        success: `${base_url}`,
      },
      external_reference: "",
    };

    const createdPreference = await preferences.create(preference);

    res.json(createPreference);
  } catch (error) {}
};

export const webahookmp = (req, res) => {};
