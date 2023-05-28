// This script uses fetch API. So, you must run this on some servers.

fetch("/official-page/data/all-clear-score.json")
    .then(r => r.text())
    .then(s => JSON.parse(s))
    .then(score_table => {

        const tables = document.getElementById("tables");

        function append_table(work, title) {
            // title
            const h2 = document.createElement("h2");
            h2.innerText = title;
            tables.appendChild(h2);
            // table
            const table = document.createElement("table");
            tables.appendChild(table);
            const chars = score_table[work];
            table.innerHTML = "<tr><th>Player</th><th>Easy,Normal</th><th>Hard,Lunatic</th><th>Extra,Phantasm</th></tr>";
            for (const char in chars) {
                const tr = document.createElement("tr");
                const name = document.createElement("td");
                name.innerText = char;
                const en = document.createElement("td");
                en.innerText = chars[char][0];
                const hl = document.createElement("td");
                hl.innerText = chars[char][1];
                const ep = document.createElement("td");
                ep.innerText = chars[char][2];
                tr.appendChild(name);
                tr.appendChild(en);
                tr.appendChild(hl);
                tr.appendChild(ep);
                table.appendChild(tr);
            }
        }

        append_table("06", "東方紅魔郷");
        append_table("07", "東方妖々夢");
        append_table("08", "東方永夜抄");
        append_table("10", "東方風神録");
        append_table("13", "東方神霊廟");
    });
