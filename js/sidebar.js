//! サイドバー(とヘッダー)を作成するスクリプト
//! ヘッダーの裏にスペーサを作成する

// a function to create a sidebar and something related it and append them into body.
function create_sidebar(current, root) {
    const links = [
        ["index.html", "ホーム"],
        ["sub/meiricup-05.html", "東方明理杯・伍"],
        ["sub/archive.html", "過去の試合"],
        ["sub/credits.html", "クレジット"],
        ["sub/tools.html", "ツール"],
    ];

    const sidebar_background = document.createElement("div");
    sidebar_background.id = "sidebar-background";
    document.body.appendChild(sidebar_background);
    
    const sidebar = document.createElement("div");
    sidebar.id = "sidebar";
    sidebar.ontouchend = (e) => e.stopPropagation();
    sidebar.onclick = (e) => e.stopPropagation();
    document.body.appendChild(sidebar);
    
    const close_icon = document.createElement("div");
    close_icon.id = "sidebar-icon-close";
    close_icon.innerText = "×";
    close_icon.ontouchend = (e) => {
        sidebar.style.display = "none";
        sidebar_background.style.display = "none";
        e.preventDefault();
    };
    close_icon.onclick = (e) => {
        sidebar.style.display = "none";
        sidebar_background.style.display = "none";
        e.preventDefault();
    };
    sidebar.appendChild(close_icon);

    for (const link of links) {
        const div = document.createElement("div");
        sidebar.appendChild(div);

        const a = document.createElement("a");
        a.href = root + link[0];
        a.innerText = link[1];
        if (current === link[1]) a.style.fontWeight = "bold";
        div.appendChild(a);
    }

    const header_narrow = document.createElement("div");
    header_narrow.id = "header-narrow";
    document.body.appendChild(header_narrow);

    const open_icon = document.createElement("div");
    open_icon.id = "sidebar-icon-open";
    open_icon.innerText = "☰";
    open_icon.ontouchend = (e) => {
        sidebar.style.display = "block";
        sidebar_background.style.display = "block";
        e.preventDefault();
    };
    open_icon.onclick = (e) => {
        sidebar.style.display = "block";
        sidebar_background.style.display = "block";
        e.preventDefault();
    };
    header_narrow.appendChild(open_icon);

    const title = document.createElement("div");
    header_narrow.appendChild(title);
    const a_title = document.createElement("a");
    a_title.id = "header-title-narrow";
    a_title.href = root + "index.html";
    a_title.innerText = "MeiriSTG 公式サイト";
    title.appendChild(a_title);

    const spacer = document.createElement("div");
    spacer.id = "spacer-sidebar";
    spacer.style.minHeight = header_narrow.clientHeight + "px";
    spacer.style.backgroundColor = "black";
    document.body.appendChild(spacer);
}
