const getAllPontosColetas = async ( req, res ) => {
    const { pool } = req;

    try {
        const result = await pool.query(
            'SELECT * FROM pontos_coleta'
        )
        res.status(200).json(result.rows);
    } catch ( error ) {
        console.error(error);
        res.status(500).json({message: 'Erro ao buscar pontos de coleta'})
    }

}