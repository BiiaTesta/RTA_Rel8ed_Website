const backendUrl = "http://localhost:3000"; // URL do backend (ajuste conforme necessário)

document.addEventListener("DOMContentLoaded", () => {
    const password = "12345"; // Defina a senha

    // Carregar dados do Excel
    async function loadExcelData() {
        try {
            const response = await fetch(`${backendUrl}/load-excel`);
            if (response.ok) {
                const data = await response.json();
                populateTable('.table-lecture2', data.schedule);
                populateTable('.table-lecture', data.lecture);
            } else {
                alert('Erro ao carregar os dados do Excel');
            }
        } catch (error) {
            console.error('Erro ao carregar os dados:', error);
        }
    }

    // Popular tabelas com dados do Excel
    function populateTable(selector, data) {
        const table = document.querySelector(selector);
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = ""; // Limpar dados existentes

        data.forEach(row => {
            const tr = document.createElement('tr');
            for (const cell in row) {
                const td = document.createElement('td');
                td.textContent = row[cell];
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        });
    }

    // Atualizar dados no Excel
    async function updateExcelData() {
        const userPassword = prompt("Digite a senha para salvar as alterações:");
        if (userPassword === password) {
            try {
                const scheduleTable = extractTableData('.table-lecture2');
                const lectureTable = extractTableData('.table-lecture');

                const response = await fetch(`${backendUrl}/save-excel`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ schedule: scheduleTable, lecture: lectureTable }),
                });

                if (response.ok) {
                    alert('Excel atualizado com sucesso!');
                } else {
                    alert('Erro ao atualizar o Excel');
                }
            } catch (error) {
                console.error('Erro ao salvar os dados:', error);
            }
        } else {
            alert('Senha incorreta!');
        }
    }

    // Extrair dados das tabelas HTML
    function extractTableData(selector) {
        const table = document.querySelector(selector);
        const rows = table.querySelectorAll('tbody tr');
        const data = [];

        rows.forEach(row => {
            const rowData = {};
            const cells = row.querySelectorAll('td');
            cells.forEach((cell, index) => {
                rowData[`Col${index + 1}`] = cell.textContent.trim();
            });
            data.push(rowData);
        });

        return data;
    }

    // Eventos
    loadExcelData(); // Carregar os dados ao carregar a página
    window.updateExcelData = updateExcelData; // Expor a função para um botão ou outro evento
});
