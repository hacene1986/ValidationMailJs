//Ciblage du DOM 

const email = document.getElementById('email');
const passwod = document.getElementById('password');
const btnValide = document.getElementById('valid');
const message = document.getElementById('message');

//paramétres
const config = {
    password: {
        minLength: 6
    }
};
    
const errorList= [
        {id: 1, message: 'email incorect'},
        {id: 2, message: 'Format password doit comporter au moins '+ config.password.minLength + '  caractéres'},
        {id: 3, message: 'Password doit contenir au moins 2 chiffres'},
    ];


let errors = [];//tableau des erreurs rencontrées


//function

function addEvents(){
    btnValide.addEventListener('click', e => {

        let index = null;

        //email
        index = search(1);//recherche de la valeur 1
        if(email.value.indexOf('@') == -1){// situation erreur
             //si la valeur 1 pas trouvéz dans le tableau errors
            //on ajoute grace a push
            if(index == -1) errors.push(1);//si search renvoie false
                
         } else{ //situation pas d'erreur
                 //retirer du tableau l'identifiant d'erreur recherché  
                  //si la valeur existe dans le tableau on la retire 
                 //grace a splice        
                 if(index != -1) errors.splice(index,1); //la valeur recherchée a été trouvé
                    //on  retire l'élément  
               }

        //password longueur minimale
         index = search(2);
        if(password.value.length < config.password.minLength){
            if(index == -1) errors.push(2);  
        }else{
            if(index != -1) errors.splice(index,1);
        }

        //password au moins deux chiffres
        index = search(3);
        if(countNumeriqueValues(password.value) < 2){//erreur
            if(index == -1) errors.push(3); 
        }else{//pas d'erreur
        if(index != -1) errors.splice(index,1);
        }
        displayErrors();
    })
}

function countNumeriqueValues(str){
    //renvoie le nombre de valeur numérique
    //rencontrés dans une chaine
    let nbNumericValues = 0;
    //on parcour la totalité de la chaine fournie en entrée
    for(let i =0; i<str.length; i++){
        //si le caractére est compris entre 0 et 9
        if(str[i] >= 0 && str[i] <= 9){
            nbNumericValues++;
        }
    }
    return nbNumericValues;
}

function search(id){
    let index = -1;//par defaut indice vaut -1
    for(let i = 0; i<errors.length; i++){
        if(id == errors[i]){
            index = i;
            break;//sortie de boucle (élément recherché trouvé)
        }
    }
    return index;//on renvoie l'indice de l'élément trouvé
    //-1 si l'élément n'a pas été trouvé
}

function displayErrors(){
    let html ='';
  errors.forEach(errorId => {
      html += '<li>'+getErrorMessage(errorId)+'</li>';
  })
  message.innerHTML = html;
}

function getErrorMessage(id){
    //renvoie le message associ
    let message = null;
    
        for(let i = 0; i<errorList.length; i++){
            if(id == errorList[i].id){
                message = errorList[i].message;
                break;
            }
        }
        return message;

}

function init(){
  addEvents();  
}

init();