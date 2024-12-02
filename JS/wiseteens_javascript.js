function calcularInvestimentos(event) {
    event.preventDefault();
    const valorMeta = parseFloat(document.getElementById('valor').value);
    const tempoMeses = parseInt(document.getElementById('tempo').value);
    const depositoMensal = parseFloat(document.getElementById('contribuicao').value);

    
    // Função para calcular o tempo necessário para atingir o valor de meta
    function calcularTempoParaMeta(meta, depositoMensal, taxaAnual) {
        const n = 12; // Número de meses por ano
        const r = taxaAnual / 100 / n; // Taxa de juros mensal
        let valorAtual = 0;
        let tempo = 0;

        while (valorAtual < meta) {
            valorAtual += depositoMensal * Math.pow(1 + r, tempo);
            tempo++;
        }

        return tempo;
    }

    // Função para calcular a contribuição mínima mensal necessária para atingir a meta no prazo determinado
    function calcularContribuicaoMinima(meta, tempoMeses, taxaAnual) {
        const n = 12; // Número de meses por ano
        const r = taxaAnual / 100 / n; // Taxa de juros mensal
        let depositoMinimo = 0;
        let valorAtual = 0;

        while (valorAtual < meta) {
            depositoMinimo++;
            valorAtual = 0;
            for (let i = 0; i < tempoMeses; i++) {
                valorAtual += depositoMinimo * Math.pow(1 + r, tempoMeses - i - 1);
            }
        }

        return depositoMinimo;
    }
    // Retabilide do investimento no prazo
    function calcularMontante(taxa, tempo, depositoMensal) {
        let montante = 0;
        for (let i = 0; i < tempo; i++) {
            montante = (montante + depositoMensal) * (1+taxa/100/12);
        }
        console.log(montante);
        return montante.toFixed(2);
    }

    // Taxas de retorno anuais para cada tipo de investimento
    const taxasAnuais = {
        poupanca: 6.081,       // Poupança (aproximadamente 6% ao ano)
        selic: 11.25,      // Selic (aproximadamente 13.75% ao ano)
        cdb: 10.97,           // CDBs de Liquidez Diária (aproximadamente 11% ao ano)
        fundosDI: 11.56       // Fundos DI (aproximadamente 10% ao ano)
    };

    // Calcular o tempo necessário para atingir o valor de meta para cada investimento
    const tempoPoupanca = calcularTempoParaMeta(valorMeta, depositoMensal, taxasAnuais.poupanca);
    const tempoSelic = calcularTempoParaMeta(valorMeta, depositoMensal, taxasAnuais.selic);
    const tempoCDB = calcularTempoParaMeta(valorMeta, depositoMensal, taxasAnuais.cdb);
    const tempoFundosDI = calcularTempoParaMeta(valorMeta, depositoMensal, taxasAnuais.fundosDI);

    // Calcular a contribuição mínima mensal para atingir a meta no prazo para cada investimento
    const contribPoupanca = calcularContribuicaoMinima(valorMeta, tempoMeses, taxasAnuais.poupanca);
    const contribSelic = calcularContribuicaoMinima(valorMeta, tempoMeses, taxasAnuais.selic);
    const contribCDB = calcularContribuicaoMinima(valorMeta, tempoMeses, taxasAnuais.cdb);
    const contribFundosDI = calcularContribuicaoMinima(valorMeta, tempoMeses, taxasAnuais.fundosDI);

    // Exibir os resultados
    document.getElementById('results').innerHTML = `
        <h4 style="margin-top: 0;">Resultado do Investimento para a Meta: ${document.getElementById('meta').value.toUpperCase()}</h4>
        <p><strong>Meta:</strong> R$ ${valorMeta.toFixed(2)}</p>
        <p><strong>Tempo:</strong> ${tempoMeses} meses</p>
        <p><strong>Contribuição Mensal:</strong> R$ ${depositoMensal.toFixed(2)}</p>

        <h4 style="text-decoration: underline; text-align: center; margin: 40px 0 0 0px;">Resultados por Tipo de Investimento:</h4>
        <h4>Poupança (${taxasAnuais.poupanca}% ao ano):</h4>
        <p>Investimento mínimo (${tempoMeses} meses): R$ ${contribPoupanca}</p>
        <p>Contribuição mensal (${tempoPoupanca} meses): R$ ${depositoMensal}</p>
        <p>Retabilidade (R$${depositoMensal} por ${tempoMeses} meses): R$ ${(calcularMontante(taxasAnuais.poupanca, tempoMeses, depositoMensal) - valorMeta).toFixed(2)}</p>

        <h4>Selic (${taxasAnuais.selic}% ao ano):</h4>
        <p>Investimento mínimo (${tempoMeses} meses): R$ ${contribSelic}</p>
        <p>Contribuição mensal (${tempoSelic} meses): R$ ${depositoMensal}</p>
        <p>Retabilidade (R$${depositoMensal} por ${tempoMeses} meses): R$ ${(calcularMontante(taxasAnuais.selic, tempoMeses, depositoMensal) - valorMeta).toFixed(2)}</p>

        <h4>CDBs de Liquidez Diária (${taxasAnuais.cdb}% ao ano):</h4>
        <p>Investimento mínimo (${tempoMeses} meses): R$ ${contribCDB}</p>
        <p>Contribuição Mensal (R$${depositoMensal} por ${tempoMeses} meses): R$ ${depositoMensal}</p>
        <p>Retabilidade: R$ ${(calcularMontante(taxasAnuais.cdb, tempoMeses, depositoMensal) - valorMeta).toFixed(2)}</p>

        <h4>Fundos DI (${taxasAnuais.fundosDI}% ao ano):</h4>
        <p>Investimento mínimo (${tempoMeses} meses): R$ ${contribFundosDI}</p>
        <p>Contribuição mensal(${tempoFundosDI} meses): R$ ${depositoMensal}</p>
        <p>Retabilidade (R$${depositoMensal} por ${tempoMeses} meses): R$ ${(calcularMontante(taxasAnuais.fundosDI, tempoMeses, depositoMensal) - valorMeta).toFixed(2)}</p>`;
}
