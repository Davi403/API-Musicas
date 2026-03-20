const pool = require('../db'); 


exports.findAll = async () => { 
    const text = 'SELECT id, nome_musica, nome_cantor, data_lancamento, url FROM musicas ORDER BY id'; 
    const result = await pool.query(text); 
    return result.rows;  
};


exports.create = async (nome_musica, nome_cantor, data_lancamento, url) => { 
    const text = `
        INSERT INTO musicas (nome_musica, nome_cantor, data_lancamento, url) 
        VALUES($1, $2, $3, $4) 
        RETURNING *`; 
    const values = [nome_musica, nome_cantor, data_lancamento, url];  
    const result = await pool.query(text, values); 
    return result.rows[0]; 
};


exports.update = async (id, nome_musica, nome_cantor, data_lancamento, url) => {
    const text = `
        UPDATE musicas
        SET nome_musica = $1, nome_cantor = $2, data_lancamento = $3, url = $4 
        WHERE id = $5 
        RETURNING *`;
    const values = [nome_musica, nome_cantor, data_lancamento, url, id];
    const result = await pool.query(text, values);
    return result.rows[0]; 
};


exports.delete = async (id) => {
    const text = 'DELETE FROM musicas WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(text, values);
    return result.rows[0]; 
};