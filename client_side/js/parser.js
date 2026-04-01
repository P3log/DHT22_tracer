
export function parseCSV(content) {
    const lines = content.trim().split("\n");

    if (lines.length === 0) {
        return { headers: [], data: [] };
    }

    const headers = lines[0].split(";");

    const data = lines.slice(1)
        .filter(line => line.trim() !== "")
        .map(line => {
            const parts = line.split(";");
            if (parts.length < 4) return null;

            const [date, t, hdt, tmp] = parts;
            const [year, month, day] = date.split("-");

            return {
                rawDate: date,
                formattedDate: `${day}/${month}/${year}`,
                time: t,
                timestamp: `${year}-${month}-${day}T${t}`,
                humidity: Number.parseFloat(hdt),
                temperature: Number.parseFloat(tmp)
            };
        })
        .filter(x => x !== null);

    return { headers, data };
}