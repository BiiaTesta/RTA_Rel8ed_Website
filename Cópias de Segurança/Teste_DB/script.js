document.addEventListener('DOMContentLoaded', function() {
    loadTable('scheduleTable', 'schedule');
    loadTable('programDurationTable', 'program_duration');
    loadTable('versionsTable', 'versions');
    loadTable('weeklyIBMTrainingsTable', 'weekly_ibm_trainings');
    loadTable('weeklyWednesdayLecturesTable', 'weekly_wednesday_lectures');
    loadTable('lecturesTable', 'lectures');
});

function loadTable(tableId, tableName) {
    fetch(`/data/${tableName}`)
        .then(response => response.json())
        .then(data => {
            let table = document.getElementById(tableId);
            let tbody = table.querySelector('tbody');
            tbody.innerHTML = '';
            data.forEach(row => {
                let tr = document.createElement('tr');
                row.forEach(cell => {
                    let td = document.createElement('td');
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });
        });
}

// JavaScript
function downloadExcel() {
    let tableSelect = document.getElementById('tableSelectDownload');
    let table = tableSelect.value;
    if (table) {
        window.location.href = `/download/${table}`;
    } else {
        alert('Por favor, selecione uma tabela para download.');
    }
}


function uploadExcel() {
    let fileInput = document.getElementById('fileInput');
    let password = document.getElementById('password').value;
    let tableSelect = document.getElementById('tableSelectUpload');
    let table = tableSelect.value;

    if (!fileInput.files.length) {
        alert('Por favor, selecione um arquivo para upload.');
        return;
    }

    if (password !== '1234') {
        alert('Senha incorreta.');
        return;
    }

    let formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('password', password);
    formData.append('table', table);

    fetch('/upload', {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.status === 200) {
            alert('Upload realizado com sucesso!');
            loadTable(`${table}Table`, table);
        } else {
            alert('Erro no upload. Verifique a senha.');
        }
    });
}
