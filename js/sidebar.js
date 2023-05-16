// a function to create a sidebar and something related it and append them into body.
function create_sidebar(current, root) {
    const links = [
        ["index.html", "ホーム"],
        ["sub/welcome-2023.html", "明理新歓大会 2023"],
        ["sub/tool.html", "ツール"],
        ["sub/archive.html", "過去の試合"],
        ["sub/credit.html", "クレジット"],
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
    close_icon.ontouchend = () => {
        sidebar.style.display = "none";
        sidebar_background.style.display = "none";
    };
    close_icon.onclick = () => {
        sidebar.style.display = "none";
        sidebar_background.style.display = "none";
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
    open_icon.ontouchend = () => {
        sidebar.style.display = "block";
        sidebar_background.style.display = "block";
    };
    open_icon.onclick = () => {
        sidebar.style.display = "block";
        sidebar_background.style.display = "block";
    };
    header_narrow.appendChild(open_icon);

    const title = document.createElement("div");
    header_narrow.appendChild(title);
    const a_title = document.createElement("a");
    a_title.id = "header-title-narrow";
    a_title.href = root + "index.html";
    a_title.innerText = "MeiriSTG 公式サイト";
    title.appendChild(a_title);
}
