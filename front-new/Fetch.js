
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
      if (response.status == 200) {
        alert(`O item foi inserido com sucesso!`);
    } else {
        alert(`Ocorreu um erro ao excluir o item com o ID ${data}.`);
    }
    } catch(e){
        console.log(e);
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
      if (response.status == 200) {
        alert(`O item com o ID ${data} foi excluído com sucesso!`);
    } else {
        alert(`Ocorreu um erro ao excluir o item com o ID ${data}.`);
    }
    } catch(e){
        console.log(e);
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
      if (response.status == 200) {
        const item = (response.data);
        alert(`Item encontrado!\nNome: ${item.name} \nPreço: ${item.price} \nDescrição: ${item.description}  `);
    } else {
        alert(`Ocorreu um erro ao excluir o item com o ID ${data}.`);
    }
    } catch(e){
        console.log(e);
    }
}

async function atualizar(){
    let data = fetchButtonData()
    let id = data.id;
    delete data.id;
    try{
        const response = await axios({
        method: "PUT",
        url: `${API_GATEWAY}/${id}`,
        contentType: "application/json",
        data:data,
      });
      if (response.status == 200) {
        alert(`O item foi Atualizado com sucesso!`);
    } else {
        alert(`Ocorreu um erro ao excluir o item com o ID ${data}.`);
    }
    } catch(e){
        console.log(e);
    }
}

