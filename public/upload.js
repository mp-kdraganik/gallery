const name = document.querySelector('.name');
const image = document.querySelector('.url');
const button = document.querySelector('.button');

button.addEventListener('click', async () => {
    const nameText = name.value;
    const imageUrl = image.value;
    name.value = '';
    image.value = '';

    console.log(nameText, imageUrl);

    const response = await fetch('/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: nameText, url: imageUrl})
    });
});