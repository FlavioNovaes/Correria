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
const inputMetaMensal = document.getElementById("metaMensal");
const inputMetaReservaMoto = document.getElementById("metaReservaMoto");
const inputValorGuardado = document.getElementById("valorGuardado");

const btnTopo = document.getElementById("btnTopo");
const btnSalvarMetas = document.getElementById("btnSalvarMetas");

const textoMetaMensal = document.getElementById("textoMetaMensal");
const textoReservaMoto = document.getElementById("textoReservaMoto");

const progressoMetaMensal = document.getElementById("progressoMetaMensal");
const progressoReservaMoto = document.getElementById("progressoReservaMoto");

const porcentagemMetaMensal = document.getElementById("porcentagemMetaMensal");
const porcentagemReservaMoto = document.getElementById("porcentagemReservaMoto");

const divisaoGasolina = document.getElementById("divisaoGasolina");
const divisaoManutencao = document.getElementById("divisaoManutencao");
const divisaoReserva = document.getElementById("divisaoReserva");
const divisaoUsoPessoal = document.getElementById("divisaoUsoPessoal");

const btnSalvarCusto = document.getElementById("btnSalvarCusto");
const tabelaCustos = document.getElementById("tabelaCustos");

let custosMoto = JSON.parse(localStorage.getItem("custosMoto")) || [];

let metas = JSON.parse(localStorage.getItem("metas")) || {
    metaMensal: 0,
    metaReservaMoto: 0,
    valorGuardado: 0
};

const btnSalvar = document.getElementById("btnSalvar")
const tabelaRegistros = document.getElementById("tabelaRegistros")

let registros = JSON.parse(localStorage.getItem("registros")) || []

mostrarRegistros()
atualizarResumo()
mostrarCustosMoto()
atualizarMetas()

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
    atualizarMetas()
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

btnSalvarMetas.addEventListener("click", () => {

    metas.metaMensal = Number(inputMetaMensal.value)
    metas.metaReservaMoto = Number(inputMetaReservaMoto.value)
    metas.valorGuardado = Number(inputValorGuardado.value)

    localStorage.setItem("metas", JSON.stringify(metas))

    atualizarMetas()
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
        atualizarMetas();
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

    for (let i = 0; i < custosMoto.length; i++) {
        const custo = custosMoto[i];

        const linha = document.createElement("tr");

        linha.innerHTML = `
        <td>${custo.item}</td>
        <td>R$ ${custo.valor.toFixed(2)}</td>
        <td>${custo.categoria}</td>
        <td>${custo.frequencia}</td>
        <td>
            <button class="btn-excluir" onclick="excluirCusto(${i})">
            Excluir
            </button>
        </td>
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

function excluirCusto(index) {
    const confirmar = confirm("Tem certeza que deseja excluir este custo?");

    if (confirmar) {
        custosMoto.splice(index, 1);

        localStorage.setItem("custosMoto", JSON.stringify(custosMoto));

        mostrarCustosMoto();
    }
}

function atualizarMetas() {

    let faturamento = 0;

    for (const registro of registros) {
        faturamento += registro.ganho;
    }

    textoMetaMensal.innerText =
        `R$ ${faturamento.toFixed(2)} / R$ ${metas.metaMensal.toFixed(2)}`;

    textoReservaMoto.innerText =
        `R$ ${metas.valorGuardado.toFixed(2)} / R$ ${metas.metaReservaMoto.toFixed(2)}`;

    const percentualMeta =
        metas.metaMensal > 0
            ? (faturamento / metas.metaMensal) * 100
            : 0;

    const percentualReserva =
        metas.metaReservaMoto > 0
            ? (metas.valorGuardado / metas.metaReservaMoto) * 100
            : 0;

    progressoMetaMensal.style.width =
        `${Math.min(percentualMeta, 100)}%`;

    progressoReservaMoto.style.width =
        `${Math.min(percentualReserva, 100)}%`;

    porcentagemMetaMensal.innerText =
        `${percentualMeta.toFixed(0)}% concluído`;

    porcentagemReservaMoto.innerText =
        `${percentualReserva.toFixed(0)}% concluído`;

    divisaoGasolina.innerText =
        `R$ ${(faturamento * 0.20).toFixed(2)}`;

    divisaoManutencao.innerText =
        `R$ ${(faturamento * 0.10).toFixed(2)}`;

    divisaoReserva.innerText =
        `R$ ${(faturamento * 0.10).toFixed(2)}`;

    divisaoUsoPessoal.innerText =
        `R$ ${(faturamento * 0.60).toFixed(2)}`;

}

