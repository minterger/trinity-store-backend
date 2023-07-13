import Rank from "../models/Rank.js";

export const getRanks = async (req, res) => {
  try {
    const ranks = await Rank.find();

    return res.json(ranks);
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Ha ocurrido un error en el servidor" });
  }
};

export const createRank = async (req, res) => {
  const { title, img, description, list, unit_price } = req.body;

  if (!title || !img || !description || !list || !unit_price) {
    return res.status(400).json({ message: "Rellene todos los campos" });
  }

  try {
    const rankExist = await Rank.findOne({ title });

    if (rankExist) {
      return res
        .status(400)
        .json({ message: "Ya existe un rango con este nombre" });
    }

    const newRank = new Rank({
      title,
      img,
      description,
      list,
      unit_price,
    });

    await newRank.save();

    res.json({ message: "Rango creado correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Ha ocurrido un error en el servidor" });
  }
};

export const editRank = async (req, res) => {
  const { title, img, description, list, unit_price } = req.body;

  const id = req.params.id;

  try {
    const existRank = await Rank.findById(id);

    if (!existRank) {
      return res
        .status(400)
        .json({ message: "No existe el rango que estas intentando editar" });
    }

    existRank.title = title || existRank.title;
    existRank.img = img || existRank.img;
    existRank.description = description || existRank.description;
    existRank.list = !!list.lenght ? list : existRank.list;
    existRank.unit_price = unit_price || existRank.unit_price;

    await existRank.save();
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Ha ocurrido un error en el servidor" });
  }
};

export const deleteRank = async (req, res) => {
  const id = req.oarans.id;

  try {
    const existRank = await Rank.findById(id);

    if (!existRank) {
      return res
        .status(400)
        .json({ message: "No existe el rango que estas intentando Eliminar" });
    }

    await Rank.deleteOne({ id });

    return res.json({ message: "Rango eliminado correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Ha ocurrido un error en el servidor" });
  }
};
