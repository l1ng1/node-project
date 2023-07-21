
export async function fetchPostsGet(){


}


export async function fetchPostsPost(){


}


export async function fetchProfileGet(){

const response = await fetch('/getUserProfile');
     return response;
}


export async function fetchProfilePost(firstName,lastname,avatar,status,BoD,PoL){
    try {
        const response = await fetch('/updateProfile', {
        method: 'POST',
        body:JSON.stringify({
            firstName,
            lastname,
            avatar,
            DoB,
            PoL,
        }),
        headers: {
        'Content-Type': 'application/json'
        },
        })
}
catch(error) {
    console.log('Ошибка!!',error);
}
}





