import { Rcon } from "rcon-client";
import { RconHost, RconPort, RconPassword } from "../config.js";

const filterText = (text) => {
  return text.replace(/§\w/g, "");
};

export const sendCommandRcon = async (command) => {
  try {
    const rcon = await Rcon.connect({
      host: RconHost,
      port: RconPort,
      password: RconPassword,
    });

    const res = await rcon.send(command);

    await rcon.end();

    return filterText(res);
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const filterListCommand = (userList) => {
  // Dividir el texto en líneas
  const lines = userList.split("\n");

  // Filtrar las líneas que contienen nombres de jugadores
  const players = lines
    .filter((line) => line.includes(":"))
    .map((line) => {
      const [rol, usernames] = line.split(":");
      return usernames.split(", ").map((username) => username.trim());
    });

  // Unir los nombres de jugadores en un solo array
  const connectedUsers = [].concat(...players);

  return connectedUsers;
};

export const filterUserInList = ({ userArray, username }) => {
  if (!!userArray.length) return false;

  const existUser = userArray.includes(username);

  return existUser;
};
