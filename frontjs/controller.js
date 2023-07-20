
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


export function saveNewProfileInfo(){
    
}




export function getProfile(userName){

}


export function getPosts(userName){

}


// export function 


