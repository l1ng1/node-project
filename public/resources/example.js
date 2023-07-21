/* <form id="myForm">
    <label for="username">Имя пользователя:</label>
    <input type="text" id="username" name="username" required>
    
    <label for="password">Пароль:</label>
    <input type="password" id="password" name="password" required>

    <button type="submit">Отправить</button>
</form> */

const redactProfileBtn = document.getElementById('redactProfile');

redactProfileBtn.addEventListener('click', () =>{
    
    let a = document.querySelector('.modeleWProfile');
    a.classList.add('active');
})

document.getElementById('my-profile').addEventListener('submit', async (event) =>  {
    event.preventDefault();
    const formData = new FormData(event.target);
    const avatar = formData.get('avatar');
    const firstName = formData.get('firstname');
    const lastName = formData.get('lastname');
    const state = formData.get('state');
    const birthDate = formData.get('birthdate');
    const address = formData.get('address');

    console.log(JSON.stringify({ firstName, lastName, avatar, state, birthDate, address }))
    // console.log(formData)

    try {
        const response = await fetch('/updateProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName, avatar, state, birthDate, address })
        });
    
        if (response.ok) {
            console.log('Data updated successfully.');
        } else {
            console.error('Failed to update data.');
        }
    } catch (error) {
        console.error('Error during data update:', error);
    }
});

