document.addEventListener("DOMContentLoaded", function() {
    const videoList = document.getElementById("videoList");
    const videoTitle = document.getElementById("videoTitle");

    // Dados sobre os conteúdos e professores
    const lectureDetails = {
        T1: {
            titulo: "Chat GPT & AI",
            professor: "Prof. A",
            foto: "link_da_foto_professor_a.jpg",
            conteudo: "Conteúdo da aula sobre Chat GPT e inteligência artificial.",
            resumo: "Especialista em IA e aprendizado de máquina."
        },
        T2: {
            titulo: "Power BI | Intro for Dataset Project",
            professor: "Prof. B",
            foto: "link_da_foto_professor_b.jpg",
            conteudo: "Introdução ao Power BI para análise de dados.",
            resumo: "Analista de dados com experiência em BI."
        },
        T3: {
            titulo: "Power BI | Students Teaching",
            professor: "Prof. C",
            foto: "link_da_foto_professor_c.jpg",
            conteudo: "Estudantes apresentando casos de uso do Power BI.",
            resumo: "Professor com foco em BI para educação."
        },
        T4: {
            titulo: "Advanced Python",
            professor: "Prof. D",
            foto: "link_da_foto_professor_d.jpg",
            conteudo: "Aula avançada sobre Python para projetos complexos.",
            resumo: "Engenheiro de software e especialista em Python."
        },
        T5: {
            titulo: "Website Prototyping",
            professor: "Prof. E",
            foto: "link_da_foto_professor_e.jpg",
            conteudo: "Práticas de prototipagem para sites.",
            resumo: "Designer de UI/UX com experiência em prototipagem."
        }
    };

    // Função para mudar o título do vídeo e destacar o item da lista
    function updateVideoTitleAndHighlight(videoName, selectedElement) {
        videoTitle.textContent = videoName;

        // Remove o destaque anterior
        const highlighted = document.querySelector(".highlight");
        if (highlighted) {
            highlighted.classList.remove("highlight");
        }

        // Adiciona o destaque ao item selecionado
        selectedElement.classList.add("highlight");
    }

    // Função para atualizar os detalhes da aula
    function updateLectureDetails(lectureId) {
        const details = lectureDetails[lectureId];
        if (details) {
            document.getElementById("lectureTitle").textContent = details.titulo;
            document.getElementById("professorName").textContent = `Professor: ${details.professor}`;
            document.getElementById("lectureContent").textContent = details.conteudo;
            document.getElementById("professorPhoto").src = details.foto;
            document.getElementById("professorNameInfo").textContent = details.professor;
            document.getElementById("professorSummary").textContent = details.resumo;
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
