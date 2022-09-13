import { FetchApi } from './apiFetch.js';
export function sriptData() {
  let numeroProdutos = document.querySelector(".todosDados"),
    numeroProdutosCompletos = document.querySelector(".concluidoDados"),
    btnAddProdutos = document.querySelector(".addBtn"),
    addDados = document.querySelector(".addDados"),
    listaVazia = document.querySelector(".listaVazia"),
    produtosVariados = document.querySelector(".listaDados"),
    produtos = Array.from(document.querySelectorAll(".produtos"));

  window.onload = () => {
    addDados.focus();
  };

  const calcNumTasks = () => {
    numeroProdutos.textContent = produtosVariados.getElementsByClassName("produtos").length;
  };

  const calcFinishedTasks = () => {
    numeroProdutosCompletos.textContent =
      produtosVariados.getElementsByClassName("finished").length;
  };

  const checkTasks = () => {
    if (produtosVariados.getElementsByClassName("produtos").length === 0) {
      let message = document.createElement("span");
      message.classList.add("listaVazia");
      let text = document.createTextNode("Nenhum produto adicionado");
      message.appendChild(text);
      produtosVariados.appendChild(message);
      return;
    }
    document.querySelector(".listaVazia").remove();
  };

  checkTasks();
  calcNumTasks();
  calcFinishedTasks();

  // Adicionar produtos
  btnAddProdutos.addEventListener("click", async () => {
    let exict = 0, listProdutosSalvos = [];
    var produtosNaLista = produtosVariados.getElementsByClassName("produtos");
    var existProdutosNaLista = false;
    var produtoBuscar = addDados.value.toUpperCase();
    if (localStorage.getItem("produtos") != null) {
      listProdutosSalvos = JSON.parse(localStorage.getItem("produtos"));
    }
    for (let i = 0; i < produtosNaLista.length; i++) {
      var splitDados = produtosNaLista[i].textContent.split(".")[0];
      if (splitDados == produtoBuscar) {
        existProdutosNaLista = true;
        break;
      }
    }
    var valorCatalago = catalogo(produtoBuscar);
    if (valorCatalago == 0 || existProdutosNaLista) {
      var resposta = valorCatalago == 0 ? "Produto não encontrado" : "Produto já adicionado";
      let message = document.createElement("div");
      message.classList.add("pop-up-message");
      message.id = "message";

      let icon = document.createElement("i");
      icon.classList.add("fa", "fa-times-circle", "iconNo");

      let p = document.createElement("p");
      p.classList.add("checkExict");
      let text = document.createTextNode(resposta);
      p.appendChild(text);

      let overlay = document.createElement("div");
      overlay.classList.add("overlay");
      overlay.id = "overlay";

      message.appendChild(icon);
      message.appendChild(p);

      document.body.appendChild(message);
      document.body.appendChild(overlay);
      let show = setTimeout(() => {
        message.remove();
        overlay.remove();
      }, 2000);
      exict = 1;
    }
    if (exict === 1 || produtoBuscar === "") {
      return;
    }

    if (listProdutosSalvos.length == 0) {
      localStorage.setItem("produtos", JSON.stringify([produtoBuscar]));
    } else {
      localStorage.setItem("produtos", JSON.stringify([...listProdutosSalvos, produtoBuscar]));
    }
    //Aqui vou consumir api para buscar imagens e descrição do produto
    const apiFetch = new FetchApi();
    const api = await apiFetch.getApi(`https://fakestoreapi.com/products/${parseInt(valorCatalago)}`);

    let prod = document.createElement("div");
    prod.classList.add("produtos");

    let p = document.createElement("p");
    let text = document.createTextNode(produtoBuscar + ".\t");
    p.classList.add("detail");
    p.style.textAlign = "center";
    p.appendChild(text);

    let p2 = document.createElement("p");
    let text2 = document.createTextNode(api.title + "\t");
    p2.classList.add("detail");
    p2.style.textAlign = "center";
    p2.appendChild(text2);

    let p3 = document.createElement("p");
    let text3 = document.createTextNode(`Preço R\$ ${api.price + "\t"}`);
    p3.classList.add("detail");
    p3.style.textAlign = "center";
    p3.appendChild(text3);

    let p4 = document.createElement("p");
    let text4 = document.createTextNode(`Categoria: ${api.category + "\t"}`);
    p4.classList.add("detail");
    p4.style.textAlign = "center";
    p4.appendChild(text4);

    let p5 = document.createElement("p");
    let text5 = document.createTextNode(`Descrição: ${api.description + "\t"}`);
    p5.classList.add("detail");
    p5.style.textAlign = "center";
    p5.appendChild(text5);


    let ima = document.createElement("img");
    ima.classList.add("img");
    ima.src = api.image;
    ima.alt = api.title;
    ima.title = api.title;
    ima.style.width = "100px";
    ima.style.height = "100px";
    ima.style.margin = "auto";

    let datatime = document.createElement("p");
    let text6 = document.createTextNode(`Data: ${new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString('pt-BR')}`);
    datatime.classList.add("detail");
    datatime.style.textAlign = "center";
    datatime.appendChild(text6);


    let actions = document.createElement("div");
    actions.classList.add("actions");

    let deleteBtn = document.createElement("i");
    deleteBtn.classList.add("fa", "fa-trash", "deleteBtn");

    let finishBtn = document.createElement("i");
    finishBtn.classList.add("fa", "fa-check", "finishBtn");

    actions.appendChild(finishBtn);
    actions.appendChild(deleteBtn);

    prod.appendChild(p);
    prod.appendChild(p2);
    prod.appendChild(p3);
    prod.appendChild(p4);
    prod.appendChild(p5);
    prod.appendChild(datatime);
    prod.appendChild(ima);
    prod.appendChild(actions);
    produtosVariados.appendChild(prod);
    checkTasks();
    calcNumTasks();

    addDados.value = "";
    produtos = Array.from(document.querySelectorAll(".produtos"));
  });

  //Botao para mostra o modal com produtos cadastrados
  document.addEventListener("click", async (event) => {
    if (
      event.target.className === "produtos" ||
      event.target.className === "detail"
    ) {

      let message = document.createElement("div");
      message.classList.add("pop-up-message");
      message.id = "message";

      let ima = document.createElement("img");
      ima.classList.add("img");
      ima.src = event.target.parentNode.childNodes[6].src;
      ima.alt = event.target.parentNode.childNodes[6].alt;
      ima.title = event.target.parentNode.childNodes[6].title;
      ima.style.width = "100px";
      ima.style.height = "100px";


      let p = document.createElement("p");
      let text = document.createTextNode(event.target.textContent);
      p.appendChild(text);

      let overlay = document.createElement("div");
      overlay.classList.add("overlay");
      overlay.id = "overlay";

      message.appendChild(p);
      message.appendChild(ima);
      document.body.appendChild(message);
      document.body.appendChild(overlay);
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target.id === "overlay" && event.target.id !== "produtos") {
      message.remove();
      overlay.remove();
    }
  });

  //Botao para deletar produto e atualizar o numero de produtos
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("deleteBtn")) {
      let parent = event.target.parentNode;
      parent.parentNode.remove();
      checkTasks();
    } else if (event.target.classList.contains("finishBtn")) {
      let parent = event.target.parentNode;
      parent.parentNode.classList.add("finished");
      event.target.classList.replace("fa-check", "fa-history");
      event.target.classList.replace("finishBtn", "not-finishBtn");
    } else if (event.target.classList.contains("not-finishBtn")) {
      let parent = event.target.parentNode;
      parent.parentNode.classList.remove("finished");
      event.target.classList.replace("fa-history", "fa-check");
      event.target.classList.replace("not-finishBtn", "finishBtn");
    }
    calcNumTasks();
    calcFinishedTasks();
  });

  function catalogo(nomeProduto) {
    switch (nomeProduto.toUpperCase()) {
      case "BLUSA ROXA":
        return 20;
      case "BLUSA VERMELHA":
        return 19;
      case "BLUSA BRANCA":
        return 18;
      case "JACKETA AZUL":
        return 17;
      case "JACKETA PRETA":
        return 16;
      case "BLUSA DE FRIO ROXA":
        return 15;
      case "TV SANSUMNG":
        return 14;
      case "TV ACER":
        return 13;
      case "HD":
        return 12;
      case "SSD 256":
        return 11;
      case "SSD plus":
        return 10;
      case "HD PORTATIL" || "HD PORTÁTIL":
        return 9;
      case "BRINCO":
        return 8;
      case "ANEL":
        return 7;
      case "PULSEIRA":
        return 6;
      case "CORDAO" || "CORRENTE" || "CORDÃO":
        return 5;
      case "BLUSA MANGA LONGA":
        return 4;
      case "BLUSA MANGA LONGA MARRON":
        return 3;
      case "BLUSA":
        return 2;
      case "BOLSA":
        return 1;
      default:
        return 0;
    }
  }
}
