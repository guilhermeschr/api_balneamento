const getAllBoletins = async ( req, res ) => {
    const { pool } = req;
    
    try {
        const result = await pool.query('SELECT b.id, ' +
            'data_coleta, ' +
            'qualidade_agua, ' +
            'observacao, ' +
            'b.id_ponto_coleta, ' +
            'pc.nome as nome_ponto_coleta, ' +
            'b.id_usuario_criador, ' +
            'u.nome as nome_criador, ' +
            'b.id_campanha, ' +
            'cb.nome as nome_campanha ' +
            'FROM public.boletins as b ' +
            'join pontos_coleta as pc ' +
            'on b.id_ponto_coleta = pc.id ' +
            'join usuarios as u ' +
            'on u.id = b.id_usuario_criador ' +
            'join campanhas_balneamento as cb ' +
            'on b.id_campanha = cb.id ' +
            'order by b.id');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({erro: 'Erro ao buscar os boletins'});
    }
}
const postBoletim = async ( req, res ) =>{
    const { pool } = req;
    const { data_coleta, qualidade_agua, observacao, id_ponto_coleta, id_usuario, id_campanha } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO boletins (data_coleta, qualidade_agua, observacao, id_ponto_coleta, id_usuario_criador, id_campanha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [ data_coleta, qualidade_agua, observacao, id_ponto_coleta, id_usuario, id_campanha ]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao inserir boletim' });
    }
}

const deleteBoletim = async ( req, res ) => {
    const { pool } = req;
    const { id } = req.params;

    try {
        const result = await pool.query('delete from boletins where id = $1',[id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Boletim não encontrado' });
        }

        res.status(200).json( {message: 'Boletim excluído com sucesso!' })
    } catch ( error ) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar boletim' });
    }
}

const putBoletim = async ( req, res ) => {
    const { pool } = req;
    const { id } = req.params;
    const { data_coleta, qualidade_agua, observacao, id_ponto_coleta, id_usuario, id_campanha } = req.body;
    
    let updates = [];
    let values = [];
    let index = 1;

    if (data_coleta) {
        updates.push(`data_coleta = $${index}`);
        values.push(data_coleta);
        index++;
    }

    if (qualidade_agua) {
        updates.push(`qualidade_agua = $${index}`);
        values.push(qualidade_agua);
        index++;
    }

    if (observacao) {
        updates.push(`observacao = $${index}`);
        values.push(observacao);
        index++;
    }

    if (id_ponto_coleta) {
        updates.push(`id_ponto_coleta = $${index}`);
        values.push(id_ponto_coleta);
        index++;
    }

    if (id_usuario) {
        updates.push(`id_usuario_criador = $${index}`);
        values.push(id_usuario);
        index++;
    }

    if (id_campanha) {
        updates.push(`id_campanha = $${index}`);
        values.push(id_campanha);
        index++;
    }

    if(updates.length === 0){
        res.status(400).json({ message: "Nenhuma atualização informada" });
    }

    values.push(id);

    const query = `UPDATE boletins SET ${updates.join(', ')} WHERE id = $${index} RETURNING *`;

    try {
        const result = await pool.query(query,values);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Boletim não encontrada' });
        }

        res.status(200).json(result.rows[0]);
    } catch ( error ) {
        console.error(error);
        res.status(500).json({message:'Erro ao editar boletim'})
    }
}

module.exports = { getAllBoletins, postBoletim, deleteBoletim, putBoletim };