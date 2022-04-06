const adicionarTexto = 'Adicionar ao Carrinho';
const btnEstiloGeral = 'estiloGeralBotoes';
let total = 0;

const headerContent = () => {
    const divHeader = document.createElement("div");
    const btnMostrarTodos = document.createElement("button");
    const btnHortifruti = document.createElement("button");

    const divContainer = document.createElement('div');
    const iptProduto = document.createElement('input');
    const btnBuscar = document.createElement('button');

    divHeader.setAttribute('id', 'filters');
    divHeader.classList.add('filtersContainer');

    btnMostrarTodos.classList.add(btnEstiloGeral, `${btnEstiloGeral}--mostrarTodos`);
    btnMostrarTodos.innerText = 'Mostrar Todos';

    btnHortifruti.classList.add(btnEstiloGeral, `${btnEstiloGeral}--filtrarHortifruti`);
    btnHortifruti.innerText = "Hortifruti"

    divContainer.classList.add('containerBuscaPor')

    iptProduto.setAttribute('type', 'text');
    iptProduto.setAttribute('placeholder', 'Nome do produto');
    iptProduto.classList.add('campoBuscaPor');

    btnBuscar.classList.add(btnEstiloGeral, `${btnEstiloGeral}--botaoBuscaPor`)
    btnBuscar.innerText = 'Buscar';

    document.querySelector('header').appendChild(divHeader);
    divHeader.append(btnMostrarTodos, btnHortifruti, divContainer);
    divContainer.append(iptProduto, btnBuscar);
}
headerContent();

const listaContent = (id, imagem, nome, valor, secao, addContent) => {
    const liProduto = document.createElement('li');
    const imgProduto = document.createElement('img');
    const nomeProduto = document.createElement('h3');
    const valorProduto = document.createElement('p')
    const secaoProduto = document.createElement('span');

    const componentesProduto = document.createElement('ol');
    const adicionarProduto = document.createElement('button');

    liProduto.setAttribute('id', id);
    imgProduto.setAttribute('src', imagem);
    nomeProduto.innerText = nome;
    valorProduto.innerText = `R$ ${valor}`;
    secaoProduto.innerText = secao;
    adicionarProduto.innerText = adicionarTexto;

    document.querySelector('ul').appendChild(liProduto);
    liProduto.append(imgProduto, nomeProduto, valorProduto, secaoProduto, componentesProduto, adicionarProduto);
}

const filtrarTodos = (id, img, nome, preco, secao, botao) => {
    return listaContent(id, img, nome, preco, secao, botao);
}
addContent(filter(produtos, filtrarTodos), adicionarButton, adicionarComponentes);

const buttonFiltrarTodos = (event) => {
    document.querySelector('ul').innerHTML = '';

    return addContent(filter(produtos, filtrarTodos), adicionarButton, adicionarComponentes);
}
document.querySelector(`.${btnEstiloGeral}--mostrarTodos`).addEventListener('click', buttonFiltrarTodos);

const buttonFiltrarSecao = (event) => {
    const secao = document.querySelector(`.${btnEstiloGeral}--filtrarHortifruti`).innerText;
    document.querySelector('ul').innerHTML = '';

    return addContent(filter(produtos, filtrarTodos, secao), adicionarButton, adicionarComponentes);
}
document.querySelector(`.${btnEstiloGeral}--filtrarHortifruti`).addEventListener('click', buttonFiltrarSecao);


const buttonBuscarPor = (event) => {
    const procurar = document.querySelector('input').value;
    document.querySelector('ul').innerText = '';

    if (procurar === '') {
        return addContent(filter(produtos, filtrarTodos), adicionarButton, adicionarComponentes);
    }

    return addContent(filter(produtos, filtrarTodos, procurar), adicionarButton, adicionarComponentes);
}
document.querySelector(`.${btnEstiloGeral}--botaoBuscaPor`).addEventListener('click', buttonBuscarPor);

const carrinho = (id, imagem, nome, preco, secao, total) => {

    const listaCarrinho = document.createElement('li');
    const listaCarrinhoImg = document.createElement('img');
    const listaCarrinhoNome = document.createElement('p');
    const listaCarrinhoPreco = document.createElement('span');
    const listaCarrinhoSecao = document.createElement('span');

    listaCarrinho.setAttribute('id', id);
    listaCarrinhoImg.setAttribute('src', imagem);
    listaCarrinhoNome.innerText = nome;
    listaCarrinhoPreco.innerText = preco;
    listaCarrinhoSecao.innerText = secao;

    document.querySelector('.containerCarrinho > ul').appendChild(listaCarrinho);
    listaCarrinho.append(listaCarrinhoImg, listaCarrinhoNome, listaCarrinhoPreco, listaCarrinhoSecao);

    document.querySelector('#precoTotal').innerText = total;
}

//

function filter(data, callback, procurarPor) {
    data.filter(({
        id,
        nome,
        preco,
        secao,
        categoria,
        img
    }) => {
        if (procurarPor === undefined) {

            return callback(id, img, nome, preco, secao);

        } else if (procurarPor.toLowerCase() === nome.toLowerCase() ||

            procurarPor.toLowerCase() === categoria.toLowerCase() ||
            procurarPor.toLowerCase() === secao.toLowerCase()) {

            return listaContent(id, img, nome, preco, secao);
        }
    })
}

function adicionarButton(data) {
    const adicionarCarrinho = document.querySelectorAll('.containerListaProdutos ul li button');
    adicionarCarrinho.forEach((element, index) => element.addEventListener('click', (event) => {
        data.filter(({
            id,
            img,
            nome,
            preco,
            secao
        }) => {
            if (id === Number(adicionarCarrinho[index].closest('li').id)) {
                total += parseInt(preco);
                carrinho(id, img, nome, preco, secao, total.toFixed(2));
            }
        });
    }))
}

function adicionarComponentes(data) {
    const componentesProdutos = document.querySelectorAll('.containerListaProdutos ul li ol');
    componentesProdutos.forEach((element, index) => {
        data.filter(({
            id,
            componentes
        }) => {
            if (id === Number(componentesProdutos[index].closest('li').id)) {
                componentes.forEach((element) => {
                    const liComponentesProduto = document.createElement('li');
                    liComponentesProduto.innerText = element;

                    componentesProdutos[index].closest('ol').appendChild(liComponentesProduto);
                })
            }
        })
    })
}

function addContent(functionFilter, adicionarButton, adicionarComponentes) {
    return `${adicionarButton(produtos)} ${adicionarComponentes(produtos)}`;
}