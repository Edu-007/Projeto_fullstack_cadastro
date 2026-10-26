const nome = document.getElementById('nome');
const idade = document.getElementById('idade');
const telefone = document.getElementById('telefone');
const botao = document.getElementById('cadastrar');


botao.addEventListener('click', async () => {
    if(
        nome.value.trim() === '' ||
        idade.value.trim() === '' ||
        telefone.value.trim() === ''
    ){
        alert('Preencha os cantos vazios!')
        return
    }

    const dados = {
        nome: nome.value, 
        idade: Number(idade.value),
        telefone: telefone.value
    }

    const enviar = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })

    const resul = await enviar.json()

    console.log(resul)

    await listar()
})

const usuarios = document.getElementById('usuarios');

async function listar() {
    const resposta = await fetch('http://localhost:3000/users');
    const dados = await resposta.json()

    usuarios.innerHTML = ''

    dados.usuarios.forEach((usuario) => {
        usuarios.innerHTML += 
        `
        <div class='caixa'>
            <h3>${usuario.nome}</h3>
            <p>ID: ${usuario.id}</p>
            <p>Idade: ${usuario.idade}</p>
            <p>Telefone: ${usuario.telefone}</p>
            <div class='but'>
                <button onclick='excluir(${usuario.id})' class='excluir'>Excluir</button>
                <button onclick='editar(${usuario.id})' class='editar'>Editar</button>
            </div>
        </div>
        `
    });
}

listar()

async function excluir(id) {
    const resposta = await fetch(`http://localhost:3000/user/${id}`, {
        method: 'DELETE'
    })

    const dados = await resposta.json()

    console.log(dados)

    await listar()
}


async function editar(id, novoNome, novaIdade, novoTelefone) {
    const nome = prompt('Novo Nome:', novoNome);
    const idade = prompt('Nova Idade:', novaIdade); 
    const telefone = prompt('Novo Telefone', novoTelefone);

    if(
        nome === null ||
        idade === null ||
        telefone === null
    
    ){
        return
    }

    const dados = {
        nome,
        idade: Number(idade),
        telefone
    }

    await fetch(`http://localhost:3000/user/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })

    await listar()
}