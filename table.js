document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('table-body');
    const formContainer = document.getElementById('form-container');
    const memberForm = document.getElementById('member-form');
    const addMemberButton = document.getElementById('add-member');
    const printButton = document.getElementById('print-table');
    const exportCsvButton = document.getElementById('export-csv');
    const exportWordButton = document.getElementById('export-word');
    const exportExcelButton = document.getElementById('export-excel');
    const searchInput = document.getElementById('search');
    const filterSede = document.getElementById('filter-sede');
    const filterGender = document.getElementById('filter-gender');
    const filterAge = document.getElementById('filter-age');
    const filterBaptized = document.getElementById('filter-baptized');
    const closeFormButton = document.querySelector('.close');

    let members = [];

    function renderTable(membersToRender) {
        tableBody.innerHTML = '';
        membersToRender.forEach((member, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${member.tipoDocumento}</td>
                <td>${member.numeroDocumento}</td>
                <td>${member.sede}</td>
                <td>${member.nombres}</td>
                <td>${member.apellidos}</td>
                <td>${member.genero}</td>
                <td>${member.numeroCelular}</td>
                <td>${member.fechaNacimiento}</td>
                <td>${calculateAge(member.fechaNacimiento)}</td>
                <td>${member.direccion}</td>
                <td>${member.barrio}</td>
                <td>${member.ciudad}</td>
                <td>${member.pais}</td>
                <td>${member.estadoCivil}</td>
                <td>${member.bautizado}</td>
                <td>${member.nombreInvitador}</td>
                <td>${member.correo}</td>
                <td>${member.fechaIngreso}</td>
                <td>${member.nivelClic}</td>
                <td>${member.consolidado}</td>
                <td>${member.grupoTransformacion}</td>
                <td>${member.cargo}</td>
                <td>
                    <button onclick="viewMember(${index})">Ver Detalles</button>
                    <button onclick="editMember(${index})">Editar</button>
                    <button onclick="deleteMember(${index})">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    function addMember(member) {
        members.push(member);
        renderTable(members);
        saveMembers();
    }

    window.viewMember = function (index) {
        const member = members[index];
        alert(`
            Tipo Documento: ${member.tipoDocumento}\n
            Número Documento: ${member.numeroDocumento}\n
            Sede: ${member.sede}\n
            Nombres: ${member.nombres}\n
            Apellidos: ${member.apellidos}\n
            Género: ${member.genero}\n
            Número Celular: ${member.numeroCelular}\n
            Fecha de Nacimiento: ${member.fechaNacimiento}\n
            Edad: ${calculateAge(member.fechaNacimiento)}\n
            Dirección: ${member.direccion}\n
            Barrio: ${member.barrio}\n
            Ciudad: ${member.ciudad}\n
            País: ${member.pais}\n
            Estado Civil: ${member.estadoCivil}\n
            Bautizado: ${member.bautizado}\n
            Nombre Invitador: ${member.nombreInvitador}\n
            Correo: ${member.correo}\n
            Fecha de Ingreso: ${member.fechaIngreso}\n
            Nivel CLIC: ${member.nivelClic}\n
            Consolidado: ${member.consolidado}\n
            Grupo de Transformación: ${member.grupoTransformacion}\n
            Cargo: ${member.cargo}
        `);
    };

    window.editMember = function (index) {
        const member = members[index];
        formContainer.style.display = 'block';
        Object.keys(member).forEach(key => {
            const input = document.getElementById(key);
            if (input) {
                if (input.type === 'file') {
                } else {
                    input.value = member[key];
                }
            }
        });
        memberForm.onsubmit = function (event) {
            event.preventDefault();
            updateMember(index);
        };
    };

    function updateMember(index) {
        const updatedMember = getMemberFromForm();
        members[index] = updatedMember;
        formContainer.style.display = 'none';
        renderTable(members);
        saveMembers();
    }

    window.deleteMember = function (index) {
        if (confirm('¿Estás seguro de eliminar este miembro?')) {
            members.splice(index, 1);
            renderTable(members);
            saveMembers();
        }
    };

    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const filteredMembers = members.filter(member =>
            Object.values(member).some(value =>
                value.toString().toLowerCase().includes(searchTerm)
            )
        );
        renderTable(filteredMembers);
    });

    filterSede.addEventListener('change', function () {
        const selectedSede = this.value.toLowerCase();
        const filteredMembers = members.filter(member =>
            selectedSede ? member.sede.toLowerCase() === selectedSede : true
        );
        renderTable(filteredMembers);
    });

    filterGender.addEventListener('change', function () {
        const selectedGender = this.value.toLowerCase();
        const filteredMembers = members.filter(member =>
            selectedGender ? member.genero.toLowerCase() === selectedGender : true
        );
        renderTable(filteredMembers);
    });

    filterAge.addEventListener('change', function () {
        const selectedAge = this.value.toLowerCase();
        const filteredMembers = members.filter(member =>
            selectedAge ? calculateAge(member.fechaNacimiento).toString().toLowerCase().includes(selectedAge) : true
        );
        renderTable(filteredMembers);
    });

    filterBaptized.addEventListener('change', function () {
        const selectedBaptized = this.value.toLowerCase();
        const filteredMembers = members.filter(member =>
            selectedBaptized ? member.bautizado.toLowerCase() === selectedBaptized : true
        );
        renderTable(filteredMembers);
    });

    function getMemberFromForm() {
        return {
            tipoDocumento: document.getElementById('tipoDocumento').value,
            numeroDocumento: document.getElementById('numeroDocumento').value,
            sede: document.getElementById('sede').value,
            nombres: document.getElementById('nombres').value,
            apellidos: document.getElementById('apellidos').value,
            genero: document.getElementById('genero').value,
            numeroCelular: document.getElementById('numeroCelular').value,
            fechaNacimiento: document.getElementById('fechaNacimiento').value,
            direccion: document.getElementById('direccion').value,
            barrio: document.getElementById('barrio').value,
            ciudad: document.getElementById('ciudad').value,
            pais: document.getElementById('pais').value,
            estadoCivil: document.getElementById('estadoCivil').value,
            bautizado: document.getElementById('bautizado').value,
            nombreInvitador: document.getElementById('nombreInvitador').value,
            correo: document.getElementById('correo').value,
            fechaIngreso: document.getElementById('fechaIngreso').value,
            nivelClic: document.getElementById('nivelClic').value,
            consolidado: document.getElementById('consolidado').value,
            grupoTransformacion: document.getElementById('grupoTransformacion').value,
            cargo: document.getElementById('cargo').value,
        };
    }

    function calculateAge(birthDate) {
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }
        
        return age;
    }

    function saveMembers() {
        localStorage.setItem('members', JSON.stringify(members));
    }

    function loadMembers() {
        const savedMembers = JSON.parse(localStorage.getItem('members'));
        if (savedMembers) {
            members = savedMembers;
            renderTable(members);
        }
    }


    loadMembers();

    addMemberButton.addEventListener('click', () => {
        formContainer.style.display = 'block';
        memberForm.reset();
        memberForm.onsubmit = function (event) {
            event.preventDefault();
            const newMember = getMemberFromForm();
            addMember(newMember);
            formContainer.style.display = 'none';
        };
    });

    closeFormButton.addEventListener('click', () => {
        formContainer.style.display = 'none';
    });

    printButton.addEventListener('click', () => {
        window.print();
    });

    exportCsvButton.addEventListener('click', () => {
        exportTableToCsv();
    });

    exportWordButton.addEventListener('click', () => {
        exportTableToWord();
    });

    exportExcelButton.addEventListener('click', () => {
        exportTableToExcel();
    });

    function exportTableToCsv() {
        const csvRows = [];
        const headers = Array.from(tableBody.querySelectorAll('th')).map(th => th.innerText.trim());
        csvRows.push(headers.join(','));

        Array.from(tableBody.querySelectorAll('tr')).forEach(row => {
            const csvRow = [];
            Array.from(row.querySelectorAll('td')).forEach(cell  => {
                csvRow.push(cell.innerText.trim());
            });
            csvRows.push(csvRow.join(','));
        });

        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute('download', 'members.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function exportTableToWord() {
        const table = tableBody.cloneNode(true);
        const doc = new DOMParser().parseFromString('<!DOCTYPE html><html><body></body></html>', 'text/html');
        const body = doc.querySelector('body');
        body.appendChild(table);

        const html = body.innerHTML;
        const blob = new Blob(['\ufeff', html], {
            type: 'application/msword;charset=utf-8'
        });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute('download', 'members.doc');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function exportTableToExcel() {
        const table = tableBody.cloneNode(true);
        const doc = new DOMParser().parseFromString('<!DOCTYPE html><html><body></body></html>', 'text/html');
        const body = doc.querySelector('body');
        body.appendChild(table);

        const html = body.innerHTML;
        const blob = new Blob(['\ufeff', html], {
            type: 'application/vnd.ms-excel;charset=utf-8'
        });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute('download', 'members.xls');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});

