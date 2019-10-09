
async function GetTrabalhos(ano,mes) {
    var trabalhos = [];
    var ano = "2019";
    var mes = "010";
    const api_url = "https://manages.azurewebsites.net/api/GetTrabalhos?code=6qrhYVALhfZR9wmnTfQGNXuU8w/2Ygs5o6Kjv81JhJgGJuO2Y/wejA==&ano="+ano+"&mes="+mes;
    const response = await fetch(api_url);
    const data = await response.json();
    data.forEach(p=>trabalhos.push(new Trabalho(p.Sistema, p.Pendentes, p.Erros,p.Processados)));
    var table = document.createElement("table");
    table.classList.add("normaltable");
    table.appendChild(tableLine(new Trabalho(), true));
    trabalhos.forEach(user => table.appendChild(tableLine(user, false)));
    replaceChilds("divtable", table); 
};

function Trabalho( Sistema,Pendentes,Erros,Processados) {
    this.Sistema = Sistema;
    this.Pendentes = Pendentes;
    this.Erros = Erros;
    this.Processados = Processados;
};

/**
 * Função que substitui todos os elementos filhos de um elemento HTML por um novo elemento HTML (facilitador de DOM)
 * @param {string} id - id do elemento HTML para o qual se pretende substituir os filhos.
 * @param {HTMLElement} newSon - elemento HTML que será o novo filho.
 */
function replaceChilds(id, newSon) {
    var no = document.getElementById(id);
    while (no.hasChildNodes()) {
        no.removeChild(no.lastChild);
    }
    no.appendChild(newSon);
};

/**
 * Função que recebe um qualquer objeto e retorna dinamicamente uma linha de tabela HTML com informação relativa ao estado das suas propriedades
 * @param {Object} object - objecto do qual vamos transformar o conteudo dos seus atributos em linhas
 * @param {boolean} headerFormat - controla de o formato é cabeçalho ou linha normal
 */
function tableLine(object, headerFormat) {
    const tr = document.createElement('tr');
    //console.log(object.idTorneio);
    tr.appendChild(document.createElement('th'));
    let tableCell = null;
    for (let property in object) {
        if ((object[property] instanceof Function))
            continue;
        if (headerFormat) {
            tableCell = document.createElement('th');
            tableCell.textContent = property[0].toUpperCase() + property.substr(1, property.length - 1);
        } else {
            tableCell = document.createElement('td');
            if (object[property] instanceof Date) {
                tableCell.textContent = object[property].toISOString().split('T')[0]
            } else {
                tableCell.textContent = object[property];
            }
        }
        tr.appendChild(tableCell);
    }
    return tr;
};

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('./sw.js', {scope: './'})
    .then(function(registration) {
        console.log('yes', registration)
    })
    .catch(function(erro){
        console.log('no!', erro)
    })
}
