document.addEventListener("DOMContentLoaded", function() {
    const teacherList = document.getElementById("teacherList");
    const teacherName = document.getElementById("teacherName");
    const teacherPhoto = document.getElementById("teacherPhoto");
    const teacherSummary = document.getElementById("teacherSummary");

    // Dados dos professores
    const teacherDetails = {
        T1: {
            nome: "Prof. A",
            foto: "link_da_foto_professor_a.jpg",
            resumo: "Especialista em IA e aprendizado de máquina."
        },
        T2: {
            nome: "Prof. B",
            foto: "link_da_foto_professor_b.jpg",
            resumo: "Analista de dados com experiência em BI."
        },
        T3: {
            nome: "Prof. C",
            foto: "link_da_foto_professor_c.jpg",
            resumo: "Professor com foco em BI para educação."
        },
        T4: {
            nome: "Prof. D",
            foto: "link_da_foto_professor_d.jpg",
            resumo: "Engenheiro de software e especialista em Python."
        },
        T5: {
            nome: "Prof. E",
            foto: "link_da_foto_professor_e.jpg",
            resumo: "Designer de UI/UX com experiência em prototipagem."
        }
    };

    // Função para atualizar os detalhes do professor
    function updateTeacherDetails(teacherId) {
        const details = teacherDetails[teacherId];
        teacherName.textContent = details.nome;
        teacherPhoto.src = details.foto;
        teacherSummary.textContent = details.resumo;
    }

    teacherList.addEventListener("click", function(e) {
        if (e.target && e.target.nodeName === "LI") {
            const teacherId = e.target.getAttribute("data-teacher");

            // Destaca o item selecionado
            const highlighted = document.querySelector(".highlight");
            if (highlighted) {
                highlighted.classList.remove("highlight");
            }
            e.target.classList.add("highlight");

            // Atualiza os detalhes do professor
            updateTeacherDetails(teacherId);
        }
    });
});
