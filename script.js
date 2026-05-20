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

const btnSalvar = document.getElementById("btnSalvar")
const tabelaRegistros = document.getElementById("tabelaRegistros")

let registros = JSON.parse(localStorage.getItem("registros")) || []

mostrarRegistros()
atualizarResumo()

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

    for (const registro of registros) {
    const lucro = registro.ganho - registro.gasolina - registro.outros

    const linha = document.createElement("tr")

    linha.innerHTML = `
        <td>${registro.data}</td>
        <td>${registro.horas}h</td>
        <td>${registro.km} km</td>
        <td>R$ ${registro.gasolina.toFixed(2)}</td>
        <td>R$ ${registro.outros.toFixed(2)}</td>
        <td>R$ ${registro.ganho.toFixed(2)}</td>
        <td>R$ ${lucro.toFixed(2)}</td>
        <td>${registro.observacao}</td>
    `

    tabelaRegistros.appendChild(linha)
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

