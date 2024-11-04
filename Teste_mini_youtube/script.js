document.addEventListener("DOMContentLoaded", function() {
    const videoList = document.getElementById("videoList");
    // const videoTitle = document.getElementById("videoTitle");

    // Dados sobre os conteúdos e professores
    const lectureDetails = {
        T1: {
            titulo: "Chat GPT & AI",
            professor: "Tapan Praydot",
            conteudo: "Hands-on teaching on how to use Chat GPT API and AI to solve challenges. \nBelow is all of the tools and resources that Tapan discussed and/or used during tonight's session: \n\n   <b>Free Course(1 hr):</b> <a href='https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/'>https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/</a> \n<b>OpenAI documentation:</b> <a href='https://platform.openai.com/docs/overview'>https://platform.openai.com/docs/overview</a>  \n<b>Community Forum:</b> <a href='https://community.openai.com/categories'>https://community.openai.com/categories</a>  \n<b>Github with lots of examples and sample code:</b> <a href='https://github.com/openai/openai-cookbook'>https://github.com/openai/openai-cookbook</a> ",
        },
        T2: {
            titulo: "Power BI | Intro for Dataset Project",
            professor: "Prof. B",
            conteudo: "Introdução ao Power BI para análise de dados.",
        },
        T3: {
            titulo: "Power BI | Students Teaching",
            professor: "Prof. C",
            conteudo: "Estudantes apresentando casos de uso do Power BI.",
        },
        T4: {
            titulo: "Advanced Python",
            professor: "Patrick Pessoa",
            conteudo: "Hands-on teaching on Python. This is the second lecture - Advanced Module. \n Here are the resources and websites Patrick used during the session: \n\n <a href='https://www.teletrust.de/en/teletrust/mitglieder/'>Ekinops Channel Partners</a> \n <a href='https://www.teletrust.de/en/teletrust/mitglieder/'>Teletrust Members</a> \n<a href='https://dell.my.site.com/FindAPartner/s/partnersearch?language=en_US&country=us&partnerType=findareseller'>Dell Partner Search</a> \n The XPath extension Patrick mentioned can be downloaded here:<a href='https://chromewebstore.google.com/detail/xpath-helper/hgimnogjllphhhkhlmebbmlgjoejdpjl?hl=en&pli=1'>XPath Helper for Chrome</a>",
        },
        T5: {
            titulo: "Website Prototyping",
            professor: "Prof. E",
            conteudo: "Práticas de prototipagem para sites.",
        }
    };

    // Função para mudar o título do vídeo e destacar o item da lista
    function updateVideoTitleAndHighlight(videoName, selectedElement) {
        // videoTitle.textContent = videoName;

        // Remove o destaque anterior
        const highlighted = document.querySelector(".highlight");
        if (highlighted) {
            highlighted.classList.remove("highlight");
        }

        // Adiciona o destaque ao item selecionado
        selectedElement.classList.add("highlight");
    }

    // Função para atualizar os detalhes da aula, incluindo quebras de linha no resumo
function updateLectureDetails(lectureId) {
    const details = lectureDetails[lectureId];
    if (details) {
        document.getElementById("lectureTitle").textContent = details.titulo;
        document.getElementById("professorName").textContent = `Professor: ${details.professor}`;
        document.getElementById("lectureContent").textContent = details.conteudo;

        // Substitui "\n" por "<br>" para quebras de linha no HTML
        document.getElementById("lectureContent").innerHTML = details.conteudo.replace(/\n/g, "<br>");
    }
}


    videoList.addEventListener("click", function(e) {
        if(e.target && e.target.nodeName === "LI") {
            const videoSource = e.target.getAttribute("data-video");
            const videoName = e.target.textContent;
            const lectureId = e.target.getAttribute("data-lecture");

            // Atualiza o vídeo e o título
            const mainVideo = document.querySelector(".video-player iframe");
            mainVideo.src = videoSource;
            updateVideoTitleAndHighlight(videoName, e.target);

            // Atualiza os detalhes da aula
            updateLectureDetails(lectureId);
        }
    });
    
    // Define o título e o destaque iniciais para o vídeo padrão 
    const firstVideo = videoList.querySelector("li");
    if (firstVideo) {
        const firstVideoName = firstVideo.textContent;
        const firstVideoSource = firstVideo.getAttribute("data-video");
        const lectureId = firstVideo.getAttribute("data-lecture");

        // Atualiza o vídeo inicial e o título
        const mainVideo = document.querySelector(".video-player iframe"); 
        mainVideo.src = firstVideoSource;
        updateVideoTitleAndHighlight(firstVideoName, firstVideo);

        // Atualiza os detalhes da aula para o primeiro vídeo
        updateLectureDetails(lectureId);
    }
});
