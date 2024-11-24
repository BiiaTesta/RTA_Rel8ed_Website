document.addEventListener("DOMContentLoaded", function() {
    const videoList = document.getElementById("videoList");
    // const videoTitle = document.getElementById("videoTitle");

    // Dados sobre os conteúdos e professores
    const lectureDetails = {
        T1: {
            titulo: "Chat GPT & AI",
            professor: "Tapan Praydot",
            conteudo: "Hands-on teaching on how to use Chat GPT API and AI to solve challenges. \nBelow is all of the tools and resources that Tapan discussed and/or used during tonight's session: \n\n   Free Course(1 hr): <a href='https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/'>https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/</a> \nOpenAI documentation: <a href='https://platform.openai.com/docs/overview'>https://platform.openai.com/docs/overview</a>  \nCommunity Forum: <a href='https://community.openai.com/categories'>https://community.openai.com/categories</a>  \nGithub with lots of examples and sample code: <a href='https://github.com/openai/openai-cookbook'>https://github.com/openai/openai-cookbook</a> ",
        },
        T2: {
            titulo: "Power BI | Intro for Dataset Project",
            professor: "Trei Alexander",
            conteudo: "PowerBI introduction for data analysis project, and kaggle instruction for database use. \n\n Kaggle Website: <a href='https://www.kaggle.com/'>https://www.kaggle.com/</a>",
        },
        T3: {
            titulo: "Power BI | Students Teaching",
            professor: "RTA Students",
            conteudo: "Students presenting PowerBI Project.",
        },
        T4: {
            titulo: "Advanced Python",
            professor: "Patrick Pessoa",
            conteudo: "Hands-on teaching on Python. This is the second lecture - Advanced Module. \n Here are the resources and websites Patrick used during the session: \n\n <a href='https://www.teletrust.de/en/teletrust/mitglieder/'>Ekinops Channel Partners</a> \n <a href='https://www.teletrust.de/en/teletrust/mitglieder/'>Teletrust Members</a> \n<a href='https://dell.my.site.com/FindAPartner/s/partnersearch?language=en_US&country=us&partnerType=findareseller'>Dell Partner Search</a> \n The XPath extension Patrick mentioned can be downloaded here:<a href='https://chromewebstore.google.com/detail/xpath-helper/hgimnogjllphhhkhlmebbmlgjoejdpjl?hl=en&pli=1'>XPath Helper for Chrome</a>",
        },
        T5: {
            titulo: "Website Prototyping | Figma",
            professor: "Beatriz B. Testa Pessoa",
            conteudo: "Hands-on teaching on website prototyping with Figma Software. \n\nA prototype is a preliminary model or draft that allows designers to test and refine ideas before actual development. We prototype to: Validate Early Concepts, Facilitate Communication, Test Functionalities, Refine Features and Flows and Gather Feedback. \n\n Here are the resources and websites Beatriz used during the session: Figma Website: <a href='https://www.figma.com/'>Figma</a> \n Beatriz's Hackathon Prototype: <a href='https://www.figma.com/proto/fVfnQnCU7QA5pb7wikuvuX/Rel8ed-RTA-Website?node-id=1-2&node-type=canvas&t=Gdm6gz3HOWJmrEzM-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2'>View Prototype</a>",
        },
        T6: {
            titulo: "Website Prototyping | HTML and CSS",
            professor: "Beatriz B. Testa Pessoa",
            conteudo: "Hands-on teaching on website prototyping with basic HTML and CSS. \n Here are the resources from this class: \n\n To collab and store your code: <a href='https://github.com/'>Github</a> \n To help you code: <a href='https://chatgpt.com/'>ChatGPT</a> or <a href='https://gemini.google.com/'>Google Gemini</a> \n Here are the links to download the tools used: <a href='https://code.visualstudio.com/download'>Visual Studio Code</a> ; <a href='https://github.com/apps/desktop?ref_cta=download+desktop&ref_loc=installing+github+desktop&ref_page=docs'>GitHub Desktop</a> ; <a href='https://git-scm.com/downloads'>Git Bash</a>",
        },
        T7: {
            titulo: "Tableau",
            professor: "Guarav Sindhwani",
            conteudo: "Tableau explenation and hands-on for data analysis project. \n  Below are some resources that Guarav used during the lecture: \n\n Tableau for University Students: \nFollow instructions on this page to get access: <a href='https://www.tableau.com/academic/students'>Tableau for University Students</a> \n Once signed up, use this link for Tableau's e-learning platform: <a href='https://elearning.tableau.com/'>Tableau e-learning</a> \n\n Free Tableau Desktop Public Version: \n Download Tableau Public here: <a href='https://public.tableau.com/en-us/s/download'>Tableau Public</a>\n\n YouTube Learning Channels: \n<a href='https://www.youtube.com/@vizwiz'>Viz Wiz YouTube Channel</a> <a href='https://www.youtube.com/@sqlbelle'>SQL Belle YouTube Channel</a>",
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
