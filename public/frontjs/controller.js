
import * as model from './model.js';



export function openRedactprofile(){
    
    let a = document.querySelector('.modeleWProfile');
    a.classList.add('active');
}

export function openPostW(){
    let wind = document.querySelector('.modelWPost');
    wind.classList.add('active');
}


export function closeProfileRedactor(){ 
   
    let a = document.querySelector('.modeleWProfile');
    a.classList.remove('active');
}

export function closePostWin(event){
    event.preventDefault();
    let a = document.querySelector('.modelWPost');
    a.classList.remove('active');
}


export async function saveNewProfileInfo(ev){ 
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const avatar = formData.get('avatar');
        const firstName = formData.get('firstname');
        const lastName = formData.get('lastname');
        const state = formData.get('state');
        const birthDate = formData.get('birthdate');
        const address = formData.get('address');

        console.log(JSON.stringify({ firstName, lastName, avatar, state, birthDate, address }))

        await model.fetchProfilePost(firstName,lastName,avatar,state,birthDate,address);

        //save for user


        let nameDiv =document.querySelector('.name');
        let nameP = document.createElement('p');
        nameP.textContent = firstName;
        nameDiv.append(nameP);
    
        let lastnameDiv =document.querySelector('.lastName');
        let lastnameP = document.createElement('p');
        lastnameP.textContent = lastName;
        lastnameDiv.append(lastnameP);
    
        let statusDiv =document.querySelector('.status');
        let statusP = document.createElement('p');
        statusP.textContent = state;
        statusDiv.append(statusP);
    
        let dateOfBrDiv =document.querySelector('.DoB');
        let dateP = document.createElement('p');
        dateP.textContent = birthDate;
        dateOfBrDiv.append(dateP);
    
        let PlaceOfLvDiv =document.querySelector('.PoL');
        let placeP = document.createElement('p');
        placeP.textContent = address;
        PlaceOfLvDiv.append(placeP);


///

        closeProfileRedactor();
    }


export async function addNewPost(ev){
    ev.preventDefault();

    let formData =new FormData(ev.target);
    let description = formData.get('text');
    let avatar = formData.get('img');

    await model.fetchPostsPost(description,avatar);


}



export async function getProfile(){

}


export async function getPosts(){
    

}


// export function 


