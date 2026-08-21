const elementoHora = document.getElementById("hora-atualizacao");

const agora = new Date();
const horas = agora.getHours().toString().padStart(2, "0");
const minutos = agora.getMinutes().toString().padStart(2, "0")

elementoHora.textContent = `às ${horas}:${minutos}`;

const container = document.getElementById("lista-noticias");

function carregarNoticias() {
  // ?t=... evita que o navegador use uma cópia antiga guardada em cache
  fetch("noticias.json?t=" + Date.now())
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (dados) {
      container.innerHTML = ""; // limpa antes de redesenhar, evita duplicar

      dados.itens.forEach(function (noticia) {
        container.innerHTML += `
          <article class="noticia">
            <p class="categoria">${noticia.categoria}</p>
            <h2>${noticia.titulo}</h2>
            <p class="resumo">${noticia.resumo}</p>
            <a href="${noticia.link}">Leia mais →</a>
          </article>
        `;
      });
    })
    .catch(function (erro) {
      console.error("Não foi possível carregar as notícias:", erro);
    });
}

carregarNoticias(); // busca assim que a página abre

setInterval(carregarNoticias, 2 * 60 * 1000); // e repete a cada 2 minutos