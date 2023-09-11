import mp from "mercadopago";
import { FrontUrl, TokenMP } from "../config.js";
import generateSecureRandomId from "../helpers/generateID.js";
import Payment from "../models/Payment.js";
import {
  sendCommandRcon,
  filterListCommand,
  filterUserInList,
} from "../helpers/rcon.js";

export const createPreference = async (req, res) => {
  const { email } = req.user;

  mp.configure({
    access_token: TokenMP,
  });
  try {
    const items = req.body;

    const external_reference = generateSecureRandomId(20);

    const newPayment = new Payment({
      items,
      external_reference,
      user: req.user.id,
    });

    const notification_url = `https://${req.hostname}/mp/webhook`;

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

    newPayment.init_point = createdPreference.body?.init_point;

    await newPayment.save();

    res.status(201).json({
      status: "created",
      init_point: createdPreference.body?.init_point,
      external_reference,
    });
  } catch (error) {
    res.status(500).send("error al crear la preferencia");
  }
};

export const webhook = async (req, res) => {
  const { data, type } = req.body;

  if (type === "payment") {
    try {
      const payment = await mp.payment.findById(data.id);

      const external_reference = payment.body.external_reference;

      const searchedPayment = await Payment.findOne({ external_reference });

      searchedPayment.status = payment.body.status;

      await searchedPayment.save();

      searchedPayment.items.forEach(async (item) => {
        if (item.type === "rank") {
          await sendCommandRcon(item.command);
        }
        if (item.type === "item") {
          const list = await sendCommandRcon("list");
          const filterList = filterListCommand(list);
          const isUserOnline = filterUserInList({
            userArray: filterList,
            username: payment.user?.username,
          });

          if (isUserOnline) {
            await sendCommandRcon(item.command);
          }
        }
      });

      res.sendStatus(204);
    } catch (e) {
      res.status(500).send("Internal server error");
      console.log(e);
    }
  } else {
    res.sendStatus(204);
  }
};
