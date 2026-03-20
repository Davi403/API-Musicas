const musicaModel = require('../models/musicaModel');

exports.getMusicas = async (req, res) => {
    try {
        const musicas = await musicaModel.findAll();
        res.json(musicas);
    } catch (err) {
        console.error('Erro ao buscar musicas:', err);
        res.status(500).json({ error: 'Erro interno ao buscar musicas' });
    }
};

exports.createMusica = async (req, res) => {
    const { nome_musica, nome_cantor, data_lancamento, url } = req.body;

    if (!nome_musica || !nome_cantor || !data_lancamento || !url) {
        return res.status(400).json({ error: 'Os campos nome_musica, nome_cantor, data_lancamento e url são obrigatórios.' });
    }

    try {
        const newMusica = await musicaModel.create(nome_musica, nome_cantor, data_lancamento, url);
        res.status(201).json(newMusica);
    } catch (err) {
        console.error('Erro ao criar musica:', err);
        res.status(500).json({ error: err.message, stack: err.stack });
    }
};

exports.updateMusica = async (req, res) => {
    const id = req.params.id;
    const { nome_musica, nome_cantor, data_lancamento, url } = req.body;

    if (!nome_musica || !nome_cantor || !data_lancamento || !url) {
        return res.status(400).json({ error: 'Todos os campos são necessários para atualização.' });
    }

    try {
        
        const updatedMusica = await musicaModel.update(id, nome_musica, nome_cantor, data_lancamento, url);

        if (!updatedMusica) {
            return res.status(404).json({ error: 'Musica não encontrada.' });
        }

        res.json(updatedMusica); 
    } catch (err) {
        console.error('Erro ao atualizar musica:', err);
        res.status(500).json({ error: 'Erro interno ao atualizar musica' });
    }
};

exports.deleteMusica = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedMusica = await musicaModel.delete(id);

        if (!deletedMusica) {
            return res.status(404).json({ error: 'musica não encontrada para exclusão.' });
        }

        res.json({ message: 'Musica removida com sucesso', musica: deletedMusica });
    } catch (err) {
        console.error('Erro ao deletar musica:', err);
        res.status(500).json({ error: 'Erro interno ao deletar musica' });
    }
};