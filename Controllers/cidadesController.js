const getAllCidades = async (req,res) => {
    const { pool } = req;

    try {
        const result = await pool.query(
            'SELECT cidades.id, cidades.nome as nome_cidade, id_estado, estados.nome as nome_estado FROM public.cidades join estados on cidades.id_estado = estados.id'
        )

        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar cidades' });
    }

}

const postCidade = async ( req, res ) => {
    const { pool } = req;
    const { nome, id_estado } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO cidades (nome, id_estado) VALUES ($1, $2) RETURNING *',
            [nome, id_estado]
        )
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erro ao inserir cidade' })
    }

}
const deleteCidade = async ( req, res ) => {
    const { pool } = req;
    const { id } = req.params;

    const result = await pool.query(
        'delete from cidades where id=$1',
        [id]
    )

    // Se a exclusão for bem-sucedida, o `result.rowCount` será maior que 0
    if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Cidade não encontrado' });
    }

    res.status(204).json({message: 'Cidade excluída com sucesso!'})
}

const putCidade = ( req, res ) => {
    const { pool } = req;
    const { id } = req.params;
    const { nome , id_estado} = req.body;

}

module.exports = {getAllCidades, postCidade, deleteCidade, putCidade};