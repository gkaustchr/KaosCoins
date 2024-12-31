const ITENS_PER_PAGE = 20
let QNT_BUTTON_PAGINATION = 0
let INDEX_PAGINATION = 1
const ADS = [
    {
        title: "Moeda Bitcoin Ficticia Cor Ouro Colecionadores Criptomoeda",
        url: "https://mercadolivre.com/sec/27egoTf",
        img: "./assets/ads/mercadolivre-bitcoin.jpg"
    },
    {
        title: "Catálogo Amigo Cédulas E Moedas 2024",
        url: "https://mercadolivre.com/sec/19cjSHz",
        img: "./assets/ads/mercadolivre-catalogo-amigo.jpg"
    },
    {
        title: "10 Folhas Plásticas Para Coin Holders 20 Divisões Pccb",
        url: "https://mercadolivre.com/sec/121sYcg",
        img: "./assets/ads/mercadolivre-folha-holder.jpg"
    },
    {
        title: "2 Caixas Coin Holders 27,5mm - Para Moedas De 1 Real",
        url: "https://mercadolivre.com/sec/21Et15H",
        img: "./assets/ads/mercadolivre-coin-holder.jpg"
    },
    {
        title: "Álbum Para 120 Coin Holders",
        url: "https://mercadolivre.com/sec/11xL3oa",
        img: "./assets/ads/mercadolivre-pocket-holder.jpg"
    },
    {
        title: "Caixa Organizadora Multiuso C/6 Gaveta 42 Divisoria Arqplast Cor Preto e Cinza",
        url: "https://mercadolivre.com/sec/2yhURmm",
        img: "./assets/ads/mercadolivre-gaveta-organizadora.jpg"
    },
    {
        title: "Kit 4 Caixa Gaveteiro Plástico Organizador 16 Gavetas 7001 Cor Preto",
        url: "https://mercadolivre.com/sec/1wGVNZ8",
        img: "./assets/ads/mercadolivre-gaveta-coin.jpg"
    },
]

function home() {
    const catalogo = json.catalogo; // extrai o array de moedas do JSON

    if (!catalogo || catalogo.length === 0) {
        console.log("O catálogo está vazio.");
        return; // Retorna caso não haja moedas no catálogo
    }

    // Moedas
    const moedas = listarMoedasRandom(10)
    if (!moedas?.length)
        document.getElementById("container-moedas").style.display = "none"
    moedas.forEach(moeda => {
        const itemMoeda = document.createElement('div'); // Cria um item de lista para cada moeda

        itemMoeda.classList.add(`card`)
        itemMoeda.style.width = '18rem';

        itemMoeda.innerHTML = `
            <img src="${moeda?.imagens[0]}" alt="${moeda.nome} - Imagem" class="card-img-top rounded" style="width: 100%; height: auto;"/>
            <div class="card-body">
                <h5 class="card-titulo">${moeda.titulo}</h5>
                <p class="card-text">  ${moeda.tipo != "normal" ? moeda.tipo : ""} ${moeda.ano}, ${moeda.pais}.</p>
                <p class="card-text">${moeda.descricao}</p>
            </div>
        `;

        itemMoeda.addEventListener('click', () => location.href = `./moeda.html?id=${moeda.id}`)
        document.getElementById("card-container-moedas").appendChild(itemMoeda);
    })

    // Comemorativas
    const comemorativas = listarComeorativasRandom(10)
    if (!comemorativas?.length)
        document.getElementById("container-comemorativa").style.display = "none"
    comemorativas.forEach(moeda => {
        const itemMoeda = document.createElement('div'); // Cria um item de lista para cada moeda

        itemMoeda.classList.add(`card`)
        itemMoeda.style.width = '18rem';

        itemMoeda.innerHTML = `
            <img src="${moeda?.imagens[0]}" alt="${moeda.nome} - Imagem" class="card-img-top rounded" style="width: 100%; height: auto;"/>
            <div class="card-body">
                <h5 class="card-titulo">${moeda.titulo}</h5>
                <p class="card-text">  ${moeda.tipo != "normal" ? moeda.tipo : ""} ${moeda.ano}, ${moeda.pais}.</p>
                <p class="card-text">${moeda.descricao}</p>
            </div>
        `;

        itemMoeda.addEventListener('click', () => location.href = `./moeda.html?id=${moeda.id}`)
        document.getElementById("card-container-comemorativa").appendChild(itemMoeda);
    })

    // Paises
    const paises = listarPaisesRandom(10)
    if (!paises?.length)
        document.getElementById("container-paises").style.display = "none"
    paises?.forEach(pais => {
        try {
            const itemPais = document.createElement('div'); // Cria um item de lista para cada moeda

            itemPais.classList.add(`card`)
            itemPais.style.width = '18rem';
            const qnt = qntListaPais(pais)
            itemPais.innerHTML = `
            <div class="card-body text-center">
            <h5 class="card-titulo">${pais}</h5>
                <p class="card-text">${qnt} ${qnt > 1 ? "itens" : "item"}</p>
                </div>
                `;

            itemPais.addEventListener('click', () => location.href = `./moeda.html?local=${pais}`)
            document.getElementById("card-container-paises").appendChild(itemPais);
        } catch (error) {
            console.log(error)
        }
    })


    // Cedulas
    const cedulas = listarCedulasRandom(10)
    if (!cedulas?.length)
        document.getElementById("container-cedulas").style.display = "none"
    cedulas.forEach(moeda => {
        const itemMoeda = document.createElement('div'); // Cria um item de lista para cada moeda

        itemMoeda.classList.add(`card`)
        itemMoeda.style.width = '18rem';

        itemMoeda.innerHTML = `
            <img src="${moeda?.imagens[0]}" alt="${moeda.nome} - Imagem" class="card-img-top rounded" style="width: 100%; height: auto;"/>
            <div class="card-body">
                <h5 class="card-titulo">${moeda.titulo}</h5>
                <p class="card-text">  ${moeda.tipo != "normal" ? moeda.tipo : ""} ${moeda.ano}, ${moeda.pais}.</p>
                <p class="card-text">${moeda.descricao}</p>
            </div>
        `;

        itemMoeda.addEventListener('click', () => location.href = `./cedula.html?id=${moeda.id}`)
        document.getElementById("card-container-cedulas").appendChild(itemMoeda);
    })

}

const listarComeorativasRandom = (num) => {
    try {
        const moedasComemorativas = json.catalogo.filter(moeda => moeda.tipo == "comemorativa");

        if (moedasComemorativas.length === 0) {
            return []; // Retorna um array vazio se não houver moedas comemorativas
        }

        //Embaralha o array de moedas comemorativas
        for (let i = moedasComemorativas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [moedasComemorativas[i], moedasComemorativas[j]] = [moedasComemorativas[j], moedasComemorativas[i]];
        }

        if (!num)
            return moedasComemorativas;
        else
            return moedasComemorativas.slice(0, num);
    } catch (error) {
        console.log(error)
    }

}

const listarCedulasRandom = (num) => {
    try {
        const cedulas = json.catalogo.filter(moeda => moeda.cedula);

        if (cedulas.length === 0) {
            return []; // Retorna um array vazio se não houver moedas comemorativas
        }

        //Embaralha o array de moedas comemorativas
        for (let i = cedulas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cedulas[i], cedulas[j]] = [cedulas[j], cedulas[i]];
        }

        if (!num)
            return cedulas;
        else
            return cedulas.slice(0, num);
    } catch (error) {
        console.log(error)
    }

}

const listarEstadosRandom = (num) => {
    try {
        let estado = new Set(); // Usa um Set para garantir unicidade
        json.catalogo.forEach(item => estado.add(item.estado));
        estado = Array.from(estado); // Converte o Set de volta para um array

        //Embaralha o array de moedas comemorativas
        for (let i = estado.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [estado[i], estado[j]] = [estado[j], estado[i]];
        }
        if (!num)
            return estado;
        else
            return estado.slice(0, num);
    } catch (error) {
        console.log(error)
    }

}

const listarPaisesRandom = (num) => {
    try {
        let paises = new Set(); // Usa um Set para garantir unicidade
        json.catalogo.forEach(item => paises.add(item.pais));
        paises = Array.from(paises); // Converte o Set de volta para um array

        //Embaralha o array de moedas comemorativas
        for (let i = paises.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [paises[i], paises[j]] = [paises[j], paises[i]];
        }
        if (!num)
            return paises;
        else
            return paises.slice(0, num);
    } catch (error) {
        console.log(error)
    }

}

const listarMoedasRandom = (num) => {
    try {
        const moedasComemorativas = json.catalogo

        if (moedasComemorativas.length === 0) {
            return []; // Retorna um array vazio se não houver moedas comemorativas
        }

        //Embaralha o array de moedas comemorativas
        for (let i = moedasComemorativas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [moedasComemorativas[i], moedasComemorativas[j]] = [moedasComemorativas[j], moedasComemorativas[i]];
        }

        if (!num)
            return moedasComemorativas;
        else
            return moedasComemorativas.slice(0, num);
    } catch (error) {
        console.log(error)
    }
}

const listarMoedas = (end, init = 0) => {
    try {
        const moedasComemorativas = json.catalogo.filter(moeda => !moeda.cedula)

        if (moedasComemorativas.length === 0) {
            return []; // Retorna um array vazio se não houver moedas comemorativas
        }

        return moedasComemorativas.slice(init, end);

    } catch (error) {
        console.log(error)
    }
}

const qntListaPais = (nome) => {
    try {
        const qnt = json.catalogo.filter((item) => item.pais == nome)
        return qnt?.length
    } catch (error) {
        console.log(error)
    }
}


//  Page moeda
const pageMoeda = () => {
    try {
        const queryString = location.search

        if (queryString) {
            const params = {};
            queryString.substring(1).split("&").forEach(param => { //remove o '?' e divide pelos &
                const [key, value] = param.split("=");
                params[key] = decodeURIComponent(value); // Decodifica a URL para lidar com caracteres especiais
            });

            if (!params?.id) {
                listarItensPage(params)
                document.getElementById("list-item").style.display = "block"
                document.getElementById("item").style.display = "none"
            } else {
                document.getElementById("list-item").style.display = "none"
                document.getElementById("item").style.display = "flex"
                listarItemPage(params.id)
                // Moedas
                const moedas = listarMoedasRandom(8)
                if (!moedas?.length)
                    document.getElementById("container-moedas").style.display = "none"
                moedas.forEach(moeda => {
                    const itemMoeda = document.createElement('div'); // Cria um item de lista para cada moeda

                    itemMoeda.classList.add(`card`)
                    itemMoeda.style.width = '18rem';

                    itemMoeda.innerHTML = `
                    <img src="${moeda?.imagens[0]}" alt="${moeda.nome} - Imagem" class="card-img-top rounded" style="width: 100%; height: auto;"/>
                    <div class="card-body">
                        <h5 class="card-titulo">${moeda.titulo}</h5>
                        <p class="card-text">${moeda.tipo != "normal" ? moeda.tipo : ""} ${moeda.ano}, ${moeda.pais}.</p>
                        <p class="card-text"> ${moeda.descricao}</p>
                    </div>
        `;

                    itemMoeda.addEventListener('click', () => location.href = `./moeda.html?id=${moeda.id}`)
                    document.getElementById("card-container-moedas").appendChild(itemMoeda);
                })

            }
        } else {
            document.getElementById("item").style.display = "none"
            document.getElementById("list-item").style.display = "block"
            listarItensPage()
        }

    } catch (error) {
        console.log(error)
    }
}

const listarItensPage = (params) => {
    let qntMoedas = []

    // Moedas
    let moedas = json.catalogo.filter(item => !item.cedula)
    // listarMoedas(ITENS_PER_PAGE * INDEX_PAGINATION, ITENS_PER_PAGE * INDEX_PAGINATION - ITENS_PER_PAGE)

    if (params?.search)
        moedas = moedas.filter(item => item.tipo == params.search)
    else if (params?.local)
        moedas = moedas.filter(item => item.pais == params?.local)
    else if (params?.estado)
        moedas = moedas.filter(item => item.estado == params?.estado)
    else if (params?.collection)
        if (params?.collection == 'olimpiadas')
            moedas = moedas.filter(item =>
                item?.titulo?.toLocaleLowerCase()?.includes("olimp") ||
                item?.descricao?.toLocaleLowerCase()?.includes("olimp")
            );

    if (!moedas?.length)
        return document.getElementById("container-moedas").style.display = "none"
    // return location.href = "./index.html"

    qntMoedas = moedas.length
    QNT_BUTTON_PAGINATION = Math.round(qntMoedas / ITENS_PER_PAGE)

    if (qntMoedas > 0 && qntMoedas < 20)
        QNT_BUTTON_PAGINATION = 1

    const init = ITENS_PER_PAGE * (params?.page || 1) - ITENS_PER_PAGE
    const end = ITENS_PER_PAGE * (params?.page || 1)
    let coins = moedas.slice(init, end)

    coins.forEach(moeda => {
        const itemMoeda = document.createElement('div'); // Cria um item de lista para cada moeda

        itemMoeda.classList.add(`card`)
        itemMoeda.style.width = '18rem';

        itemMoeda.innerHTML = `
            <img src="${moeda?.imagens[0]}" alt="${moeda.nome} - Imagem" class="card-img-top rounded" style="width: 100%; height: auto;"/>
            <div class="card-body">
                <h5 class="card-titulo">${moeda.titulo}</h5>
                <p class="card-text">${moeda.tipo != "normal" ? moeda.tipo : ""} ${moeda.ano}, ${moeda.pais}.</p>
                <p class="card-text"> ${moeda.descricao}</p>
                </div>
                `;

        itemMoeda.addEventListener('click', () => location.href = `./moeda.html?id=${moeda.id}`)
        document.getElementById("card-container-moedas-itens").appendChild(itemMoeda);
    })

    const pagination = document.getElementById("pagination")

    let li = document.createElement('li')
    li.innerHTML = `
    <button class="page-link" onclick="buttonPagination('previous')" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
    </button>
    `
    pagination.appendChild(li)

    for (let i = 0; i < QNT_BUTTON_PAGINATION; i++) {
        let it = document.createElement('li')
        it.innerHTML = `
        <button class="page-link" onclick="buttonPagination(${i + 1})" >
            <span aria-hidden="true">${i + 1}</span>
        </button>
        `
        pagination.appendChild(it)
    }

    let lii = document.createElement('li')
    lii.innerHTML = `
    <button class="page-link" onclick="buttonPagination('next')"  aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
    </button>
    `
    pagination.appendChild(lii)
}

const listarItemPage = (id) => {
    const qntMoedas = json.catalogo.map(item => !item.cedula).length
    QNT_BUTTON_PAGINATION = Math.round(qntMoedas / ITENS_PER_PAGE) + 1

    const moeda = json.catalogo.filter(item => item.id == id)[0]

    console.log(moeda)

    // Header
    document.querySelector('.card-header').innerText = moeda?.titulo

    // Body
    const body = document.querySelector('#item-card-body')

    // Ano - Lugar
    const ano = document.createElement('h5')
    ano.classList.add("card-text")
    ano.innerText = `${moeda?.valor} ${moeda?.nome}, ${moeda?.ano}, ${moeda?.pais}.`
    body.appendChild(ano)

    // Descrição 
    const estado = document.createElement('p')
    estado.classList.add("card-text")
    estado.innerText = `${moeda?.tipo}, ${moeda?.estado}.`
    body.appendChild(estado)

    // Quantidade 
    const qnt = document.createElement('p')
    qnt.classList.add("card-text")
    qnt.innerText = `Sigla: ${moeda?.sigla}, Unidades: ${moeda?.quantidade}.`
    body.appendChild(qnt)

    // Circulação - Anomalia 
    const circulação = document.createElement('p')
    circulação.classList.add("card-text")
    circulação.innerText = `Em circulação: ${moeda?.circulacao ? "sim" : "não"} - Anomalias: ${moeda?.anomalia ? "sim" : "não"}.`
    body.appendChild(circulação)

    // HTML
    const html = document.createElement('div')
    html.classList.add("card-text")
    html.innerHTML = moeda?.html
    body.appendChild(html)


    // Ficha tecnica
    iterarObjeto(moeda?.ficha)


}

//  Page Cedula
const pageCedula = () => {
    try {
        const queryString = location.search

        if (queryString) {
            const params = {};
            queryString.substring(1).split("&").forEach(param => { //remove o '?' e divide pelos &
                const [key, value] = param.split("=");
                params[key] = decodeURIComponent(value); // Decodifica a URL para lidar com caracteres especiais
            });

            if (!params?.id) {
                listarItensPageCedula(params)
                document.getElementById("list-item").style.display = "block"
                document.getElementById("item").style.display = "none"
            } else {
                document.getElementById("list-item").style.display = "none"
                document.getElementById("item").style.display = "flex"
                listarItemPageCedula(params.id)
                // Moedas
                let moedas = json.catalogo.filter(item => item.cedula)
                if (!moedas?.length)
                    document.getElementById("container-moedas").style.display = "none"

                moedas = moedas.slice(0, 8)
                moedas.forEach(moeda => {
                    const itemMoeda = document.createElement('div'); // Cria um item de lista para cada moeda

                    itemMoeda.classList.add(`card`)
                    itemMoeda.style.width = '18rem';

                    itemMoeda.innerHTML = `
                    <img src="${moeda?.imagens[0]}" alt="${moeda.nome} - Imagem" class="card-img-top rounded" style="width: 100%; height: auto;"/>
                    <div class="card-body">
                        <h5 class="card-titulo">${moeda.titulo}</h5>
                        <p class="card-text">${moeda.tipo != "normal" ? moeda.tipo : ""} ${moeda.ano}, ${moeda.pais}.</p>
                        <p class="card-text"> ${moeda.descricao}</p>
                    </div>
        `;

                    itemMoeda.addEventListener('click', () => location.href = `./cedula.html?id=${moeda.id}`)
                    document.getElementById("card-container-moedas").appendChild(itemMoeda);
                })

            }
        } else {
            document.getElementById("item").style.display = "none"
            document.getElementById("list-item").style.display = "block"
            listarItensPageCedula()
        }

    } catch (error) {
        console.log(error)
    }
}

const listarItensPageCedula = (params) => {
    let qntMoedas = []

    // Moedas
    let moedas = json.catalogo.filter(item => item.cedula)

    if (params?.search)
        moedas = moedas.filter(item => item.tipo == params.search)
    else if (params?.local)
        moedas = moedas.filter(item => item.pais == params?.local)
    else if (params?.estado)
        moedas = moedas.filter(item => item.estado == params?.estado)

    if (!moedas?.length)
        return document.getElementById("container-moedas").style.display = "none"

    qntMoedas = moedas.length
    QNT_BUTTON_PAGINATION = Math.round(qntMoedas / ITENS_PER_PAGE)

    if (qntMoedas > 0 && qntMoedas < 20)
        QNT_BUTTON_PAGINATION = 1

    const init = ITENS_PER_PAGE * (params?.page || 1) - ITENS_PER_PAGE
    const end = ITENS_PER_PAGE * (params?.page || 1)

    const coins = moedas.slice(init, end)
    coins.forEach(moeda => {
        const itemMoeda = document.createElement('div'); // Cria um item de lista para cada moeda

        itemMoeda.classList.add(`card`)
        itemMoeda.style.width = '18rem';

        itemMoeda.innerHTML = `
            <img src="${moeda?.imagens[0]}" alt="${moeda.nome} - Imagem" class="card-img-top rounded" style="width: 100%; height: auto;"/>
            <div class="card-body">
                <h5 class="card-titulo">${moeda.titulo}</h5>
                <p class="card-text">${moeda.tipo != "normal" ? moeda.tipo : ""} ${moeda.ano}, ${moeda.pais}.</p>
                <p class="card-text"> ${moeda.descricao}</p>
                </div>
                `;

        itemMoeda.addEventListener('click', () => location.href = `./cedula.html?id=${moeda.id}`)
        document.getElementById("card-container-moedas-itens").appendChild(itemMoeda);
    })

    const pagination = document.getElementById("pagination")

    let li = document.createElement('li')
    li.innerHTML = `
    <button class="page-link" onclick="buttonPagination('previous')" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
    </button>
    `
    pagination.appendChild(li)

    for (let i = 0; i < QNT_BUTTON_PAGINATION; i++) {
        let it = document.createElement('li')
        it.innerHTML = `
        <button class="page-link" onclick="buttonPagination(${i + 1})" >
            <span aria-hidden="true">${i + 1}</span>
        </button>
        `
        pagination.appendChild(it)
    }

    let lii = document.createElement('li')
    lii.innerHTML = `
    <button class="page-link" onclick="buttonPagination('next')"  aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
    </button>
    `
    pagination.appendChild(lii)
}

const listarItemPageCedula = (id) => {
    const qntMoedas = json.catalogo.map(item => !item.cedula).length
    QNT_BUTTON_PAGINATION = Math.round(qntMoedas / ITENS_PER_PAGE) + 1

    const moeda = json.catalogo.filter(item => item.id == id)[0]

    console.log(moeda)

    // Header
    document.querySelector('.card-header').innerText = moeda?.titulo

    // Body
    const body = document.querySelector('#item-card-body')

    // Ano - Lugar
    const ano = document.createElement('h5')
    ano.classList.add("card-text")
    ano.innerText = `${moeda?.valor} ${moeda?.nome}, ${moeda?.ano}, ${moeda?.pais}.`
    body.appendChild(ano)

    // Descrição 
    const estado = document.createElement('p')
    estado.classList.add("card-text")
    estado.innerText = `${moeda?.tipo}, ${moeda?.estado}.`
    body.appendChild(estado)

    // Quantidade 
    const qnt = document.createElement('p')
    qnt.classList.add("card-text")
    qnt.innerText = `Sigla: ${moeda?.sigla}, Unidades: ${moeda?.quantidade}.`
    body.appendChild(qnt)

    // Circulação - Anomalia 
    const circulação = document.createElement('p')
    circulação.classList.add("card-text")
    circulação.innerText = `Em circulação: ${moeda?.circulacao ? "sim" : "não"} - Anomalias: ${moeda?.anomalia ? "sim" : "não"}.`
    body.appendChild(circulação)

    // HTML
    const html = document.createElement('div')
    html.classList.add("card-text")
    html.innerHTML = moeda?.html
    body.appendChild(html)


    // Ficha tecnica
    iterarObjeto(moeda?.ficha)


}

//  Page Local
const pageLocal = () => {
    try {
        listarItensPageLocal()
    } catch (error) {
        console.log(error)
    }
}

const listarItensPageLocal = (params) => {

    let qntMoedas = []
    let list = json.catalogo

    let moedas = list.reduce((grupo, item) => {
        const pais = item.pais;
        if (!grupo[pais]) {
            grupo[pais] = []; // Cria um novo array para o país se ele não existir
        }
        grupo[pais].push(item); // Adiciona o item ao grupo do país
        return grupo;
    }, {});
    console.log(moedas)
    const section = document.querySelector("section")
    if (!moedas)
        return document.querySelector("section").style.display = "none"
    // return location.href = "./index.html"

    qntMoedas = moedas.length
    QNT_BUTTON_PAGINATION = Math.round(qntMoedas / ITENS_PER_PAGE)

    if (qntMoedas > 0 && qntMoedas < 20)
        QNT_BUTTON_PAGINATION = 1

    const init = ITENS_PER_PAGE * (params?.page || 1) - ITENS_PER_PAGE
    const end = ITENS_PER_PAGE * (params?.page || 1)

    // const coins = moedas.slice(init, end)
    // console.log(coins)

    for (const pais in moedas) {
        let div = document.createElement('div');
        div.innerHTML = ` 
            <div class="container text-center" id="container-paises">
            <div class="row align-items-center">
                <div class="col">
                    <h4 class="text-start">
                    ${pais}
                    </h4>
                </div>
                <div class="col text-end">
                ${moedas[pais]?.length > 10 ? "<a href='./moeda.html?local=" + pais + "'>ver mais</a>" : "<a href=''></a>"}
                </div>
            </div>
            <div class="row">
                <div class="container">
                    <div class="card-container" id="card-container-${pais?.trim()?.toLowerCase()}">
                    </div>
                </div>
            </div>
            </div>  
            `;
        section.appendChild(div);
        moedas[pais].forEach((moeda, index) => {
            const itemMoeda = document.createElement('div'); // Cria um item de lista para cada moeda

            itemMoeda.classList.add(`card`)
            itemMoeda.style.width = '18rem';

            itemMoeda.innerHTML = `
            <img src="${moeda?.imagens[0]}" alt="${moeda.nome} - Imagem" class="card-img-top rounded" style="width: 100%; height: auto;"/>
            <div class="card-body">
                <h5 class="card-titulo">${moeda.titulo}</h5>
                <p class="card-text">${moeda.tipo != "normal" ? moeda.tipo : ""} ${moeda.ano}, ${moeda.pais}.</p>
                <p class="card-text"> ${moeda.descricao}</p>
                </div>
                `;

            itemMoeda.addEventListener('click', () => location.href = `./${moeda?.cedula ? "cedula.html" : "moeda.html"}?id=${moeda.id}`)
            document.getElementById(`card-container-${pais?.trim()?.toLowerCase()}`).appendChild(itemMoeda);
        });
    }

    moedas.forEach(moeda => {
        const itemMoeda = document.createElement('div'); // Cria um item de lista para cada moeda

        itemMoeda.classList.add(`card`)
        itemMoeda.style.width = '18rem';

        itemMoeda.innerHTML = `
            <img src="${moeda?.imagens[0]}" alt="${moeda.nome} - Imagem" class="card-img-top rounded" style="width: 100%; height: auto;"/>
            <div class="card-body">
                <h5 class="card-titulo">${moeda.titulo}</h5>
                <p class="card-text">${moeda.tipo != "normal" ? moeda.tipo : ""} ${moeda.ano}, ${moeda.pais}.</p>
                <p class="card-text"> ${moeda.descricao}</p>
                </div>
                `;

        itemMoeda.addEventListener('click', () => location.href = `./cedula.html?id=${moeda.id}`)
        document.getElementById("card-container-moedas-itens").appendChild(itemMoeda);
    })

    const pagination = document.getElementById("pagination")

    let li = document.createElement('li')
    li.innerHTML = `
    <button class="page-link" onclick="buttonPagination('previous')" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
    </button>
    `
    pagination.appendChild(li)

    for (let i = 0; i < QNT_BUTTON_PAGINATION; i++) {
        let it = document.createElement('li')
        it.innerHTML = `
        <button class="page-link" onclick="buttonPagination(${i + 1})" >
            <span aria-hidden="true">${i + 1}</span>
        </button>
        `
        pagination.appendChild(it)
    }

    let lii = document.createElement('li')
    lii.innerHTML = `
    <button class="page-link" onclick="buttonPagination('next')"  aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
    </button>
    `
    pagination.appendChild(lii)
}


function iterarObjeto(obj) {
    for (const [chave, valor] of Object.entries(obj)) {
        if (typeof valor === 'object') {
            iterarObjeto(valor); // Chama a função recursivamente para objetos aninhados
        } else {
            const ficha = document.querySelector('#card-ficha')
            const p = document.createElement('p')
            p.classList.add("card-text")
            p.innerText = `${chave}: ${valor}.`
            ficha.appendChild(p)


            console.log(chave, valor);
        }
    }
}

const buttonPagination = (value) => {
    try {
        const queryString = location.search
        if (value == 'next') {
            const params = {};
            queryString.substring(1).split("&").forEach(param => { //remove o '?' e divide pelos &
                const [key, value] = param.split("=");
                params[key] = decodeURIComponent(value); // Decodifica a URL para lidar com caracteres especiais
            });
            let page = parseInt(params?.page) + 1
            if (!page)
                page = 2
            if (page > QNT_BUTTON_PAGINATION)
                return
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('page', page); // Atualiza o parâmetro
            window.location.href = window.location.pathname + '?' + urlParams.toString();

        } else if (value == "previous") {
            const params = {};
            queryString.substring(1).split("&").forEach(param => { //remove o '?' e divide pelos &
                const [key, value] = param.split("=");
                params[key] = decodeURIComponent(value); // Decodifica a URL para lidar com caracteres especiais
            });
            let page = parseInt(params?.page) - 1
            if (!page)
                page = 0
            if (page < 1)
                return
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('page', page); // Atualiza o parâmetro
            window.location.href = window.location.pathname + '?' + urlParams.toString();

        } else {
            if (parseInt(value) > QNT_BUTTON_PAGINATION || parseInt(value) < 1)
                return
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('page', value); // Atualiza o parâmetro
            window.location.href = window.location.pathname + '?' + urlParams.toString();
        }

    } catch (error) {
        console.log(error)
    }
}

const catalogo = () => {
    try {
        const queryString = location.search

        if (queryString) {
            const params = {};
            queryString.substring(1).split("&").forEach(param => { //remove o '?' e divide pelos &
                const [key, value] = param.split("=");
                params[key] = decodeURIComponent(value); // Decodifica a URL para lidar com caracteres especiais
            });
            console.log(params);
        } else {
            console.log("Sem parâmetros na URL.");
        }

    } catch (error) {
        console.log(error)
    }
}

const populateNavbar = () => {
    try {
        // PAISES
        const paises = listarPaisesRandom()
        paises?.forEach(pais => {
            try {
                const li = document.createElement('li'); // Cria um item de lista para cada moeda
                li.innerHTML = `<a class="dropdown-item" href="./moeda.html?local=${pais}">${pais}</a>`;
                document.getElementById("dropdown-menu-pais").appendChild(li);
            } catch (error) {
                console.log(error)
            }
        })

        // Estado
        const estados = listarEstadosRandom()
        estados?.forEach(estado => {
            try {
                const li = document.createElement('li'); // Cria um item de lista para cada moeda
                li.innerHTML = `<a class="dropdown-item" href="./moeda.html?estado=${estado}">${estado}</a>`;
                document.getElementById("dropdown-menu-estado").appendChild(li);
            } catch (error) {
                console.log(error)
            }
        })
    } catch (error) {
        console.log(error)
    }
}

const populateAds = () => {
    try {
        const carousel = document.getElementById('carouselInner')
        ADS.forEach((ad, index) => {
            const div = document.createElement('div')
            div.classList.add('carousel-item')
            if (index == 0)
                div.classList.add('active')
            div.innerHTML = `
            <a href="${ad?.url}" target="_blank" title="Você será redirecionado para o site">
                <img class="d-block w-100" src="${ad?.img}" alt="${ad?.title}" />
            </a>
            `
            carousel.appendChild(div)
        })
    } catch (error) {
        console.log(error)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    populateNavbar();
    populateAds()
})

// Exemplo de uso (substitua pelo seu método de carregamento do JSON):
const json = {
    "catalogo": [
    {
      "id": 10001,
      "titulo": "asd",
      "nome": "Real",
      "simbolo": "R$",
      "sigla": "BRL",
      "valor": 1,
      "valorVenda": 0,
      "pais": "Brasil",
      "ano": 2022,
      "quantidade": 1,
      "estado": "Flor de Cunho",
      "circulacao": true,
      "cedula": false,
      "tipo": "comemorativa",
      "descricao": "texto",
      "anomalia": false,
      "kit": false,
      "ficha": {
        "composicao": "Aço revestido",
        "borda": "Lisa",
        "formato": "Redonda",
        "peso": "7.55 gramas",
        "diametro": "27 mm",
        "espessura": "2.55 mm"
      },
      "imagens": [
        "https://acdn.mitiendanube.com/stores/002/379/691/products/moeda-1-real-2024-9550367c88d79b5f7d17330914047848-1024-1024.webp",
        "https://acdn.mitiendanube.com/stores/002/379/691/products/1000400958-3f79ca2f4320b8fb5117291977460790-1024-1024.webp"
      ],
      "html": "<p>teste</p>",
      "enviadoPor": "",
      "redeSocialDoEnviador": "",
      "mensagemEnviador": "",
      "Saldo": 0
    },
    {
      "id": 10002,
      "titulo": "asd",
      "nome": "Real",
      "simbolo": "R$",
      "sigla": "BRL",
      "valor": 50,
      "valorVenda": 0,
      "pais": "Brasil",
      "ano": 2024,
      "quantidade": 1,
      "estado": "Flor de Cunho",
      "circulacao": true,
      "cedula": false,
      "tipo": "comemorativa",
      "descricao": "texto",
      "anomalia": false,
      "kit": false,
      "ficha": {
        "composicao": "Aço revestido",
        "borda": "Lisa",
        "formato": "Redonda",
        "peso": "7.55 gramas",
        "diametro": "27 mm",
        "espessura": "2.55 mm"
      },
      "imagens": [
        "https://acdn.mitiendanube.com/stores/002/379/691/products/moeda-1-real-2024-9550367c88d79b5f7d17330914047848-1024-1024.webp",
        "https://acdn.mitiendanube.com/stores/002/379/691/products/1000400958-3f79ca2f4320b8fb5117291977460790-1024-1024.webp"
      ],
      "html": "<p>teste</p>",
      "enviadoPor": "",
      "redeSocialDoEnviador": "",
      "mensagemEnviador": "",
      "Saldo": 0
    },
    {
      "id": 10003,
      "titulo": "1 Real - Mascote Tom (Olimpíadas Rio 2016)",
      "nome": "Real",
      "simbolo": "R$",
      "sigla": "BRL",
      "valor": 1,
      "valorVenda": 10,
      "pais": "Brasil",
      "ano": 2016,
      "quantidade": 1,
      "estado": "BC",
      "circulacao": true,
      "cedula": false,
      "tipo": "comemorativa",
      "descricao": "Moeda comemorativa de 1 Real, parte da série especial das Olimpíadas Rio 2016. Apresenta o personagem Tom, um dos mascotes dos jogos, no anverso. O reverso é o mesmo da moeda de 1 Real padrão, com a inscrição 'BRASIL' e detalhes ornamentais.",
      "anomalia": false,
      "kit": false,
      "ficha": {
        "composicao": "Núcleo de aço inoxidável, anel de aço revestido de bronze",
        "borda": "Lisa",
        "formato": "Circular",
        "peso": "7.00 g",
        "diametro": "27 mm",
        "espessura": "2 mm"
      },
      "imagens": [
        "https: //acdn.mitiendanube.com/stores/002/379/691/products/moeda-1-real-2024-9550367c88d79b5f7d17330914047848-1024-1024.webp",
        "https://acdn.mitiendanube.com/stores/002/379/691/products/1000400958-3f79ca2f4320b8fb5117291977460790-1024-1024.webp"
      ],
      "html": "<p>\nEsta moeda faz parte de uma série especial de 16 moedas comemorativas dos Jogos Olímpicos e Paralímpicos Rio 2016.\n</p>\n<p>\nNo anverso, além do personagem Tom, há a logomarca dos Jogos Olímpicos Rio 2016 e a legenda 'JOGOS OLÍMPICOS RIO 2016'.\n</p>\n<p>\nO reverso é idêntico ao da moeda de 1 Real padrão, com o valor '1 REAL' e a legenda 'BRASIL'.\n</p>",
      "enviadoPor": "",
      "redeSocialDoEnviador": "",
      "mensagemEnviador": "",
      "Saldo": 10
    },
    {
      "id": 10004,
      "titulo": "1 Real - Futebol (Olimpíadas Rio 2016)",
      "nome": "Real",
      "simbolo": "R$",
      "sigla": "BRL",
      "valor": 1,
      "valorVenda": 2,
      "pais": "Brasil",
      "ano": 2015,
      "quantidade": 3,
      "estado": "G",
      "circulacao": true,
      "cedula": false,
      "tipo": "comemorativa",
      "descricao": "Moeda comemorativa de 1 Real, parte da série especial das Olimpíadas Rio 2016. Apresenta uma cena estilizada de futebol no anverso, com um jogador realizando um chute e uma bola no ar. O reverso é o mesmo da moeda de 1 Real padrão, com a inscrição 'BRASIL' e detalhes ornamentais.",
      "anomalia": false,
      "kit": false,
      "ficha": {
        "composicao": "Núcleo de aço inoxidável, anel de aço revestido de bronze",
        "borda": "Lisa",
        "formato": "Circular",
        "peso": "7.00 g",
        "diametro": "27 mm",
        "espessura": "2 mm"
      },
      "imagens": [
        "https://acdn.mitiendanube.com/stores/002/379/691/products/moeda-1-real-2024-9550367c88d79b5f7d17330914047848-1024-1024.webp",
        "https://acdn.mitiendanube.com/stores/002/379/691/products/1000400958-3f79ca2f4320b8fb5117291977460790-1024-1024.webp"
      ],
      "html": "<p>\nEsta moeda faz parte de uma série especial de 16 moedas comemorativas dos Jogos Olímpicos e Paralímpicos Rio 2016.\n</p>\n<p>\nNo anverso, além da cena de futebol, há a logomarca dos Jogos Olímpicos Rio 2016 e a legenda 'JOGOS OLÍMPICOS RIO 2016'.\n</p>\n<p>\nO reverso é idêntico ao da moeda de 1 Real padrão, com o valor '1 REAL' e a legenda 'BRASIL'.\n</p>",
      "enviadoPor": "Leonardo Garcia",
      "redeSocialDoEnviador": "",
      "mensagemEnviador": "",
      "Saldo": 6
    },
    {
      "id": 10005,
      "titulo": "1 Real - Boxe (Olimpíadas Rio 2016)",
      "nome": "Real",
      "simbolo": "R$",
      "sigla": "BRL",
      "valor": 1,
      "valorVenda": 2,
      "pais": "Brasil",
      "ano": 2016,
      "quantidade": 1,
      "estado": "G",
      "circulacao": true,
      "cedula": false,
      "tipo": "comemorativa",
      "descricao": "Moeda comemorativa de 1 Real, parte da série especial das Olimpíadas Rio 2016. Apresenta uma cena estilizada de boxe no anverso, com dois pugilistas em combate. O reverso é o mesmo da moeda de 1 Real padrão, com a inscrição 'BRASIL' e detalhes ornamentais.",
      "anomalia": false,
      "kit": false,
      "ficha": {
        "composicao": "Núcleo de aço inoxidável, anel de aço revestido de bronze",
        "borda": "Lisa",
        "formato": "Circular",
        "peso": "7.00 g",
        "diametro": "27 mm",
        "espessura": "2 mm"
      },
      "imagens": [
        "https://acdn.mitiendanube.com/stores/002/379/691/products/moeda-1-real-2024-9550367c88d79b5f7d17330914047848-1024-1024.webp",
        "https://acdn.mitiendanube.com/stores/002/379/691/products/1000400958-3f79ca2f4320b8fb5117291977460790-1024-1024.webp"
      ],
      "html": "<p> \nEsta moeda faz parte de uma série especial de 16 moedas comemorativas dos Jogos Olímpicos e Paralímpicos Rio 2016. \n</p> \n<p> \nNo anverso, além da cena de boxe, há a logomarca dos Jogos Olímpicos Rio 2016 e a legenda 'JOGOS OLÍMPICOS RIO 2016'. \n</p> \n<p> \nO reverso é idêntico ao da moeda de 1 Real padrão, com o valor '1 REAL' e a legenda 'BRASIL'. \n</p>",
      "enviadoPor": "Leonardo Garcia",
      "redeSocialDoEnviador": "",
      "mensagemEnviador": "",
      "Saldo": 2
    },
    {
      "id": 10006,
      "titulo": "1 Real - Atletismo Paralímpico (Olimpíadas Rio 2016)",
      "nome": "Real",
      "simbolo": "R$",
      "sigla": "BRL",
      "valor": 1,
      "valorVenda": 2,
      "pais": "Brasil",
      "ano": 2015,
      "quantidade": 1,
      "estado": "G",
      "circulacao": true,
      "cedula": false,
      "tipo": "comemorativa",
      "descricao": "Moeda comemorativa de 1 Real, parte da série especial das Olimpíadas Rio 2016. Apresenta uma cena estilizada de atletismo paralímpico no anverso, com um atleta com prótese correndo. O reverso é o mesmo da moeda de 1 Real padrão, com a inscrição 'BRASIL' e detalhes ornamentais.",
      "anomalia": false,
      "kit": false,
      "ficha": {
        "composicao": "Núcleo de aço inoxidável, anel de aço revestido de bronze",
        "borda": "Lisa",
        "formato": "Circular",
        "peso": "7.00 g",
        "diametro": "27 mm",
        "espessura": "2 mm"
      },
      "imagens": [
        "https://acdn.mitiendanube.com/stores/002/379/691/products/moeda-1-real-2024-9550367c88d79b5f7d17330914047848-1024-1024.webp",
        "https://acdn.mitiendanube.com/stores/002/379/691/products/1000400958-3f79ca2f4320b8fb5117291977460790-1024-1024.webp"
      ],
      "html": "<p>\nEsta moeda faz parte de uma série especial de 16 moedas comemorativas dos Jogos Olímpicos e Paralímpicos Rio 2016.\n</p>\n<p>\nNo anverso, além da cena de atletismo paralímpico com o atleta com prótese, há a logomarca dos Jogos Paralímpicos Rio 2016 e a legenda 'JOGOS PARALÍMPICOS RIO 2016'.\n</p>\n<p>\nO reverso é idêntico ao da moeda de 1 Real padrão, com o valor '1 REAL' e a legenda 'BRASIL'.\n</p>",
      "enviadoPor": "Leonardo Garcia",
      "redeSocialDoEnviador": "",
      "mensagemEnviador": "",
      "Saldo": 2
    },
    {
      "id": 10007,
      "titulo": "1 Real - Vela (Olimpíadas Rio 2016)",
      "nome": "Real",
      "simbolo": "R$",
      "sigla": "BRL",
      "valor": 1,
      "valorVenda": 2,
      "pais": "Brasil",
      "ano": 2015,
      "quantidade": 1,
      "estado": "G",
      "circulacao": true,
      "cedula": false,
      "tipo": "comemorativa",
      "descricao": "Moeda comemorativa de 1 Real, parte da série especial das Olimpíadas Rio 2016. Apresenta uma cena estilizada de vela no anverso, com um velejador em um barco a vela. O reverso é o mesmo da moeda de 1 Real padrão, com a inscrição 'BRASIL' e detalhes ornamentais.",
      "anomalia": false,
      "kit": false,
      "ficha": {
        "composicao": "Núcleo de aço inoxidável, anel de aço revestido de bronze",
        "borda": "Lisa",
        "formato": "Circular",
        "peso": "7.00 g",
        "diametro": "27 mm",
        "espessura": "2 mm"
      },
      "imagens": [
        "https: //acdn.mitiendanube.com/stores/002/379/691/products/moeda-1-real-2024-9550367c88d79b5f7d17330914047848-1024-1024.webp",
        "https://acdn.mitiendanube.com/stores/002/379/691/products/1000400958-3f79ca2f4320b8fb5117291977460790-1024-1024.webp"
      ],
      "html": "<p>\nEsta moeda faz parte de uma série especial de 16 moedas comemorativas dos Jogos Olímpicos e Paralímpicos Rio 2016.\n</p>\n<p>\nNo anverso, além da cena de vela, há a logomarca dos Jogos Olímpicos Rio 2016 e a legenda 'JOGOS OLÍMPICOS RIO 2016'.\n</p>\n<p>\nO reverso é idêntico ao da moeda de 1 Real padrão, com o valor '1 REAL' e a legenda 'BRASIL'.\n</p>",
      "enviadoPor": "Leonardo Garcia",
      "redeSocialDoEnviador": "",
      "mensagemEnviador": "",
      "Saldo": 2
    },
    {
      "id": 10008,
      "titulo": "1 Real - Canoagem (Olimpíadas Rio 2016)",
      "nome": "Real",
      "simbolo": "R$",
      "sigla": "BRL",
      "valor": 1,
      "valorVenda": 2,
      "pais": "Brasil",
      "ano": 2015,
      "quantidade": 2,
      "estado": "G",
      "circulacao": true,
      "cedula": false,
      "tipo": "comemorativa",
      "descricao": "Moeda comemorativa de 1 Real, parte da série especial das Olimpíadas Rio 2016. Apresenta uma cena estilizada de canoagem no anverso, com um canoísta em ação. O reverso é o mesmo da moeda de 1 Real padrão, com a inscrição 'BRASIL' e detalhes ornamentais.",
      "anomalia": false,
      "kit": false,
      "ficha": {
        "composicao": "Núcleo de aço inoxidável, anel de aço revestido de bronze",
        "borda": "Lisa",
        "formato": "Circular",
        "peso": "7.00 g",
        "diametro": "27 mm",
        "espessura": "2 mm"
      },
      "imagens": [
        "https://acdn.mitiendanube.com/stores/002/379/691/products/moeda-1-real-2024-9550367c88d79b5f7d17330914047848-1024-1024.webp",
        "https://acdn.mitiendanube.com/stores/002/379/691/products/1000400958-3f79ca2f4320b8fb5117291977460790-1024-1024.webp"
      ],
      "html": "<p>\nEsta moeda faz parte de uma série especial de 16 moedas comemorativas dos Jogos Olímpicos e Paralímpicos Rio 2016.\n</p>\n<p>\nNo anverso, além da cena de canoagem, há a logomarca dos Jogos Olímpicos Rio 2016 e a legenda 'JOGOS OLÍMPICOS RIO 2016'.\n</p>\n<p>\nO reverso é idêntico ao da moeda de 1 Real padrão, com o valor '1 REAL' e a legenda 'BRASIL'.\n</p>",
      "enviadoPor": "Leonardo Garcia",
      "redeSocialDoEnviador": "",
      "mensagemEnviador": "",
      "Saldo": 4
    },
    {
      "id": 10009,
      "titulo": "1 Real - Judô (Olimpíadas Rio 2016)",
      "nome": "Real",
      "simbolo": "R$",
      "sigla": "BRL",
      "valor": 1,
      "valorVenda": 2,
      "pais": "Brasil",
      "ano": 2015,
      "quantidade": 1,
      "estado": "G",
      "circulacao": true,
      "cedula": false,
      "tipo": "comemorativa",
      "descricao": "Moeda comemorativa de 1 Real, parte da série especial das Olimpíadas Rio 2016. Apresenta uma cena estilizada de judô no anverso, com dois judocas em combate. O reverso é o mesmo da moeda de 1 Real padrão, com a inscrição 'BRASIL' e detalhes ornamentais.",
      "anomalia": false,
      "kit": false,
      "ficha": {
        "composicao": "Núcleo de aço inoxidável, anel de aço revestido de bronze",
        "borda": "Lisa",
        "formato": "Circular",
        "peso": "7.00 g",
        "diametro": "27 mm",
        "espessura": "2 mm"
      },
      "imagens": [
        "https://acdn.mitiendanube.com/stores/002/379/691/products/moeda-1-real-2024-9550367c88d79b5f7d17330914047848-1024-1024.webp",
        "https://acdn.mitiendanube.com/stores/002/379/691/products/1000400958-3f79ca2f4320b8fb5117291977460790-1024-1024.webp"
      ],
      "html": "<p>\nEsta moeda faz parte de uma série especial de 16 moedas comemorativas dos Jogos Olímpicos e Paralímpicos Rio 2016.\n</p>\n<p>\nNo anverso, além da cena de judô, há a logomarca dos Jogos Olímpicos Rio 2016 e a legenda 'JOGOS OLÍMPICOS RIO 2016'.\n</p>\n<p>\nO reverso é idêntico ao da moeda de 1 Real padrão, com o valor '1 REAL' e a legenda 'BRASIL'.\n</p>",
      "enviadoPor": "Leonardo Garcia",
      "redeSocialDoEnviador": "",
      "mensagemEnviador": "",
      "Saldo": 2
    },
    {
      "id": 10010,
      "titulo": "1 Real - Natação (Olimpíadas Rio 2016)",
      "nome": "Real",
      "simbolo": "R$",
      "sigla": "BRL",
      "valor": 1,
      "valorVenda": 4,
      "pais": "Brasil",
      "ano": 2014,
      "quantidade": 1,
      "estado": "BC",
      "circulacao": true,
      "cedula": false,
      "tipo": "comemorativa",
      "descricao": "Moeda comemorativa de 1 Real, parte da série especial das Olimpíadas Rio 2016, com cunhagem em 2014. Apresenta uma cena estilizada de natação no anverso, com um nadador em ação. O reverso é o mesmo da moeda de 1 Real padrão, com a inscrição 'BRASIL' e detalhes ornamentais.",
      "anomalia": false,
      "kit": false,
      "ficha": {
        "composicao": "Núcleo de aço inoxidável, anel de aço revestido de bronze",
        "borda": "Lisa",
        "formato": "Circular",
        "peso": "7.00 g",
        "diametro": "27 mm",
        "espessura": "2 mm"
      },
      "imagens": [
        "https://acdn.mitiendanube.com/stores/002/379/691/products/moeda-1-real-2024-9550367c88d79b5f7d17330914047848-1024-1024.webp",
        "https://acdn.mitiendanube.com/stores/002/379/691/products/1000400958-3f79ca2f4320b8fb5117291977460790-1024-1024.webp"
      ],
      "html": "<p>\nEsta moeda faz parte de uma série especial de 16 moedas comemorativas dos Jogos Olímpicos e Paralímpicos Rio 2016.\n</p>\n<p>\nNo anverso, além da cena de natação, há a logomarca dos Jogos Olímpicos Rio 2016 e a legenda 'JOGOS OLÍMPICOS RIO 2016'.\n</p>\n<p>\nO reverso é idêntico ao da moeda de 1 Real padrão, com o valor '1 REAL' e a legenda 'BRASIL'.\n</p>",
      "enviadoPor": "Leonardo Garcia",
      "redeSocialDoEnviador": "",
      "mensagemEnviador": "",
      "Saldo": 4
    },
    {
      "id": 10011,
      "titulo": "1 Real - Mascote Vinicius (Olimpíadas Rio 2016)",
      "nome": "Real",
      "simbolo": "R$",
      "sigla": "BRL",
      "valor": 1,
      "valorVenda": 10,
      "pais": "Brasil",
      "ano": 2016,
      "quantidade": 1,
      "estado": "BC",
      "circulacao": true,
      "cedula": false,
      "tipo": "comemorativa",
      "descricao": "Moeda comemorativa de 1 Real, parte da série especial das Olimpíadas Rio 2016. Apresenta o personagem Vinicius, um dos mascotes dos jogos, no anverso. O reverso é o mesmo da moeda de 1 Real padrão, com a inscrição 'BRASIL' e detalhes ornamentais.",
      "anomalia": false,
      "kit": false,
      "ficha": {
        "composicao": "Núcleo de aço inoxidável, anel de aço revestido de bronze",
        "borda": "Lisa",
        "formato": "Circular",
        "peso": "7.00 g",
        "diametro": "27 mm",
        "espessura": "2 mm"
      },
      "imagens": [
        "https://acdn.mitiendanube.com/stores/002/379/691/products/moeda-1-real-2024-9550367c88d79b5f7d17330914047848-1024-1024.webp",
        "https://acdn.mitiendanube.com/stores/002/379/691/products/1000400958-3f79ca2f4320b8fb5117291977460790-1024-1024.webp"
      ],
      "html": "<p>\nEsta moeda faz parte de uma série especial de 16 moedas comemorativas dos Jogos Olímpicos e Paralímpicos Rio 2016.\n</p>\n<p>\nNo anverso, além do personagem Vinicius, há a logomarca dos Jogos Olímpicos Rio 2016 e a legenda 'JOGOS OLÍMPICOS RIO 2016'.\n</p>\n<p>\nO reverso é idêntico ao da moeda de 1 Real padrão, com o valor '1 REAL' e a legenda 'BRASIL'.\n</p>",
      "enviadoPor": "",
      "redeSocialDoEnviador": "",
      "mensagemEnviador": "",
      "Saldo": 10
    },
    {
      "id": 10012,
      "titulo": "1 Real - Golfe (Olimpíadas Rio 2016)",
      "nome": "Real",
      "simbolo": "R$",
      "sigla": "BRL",
      "valor": 1,
      "valorVenda": 4,
      "pais": "Brasil",
      "ano": 2014,
      "quantidade": 1,
      "estado": "BC",
      "circulacao": true,
      "cedula": false,
      "tipo": "comemorativa",
      "descricao": "Moeda comemorativa de 1 Real, parte da série especial das Olimpíadas Rio 2016, com cunhagem em 2014. Apresenta uma cena estilizada de golfe no anverso, com um golfista em ação. O reverso é o mesmo da moeda de 1 Real padrão, com a inscrição 'BRASIL' e detalhes ornamentais.",
      "anomalia": false,
      "kit": false,
      "ficha": {
        "composicao": "Núcleo de aço inoxidável, anel de aço revestido de bronze",
        "borda": "Lisa",
        "formato": "Circular",
        "peso": "7.00 g",
        "diametro": "27 mm",
        "espessura": "2 mm"
      },
      "imagens": [
        "https://acdn.mitiendanube.com/stores/002/379/691/products/moeda-1-real-2024-9550367c88d79b5f7d17330914047848-1024-1024.webp",
        "https://acdn.mitiendanube.com/stores/002/379/691/products/1000400958-3f79ca2f4320b8fb5117291977460790-1024-1024.webp"
      ],
      "html": "<p>\nEsta moeda faz parte de uma série especial de 16 moedas comemorativas dos Jogos Olímpicos e Paralímpicos Rio 2016.\n</p>\n<p>\nNo anverso, além da cena de golfe, há a logomarca dos Jogos Olímpicos Rio 2016 e a legenda 'JOGOS OLÍMPICOS RIO 2016'.\n</p>\n<p>\nO reverso é idêntico ao da moeda de 1 Real padrão, com o valor '1 REAL' e a legenda 'BRASIL'.\n</p>",
      "enviadoPor": "",
      "redeSocialDoEnviador": "",
      "mensagemEnviador": "",
      "Saldo": 4
    },
    {
      "id": 10013,
      "titulo": "1 Real - Ciclismo Paralímpico (Olimpíadas 2016)",
      "nome": "Real",
      "simbolo": "R$",
      "sigla": "BRL",
      "valor": 1,
      "valorVenda": 4,
      "pais": "Brasil",
      "ano": 2014,
      "quantidade": 1,
      "estado": "BC",
      "circulacao": true,
      "cedula": false,
      "tipo": "comemorativa",
      "descricao": "Moeda comemorativa de 1 Real, parte da série especial das Olimpíadas Rio 2016, com cunhagem em 2014. Apresenta uma cena estilizada de golfe no anverso, com um golfista em ação. O reverso é o mesmo da moeda de 1 Real padrão, com a inscrição 'BRASIL' e detalhes ornamentais.",
      "anomalia": false,
      "kit": false,
      "ficha": {
        "composicao": "Núcleo de aço inoxidável, anel de aço revestido de bronze",
        "borda": "Lisa",
        "formato": "Circular",
        "peso": "7.00 g",
        "diametro": "27 mm",
        "espessura": "2 mm"
      },
      "imagens": [
        "https: //acdn.mitiendanube.com/stores/002/379/691/products/moeda-1-real-2024-9550367c88d79b5f7d17330914047848-1024-1024.webp",
        "https://acdn.mitiendanube.com/stores/002/379/691/products/1000400958-3f79ca2f4320b8fb5117291977460790-1024-1024.webp"
      ],
      "html": "<p>\nEsta moeda faz parte de uma série especial de 16 moedas comemorativas dos Jogos Olímpicos e Paralímpicos Rio 2016.\n</p>\n<p>\nNo anverso, além da cena de golfe, há a logomarca dos Jogos Olímpicos Rio 2016 e a legenda 'JOGOS OLÍMPICOS RIO 2016'.\n</p>\n<p>\nO reverso é idêntico ao da moeda de 1 Real padrão, com o valor '1 REAL' e a legenda 'BRASIL'.\n</p>",
      "enviadoPor": "Leonardo Garcia",
      "redeSocialDoEnviador": "",
      "mensagemEnviador": "",
      "Saldo": 4
    },
    {
      "id": 10014,
      "titulo": "1 Real - Basquete (Olimpíadas Rio 2016)",
      "nome": "Real",
      "simbolo": "R$",
      "sigla": "BRL",
      "valor": 1,
      "valorVenda": 2,
      "pais": "Brasil",
      "ano": 2014,
      "quantidade": 1,
      "estado": "G",
      "circulacao": true,
      "cedula": false,
      "tipo": "comemorativa",
      "descricao": "Moeda comemorativa de 1 Real, parte da série especial das Olimpíadas Rio 2016, com cunhagem em 2015. Apresenta uma cena estilizada de basquete no anverso, com um jogador arremessando a bola na cesta. O reverso é o mesmo da moeda de 1 Real padrão, com a inscrição 'BRASIL' e detalhes ornamentais.\n\n3. País: Brasil",
      "anomalia": false,
      "kit": false,
      "ficha": {
        "composicao": "Núcleo de aço inoxidável, anel de aço revestido de bronze",
        "borda": "Lisa",
        "formato": "Circular",
        "peso": "7.00 g",
        "diametro": "27 mm",
        "espessura": "2 mm"
      },
      "imagens": [
        "https://acdn.mitiendanube.com/stores/002/379/691/products/moeda-1-real-2024-9550367c88d79b5f7d17330914047848-1024-1024.webp",
        "https://acdn.mitiendanube.com/stores/002/379/691/products/1000400958-3f79ca2f4320b8fb5117291977460790-1024-1024.webp"
      ],
      "html": "<p>\nEsta moeda faz parte de uma série especial de 16 moedas comemorativas dos Jogos Olímpicos e Paralímpicos Rio 2016.\n</p>\n<p>\nNo anverso, além da cena de basquete, há a logomarca dos Jogos Olímpicos Rio 2016 e a legenda 'JOGOS OLÍMPICOS RIO 2016'.\n</p>\n<p>\nO reverso é idêntico ao da moeda de 1 Real padrão, com o valor '1 REAL' e a legenda 'BRASIL'.\n</p>",
      "enviadoPor": "Leonardo Garcia",
      "redeSocialDoEnviador": "",
      "mensagemEnviador": "",
      "Saldo": 2
    },
    {
      "id": 10015,
      "titulo": "1 Real - Canoagem (Olimpíadas Rio 2016)",
      "nome": "Real",
      "simbolo": "R$",
      "sigla": "BRL",
      "valor": 1,
      "valorVenda": 4,
      "pais": "Brasil",
      "ano": 2015,
      "quantidade": 2,
      "estado": "BC",
      "circulacao": true,
      "cedula": false,
      "tipo": "comemorativa",
      "descricao": "Moeda comemorativa de 1 Real, parte da série especial das Olimpíadas Rio 2016. Apresenta uma cena estilizada de canoagem no anverso, com um canoísta em ação. O reverso é o mesmo da moeda de 1 Real padrão, com a inscrição 'BRASIL' e detalhes ornamentais.",
      "anomalia": false,
      "kit": false,
      "ficha": {
        "composicao": "Núcleo de aço inoxidável, anel de aço revestido de bronze",
        "borda": "Lisa",
        "formato": "Circular",
        "peso": "7.00 g",
        "diametro": "27 mm",
        "espessura": "2 mm"
      },
      "imagens": [
        "https://acdn.mitiendanube.com/stores/002/379/691/products/moeda-1-real-2024-9550367c88d79b5f7d17330914047848-1024-1024.webp",
        "https://acdn.mitiendanube.com/stores/002/379/691/products/1000400958-3f79ca2f4320b8fb5117291977460790-1024-1024.webp"
      ],
      "html": "<p>\nEsta moeda faz parte de uma série especial de 16 moedas comemorativas dos Jogos Olímpicos e Paralímpicos Rio 2016.\n</p>\n<p>\nNo anverso, além da cena de canoagem, há a logomarca dos Jogos Olímpicos Rio 2016 e a legenda 'JOGOS OLÍMPICOS RIO 2016'.\n</p>\n<p>\nO reverso é idêntico ao da moeda de 1 Real padrão, com o valor '1 REAL' e a legenda 'BRASIL'.\n</p>",
      "enviadoPor": "Leonardo Garcia",
      "redeSocialDoEnviador": "",
      "mensagemEnviador": "",
      "Saldo": 8
    },
    {
      "id": 10016,
      "titulo": "1 Real - Bandeira Nacional (Olimpíadas Rio 2016)",
      "nome": "Real",
      "simbolo": "R$",
      "sigla": "BRL",
      "valor": 2,
      "valorVenda": 220,
      "pais": "Brasil",
      "ano": 2015,
      "quantidade": 2,
      "estado": "BC",
      "circulacao": true,
      "cedula": false,
      "tipo": "comemorativa",
      "descricao": "Moeda comemorativa de 1 Real, parte da série especial dos Jogos Olímpicos Rio 2016. Apresenta no anverso uma representação da Bandeira Nacional do Brasil, com detalhes texturizados simulando o tecido. O reverso é o mesmo da moeda de 1 Real padrão, com a inscrição 'BRASIL' e detalhes ornamentais.",
      "anomalia": false,
      "kit": false,
      "ficha": {
        "composicao": "Núcleo de aço inoxidável, anel de aço revestido de bronze",
        "borda": "Lisa",
        "formato": "Circular",
        "peso": "7.00 g",
        "diametro": "27 mm",
        "espessura": "2 mm"
      },
      "imagens": [
        "https://acdn.mitiendanube.com/stores/002/379/691/products/moeda-1-real-2024-9550367c88d79b5f7d17330914047848-1024-1024.webp",
        "https://acdn.mitiendanube.com/stores/002/379/691/products/1000400958-3f79ca2f4320b8fb5117291977460790-1024-1024.webp"
      ],
      "html": "<p>\nEsta moeda faz parte de uma série especial de 16 moedas comemorativas dos Jogos Olímpicos e Paralímpicos Rio 2016.\n</p>\n<p>\nNo anverso, além da representação da Bandeira Nacional, há a logomarca dos Jogos Olímpicos Rio 2016 e a legenda 'JOGOS OLÍMPICOS RIO 2016'.\n</p>\n<p>\nEsta é a última moeda da série das Olimpíadas de 2016.\n</p>\n<p>\nO reverso é idêntico ao da moeda de 1 Real padrão, com o valor '1 REAL' e a legenda 'BRASIL'.\n</p>",
      "enviadoPor": "",
      "redeSocialDoEnviador": "",
      "mensagemEnviador": "",
      "Saldo": 440
    },
    {
      "id": 10017,
      "titulo": "1 Real - Natação (Olimpíadas Rio 2016)",
      "nome": "Real",
      "simbolo": "R$",
      "sigla": "BRL",
      "valor": 1,
      "valorVenda": 2,
      "pais": "Brasil",
      "ano": 2014,
      "quantidade": 1,
      "estado": "G",
      "circulacao": true,
      "cedula": false,
      "tipo": "comemorativa",
      "descricao": "Moeda comemorativa de 1 Real, parte da série especial das Olimpíadas Rio 2016, com cunhagem em 2014. Apresenta uma cena estilizada de natação no anverso, com um nadador em ação. O reverso é o mesmo da moeda de 1 Real padrão, com a inscrição 'BRASIL' e detalhes ornamentais.",
      "anomalia": false,
      "kit": false,
      "ficha": {
        "composicao": "Núcleo de aço inoxidável, anel de aço revestido de bronze",
        "borda": "Lisa",
        "formato": "Circular",
        "peso": "7.00 g",
        "diametro": "27 mm",
        "espessura": "2 mm"
      },
      "imagens": [
        "https://acdn.mitiendanube.com/stores/002/379/691/products/moeda-1-real-2024-9550367c88d79b5f7d17330914047848-1024-1024.webp",
        "https://acdn.mitiendanube.com/stores/002/379/691/products/1000400958-3f79ca2f4320b8fb5117291977460790-1024-1024.webp"
      ],
      "html": "<p>\nEsta moeda faz parte de uma série especial de 16 moedas comemorativas dos Jogos Olímpicos e Paralímpicos Rio 2016.\n</p>\n<p>\nNo anverso, além da cena de natação, há a logomarca dos Jogos Olímpicos Rio 2016 e a legenda 'JOGOS OLÍMPICOS RIO 2016'.\n</p>\n<p>\nO reverso é idêntico ao da moeda de 1 Real padrão, com o valor '1 REAL' e a legenda 'BRASIL'.\n</p>",
      "enviadoPor": "Leonardo Garcia",
      "redeSocialDoEnviador": "",
      "mensagemEnviador": "",
      "Saldo": 2
    },
    {
      "id": 10018,
      "titulo": "1 Real - Rugby (Olimpíadas Rio 2016)",
      "nome": "Real",
      "simbolo": "R$",
      "sigla": "BRL",
      "valor": 1,
      "valorVenda": 4,
      "pais": "Brasil",
      "ano": 2015,
      "quantidade": 2,
      "estado": "BC",
      "circulacao": true,
      "cedula": false,
      "tipo": "comemorativa",
      "descricao": "Moeda comemorativa de 1 Real, parte da série especial das Olimpíadas Rio 2016, com cunhagem em 2015. Apresenta uma cena estilizada de rugby no anverso, com um jogador carregando a bola durante a partida. O reverso é o mesmo da moeda de 1 Real padrão, com a inscrição 'BRASIL' e detalhes ornamentais.",
      "anomalia": false,
      "kit": false,
      "ficha": {
        "composicao": "Núcleo de aço inoxidável, anel de aço revestido de bronze",
        "borda": "Lisa",
        "formato": "Circular",
        "peso": "7.00 g",
        "diametro": "27 mm",
        "espessura": "2 mm"
      },
      "imagens": [
        "https: //acdn.mitiendanube.com/stores/002/379/691/products/moeda-1-real-2024-9550367c88d79b5f7d17330914047848-1024-1024.webp",
        "https://acdn.mitiendanube.com/stores/002/379/691/products/1000400958-3f79ca2f4320b8fb5117291977460790-1024-1024.webp"
      ],
      "html": "<p>\nEsta moeda faz parte de uma série especial de 16 moedas comemorativas dos Jogos Olímpicos e Paralímpicos Rio 2016.\n</p>\n<p>\nNo anverso, além da cena de rugby, há a logomarca dos Jogos Olímpicos Rio 2016 e a legenda 'JOGOS OLÍMPICOS RIO 2016'.\n</p>\n<p>\nO reverso é idêntico ao da moeda de 1 Real padrão, com o valor '1 REAL' e a legenda 'BRASIL'.\n</p>",
      "enviadoPor": "Leonardo Garcia",
      "redeSocialDoEnviador": "",
      "mensagemEnviador": "",
      "Saldo": 8
    },
    {
      "id": 10019,
      "titulo": "1 Real - Atletismo (Olimpíadas Rio 2016)",
      "nome": "Real",
      "simbolo": "R$",
      "sigla": "BRL",
      "valor": 1,
      "valorVenda": 4,
      "pais": "Brasil",
      "ano": 2014,
      "quantidade": 1,
      "estado": "BC",
      "circulacao": true,
      "cedula": false,
      "tipo": "comemorativa",
      "descricao": "Moeda comemorativa de 1 Real, parte da série especial das Olimpíadas Rio 2016, com cunhagem em 2014. Apresenta uma cena estilizada de atletismo no anverso, com um atleta correndo. O reverso é o mesmo da moeda de 1 Real padrão, com a inscrição 'BRASIL' e detalhes ornamentais.",
      "anomalia": false,
      "kit": false,
      "ficha": {
        "composicao": "Núcleo de aço inoxidável, anel de aço revestido de bronze",
        "borda": "Lisa",
        "formato": "Circular",
        "peso": "7.00 g",
        "diametro": "27 mm",
        "espessura": "2 mm"
      },
      "imagens": [
        "https://acdn.mitiendanube.com/stores/002/379/691/products/moeda-1-real-2024-9550367c88d79b5f7d17330914047848-1024-1024.webp",
        "https://acdn.mitiendanube.com/stores/002/379/691/products/1000400958-3f79ca2f4320b8fb5117291977460790-1024-1024.webp"
      ],
      "html": "<p>\nEsta moeda faz parte de uma série especial de 16 moedas comemorativas dos Jogos Olímpicos e Paralímpicos Rio 2016.\n</p>\n<p>\nNo anverso, além da cena de atletismo, há a logomarca dos Jogos Olímpicos Rio 2016 e a legenda 'JOGOS OLÍMPICOS RIO 2016'.\n</p>\n<p>\nO reverso é idêntico ao da moeda de 1 Real padrão, com o valor '1 REAL' e a legenda 'BRASIL'.\n</p>",
      "enviadoPor": "Leonardo Garcia",
      "redeSocialDoEnviador": "",
      "mensagemEnviador": "",
      "Saldo": 4
    },
    {
      "id": 10020,
      "titulo": "1 Real - Natação Paralímpica (Olimpíadas Rio 2016)",
      "nome": "Real",
      "simbolo": "R$",
      "sigla": "BRL",
      "valor": 1,
      "valorVenda": 4,
      "pais": "Brasil",
      "ano": 2016,
      "quantidade": 1,
      "estado": "BC",
      "circulacao": true,
      "cedula": false,
      "tipo": "comemorativa",
      "descricao": "Moeda comemorativa de 1 Real, parte da série especial dos Jogos Paralímpicos Rio 2016. Apresenta uma cena estilizada de natação paralímpica no anverso, com um atleta nadando. O reverso é o mesmo da moeda de 1 Real padrão, com a inscrição 'BRASIL' e detalhes ornamentais.",
      "anomalia": false,
      "kit": false,
      "ficha": {
        "composicao": "Núcleo de aço inoxidável, anel de aço revestido de bronze",
        "borda": "Lisa",
        "formato": "Circular",
        "peso": "7.00 g",
        "diametro": "27 mm",
        "espessura": "2 mm"
      },
      "imagens": [
        "https: //acdn.mitiendanube.com/stores/002/379/691/products/moeda-1-real-2024-9550367c88d79b5f7d17330914047848-1024-1024.webp",
        "https://acdn.mitiendanube.com/stores/002/379/691/products/1000400958-3f79ca2f4320b8fb5117291977460790-1024-1024.webp"
      ],
      "html": "<p>\nEsta moeda faz parte de uma série especial de 16 moedas comemorativas dos Jogos Olímpicos e Paralímpicos Rio 2016.\n</p>\n<p>\nNo anverso, além da cena de natação paralímpica, há a logomarca dos Jogos Paralímpicos Rio 2016 e a legenda 'JOGOS PARALÍMPICOS RIO 2016'.\n</p>\n<p>\nO reverso é idêntico ao da moeda de 1 Real padrão, com o valor '1 REAL' e a legenda 'BRASIL'.\n</p>",
      "enviadoPor": "Leonardo Garcia",
      "redeSocialDoEnviador": "",
      "mensagemEnviador": "",
      "Saldo": 4
    },
    {
      "id": 10021,
      "titulo": "1 Real - Vôlei (Olimpíadas Rio 2016)",
      "nome": "Real",
      "simbolo": "R$",
      "sigla": "BRL",
      "valor": 1,
      "valorVenda": 4,
      "pais": "Brasil",
      "ano": 2015,
      "quantidade": 1,
      "estado": "BC",
      "circulacao": true,
      "cedula": false,
      "tipo": "comemorativa",
      "descricao": "Moeda comemorativa de 1 Real, parte da série especial das Olimpíadas Rio 2016, com cunhagem em 2015. Apresenta uma cena estilizada de vôlei no anverso, com um jogador efetuando um ataque. O reverso é o mesmo da moeda de 1 Real padrão, com a inscrição 'BRASIL' e detalhes ornamentais.",
      "anomalia": false,
      "kit": false,
      "ficha": {
        "composicao": "Núcleo de aço inoxidável, anel de aço revestido de bronze",
        "borda": "Lisa",
        "formato": "Circular",
        "peso": "7.00 g",
        "diametro": "27 mm",
        "espessura": "2 mm"
      },
      "imagens": [
        "https://acdn.mitiendanube.com/stores/002/379/691/products/moeda-1-real-2024-9550367c88d79b5f7d17330914047848-1024-1024.webp",
        "https://acdn.mitiendanube.com/stores/002/379/691/products/1000400958-3f79ca2f4320b8fb5117291977460790-1024-1024.webp"
      ],
      "html": "<p>\nEsta moeda faz parte de uma série especial de 16 moedas comemorativas dos Jogos Olímpicos e Paralímpicos Rio 2016.\n</p>\n<p>\nNo anverso, além da cena de vôlei, há a logomarca dos Jogos Olímpicos Rio 2016 e a legenda 'JOGOS OLÍMPICOS RIO 2016'.\n</p>\n<p>\nO reverso é idêntico ao da moeda de 1 Real padrão, com o valor '1 REAL' e a legenda 'BRASIL'.\n</p>",
      "enviadoPor": "Leonardo Garcia",
      "redeSocialDoEnviador": "",
      "mensagemEnviador": "",
      "Saldo": 4
    }
  ]
}


// Seleciona o elemento do carousel
const carouselElement = document.querySelector('#carouselFade');

// Inicializa o Carousel (opcional se você já usa data-bs-ride)
const carousel = new bootstrap.Carousel(carouselElement, {
  interval: 5000, // Tempo entre os slides (em ms)
  wrap: true,     // Permite que o Carousel volte ao início
  pause: 'hover', // Pausa o Carousel ao passar o mouse
});

// Controle manual (exemplo)
document.querySelector('.carousel-control-next').addEventListener('click', () => {
  carousel.next(); // Próximo slide
});

document.querySelector('.carousel-control-prev').addEventListener('click', () => {
  carousel.prev(); // Slide anterior
});
