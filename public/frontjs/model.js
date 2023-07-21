
export async function fetchPostsGet(){


}


export async function fetchPostsPost(description, avatar){

        const response = await fetch('/addUserPost', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({description, avatar})
        });

}


export async function fetchProfileGet(){


}


export async function fetchProfilePost(firstName,lastName,avatar,state,birthDate,address){
    try {
        const response = await fetch('/updateProfile', {
        method: 'POST',
        body:JSON.stringify({
            firstName,
            lastName,
            avatar,
            state,
            birthDate,
            address,
        }),
        headers: {
        'Content-Type': 'application/json'
        },
        })
        console.log('ВСЕ СОХРАНЕНО');
}
catch(error) {
    console.log('Ошибка!!',error);
}
}





