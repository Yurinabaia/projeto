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

btnAddProdutos.addEventListener("click", () => {
  let exict = 0;
  produtos.forEach((prod) => {
    if (prod.textContent === addDados.value) {
      let message = document.createElement("div");
      message.classList.add("pop-up-message");
      message.id = "message";

      let icon = document.createElement("i");
      icon.classList.add("fa", "fa-times-circle", "iconNo");

      let p = document.createElement("p");
      p.classList.add("checkExict");
      let text = document.createTextNode("Produto existente, desculpe mas não é possível adicionar o mesmo produto duas vezes.");
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
  });
  if (exict === 1 || addDados.value === "") {
    return;
  }
  let prod = document.createElement("div");
  prod.classList.add("produtos");

  let p = document.createElement("p");
  let text = document.createTextNode(addDados.value);
  p.classList.add("detail");
  p.appendChild(text);

  let actions = document.createElement("div");
  actions.classList.add("actions");

  let deleteBtn = document.createElement("i");
  deleteBtn.classList.add("fas", "fa-trash-alt", "deleteBtn");

  let finishBtn = document.createElement("i");
  finishBtn.classList.add("fas", "fa-check", "finishBtn");

  actions.appendChild(finishBtn);
  actions.appendChild(deleteBtn);

  prod.appendChild(p);
  prod.appendChild(actions);
  produtosVariados.appendChild(prod);
  checkTasks();
  calcNumTasks();

  addDados.value = "";
  produtos = Array.from(document.querySelectorAll(".produtos"));
});
document.addEventListener("click", (event) => {
  if (
    event.target.className === "produtos" ||
    event.target.className === "detail"
  ) {
    let message = document.createElement("div");
    message.classList.add("pop-up-message");
    message.id = "message";

    let actions = document.createElement("div");
    actions.classList.add("actions");

    let edit = document.createElement("i");
    edit.classList.add("fas", "fa-pencil-alt", "edit");

    let deleteBtn = document.createElement("i");
    deleteBtn.classList.add("fa", "fa-trash", "delete");

    let save = document.createElement("i");
    save.classList.add("fas", "fa-check", "save");
    actions.appendChild(edit);
    actions.appendChild(deleteBtn);
    actions.appendChild(save);

    let p = document.createElement("p");
    let text = document.createTextNode(event.target.textContent);
    p.appendChild(text);

    let overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.id = "overlay";

    message.appendChild(actions);
    message.appendChild(p);
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
