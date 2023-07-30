//! 得点・制限時間表を作成するスクリプト

// ================================================================================================================= //
//     Data                                                                                                          //
// ================================================================================================================= //

const TITLES = [
  "東方紅魔郷",
  "東方妖々夢",
  "東方永夜抄",
  "東方風神録",
  "東方地霊殿",
  "東方星蓮船",
  "妖精大戦争",
  "東方神霊廟",
  "東方輝針城",
  "東方紺珠伝",
  "東方天空璋",
  "東方鬼形獣",
  "東方虹龍洞",
]

const SCORES = [
  {
    "霊夢A": [12, 19, 11],
    "霊夢B": [12, 18, 10],
    "魔理沙A": [11, 18, 10],
    "魔理沙B": [11, 17, 10]
  },
  {
    "霊夢A": [9, 14, 9],
    "霊夢B": [8, 13, 9],
    "魔理沙A": [10, 15, 10],
    "魔理沙B": [10, 16, 10],
    "咲夜A": [8, 14, 9],
    "咲夜B": [9, 13, 9]
  },
  {
    "結界チーム": [8, 14, 9],
    "詠唱チーム": [8, 14, 9],
    "紅魔チーム": [9, 15, 10],
    "幽冥チーム": [9, 15, 9],
    "霊夢": [12, 19, 14],
    "紫": [9, 15, 10],
    "魔理沙": [11, 18, 12],
    "アリス": [13, 20, 13],
    "咲夜": [14, 21, 14],
    "レミリア": [9, 15, 11],
    "妖夢": [9, 15, 10],
    "幽々子": [10, 16, 11]
  },
  {
    "霊夢A": [10, 16, 10],
    "霊夢B": [10, 16, 10],
    "霊夢C": [11, 17, 11],
    "魔理沙A": [12, 19, 12],
    "魔理沙B": [7, 12, 8],
    "魔理沙C": [11, 17, 11]
  },
  {
    "霊夢A": [10, 15, 8],
    "霊夢B": [12, 17, 11],
    "霊夢C": [11, 16, 11],
    "魔理沙A": [13, 18, 11],
    "魔理沙B": [12, 17, 10],
    "魔理沙C": [14, 19, 12]
  },
  {
    "霊夢A": [12, 17, 11],
    "霊夢B": [13, 19, 12],
    "魔理沙A": [13, 19, 12],
    "魔理沙B": [15, 22, 14],
    "早苗A": [14, 21, 13],
    "早苗B": [11, 16, 10]
  },
  {
    "A1": [11, 12, -],
    "A2": [12, 13, -],
    "B1": [12, 13, -],
    "B2": [12, 13, -],
    "C1": [13, 15, -],
    "C2": [13, 14, -],
    "EX": [-, -, 13]
  },
  {
    "霊夢": [9, 14, 12],
    "魔理沙": [10, 15, 13],
    "早苗": [10, 16, 14],
    "妖夢": [8, 14, 12]
  },
  {
    "霊夢A": [9, 16, 11],
    "霊夢B": [11, 18, 13],
    "魔理沙A": [13, 19, 14],
    "魔理沙B": [10, 12, 9],
    "咲夜A": [9, 16, 11],
    "咲夜B": [14, 21, 15]
  },
  {
    "霊夢": [14, 19, 15],
    "魔理沙": [15, 22, 15],
    "早苗": [12, 17, 13],
    "鈴仙": [12, 16, 12]
  },
  {
    "霊夢春": [8, 13, 0],
    "霊夢夏": [7, 11, 0],
    "霊夢秋": [6, 11, 0],
    "霊夢冬": [6, 11, 0],
    "霊夢土用": [0, 0, 7],
    "チルノ春": [9, 14, 0],
    "チルノ夏": [9, 12, 0],
    "チルノ秋": [8, 11, 0],
    "チルノ冬": [8, 12, 0],
    "チルノ土用": [0, 0, 8],
    "文春": [10, 15, 0],
    "文夏": [9, 13, 0],
    "文秋": [8, 13, 0],
    "文冬": [9, 14, 0],
    "文土用": [0, 0, 9],
    "魔理沙春": [9, 14, 0],
    "魔理沙夏": [8, 11, 0],
    "魔理沙秋": [7, 11, 0],
    "魔理沙冬": [7, 12, 0],
    "魔理沙土用": [0, 0, 8]
  },
  {
    "霊夢W": [11, 16, 10],
    "霊夢O": [12, 17, 12],
    "霊夢E": [12, 17, 11],
    "魔理沙W": [10, 14, 10],
    "魔理沙O": [10, 14, 12],
    "魔理沙E": [11, 16, 12],
    "妖夢W": [10, 15, 10],
    "妖夢O": [9, 13, 11],
    "妖夢E": [13, 18, 13]
  },
  {
    "霊夢": [8, 12, 9],
    "魔理沙": [9, 14, 11],
    "咲夜": [9, 13, 10],
    "早苗": [8, 12, 9]
  }
];

const TIMES = [
  [35, 50, 75, 35, 0, 80],
  [45, 45, 65, 30, 35, 80],
  [50, 50, 70, 35, 0, 85],
  [50, 50, 70, 35, 0, 60],
  [55, 55, 75, 35, 0, 70],
  [55, 55, 80, 40, 0, 85],
  [35, 35, 35, 40, 0, 60],
  [45, 45, 65, 40, 0, 75],
  [50, 50, 75, 40, 0, 85],
  [55, 55, 75, 45, 0, 115],
  [45, 45, 60, 30, 0, 80],
  [50, 50, 70, 35, 0, 75],
  [45, 45, 60, 30, 0, 85],
];

// ================================================================================================================= //
//     Logic                                                                                                         //
// ================================================================================================================= //

function createTable(ths, tdss) {
  const elem_table = document.createElement("table");
  const elem_trh = document.createElement("tr");
  elem_table.appendChild(elem_trh);
  for (const th of ths) {
    const elem_th = document.createElement("th");
    elem_th.innerText = th;
    elem_trh.appendChild(elem_th);
  }
  for (const tds of tdss) {
    const elem_trd = document.createElement("tr");
    elem_table.appendChild(elem_trd);
    for (const td of tds) {
      const elem_td = document.createElement("td");
      elem_td.innerText = td;
      elem_trd.appendChild(elem_td);
    }
  }
  return elem_table;
}

function init() {
  // main
  const main = document.createElement("div");
  main.id = "main";
  document.body.appendChild(main);

  // radios
  //   scores
  const radio_scores = document.createElement("input");
  radio_scores.type = "radio";
  radio_scores.name = "option";
  radio_scores.checked = true;
  main.appendChild(radio_scores);
  const label_scores = document.createElement("label");
  label_scores.innerText = "得点表";
  main.appendChild(label_scores);
  //   times
  const radio_times = document.createElement("input");
  radio_times.type = "radio";
  radio_times.name = "option";
  main.appendChild(radio_times);
  const label_times = document.createElement("label");
  label_times.innerText = "制限時間表";
  main.appendChild(label_times);

  // select
  let selected_index = -1;
  const select = document.createElement("select");
  select.style.display = "block";
  main.appendChild(select);
  const option_all = document.createElement("option");
  option_all.innerText = "すべて";
  select.appendChild(option_all);
  for (const n of TITLES) {
    const option = document.createElement("option");
    option.innerText = n;
    select.appendChild(option);
  }

  // scores
  const tables_scores = [];
  for (let i = 0; i < SCORES.length; ++i) {
    const ths = [TITLES[i], 'Easy,Normal', 'Hard,Lunatic', 'Extra,Phantasm'];
    const tdss = [];
    for (const [char, arr] of Object.entries(SCORES[i])) {
      tdss.push([char].concat(arr));
    }
    const table = createTable(ths, tdss);
    main.appendChild(table);
    tables_scores.push(table);
  }

  // times
  const times_rows = [];
  for (let i = 0; i < TIMES.length; ++i) {
    times_rows.push([TITLES[i]].concat(TIMES[i]));
  }
  const table_times = createTable(['', 'Easy', 'Normal', 'Hard,Lunatic', 'Extra', 'Phantasm', 'NB'], times_rows);
  table_times.style.tableLayout = "fixed";
  main.appendChild(table_times);
  const trs_times = table_times.getElementsByTagName('tr');
  const widths_times = Array.from(trs_times[0].getElementsByTagName('th')).map(th => th.offsetWidth);
  const max_width_times = Math.max(...widths_times);
  for (const n of trs_times) {
    for (const m of n.cells) {
      m.style.width = max_width_times + "px";
    }
  }
  table_times.style.display = "none";

  // events
  const update_tables_scores = () => {
    console.log(selected_index);
    for (let i = 0; i < tables_scores.length; ++i) {
      if (selected_index < 0) {
        tables_scores[i].style.display = "table";
        continue;
      }
      if (i == selected_index) tables_scores[i].style.display = "table";
      else tables_scores[i].style.display = "none";
    }
  };
  radio_scores.addEventListener("change", () => {
    table_times.style.display = "none";
    update_tables_scores();
    select.style.display = "block";
  });
  radio_times.addEventListener("change", () => {
    table_times.style.display = "table";
    for (let i = 0; i < tables_scores.length; ++i) {
      tables_scores[i].style.display = "none";
    }
    select.style.display = "none";
  });
  select.addEventListener("change", (e) => {
    selected_index = e.target.selectedIndex - 1;
    update_tables_scores();
  });
}

init();
