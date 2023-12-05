// Script relacionado ao módulo de exemplo

// Array principal armazenado no navegador
if(localStorage.getItem('lista') == null) {
    lista = [];
    localStorage.setItem('lista', JSON.stringify(lista));
} else {
    lista = JSON.parse(localStorage.getItem('lista'));
}

// Aguarda o carregamento do HTML para ser executado
document.addEventListener('DOMContentLoaded', function() {

    // Chamadas
    listar();

    // Salva cadastro e edição
    document.querySelector('#bt-salvar').addEventListener('click', function() {
        // Adiciona dados dos campos ao array principal
        let id = document.querySelector('#campo-id').value;
        let acomodacao = document.querySelector('#campo-acomodacao').value;
        let nome = document.querySelector('#campo-nome').value;
        let qtdDiarias = document.querySelector('#campo-qtd-diarias').value;
        let valorTotal = document.querySelector('#campo-valor-total').value;
        if(id != "") {
            let indice = getIndiceListaPorId(id)
            lista[indice] = {id: id, acomodacao: acomodacao, nome: nome, qtdDiarias: qtdDiarias, valorTotal: valorTotal};
        } else {
            lista.push({id: getMaiorIdLista()+1, acomodacao: acomodacao, nome: nome, qtdDiarias: qtdDiarias, valorTotal: valorTotal});
        }

        // Armazena a lista atualizada no navegador
        localStorage.setItem('lista', JSON.stringify(lista));

        // Reseta o formulário e recarrega a tabela de listagem
        this.blur();
        document.querySelector('#bt-cancelar').style.display = 'none';
        document.querySelector('#campo-id').value = "";
        document.querySelector('#campo-acomodacao').value = "";
        document.querySelector('#campo-nome').value = "";
        document.querySelector('#campo-qtd-diarias').value = "";
        document.querySelector('#campo-nome').value = "";

        carregar("Salvo com sucesso!");
        listar();
    });

    // Cancelamento de edição
    document.querySelector('#bt-cancelar').addEventListener('click', function() {
        document.querySelector('#bt-cancelar').style.display = 'none';
        document.querySelector('#campo-id').value = "";
        document.querySelector('#campo-acomodacao').value = "";
        document.querySelector('#campo-nome').value = "";
        document.querySelector('#campo-qtd-diarias').value = "";
        document.querySelector('#campo-valor-total').value = "";
    });

});

// Funções

function listar() {
    document.querySelector('table tbody').innerHTML = "";
    document.querySelector('#total-registros').textContent = lista.length;
    lista.forEach(function(objeto) {
        // Cria string html com os dados da lista
        let htmlAcoes = "";
        htmlAcoes += '<button class="bt-tabela bt-editar" title="Editar"><i class="ph ph-pencil"></i></button>';
        htmlAcoes += '<button class="bt-tabela bt-excluir" title="Excluir"><i class="ph ph-trash"></i></button>';
        
        let htmlColunas = "";
        htmlColunas += "<td>"+objeto.id+"</td>";
        htmlColunas += "<td>"+objeto.acomodacao+"</td>";
        htmlColunas += "<td>"+objeto.nome+"</td>";
        htmlColunas += "<td>"+objeto.qtdDiarias+"</td>";
        htmlColunas += "<td>"+objeto.valorTotal+"</td>";
        htmlColunas += "<td>"+htmlAcoes+"</td>";
        
        // Adiciona a linha ao corpo da tabela
        let htmlLinha = '<tr id="linha-'+objeto.id+'">'+htmlColunas+'</tr>';
        document.querySelector('table tbody').innerHTML += htmlLinha;
    });

    eventosListagem();
    carregar();
}

function eventosListagem() {
    // Ação de editar objeto
    document.querySelectorAll('.bt-editar').forEach(function(botao) {
        botao.addEventListener('click', function() {
            // Pega os dados do objeto que será alterado
            let linha = botao.parentNode.parentNode;
            let colunas = linha.getElementsByTagName('td');
            let id = colunas[0].textContent;
            let acomodacao = colunas[1].textContent;
            let nome = colunas[2].textContent;
            let qtdDiarias = colunas[3].textContent;
            let valorTotal = colunas[4].textContent;
            
            
            // Popula os campos do formulário
            document.querySelector('#campo-id').value = id;
            document.querySelector('#campo-acomodacao').value = acomodacao;
            document.querySelector('#campo-nome').value = nome;
            document.querySelector('#campo-qtd-diarias').value = qtdDiarias;
            document.querySelector('#campo-valor-total').value = valorTotal;

            
            // Exibe botão de cancelar edição
            document.querySelector('#bt-cancelar').style.display = 'flex';
        });
    });

    // Ação de excluir objeto
    document.querySelectorAll('.bt-excluir').forEach(function(botao) {
        botao.addEventListener('click', function() {
            if(confirm("Deseja realmente excluir?")) {
                // Remove objeto da lista
                let linha = botao.parentNode.parentNode;
                let id = linha.id.replace('linha-','');
                let indice = getIndiceListaPorId(id);
                lista.splice(indice, 1);

                // Armazena a lista atualizada no navegador
                localStorage.setItem('lista', JSON.stringify(lista));

                // Recarrega a listagem
                listar();
            }
        });
    });
}

function getIndiceListaPorId(id) {
    indiceProcurado = null;
    lista.forEach(function(objeto, indice) {
        if(id == objeto.id) {
            indiceProcurado = indice;
        }
    });
    return indiceProcurado;
}

function getMaiorIdLista() {
    if(lista.length > 0) {
        return parseInt(lista[lista.length-1].id);
    } else {
        return 0;
    }
}
