const name = document.querySelector('.name');
const image = document.querySelector('.url');
const button = document.querySelector('.button');

button.addEventListener('click', async () => {
    const nameText = name.value;
    const imageText = image.value;
    name.value = '';
    image.value = '';

    console.log(nameText, imageText);
});