document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    const clientesList = document.getElementById('clientes-list');

    // Função para carregar os clientes e atualizar a lista
    function loadClientes() {
        fetch('/clientes/')
            .then(response => response.json())
            .then(clientes => {
                clientesList.innerHTML = '';
                clientes.forEach(cliente => {
                    const li = document.createElement('li');
                    li.textContent = `${cliente.nome} - ${cliente.cpf} - ${cliente.email}`;

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
            });
    }

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