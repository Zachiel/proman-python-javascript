export const showMessage = (message, type = undefined, timeout = 3000) => {
    const MESSAGE_BOX_ANIMATION_DURATION = 250;
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
    setTimeout(() => {
        messageBox.classList.add('message-box--shown');
    }, 10);
    setTimeout(() => {
        messageBox.classList.remove('message-box--shown');
        setTimeout(() => messageBox.parentNode.removeChild(messageBox), MESSAGE_BOX_ANIMATION_DURATION+50);
    }, timeout);
};
