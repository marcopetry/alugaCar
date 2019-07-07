import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAbRFf4Rv5pWGiKAMqpvT0LcrqhUBAY0qs",
    authDomain: "cchweb2.firebaseapp.com",
    databaseURL: "https://cchweb2.firebaseio.com",
    projectId: "cchweb2",
    storageBucket: "cchweb2.appspot.com",
    messagingSenderId: "101395439423",
    appId: "1:101395439423:web:28c755a6f7386928"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)

export default firebase;

export class Banco {
  
  
  static login(email, senha) {
  
    firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(user => {
                alert("Bem vindo!");
            })
            .catch((error) => {
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


}