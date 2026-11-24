const topics=[
["Физические величины и измерения","Единицы СИ, измерительные приборы, точность и погрешности."],
["Основы кинематики","Положение тела, траектория, путь, перемещение, скорость и ускорение."],
["Динамика и законы Ньютона","Силы и движение. Примеры механических процессов в организме."],
["Работа, энергия и мощность","Механическая работа, кинетическая и потенциальная энергия."],
["Давление и гидростатика","Давление жидкостей и газов. Медицинские примеры."],
["Основы гидродинамики","Поток жидкости, скорость течения и сопротивление."],
["Механические колебания и волны","Период, частота, амплитуда и распространение волн."],
["Звук и ультразвук","Физические основы звука и ультразвуковой диагностики."],
["Тепловые явления","Температура, теплообмен и применение в медицине."]
];
const terms=[
["Ускорение","Векторная физическая величина, характеризующая быстроту изменения скорости тела."],
["Скорость","Физическая величина, показывающая, какое перемещение совершает тело за единицу времени."],
["Траектория","Линия, по которой движется тело."],
["Частота вращения","Число полных оборотов за единицу времени."],
["Угловая скорость","Величина, характеризующая быстроту изменения угла поворота."],
["Центростремительное ускорение","Ускорение при движении по окружности, направленное к её центру."],
["Радиус","Расстояние от центра окружности до её точки."],
["Давление","Физическая величина, равная отношению силы, действующей перпендикулярно поверхности, к площади этой поверхности."]
];
const pages={overview:"Обзор",program:"Учебная программа",lab:"Виртуальная лаборатория",practice:"Практикум",glossary:"Словарь терминов"};
const $=id=>document.getElementById(id);
function showPage(name){document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id==="page-"+name));document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===name));$("crumbName").textContent=pages[name]||"Обзор";$("sidebar").classList.remove("open");window.scrollTo(0,0)}
document.querySelectorAll("[data-page]").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.page)));
$("menuBtn").addEventListener("click",()=>$("sidebar").classList.toggle("open"));
function getDone(){try{return JSON.parse(localStorage.getItem("medphys-done")||"[]")}catch{return []}}
function setDone(a){localStorage.setItem("medphys-done",JSON.stringify(a));renderTopics();updateProgress()}
function renderTopics(){const done=getDone();$("topicList").innerHTML=topics.map((t,i)=>`<article class="topic ${done.includes(i)?"done":""}"><div class="topic-num">${String(i+1).padStart(2,"0")}</div><div class="topic-info"><h3>${t[0]}</h3><p>${t[1]}</p></div><button data-topic="${i}">${done.includes(i)?"✓ Изучено":"Отметить изученным"}</button></article>`).join("");document.querySelectorAll("[data-topic]").forEach(b=>b.addEventListener("click",()=>{const i=Number(b.dataset.topic),d=getDone();setDone(d.includes(i)?d.filter(x=>x!==i):[...d,i])}))}
function updateProgress(){const n=getDone().length,p=Math.round(n/topics.length*100);$("progressPercent").textContent=p+"%";$("progressBar").style.width=p+"%"}
function renderTerms(q=""){const filtered=terms.filter(t=>(t[0]+" "+t[1]).toLowerCase().includes(q.toLowerCase()));$("glossaryList").innerHTML=filtered.map(t=>`<article class="term"><b>${t[0]}</b><p>${t[1]}</p></article>`).join("")||'<p class="muted">Ничего не найдено.</p>'}
$("glossarySearch").addEventListener("input",e=>renderTerms(e.target.value));
let lab="centrifuge";
function calcLab(){if(lab==="centrifuge"){const rpm=+$("rpm").value,r=+$("radius").value/100;const omega=2*Math.PI*rpm/60,a=omega*omega*r;$("rpmOut").textContent=rpm;$("radiusOut").textContent=r.toFixed(2).replace(".",",");$("resultValue").textContent=Math.round(a).toLocaleString("ru-RU");$("resultUnit").textContent="м/с²";$("resultLabel").textContent="Центростремительное ускорение";$("formula").innerHTML="a = ω²r <span>ω = 2πn / 60</span>";$("rotor").style.animationDuration=Math.max(.25,60/rpm*8)+"s"}else{const v=+$("speed").value,t=+$("time").value,s=v*t;$("speedOut").textContent=v;$("timeOut").textContent=t;$("resultValue").textContent=s.toFixed(1).replace(".",",");$("resultUnit").textContent="м";$("resultLabel").textContent="Путь за выбранное время";$("formula").innerHTML="s = vt <span>Путь = скорость × время</span>";$("movingDot").style.left=Math.min(92,v/10*92)+"%"}}
function switchLab(next){lab=next;document.querySelectorAll(".lab-tab").forEach(b=>b.classList.toggle("active",b.dataset.lab===next));$("centrifugeControls").classList.toggle("hidden",next!=="centrifuge");$("motionControls").classList.toggle("hidden",next!=="motion");$("centrifugeScene").classList.toggle("hidden",next!=="centrifuge");$("motionScene").classList.toggle("hidden",next!=="motion");$("controlTitle").textContent=next==="centrifuge"?"Параметры центрифуги":"Параметры движения";$("labMode").textContent=next==="centrifuge"?"ЭКСПЕРИМЕНТ 01":"ЭКСПЕРИМЕНТ 02";$("labExplain").textContent=next==="centrifuge"?"При вращении ротора образцы движутся по окружности. Чем выше частота вращения и радиус, тем больше центростремительное ускорение.":"При равномерном прямолинейном движении путь прямо пропорционален скорости и времени движения.";$("questionTitle").textContent=next==="centrifuge"?"Как изменится ускорение, если увеличить частоту вращения в 2 раза?":"Как изменится путь, если при той же скорости увеличить время в 2 раза?";$("questionText").textContent=next==="centrifuge"?"Используй ползунок частоты и сравни результат. Обрати внимание на зависимость ускорения от квадрата угловой скорости.":"Измени время движения и сравни результат. При постоянной скорости путь изменяется прямо пропорционально времени.";calcLab()}
document.querySelectorAll("[data-lab]").forEach(b=>b.addEventListener("click",()=>switchLab(b.dataset.lab)));
["rpm","radius","speed","time"].forEach(id=>$(id).addEventListener("input",calcLab));
$("resetLab").addEventListener("click",()=>{ $("rpm").value=3000;$("radius").value=10;$("speed").value=2;$("time").value=5;calcLab()});
document.querySelectorAll(".answer").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".answer").forEach(x=>x.disabled=true);if(b.dataset.answer==="b"){b.classList.add("correct");$("quizFeedback").textContent="Верно! Ускорение пропорционально квадрату частоты вращения: при увеличении частоты в 2 раза ускорение увеличится в 4 раза."}else{b.classList.add("wrong");document.querySelector('[data-answer="b"]').classList.add("correct");$("quizFeedback").textContent="Не совсем. Вспомни формулу a = ω²r: ускорение зависит от квадрата угловой скорости. Правильный ответ — Б."}}));
$("nextQuestion").addEventListener("click",()=>{document.querySelectorAll(".answer").forEach(x=>{x.disabled=false;x.classList.remove("correct","wrong")});$("quizFeedback").textContent=""});
$("connection").textContent=navigator.onLine?"Подключение активно":"Автономный режим";
window.addEventListener("online",()=>$("connection").textContent="Подключение активно");window.addEventListener("offline",()=>$("connection").textContent="Автономный режим");
renderTopics();updateProgress();renderTerms();calcLab();
if("serviceWorker" in navigator && location.protocol!=="file:"){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}))}
