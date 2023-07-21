
import * as model from './model.js';



export function openRedactprofile(){
    
    let a = document.querySelector('.modeleWProfile');
    a.classList.add('active');
}

export function openPostW(){
    let wind = document.querySelector('.modelWPost');
    wind.classList.add('active');
}


export function closeProfileRedactor(event){ 
    event.preventDefault();
    let a = document.querySelector('.modeleWProfile');
    a.classList.remove('active');
}

export function closePostWin(event){
    event.preventDefault();
    let a = document.querySelector('.modelWPost');
    a.classList.remove('active');
}


export async function saveNewProfileInfo(ev){
        const fromData = new FormData(ev.target);
        let firstname = formData.get('firstname');
        let lastname = formData.get('lastname');
        let status = formData.get('state');
        let BoD = formData.get('birthdate');
        let PoL = formData.get('address');
        let avatar = formData.get('avatar');

        await model.fetchProfilePost(firstname,lastname,avatar,status,BoD,PoL);


    }




export async function getProfile(){

}


export async function getPosts(){
    

}


// export function 


