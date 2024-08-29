document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    const clientesList = document.getElementById('clientes-list');

    // Função para carregar os clientes e atualizar a lista
    function loadClientes(query = '') {
        let url = '/clientes/'
        cpfRegex = /^\d{11}$/;
        if(query && cpfRegex.test(query)) {
            url = `/clientes/cpf/${encodeURIComponent(query)}`
        }
        else if (query  && !cpfRegex.test(query)){
            url = `/clientes/${encodeURIComponent(query)}`
        }
        fetch(url)
            .then(response => response.json())
            .then(clientes => {
                // Verifica se o retorno é uma lista vazia ou se o cliente não foi encontrado
                if (!clientes || (Array.isArray(clientes) && clientes.length === 0)) {
                    clientesList.innerHTML = '<li>Nenhum cliente encontrado.</li>';
                    return;
                }

                // Se o resultado não for um array, transforma em um array
                clientesList.innerHTML = '';
                if(!Array.isArray(clientes)) {
                    clientes = [clientes];
                }

                // Filtra clientes válidos para evitar undefined
                clientes = clientes.filter(cliente => cliente.nome && cliente.cpf && cliente.data_nascimento && cliente.email);

                if (clientes.length === 0) {
                    clientesList.innerHTML = '<li>Nenhum cliente encontrado.</li>';
                    return;
                }

                clientes.forEach(cliente => {
                    const li = document.createElement('li');
                    li.textContent = `${cliente.nome} - ${cliente.cpf} - ${cliente.data_nascimento} - ${cliente.email}`;

                    const editButton = document.createElement('button');
                    editButton.textContent = 'Editar';
                    editButton.addEventListener('click', () => editCliente(cliente));

                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Excluir';
                    deleteButton.addEventListener('click', () => deleteCliente(cliente.id));

                    li.appendChild(editButton);
                    li.appendChild(deleteButton);

                    clientesList.appendChild(li);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar clientes:', error);
                clientesList.innerHTML = '<li>Erro ao carregar clientes.</li>';
            });
    }

    // Função para filtrar clientes
    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(searchForm);
        const cpf = formData.get('cpf');
        loadClientes(cpf);
    });

    // Evento para o botão de limpar busca
    clearSearch.addEventListener('click', function () {
        document.getElementById('filter-cpf').value = ''; // Limpa o campo de busca
        loadClientes(); // Recarrega a lista completa de clientes
    });

    // Função para criar ou atualizar um cliente
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        const clienteData = {
            nome: formData.get('nome'),
            cpf: formData.get('cpf'),
            data_nascimento: formData.get('data_nascimento'),
            email: formData.get('email')
        };

        const method = form.dataset.clienteId ? 'PUT' : 'POST';
        const url = form.dataset.clienteId ? `/clientes/${form.dataset.clienteId}` : '/clientes/';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clienteData)
        })
        .then(response => {
            if (response.ok) {
                loadClientes();
                form.reset();
                delete form.dataset.clienteId;
            }
        });
    });

    // Função para preencher o formulário com os dados do cliente para edição
    function editCliente(cliente) {
        form.dataset.clienteId = cliente.id;
        form.nome.value = cliente.nome;
        form.cpf.value = cliente.cpf;
        form.data_nascimento.value = cliente.data_nascimento;
        form.email.value = cliente.email;
    }

    // Função para excluir um cliente
    function deleteCliente(id) {
        fetch(`/clientes/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                loadClientes();
            }
        });
    }

    // Carregar clientes ao carregar a página
    loadClientes();
});