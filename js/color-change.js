//title color change every 1 second

document.addEventListener('DOMContentLoaded', () => {
    const colors = ['#FAD02E',
    '#F28D35',
    '#F26A9D',
    '#B9EBCF',
    '#A2C2E5',
    '#D5A6A8'];
    let index = 0;
    const element = document.getElementById('dynamicTitle');

    setInterval(() => {
        element.style.color = colors[index];
        index = (index + 1) % colors.length;
    }, 1000); 
});
