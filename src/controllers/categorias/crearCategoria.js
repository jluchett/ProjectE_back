const pool = require("../../database/db");

const crearCategoria = async(req, res) => {
    try {
        const { nombre } = req.body
        const findCategory = await pool.query("Select * from categorias Where nombre = $1",[nombre]);
        if (findCategory){
            return res.status(300).json({msg: "Categoria ya existe"})
        }
        const addCategory = await pool.query("insert into categorias values($1)", [nombre])
        if (addCategory){
            res.status(200).json({msg: "Categoria registrada"})
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = crearCategoria;
