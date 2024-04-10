
const fetchButtonData = () => {
    return {
      id: document.querySelector("#id_product").value,
      name: document.querySelector("#name_product").value,
      description: document.querySelector("#description_product").value,
      price: document.querySelector("#price_product").value,
    };
  };


const API_GATEWAY = "http://localhost:5500/items";

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("insert").addEventListener("click", function() {
        inserir();
    });
    document.getElementById("update").addEventListener("click", function() {
        atualizar();
    });
    document.getElementById("search").addEventListener("click", function() {
        procurar();
    });
    document.getElementById("delete").addEventListener("click", function() {
        deletar();
    });
});


async function inserir(){
    let data = fetchButtonData()
    delete data.id;
    try{
        const response = await axios({
        method: "POST",
        url: API_GATEWAY,
        contentType: "application/json",
        data:data,
      });
      if (response.status === 200) {
        alert(`O item foi inserido com sucesso!`);
    } else {
        alert(`Ocorreu um erro ao excluir o item com o ID ${data}.`);
    }
    } catch (error) {
        if (error.response && error.response.status === 422) {
            alert('Por favor, preencha todos os campos necessários corretamente. (campos com o ícone verde)');
        } else {
            console.log('Erro ao atualizar o item:', error);
        }
    }
}

async function deletar(){
    let data = fetchButtonData().id;
    try{
    const response = await axios({
        method: "DELETE",
        url: `${API_GATEWAY}/${data}`,
        contentType: "application/json",
      });
      if (response.data.status == "ID_INVALIDO") {
        alert(`Este ID esta inválido! Tente Novamente. `)
    }
      if (response.data.status === "NO_ITEMS_DELETED") {
        alert(`Nenhum item foi encontrado com o ID ${data}.`);
    } else if (response.data.status === "OK"){
        alert(`O item com ID: ${data} foi excluido permanentemente!`);
    }
    } catch(error){
        if (error.response && error.response.status === 422) {
            alert('Por favor, preencha todos os campos necessários. (todos os campos com o ícone Vermelho)');
        } else if (error.response.status === 405){
            alert("Por favor, preencha todos os campos necessários. (todos os campos com o ícone Vermelho)")
        }else {
            alert("Um Erro desconhecido aconteu!")
            console.log('Erro ao atualizar o item:', error);
        }
    }
}

async function procurar(){
    let data = fetchButtonData().id;
    try{
    const response = await axios({
        method: "GET",
        url: `${API_GATEWAY}/${data}`,
        contentType: "application/json",
      });
      const item = (response.data);
      if (response.data.status == "ID_INVALIDO") {
        alert(`Este ID esta inválido! Tente Novamente. `)
    } else {
        alert(`Item encontrado!\nNome: ${item.name} \nPreço: ${item.price} \nDescrição: ${item.description}  `);
    }
    } catch (error) {
        if (error.response.status === 405) {
            alert('Por favor, preencha todos os campos necessários. (campos com o ícone Azul)');
        }else {
            console.log('Ocorreu um erro:', error);
        }
    }
}
async function atualizar(){
    let data = fetchButtonData();
    let id = data.id;
    delete data.id;
    try {
        const response = await axios.put(`${API_GATEWAY}/${id}`, data);
        console.log(response.data.status)
        if (response.data.status == "ID_INVALIDO") {
            alert(`Este ID esta inválido! Tente Novamente. `)
        }
        else if (response.data.status === "OK") {
            alert(`O item foi atualizado com sucesso!`);
        }else if(response.data.status === "NO_ITEMS_UPDATED") {
            alert(`O ID ${id} não foi encontrado. Tente novamente!`);
        }else{
            alert("Um erro desconhecido aconteceu!")
        }
    } catch (error) {
        if (error.response && error.response.status === 422) {
            alert('Por favor, preencha todos os campos necessários. (todos os campos com o ícone amarelo)');
        } else if (error.response.status === 405){
            alert("Por favor, preencha todos os campos necessários. (todos os campos com o ícone amarelo)")
        }else {
            alert("Um Erro desconhecido aconteu!")
            console.log('Erro ao atualizar o item:', error);
        }
    }
}

