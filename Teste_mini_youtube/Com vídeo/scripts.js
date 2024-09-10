// document.addEventListener("DOMContentLoaded", function() {
//     const videoList = document.getElementById("videoList");
//     const mainVideo = document.getElementById("mainVideo");

//     videoList.addEventListener("click", function(e) {
//         if(e.target && e.target.nodeName === "LI") {
//             const videoSource = e.target.getAttribute("data-video");
//             mainVideo.src = videoSource;
//             mainVideo.play();
//         }
//     });
// });

document.addEventListener("DOMContentLoaded", function() {
    const videoList = document.getElementById("videoList");
    const mainVideo = document.getElementById("mainVideo");
    const videoTitle = document.getElementById("videoTitle");
    
    // Função para mudar o título do vídeo e destacar o item da lista
    function updateVideoTitleAndHighlight(videoName, selectedElement) {
        videoTitle.textContent = videoName; // Atualiza o título
        
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
            
            mainVideo.src = videoSource;
            mainVideo.play();
            
            updateVideoTitleAndHighlight(videoName, e.target); // Atualiza o título e destaca o item
        }
    });
    
    // Define o título e o destaque iniciais para o vídeo padrão (Aula 1)
    const firstVideo = videoList.querySelector("li[data-video='video1.mp4']");
    if (firstVideo) {
        const firstVideoName = firstVideo.textContent;
        updateVideoTitleAndHighlight(firstVideoName, firstVideo);
    }
});
