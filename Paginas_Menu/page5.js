// Seleciona o modal e seus elementos
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");

// Adiciona evento de clique em todas as imagens
document.querySelectorAll("img").forEach(img => {
    img.addEventListener("click", () => {
        modal.style.display = "block";
        modalImg.src = img.src; // Define a imagem no modal
        captionText.innerHTML = img.alt || ""; // Define o texto no caption
    });
});

// Fecha o modal ao clicar no botão de fechar
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Fecha o modal ao clicar fora da imagem
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
