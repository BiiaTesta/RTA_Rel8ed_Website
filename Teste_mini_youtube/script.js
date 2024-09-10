document.addEventListener("DOMContentLoaded", function() {
    const videoList = document.getElementById("videoList");
    const videoTitle = document.getElementById("videoTitle");
    
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
    
    videoList.addEventListener("click", function(e) {
        if(e.target && e.target.nodeName === "LI") {
            const videoSource = e.target.getAttribute("data-video");
            const videoName = e.target.textContent;

            // Agora acessamos o iframe dentro de mainVideo
            const mainVideo = document.querySelector(".video-player iframe"); 
            mainVideo.src = videoSource; 
            
            updateVideoTitleAndHighlight(videoName, e.target); 
        }
    });
    
    // Define o título e o destaque iniciais para o vídeo padrão 
    const firstVideo = videoList.querySelector("li");
    if (firstVideo) {
        const firstVideoName = firstVideo.textContent;
        const firstVideoSource = firstVideo.getAttribute("data-video");

        // Movemos esta linha para dentro do evento de clique
        const mainVideo = document.querySelector(".video-player iframe"); 
        mainVideo.src = firstVideoSource;
        
        updateVideoTitleAndHighlight(firstVideoName, firstVideo);
    }
});
