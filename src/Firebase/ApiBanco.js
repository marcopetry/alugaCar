import firebase from './Firebase'

export default class Banco {
  
    static criarUsuario(email, senha) {

        firebase.auth().createUserWithEmailAndPassword(email, senha)
                .then(() => {
                  Banco.login(email, senha);
                })
                .catch((erro) => {
                    console.log(erro);
                    alert('Usuário não cadastrado!')
                });
      }

    static login(email, senha) {

        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(user => {
            sessionStorage.setItem('idUsuario', firebase.auth().currentUser.uid);
            sessionStorage.setItem('Email', email);
            
            if(email === 'galocinza@bichao.com'){
                sessionStorage.setItem('TipoUsuario', 'adm');
                window.location.href = "/";

            }    
            else {
                sessionStorage.setItem('TipoUsuario', 'cliente');
                alert("Bem vindo!");
                window.location.href = "/";

            }
        }).catch((error) => {
                alert("Erro ao logar");
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
        });
        
        return true;
    }

    static pegarIdUsuario() {

        let usuario = firebase.auth().currentUser;
    
        if (usuario) {      
            return usuario.uid;
        } else {
            return null;
        }
    
    }

    static cadastrarNovousuario(Nome, Email, CPF, Estado, Cidade, Senha){

        setInterval(() => {
            let id = Banco.pegarIdUsuario();
            firebase.database().ref("Cliente").child(id).set(
                {
                    Nome: Nome, 
                    Email: Email, 
                    CPF: CPF,
                    Estado: Estado, 
                    Cidade: Cidade, 
                    Senha: Senha,
                    Adm: false                
                }).then(() => {
                    alert("Cadastro feito com sucesso!");
                    window.location.href = '/';
                })
                .catch((erro) => console.log(erro)); 
        }, 5000);    

    }

    static cadastrarNovoCarro(Modelo, Ano, Placa, Cor, Valor){
        
        firebase.database().ref("Carro").push(
            {
                Modelo: Modelo,
                Ano: Ano,
                Placa: Placa,
                Cor: Cor,
                Valor: Valor
            }
        ).then(() => {                                    
            alert('Veículo cadastrado com sucesso!');      
        })
        .catch( erro => {
            alert('Problemas no cadastro do veículo');
            console.log(erro);
        })
    }

    static buscarCarros() {

        let lista_carros = [];        
        firebase.database().ref('Carro').on("child_added", (snapshot, prevChildKey) => {
            let carro = snapshot.val();            
            let carroCompleto = {
                Chave: snapshot.key,
                Carro: carro
            };
            lista_carros.push(carroCompleto);            
        });
        return lista_carros;
    }

    static inserirCarroDataDisponivel(id, data, hora="8:00") {
        
        firebase.database().ref("Aluguel").child(id).push({            
            Data: data, 
            Hora: hora,
            Cliente: '',
            Usuario: '',
            QTD_Dias: '',
            Valor_Total: ''
        })
            .then(() => alert('Data inserida com sucesso!'))
            .catch((erro) => {
                alert('Problemas ao cadastrar data!');
                console.log(erro);
            })        
    }

    static excluirCarro(chave) {
        
        firebase.database().ref('Carro/' + chave).remove()       
            .then(() => {
                alert('Carro removido com sucesso!');
                window.location.href = "/";
            })
            .catch(function(error) {
                alert('Não conseguiu remover o carro!');
                console.log("Remove failed: " + error.message)
            });
    }

    static editarCarro(chave, modelo, ano, placa, cor, valor) {

        firebase.database().ref('Carro/' + chave).set({ 
            Modelo: modelo, 
            Ano: ano, 
            Placa: placa,
            Cor: cor, 
            Valor: valor
        }).then(() => alert('Edição feita com sucesso'))
            .catch((error) => {
                alert('Problema para editar');
                console.log(error);
            })
    }

    static buscarDatasDisponiveis() {

        let lista_datas = [];
        firebase.database().ref('Aluguel').on("child_added", (snapshot, prevChildKey) => {
            //console.log('snapshot', snapshot);
            //console.log('val snap', snapshot.val());
            let Data = snapshot.val();            
            let DatasCompletas = {
                ChaveCarro: snapshot.key,
                Data: Data
            };
            lista_datas.push(DatasCompletas);            
        });         
        //console.log('lista de datas', lista_datas);
        return lista_datas;
    }

    static buscarDatasCarro(id){

        let lista_datas = [];
        firebase.database().ref('Aluguel/' + id).on("child_added", (snapshot, prevChildKey) => {
            console.log('datas carro', snapshot.val());
            if(snapshot.val().Cliente === ''){

                let Data = snapshot.val();            
                let DatasCompletas = {
                    ChaveData: snapshot.key,
                    Data: Data
                };
                lista_datas.push(DatasCompletas);                        
            }    
        });
        return lista_datas;
    }  

    static buscarListaReservas(idCarro){

        let lista_datas = [];
        firebase.database().ref('Aluguel/' + idCarro).on("child_added", (snapshot, prevChildKey) => {    
            if(snapshot.val().Cliente !== ''){
                
                let Data = snapshot.val();            
                let ReservaCompleta = {
                    //ChaveCarro: chaveCarro,
                    ChaveData: snapshot.key,
                    Data: Data
                };
                lista_datas.push(ReservaCompleta);                        
            }    
            
        });
                
        return lista_datas;    
    } 
    
    static reservarCarro(idCarro, idData, qtd_dias, valorTotal){

        const id = sessionStorage.getItem('idUsuario');
        const usuario =  sessionStorage.getItem('Email');
        const reserva = firebase.database().ref('Aluguel/' + idCarro + '/' + idData);
        reserva.child('Cliente').set(id)
        reserva.child('Usuario').set(usuario)
        reserva.child('QTD_Dias').set(qtd_dias)
        reserva.child('Valor_Total').set(valorTotal)
        alert('Reserva concluída com sucesso')
        
    }

    static cancelarReservaCarro(idCarro, idData){

        console.log(idCarro);
        console.log(idData);
        let reserva = firebase.database().ref('Aluguel/' + idCarro + '/' + idData);
        reserva.child('Cliente').set('');
        reserva.child('QTD_Dias').set('');
        reserva.child('Usuario').set('');
        reserva.child('Valor_Total').set('')
            .then(() => alert('Reserva cancelada com sucesso'));
        
    }

    static nomeCliente(idCliente){

        let nome;
        let reserva = firebase.database().ref('Cliente/' + idCliente);
        reserva.child('Nome').once('value', (res) => {
            nome = res.val();
        });
        return nome;
    }

    static buscarReservasCliente(){

        const id = sessionStorage.getItem('idUsuario');
        let reservas = [];
        let dadosReserva = {};

        const aluguel = firebase.database().ref("Aluguel/");

        aluguel.on("child_added", (snapshot, prevChildKey) => {
            //console.log(snapshot.val());
            let chaveCarro = snapshot.key; //chave do carro dentro do aluguel
            firebase.database().ref("Aluguel/" + chaveCarro).on("child_added", (snapshot, prevChildKey) =>{
                if(id === snapshot.val().Cliente) {
                    let carro;
                    firebase.database().ref('Carro/' + chaveCarro).once('value', res => {
                        carro = res.val();
                    })

                    dadosReserva = {
                        ChaveCarro: chaveCarro,
                        ChaveData: snapshot.key,
                        Carro: carro,
                        Reserva: snapshot.val()
                    }

                    reservas.push(dadosReserva);
                }
            })
        })
        return reservas;        
    }

}