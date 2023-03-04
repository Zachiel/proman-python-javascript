export const showMessage = (message, type = undefined, timeout = 3000) => {
    const body = document.querySelector('body');
    const messageBox = document.createElement('div');
    messageBox.classList.add('message-box');
    if (type) {
        messageBox.classList.add(`message-box--${type}`);
    }
    const paragraph = document.createElement('p');
    paragraph.textContent = message;
    paragraph.style.width = '175px';
    paragraph.style.height = 'fit-content';
    messageBox.prepend(paragraph);
    body.prepend(messageBox);
    setTimeout(()=>{},200)
    messageBox.classList.add('message-box--shown');
    setTimeout(() => {
        messageBox.classList.remove('message-box--shown');
    }, timeout);
};
