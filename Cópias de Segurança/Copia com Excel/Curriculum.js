// Função para baixar os dados da página em um arquivo Excel
function downloadExcel() {
    // Cria uma nova pasta de trabalho Excel
    const wb = XLSX.utils.book_new();

    // Obtém a tabela da página e a converte em uma planilha Excel
    const table1 = document.querySelector('.container table');
    const ws1 = XLSX.utils.table_to_sheet(table1, { header: 1 });

    // Faz com que a coluna "Time" seja formatada como string
    const range = XLSX.utils.decode_range(ws1['!ref']);
    for (let row = range.s.r + 1; row <= range.e.r; row++) { // Ignora o cabeçalho
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: 0 }); // Índice da coluna "Time"
        if (ws1[cellAddress]) {
            ws1[cellAddress].t = 's'; // Define o tipo de célula como string
        }
    }

    // Adiciona a primeira planilha à pasta de trabalho
    XLSX.utils.book_append_sheet(wb, ws1, "RTA Schedule");

    // Obtém a segunda tabela da página e a converte em uma planilha Excel
    const table2 = document.querySelector('.container-lecture .table-lecture');
    const ws2 = XLSX.utils.table_to_sheet(table2);

    // Adiciona a segunda planilha à pasta de trabalho
    XLSX.utils.book_append_sheet(wb, ws2, "Lecture Schedule");

    // Salva a pasta de trabalho em um arquivo Excel
    XLSX.writeFile(wb, "RTA_Schedule.xlsx");
}

// Função para fazer o upload do arquivo Excel e atualizar as tabelas HTML
function uploadExcel() {
    const password = document.getElementById('password').value;
    if (password !== '1234') { // Senha pré-definida
        alert('Senha incorreta.');
        return;
    }

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) {
        alert('Por favor, selecione um arquivo.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Atualiza a tabela RTA Schedule
        const ws1 = workbook.Sheets["RTA Schedule"];
        const table1 = document.querySelector('.container table');
        const json1 = XLSX.utils.sheet_to_json(ws1, { header: 1 });
        updateTableFromJson(table1, json1);

        // Atualiza a tabela Lecture Schedule
        const ws2 = workbook.Sheets["Lecture Schedule"];
        const table2 = document.querySelector('.container-lecture .table-lecture');
        const json2 = XLSX.utils.sheet_to_json(ws2, { header: 1 });
        updateTableFromJson(table2, json2);

        alert('Arquivo carregado com sucesso.');
    };
    reader.readAsArrayBuffer(file);
}

// Função para atualizar uma tabela HTML com dados JSON
function updateTableFromJson(table, jsonData) {
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = ''; // Limpa o conteúdo existente

    // Assumindo que a primeira linha é o cabeçalho
    if (jsonData.length > 0) {
        // Extrai o cabeçalho e cria a linha correspondente na tabela
        const headers = jsonData.shift();
        const thead = table.querySelector('thead');
        thead.innerHTML = ''; // Limpa o cabeçalho existente

        const headerRow = document.createElement('tr');
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
    }

    // Adiciona os dados à tabela
    jsonData.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

// Adiciona os eventos aos botões
document.getElementById('downloadExcel').addEventListener('click', downloadExcel);
document.getElementById('uploadExcel').addEventListener('click', uploadExcel);
