export const dadosRelatorio = (carro, lista_datas, chave_data, qtd_dias, valor) => {

    console.log(lista_datas);
    console.log(chave_data);
    let Data, Hora;
    lista_datas.map( data => {
        console.log(data)
        if(data.ChaveData === chave_data){
            console.log('if');
            Data = data.Data.Data;
            console.log(data);
            Hora = data.Data.Hora;
            return;
        }
    });

    const dados = {
        Modelo: carro.Carro.Modelo,
        Ano: carro.Carro.Ano,
        Cor: carro.Carro.Cor,
        Valor: carro.Carro.Valor,
        Data: Data,
        Hora: Hora,
        Qtd_dias: qtd_dias,
        ValorTotal: valor
    }
    
    console.log(dados)
    return dados;
}