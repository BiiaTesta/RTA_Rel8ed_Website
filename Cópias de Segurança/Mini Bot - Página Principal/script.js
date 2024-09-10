
function navigateTo(url) {
    window.location.href = url;
}

/* Funcoes para o Mini Bot */

function getAnswer() {
    const selectElement = document.getElementById('questions');
    const chatBox = document.getElementById('chat-box');
    const selectedValue = selectElement.value;

    if (selectedValue === "") {
        return;
    }

    let userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerText = selectElement.options[selectElement.selectedIndex].text;
    chatBox.appendChild(userMessage);

    let botMessage = document.createElement('div');
    botMessage.className = 'message bot-message';
    chatBox.appendChild(botMessage);

    let response = '';

    switch (selectedValue) {
        case '1':
            response = 'Resposta para a Pergunta 1.';
            break;
        case '2':
            response = 'Resposta para a Pergunta 2.';
            break;
        case '3':
            response = 'Resposta para a Pergunta 3.';
            break;
        default:
            response = 'Por favor, selecione uma pergunta.';
    }

    typeText(botMessage, response);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function typeText(element, text) {
    let index = 0;
    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index) === " " ? "&nbsp;" : text.charAt(index);
            index++;
            setTimeout(type, 50); // Ajuste a velocidade de digitação aqui
        }
    }
    type();
}

function toggleChat() {
    const chatWidget = document.getElementById('chat-widget');
    const display = chatWidget.style.display;
    chatWidget.style.display = display === 'none' || display === '' ? 'flex' : 'none';
}
