import express from 'express';
import connect from '../database/connect.js';

const router = express.Router();

router.post('/user', async (req, res) => {
    const { nome, idade, telefone } = req.body;

    const [ cadastro ] = await connect.execute(
        'INSERT INTO teste (nome, idade, telefone) VALUES (?, ?, ?)',
        [nome, idade, telefone]
    )

    res.status(201).json({novo_cadastro: 'novo cadastro com sucesso', id: cadastro.insertId})
})

router.get('/users', async (req, res) => {
    const [ all ] = await connect.execute(
        'SELECT * FROM teste'
    )

    res.status(200).json({ usuarios: all })
})

router.get('/user/:id', async (req, res) => {
    const id = Number(req.params.id);

    const [ found ] = await connect.execute(
        'SELECT * FROM teste WHERE id = ?',
        [ id ]
    );

    res.status(200).json({ encontrado: found });
})

router.put('/user/:id', async (req, res) => {
    const { nome, idade, telefone } = req.body;
    const id = Number(req.params.id);

    const [ atualizado ] = await connect.execute(
        'UPDATE teste SET nome = ?, idade = ?, telefone = ? WHERE id = ? ',
        [ nome, idade, telefone, id ]
    )

    res.status(200).json({ messagem: 'user atualizaso com sucesso' })
})

router.delete('/user/:id', async (req, res) => {
    const id = Number(req.params.id);

    const [ dell ] = await connect.execute(
        'DELETE FROM teste WHERE id = ?',
        [ id ]
    )

    res.status(200).json({ deletado: 'deletado com sucesso' })
})

export default router;