const inputData = document.getElementById("data")
const inputHoras = document.getElementById("horas")
const inputKm = document.getElementById("km")
const inputGasolina = document.getElementById("gasolina")
const inputOutros = document.getElementById("outros")
const inputGanho = document.getElementById("ganho")
const inputObs = document.getElementById("obs")
const cardFaturamento = document.getElementById("cardFaturamento");
const cardGastos = document.getElementById("cardGastos");
const cardLucro = document.getElementById("cardLucro");
const cardDias = document.getElementById("cardDias");
const cardMedia = document.getElementById("cardMedia");
const inputItemCusto = document.getElementById("itemCusto");
const inputValorCusto = document.getElementById("valorCusto");
const inputCategoriaCusto = document.getElementById("categoriaCusto");
const inputFrequenciaCusto = document.getElementById("frequenciaCusto");

const btnSalvarCusto = document.getElementById("btnSalvarCusto");
const tabelaCustos = document.getElementById("tabelaCustos");

let custosMoto = JSON.parse(localStorage.getItem("custosMoto")) || [];

const btnSalvar = document.getElementById("btnSalvar")
const tabelaRegistros = document.getElementById("tabelaRegistros")

let registros = JSON.parse(localStorage.getItem("registros")) || []

mostrarRegistros()
atualizarResumo()
mostrarCustosMoto()

btnSalvar.addEventListener("click", () => {
    const registro = {
        data: inputData.value,
        horas: Number(inputHoras.value),
        km: Number(inputKm.value),
        gasolina: Number(inputGasolina.value),
        outros: Number(inputOutros.value),
        ganho: Number(inputGanho.value),
        obs: inputObs.value
    }

    registros.push(registro)
    localStorage.setItem("registros", JSON.stringify(registros))
    alert("Registro salvo com sucesso!")

    mostrarRegistros()
    atualizarResumo()
    limparCampos()
})

btnSalvarCusto.addEventListener("click", () => {
    const custo = {
        item: inputItemCusto.value,
        valor: Number(inputValorCusto.value),
        categoria: inputCategoriaCusto.value,
        frequencia: inputFrequenciaCusto.value
    }

    custosMoto.push(custo)
    localStorage.setItem("custosMoto", JSON.stringify(custosMoto))
    mostrarCustosMoto()
    limparCamposCusto()
})

function limparCampos() {
    inputData.value = ""
    inputHoras.value = ""
    inputKm.value = ""
    inputGasolina.value = ""
    inputOutros.value = ""
    inputGanho.value = ""
    inputObs.value = ""
}

function mostrarRegistros() {
    tabelaRegistros.innerHTML = "";

    for (let i = 0; i < registros.length; i++) {
        const registro = registros[i];

        const lucro = registro.ganho - registro.gasolina - registro.outros;

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${registro.data}</td>
            <td>${registro.horas}h</td>
            <td>${registro.km} km</td>
            <td>R$ ${registro.gasolina.toFixed(2)}</td>
            <td>R$ ${registro.outros.toFixed(2)}</td>
            <td>R$ ${registro.ganho.toFixed(2)}</td>
            <td>R$ ${lucro.toFixed(2)}</td>
            <td>${registro.obs}</td>
            <td>
            <button class="btn-excluir" onclick="excluirRegistro(${i})">
                Excluir
            </button>
            </td>
        `;

        tabelaRegistros.appendChild(linha);
    }
}

function excluirRegistro(index) {
    const confirmar = confirm("Tem certeza que deseja excluir este registro?");

    if (confirmar) {
        registros.splice(index, 1);

        localStorage.setItem("registros", JSON.stringify(registros));

        mostrarRegistros();
        atualizarResumo();
    }
}

function atualizarResumo() {

    let faturamento = 0;
    let gastos = 0;
    let lucro = 0;

    for (const registro of registros) {

        const ganho = Number(registro.ganho);
        const gasolina = Number(registro.gasolina);
        const outros = Number(registro.outros);

        faturamento += ganho;
        gastos += gasolina + outros;
        lucro += ganho - gasolina - outros;

    }

    const diasTrabalhados = registros.length;

    const mediaDia =
        diasTrabalhados > 0
            ? faturamento / diasTrabalhados
            : 0;

    cardFaturamento.innerText = `R$ ${faturamento.toFixed(2)}`;
    cardGastos.innerText = `R$ ${gastos.toFixed(2)}`;
    cardLucro.innerText = `R$ ${lucro.toFixed(2)}`;
    cardDias.innerText = `${diasTrabalhados} dias`;
    cardMedia.innerText = `R$ ${mediaDia.toFixed(2)}`;

}

function mostrarCustosMoto() {
    tabelaCustos.innerHTML = "";

    for (const custo of custosMoto) {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${custo.item}</td>
            <td>R$ ${custo.valor.toFixed(2)}</td>
            <td>${custo.categoria}</td>
            <td>${custo.frequencia}</td>
        `;

        tabelaCustos.appendChild(linha);
    }
}

function limparCamposCusto() {
    inputItemCusto.value = "";
    inputValorCusto.value = "";
    inputCategoriaCusto.value = "Preventiva";
    inputFrequenciaCusto.value = "";
}

