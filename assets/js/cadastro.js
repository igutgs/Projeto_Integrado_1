//API para validar cep
document.getElementById('cep').addEventListener('blur', async function() {
    let cep = this.value.replace(/\D/g, '');
    
    if (cep.length === 8) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            
            if (!data.erro) {
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('uf').value = data.uf;
            } else {
                alert('CEP não encontrado');
            }
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
        }
    }
});

//validação de formulário para envio
document.querySelector('form').addEventListener('submit', function(e) {
    let bairro = document.getElementById('bairro').value;
    let cidade = document.getElementById('cidade').value;
    let uf = document.getElementById('uf').value;
    
    if (!bairro || !cidade || !uf) {
        e.preventDefault();
        alert('Por favor, complete o CEP corretamente ou preencha os campos manualmente');
    }
});

//feedback (se for legal, se der erro zuo)
document.querySelector('form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    try {
        const response = await fetch('/cadastro-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            alert(result.mensagem);
            window.location.href = result.redirect;
        } else {
            alert('Erro: ' + result.mensagem);
        }
    } catch (error) {
        alert('Erro ao enviar formulário: ' + error.message);
    }
});
