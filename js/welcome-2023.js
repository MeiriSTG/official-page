// This script uses fetch API. So, you must run this on some servers.

fetch("/official-page/data/all-clear-score.json")
    .then(r => r.text())
    .then(s => JSON.parse(s))
    .then(score_table => {

        if (new URL(window.location.href).searchParams.get("for") === "refree") {
            document.getElementById("tr-select-team").innerHTML = `
                <td class="w-0 nowrap">チーム</td>
                <td>
                    <select id="select-team">
                        <option>Team Red</option>
                        <option>Team White</option>
                    </select>
                </td>
            `;
            document.getElementById("item-input-url").innerHTML = `
                <td class="w-0 nowrap">送信先URL</td>
                <td><input id="input-url" class="w-f" type="text"></td>
            `;
            document.getElementById("item-button-submit").innerHTML = `
                <input id="button-submit" class="p-1" type="button" value="送信">
            `;
        }

        const select_team = document.getElementById("select-team");
        const select_runner = document.getElementById("select-runner");
        const select_work = document.getElementById("select-work");
        const select_difficult = document.getElementById("select-difficult");
        const select_player = document.getElementById("select-player");
        const select_rest = document.getElementById("select-rest");
        const select_continue = document.getElementById("select-continue");
        const span_formula = document.getElementById("span-formula");
        const span_score = document.getElementById("span-score");
        const input_url = document.getElementById("input-url");
        const button_submit = document.getElementById("button-submit");

        const diff_map = {
            "Easy": 0,
            "Normal": 0,
            "Hard": 1,
            "Lunatic": 1,
            "Extra": 2,
            "Phantasm": 2
        };

        function update_score() {
            const idx = diff_map[select_difficult.value];
            const is_continued = select_continue.value === "yes" ? true : false;
            const k = is_continued ? 0.5 : 1.0;
            const b = score_table[select_work.value][select_player.value][idx] * k;
            const r = is_continued ? 0 : select_rest.value;
            let score = 0;
            score = Number(b) * (1 + 0.1 * Number(r));
            score = Math.round(score * 100) / 100;
            span_formula.innerText = b + " * (1 + 0.1 * " + r + ") = ";
            span_score.innerText = score;
        }

        if (button_submit !== null && button_submit !== undefined) {
            button_submit.onclick = () => {
                const team = select_team.value;
                let content = team;
                content += " : ";
                content += span_score.innerText;
                content += "\n";
                content += select_work.options[select_work.selectedIndex].text;
                content += " ";
                content += select_difficult.value;
                content += " ";
                content += select_player.value;
                content += " ";
                content += select_rest.value;
                if (select_runner.value === "first") {
                    content += " continue=";
                    content += select_continue.value;
                }
                const body = {
                    "username": team,
                    "content": content
                };
                fetch(
                    input_url.value,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(body),
                    }
                )
                    .then(() => alert("[submitted]\n" + content))
                    .catch(() => alert("error"));
            }
        }

        select_runner.onchange = (e) => {
            if (e.currentTarget.value === "first") {
                select_continue.disabled = false;
                select_difficult.innerHTML = `
            <option>Easy</option>
            <option>Normal</option>
        `;
            } else if (e.currentTarget.value === "second") {
                select_continue.options[0].selected = true;
                select_continue.disabled = true;
                select_difficult.innerHTML = `
            <option>Extra</option>
            <option>Phantasm</option>
        `;
            } else {
                select_continue.options[0].selected = true;
                select_continue.disabled = true;
                select_difficult.innerHTML = `
            <option>Hard</option>
            <option>Lunatic</option>
        `;
            }
            update_score();
        }

        select_work.onchange = (e) => {
            const players = score_table[e.currentTarget.value];
            select_player.innerHTML = "";
            for (const player in players) {
                const option = document.createElement("option");
                option.value = player;
                option.text = player;
                select_player.appendChild(option);
            }
            update_score();
        };

        if (select_team) select_team.onchange = () => update_score();
        select_difficult.onchange = () => update_score();
        select_player.onchange = () => update_score();
        select_rest.onchange = () => update_score();
        select_continue.onchange = () => update_score();

        update_score();

    });
