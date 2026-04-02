import { getFile, startTracer, stopTracer, getLogs, loadFileList } from "./actions.js";
import { withLoading, displayTable } from "./ui.js";
import { parseCSV } from "./parser.js";
import { clearChart, displayChart, resizeChart } from "./graph.js";


window.getList = loadFileList;
window.getFile = getFile;
window.startTracer = startTracer;
window.stopTracer = stopTracer;
window.getLogs = getLogs;
window.openChartPanel = openChartPanel; // open the chart by default


// List files
document.getElementById("btnList").addEventListener("click", function () {
    withLoading(this, loadFileList);
});


// Upload a file
document.getElementById("fileInput").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        const content = e.target.result;

        // Simulate a response from the server
        clearChart();
        const parsed = parseCSV(content);
        displayTable(parsed);
        displayChart(parsed.data);
        openChartPanel();
    };

    reader.readAsText(file);
});


// Button to display / hide the graph (accordion)
const btn = document.getElementById("toggleChartBtn");
const container = document.getElementById("chartContainer");

btn.addEventListener("click", () => {
    const isExpanded = container.classList.toggle("expanded");

    btn.textContent = isExpanded
        ? "Masquer le graphique "
        : "Afficher le graphique ";

    if (isExpanded) {
        setTimeout(() => {
            resizeChart();
        }, 300); // attendre la fin de l'animation
    }
});


function openChartPanel() {
    const container = document.getElementById("chartContainer");
    const btn = document.getElementById("toggleChartBtn");

    if (!container.classList.contains("expanded")) {
        container.classList.add("expanded");
        btn.textContent = "Masquer le graphique";

        // attendre animation CSS
        setTimeout(() => {
            resizeChart();
        }, 300);
    } else {
        // déjà ouvert → juste resize
        resizeChart();
    }
}