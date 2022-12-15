/* Desenvolva sua lógica aqui... */
function renderVagas(vagas)
{
    let listas = document.querySelector('.container__div')

    vagas.forEach(vaga => {
        const posts = criarVagas(vaga)
        listas.append(posts) 
    });
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

    const spanTipo = document.createElement('button')
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

    div.append(h2, pEmpresa, pCidade, descricao, spanTipo, button)

    return div
}

function renderCart(array)
{
    const vagasUl = document.querySelector('.container__aside')

    innerHTML = ''

    if(vagaDoAside.length <= 0){
        const descAsides = descAside()

        vagasUl.appendChild(descAsides)
    }else{
        array.forEach(vagas => {
            const selecao = vagaSelecionadas(vagas)
            vagasUl.appendChild(selecao)
        })
    }
}

function descAside()
{
    const container = document.createElement('li')
    const titulo = document.createElement('h2')
    titulo.classList.add('titulo__aside')
    const mensagem = document.createElement('p')
    mensagem.classList.add('mensagem')

    titulo.innerText = 'Vagas selecionadas'
    mensagem.innerText = 'Você ainda não aplicou para nenhuma vaga'

    container.append(titulo, mensagem)

    return container
}

function vagaSelecionadas(vagas)
{
    const liAside = document.createElement('li')

    const h2Aside = document.createElement('h2')
    h2Aside.innerText = vagas.title

    const pEmpresa = document.createElement('span')
    pEmpresa.innerText = vagas.enterprise

    const pCidade = document.createElement('span')
    pCidade.innerText = location

    const imgButton = document.createElement('button')
    imgButton.dataset.vagaId = vagas.vagaId 
    imgButton.src = '../assets/img/trash.png'

    liAside.append(h2Aside, pEmpresa, pCidade, imgButton)

    return liAside
}

function addVaga()
{
    const buttons = document.querySelectorAll('.button__candidatar')

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const vagass = jobsData.find(vagas => {
                return vagas.id === Number(event.target.dataset.id)
            })
            const vagasAside = {
               ...vagass, 
               vagaId: vagaDoAside.length + 1
            }
            vagaDoAside.push(vagasAside)
        })
    })
}

renderVagas(jobsData)
renderCart(vagaDoAside)
addVaga()