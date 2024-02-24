const perfilUser = async (req, res) => {
  try {
    // El perfil del usuario autenticado se encuentra en req.user (proporcionado por el middleware de autenticación)
    const { id, nombre, email } = req.user;
    res.json({ id, nombre, email });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error del servidor");
  }
};
module.exports = {perfilUser};