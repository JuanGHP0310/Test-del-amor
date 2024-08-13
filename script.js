const questions = [
    {
        question: "Uno de estos años fue cuando Juan y tú se hicieron novios... ¿cuál es?",
        options: ["2021", "2022", "2023", "Salchichón"],
        correct: 2
    },
    {
        question: "En situaciones, Juan evita coger frío, bebe cosas del tiempo, bebe tés calentitos... ¿Qué le sucede?",
        options: ["Siempre ha sido así", "Está raro", "Pues ni idea...", "Se está convirtiendo en mí"],
        correct: 3
    },
    {
        question: "Verás varias opciones de símbolos... ¿cuál representa tu amor con Juan?",
        options: ["Omega", "Ancla", "Pedito oloroso", "Infinito"],
        correct: 3
    },
    {
        question: "Oh... vas muy bien. Esta será más difícil... ¿Cuál de estos animalitos representa algo entrañable entre Juan y tú?",
        options: ["Vaca", "Avestruz", "Tortuga", "Un pomeranian, un mapache y... una... hormiguita"],
        correct: 3
    },
    {
        question: "La siguiente frase le da bastante risa a Juan cuando Jenni la usa...",
        options: ["Tenemos que hablar", "Hoy mejor no nos vemos", "Eso está... mal engendrado", "Hoy comemos pescado salado con extra de sal"],
        correct: 2
    },
    {
        question: "Intenta responder correctamente esta pregunta súper difícil para finalizar... ¿Quién es el amor de tu vida?",
        options: ["Carlos Torres", "Mario Casas", "Jin", "Juan Guillermo Hernández Pérez"],
        correct: 3
    }
];

let currentQuestion = 0;
let correctSound = new Audio('correct.mp3');  // Archivo de sonido para respuesta correcta
let wrongSound = new Audio('wrong.mp3');      // Archivo de sonido para respuesta incorrecta

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const messageElement = document.getElementById('message');
    const progressBar = document.getElementById('progress-bar');
    
    questionElement.textContent = questions[currentQuestion].question;
    optionsElement.innerHTML = '';
    messageElement.textContent = '';
    
    questions[currentQuestion].options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        optionsElement.appendChild(button);
    });

    progressBar.style.width = `${(currentQuestion / questions.length) * 100}%`;
}

function checkAnswer(selected) {
    const messageElement = document.getElementById('message');
    const optionsElement = document.getElementById('options');
    if (selected === questions[currentQuestion].correct) {
        correctSound.play();
        messageElement.textContent = '¡Correcto!';
        currentQuestion++;
        if (currentQuestion < questions.length) {
            setTimeout(loadQuestion, 2700);
        } else {
            messageElement.textContent = '¡Felicidades! Has respondido correctamente todas las preguntas. Para saber la clave, debes leer nuevamente las preguntas y detectar las letras mayúsculas al inicio de cada una. Pista final: ordénalo al revés.';
        }
    } else {
        wrongSound.play();
        messageElement.textContent = '¿En seeerio? Que despropósito... Inténtalo de nuevo...';
        questions[currentQuestion].options.forEach((option, index) => {
            const button = optionsElement.children[index];
            if (index === questions[currentQuestion].correct) {
                button.style.backgroundColor = 'green';
            } else if (index === selected) {
                button.style.backgroundColor = 'red';
            }
            button.disabled = true;
        });
        setTimeout(loadQuestion, 2700);
    }
}

window.onload = loadQuestion;
