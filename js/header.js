//! ヘッダーを作成するスクリプト
//! ヘッダーの裏にスペーサを作成する

// a function to create a header and append it into body.
function create_header(current, root) {
    const links = [
        ["index.html", "ホーム"],
        ["sub/meiricup-03.html", "東方明理杯・参"],
        ["sub/archive.html", "過去の試合"],
        ["sub/credits.html", "クレジット"],
        ["sub/tools.html", "ツール"],
    ];

    const header = document.createElement("div");
    header.id = "header";
    document.body.appendChild(header);

    const header_title = document.createElement("div");
    header_title.id = "header-title";
    header.appendChild(header_title);
    const a_header_title = document.createElement("a");
    a_header_title.href = root + "index.html";
    a_header_title.innerText = "MeiriSTG 公式サイト";
    header_title.appendChild(a_header_title);

    for (const link of links) {
        const div = document.createElement("div");
        header.appendChild(div);
        
        const a = document.createElement("a");
        a.href = root + link[0];
        a.innerText = link[1];
        if (current === link[1]) a.style.fontWeight = "bold";
        div.appendChild(a);
    }

    const spacer = document.createElement("div");
    spacer.id = "spacer";
    spacer.style.minHeight = header.clientHeight + "px";
    spacer.style.backgroundColor = "black";
    document.body.appendChild(spacer);
}
