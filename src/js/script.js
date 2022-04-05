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

const listaContent = (id, imagem, nome, valor, secao) => {
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
    adicionarProduto.innerText = 'Adicionar ao Carrinho';

    document.querySelector('ul').appendChild(liProduto);
    liProduto.append(imgProduto, nomeProduto, valorProduto, secaoProduto, componentesProduto, adicionarProduto);
}

const filtrarPor = (event) => {
    const procurar = document.querySelector('input').value;

    if (procurar !== '') {
        document.querySelector('ul').innerText = '';
        filtrarProdutos(produtos, procurar)

        return procurar
    } else {
        tela();
    }
}
document.querySelector('.estiloGeralBotoes--botaoBuscaPor').addEventListener('click', filtrarPor);

const filtrarTodos = (data) => {
    data.filter(({
        id,
        nome,
        preco,
        secao,
        categoria,
        img
    }) => {
        
        listaContent(id, img, nome, preco, secao, categoria)
    })

    adicionarButton()
    adicionarComponentes()
}

const filtrarProdutos = (data, filter) => {
    data.filter(({
        id,
        nome,
        preco,
        secao,
        categoria,
        img
    }) => {
        document.querySelector('input').value = ''

        if (filter.toLowerCase() === nome.toLowerCase() ||
            filter.toLowerCase() === categoria.toLowerCase() ||
            filter.toLowerCase() === secao.toLowerCase()) {

            listaContent(id, img, nome, preco, secao);
        }
    });

    adicionarButton()
    adicionarComponentes()
}

const filtraPorSecao = () => {
    document.querySelector('ul').innerText = ''
    filtrarProdutos(produtos, 'hortifruti');
}
document.querySelector('.estiloGeralBotoes--filtrarHortifruti').addEventListener('click', filtraPorSecao);

const tela = () => {
    document.querySelector('ul').innerText = ''
    filtrarTodos(produtos);
}
tela();
document.querySelector('.estiloGeralBotoes--mostrarTodos').addEventListener('click', tela);

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

function adicionarButton() {
    const adicionarCarrinho = document.querySelectorAll('.containerListaProdutos ul li button');
    adicionarCarrinho.forEach((element, index) => element.addEventListener('click', (event) => {

        produtos.filter(({
            id,
            img,
            nome,
            preco,
            secao
        }) => {
            if (id === Number(adicionarCarrinho[index].closest('li').id)) {
                total += parseInt(preco);
                carrinho(id, img, nome, preco, secao, total);
            }
        });
    }))
}

function adicionarComponentes() {
    const componentesProdutos = document.querySelectorAll('.containerListaProdutos ul li ol');
    componentesProdutos.forEach((element, index) => {
        
        produtos.filter(({
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