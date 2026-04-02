import { sendCommand } from "./api.js";
import { addDownloadButton, displayFileButtons, displayResult, displayTable } from "./ui.js";
import { parseCSV } from "./parser.js";
import { displayChart, clearChart } from "./graph.js"

export async function getList() {
    const data = await sendCommand("getlist");
    displayFileButtons(data, onClick); // specific
}


export async function getFile(file) {
    const content = await sendCommand("getfile", file);

    if (content.error){
        displayResult(data);
        return;
    }

    parseCSV(content.data);
    return content;
}


export async function startTracer() {
    const interval = document.getElementById("interval").value;
    const data = await sendCommand("starttracer", interval);
    clearChart();
    displayResult(data);
}


export async function stopTracer() {
    const goFurther = confirm("Vous êtes sur le point d'arrêter le traceur.\nCliquez OK pour confirmer");
    if (goFurther) {
        const data = await sendCommand("stoptracer");
        clearChart();
        displayResult(data);
    }
}


export async function getLogs() {
    const data = await sendCommand("getlogs");
    clearChart();
    displayResult(data);
}


export async function fetchFileContent(file) {
    try {
        clearChart();
        const response = await getFile(file);

        if (response.error) {
            displayResult(response);
            return;
        }

        if (!response.data) {
            displayResult({ error: "No data received" });
            return;
        }

        const parsed = parseCSV(response.data);

        displayTable(parsed);
        displayChart(parsed.data);
        openChartPanel();
        addDownloadButton(response.data, file);

    } catch (err) {
        displayResult({ error: err.message || "Erreur réseau" });
    }
}


export async function loadFileList() {
    try {
        const data = await sendCommand("getlist");

        if (data.data) {
            displayFileButtons(data.data, fetchFileContent);
        } else {
            clearChart();
            displayResult(data);
        }

    } catch (err) {
        displayResult({ error: err.message || "Erreur réseau" });
    }
}
