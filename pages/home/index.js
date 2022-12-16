/* Desenvolva sua lógica aqui... */
function renderVagas(vagas)
{
    let listas = document.querySelector('.container__div')

    vagas.forEach(vaga => {
        const posts = criarVagas(vaga)
        listas.append(posts) 
    });

    localStorage.setItem("@kenzieWebwoman", JSON.stringify(jobsData))
}

function criarVagas(vaga)
{
    const div = document.createElement('li')
    div.classList.add('container__div1')

    const h2 = document.createElement('h2')
    h2.classList.add('titulo__vaga')

    const pEmpresa = document.createElement('span')
    pEmpresa.classList.add('empresa')

    const pCidade = document.createElement('span')
    pCidade.classList.add('cidade')

    const descricao = document.createElement('p')
    descricao.classList.add('desc__vaga')

    const divButton = document.createElement('div')
    divButton.classList.add('divButton')

    const spanTipo = document.createElement('span')
    spanTipo.classList.add('tipo__vaga')

    const button = document.createElement('button')
    button.classList.add('button__candidatar')

    h2.innerText = vaga.title

    pEmpresa.innerText = vaga.enterprise

    pCidade.innerText = vaga.location

    descricao.innerText = vaga.descrition

    spanTipo.innerText = vaga.modalities[0]
    
    button.innerText = 'Candidatar'
    button.dataset.id = vaga.id

    divButton.append(spanTipo, button)
    div.append(h2, pEmpresa, pCidade, descricao, divButton)

    return div
}

function renderCart(array)
{
    const cartList = document.querySelector('.container__aside')

    cartList.innerHTML = ''

    if(vagaDoAside.length <= 0){
        const descAsides = descAside()

        cartList.appendChild(descAsides)
    }else{
        array.forEach(vaga => {
            const selecao = createCartProduct(vaga)
            cartList.appendChild(selecao)
        })
    }
}

function descAside()
{
    const container = document.createElement('li')
    const mensagem = document.createElement('p')
    mensagem.classList.add('mensagem')

    mensagem.innerText = 'Você ainda não aplicou para nenhuma vaga'

    container.append(mensagem)

    return container
}

function createCartProduct(vaga)
{
    const liAside = document.createElement('li')
    liAside.classList.add('lista')

    const h2Aside = document.createElement('h2')
    h2Aside.classList.add('titulo__vaga--selecao')
    h2Aside.innerText = vaga.title

    const pEmpresa = document.createElement('span')
    pEmpresa.classList.add('empresa--selecao')
    pEmpresa.innerText = vaga.enterprise

    const pCidade = document.createElement('span')
    pCidade.classList.add('cidade--selecao')
    pCidade.innerText = vaga.location

    const imgButton = document.createElement('button')
    imgButton.classList.add('button__remove')
    imgButton.dataset.vagaId = vaga.vagaId 

    imgButton.addEventListener('click', () => {
        removeVaga(vaga)
    })

    const img = document.createElement('img')
    img.classList.add('img')
    img.src = '/assets/img/trash.png'

    imgButton.append(img)
    liAside.append(h2Aside, imgButton, pEmpresa, pCidade)

    return liAside
}

function addVaga()
{
    const buttons = document.querySelectorAll('.button__candidatar')
    const cardAdd = JSON.parse(localStorage.getItem("@kenzieWebwoman:vagas")) || []
    const cardAdds = JSON.parse(localStorage.getItem("@kenzieWebwoman"))

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const vagass = cardAdds.find(vaga => {
                return vaga.id === Number(event.target.dataset.id)
            })   
            const vagasAside = {
               ...vagass, 
               vagaId: cardAdd.length + 1
            }
            cardAdd.push(vagasAside)
            localStorage.setItem("@kenzieWebwoman:vagas", JSON.stringify(cardAdd))
            renderCart(vagasAside)
        })
    })
}

function removeVaga(item)
{
   vagaDoAside = vagaDoAside.filter((item1) => {
        if(item1 !== item){
            return item1
        }
   })
   renderCart(vagaDoAside)
}

renderVagas(jobsData)
renderCart(vagaDoAside)
addVaga()