
// Display the concerned field content and not the JSON
export function displayResult(data) {
    const output = document.getElementById("output");
    
    output.classList.remove("error", "success");

    if (data.error){
        output.classList.add("error");
        output.textContent = data.error;
        return;
    }
    if (data.status) {
        output.textContent = data.status;
        return;
    }
    if (data.data){
        output.textContent = data.data;
        return;
    }

    // fallback
    output.textContent = JSON.stringify(data, null, 2);
}


export function displayFileButtons(files, onClick) {
    const container = document.getElementById("fileList");
    container.innerHTML = "";

    if (!Array.isArray(files) || files.length === 0) {
        container.textContent = "Aucun fichier disponible";
        return;
    }

    files.forEach(file => {
        const btn = document.createElement("button");

        btn.textContent = file;
        btn.style.display = "block";
        btn.style.margin = "5px 0";
        btn.style.cursor = "pointer";

        btn.addEventListener("click", function () {
            withLoading(btn, () => onClick(file));
        });
        btn.classList.add("btn", "btn-file");
        
        container.appendChild(btn);
    });
}


export function highlightSelection(listContainer, selectedElement) {
    listContainer.querySelectorAll("li").forEach(el => {
        el.classList.remove("selected");
    });
    selectedElement.classList.add("selected");
}


export async function withLoading(button, asyncAction) {
    const originalContent = button.innerHTML;

    // Retrieve the dimensions
    const width = button.offsetWidth;
    const height = button.offsetHeight;

    button.style.width = width + "px";
    button.style.height = height + "px";

    button.disabled = true;
    button.classList.add("loading");

    // Center loader
    button.innerHTML = `<span class="loader"></span>`;

    try {
        await asyncAction();
    } finally {
        button.disabled = false;
        button.classList.remove("loading");
        button.innerHTML = originalContent;

        // free dimensions
        button.style.width = "";
        button.style.height = "";
    }
}


export function downloadData(data, filename = "mesures.txt") {
    if (!data) {
        alert("Aucune donnée à sauvegarder");
        return;
    }

    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}


export function displayTable(parsed) {
    const output = document.getElementById("output");
    const { headers, data } = parsed
    let html = "<table id=\"dataTable\"><thead><tr>";
    headers.forEach(e => {
        html += `<th>${e}</th>`;
    });
    html += `</tr></thead><tbody>`;

    data.forEach((row, index) => {
        html += `
            <tr data-index="${index}">
                <td>${row.formattedDate}</td>
                <td>${row.time}</td>
                <td>${row.humidity}</td>
                <td>${row.temperature}</td>
            </tr>
        `;
    });

    html += "</tbody></table>";
    output.innerHTML = html;
}


export function addDownloadButton(data, file) {
    const btn = document.createElement("button");
    btn.textContent = "Télécharger";
    btn.onclick = () => downloadData(data, file);
    document.getElementById("output").appendChild(btn);
}
