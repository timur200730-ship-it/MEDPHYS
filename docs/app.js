const topics=[
["Физика — наука о природе","Предмет физики, физические тела и явления, связь физических знаний с медициной."],
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
const pages={overview:"Обзор",program:"Учебная программа","lesson-physics":"Физика — наука о природе","lesson-kinematics":"Основы кинематики",lab:"Виртуальная лаборатория",practice:"Практикум",glossary:"Словарь терминов"};
const $=id=>document.getElementById(id);
function showPage(name){document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id==="page-"+name));document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===name));$("crumbName").textContent=pages[name]||"Обзор";$("sidebar").classList.remove("open");window.scrollTo(0,0)}
document.querySelectorAll("[data-page]").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.page)));
$("menuBtn").addEventListener("click",()=>$("sidebar").classList.toggle("open"));
function getDone(){try{return JSON.parse(localStorage.getItem("medphys-done")||"[]")}catch{return []}}
function setDone(a){localStorage.setItem("medphys-done",JSON.stringify(a));renderTopics();updateProgress()}
function renderTopics(){const done=getDone();$("topicList").innerHTML=topics.map((t,i)=>`<article class="topic ${done.includes(i)?"done":""}"><div class="topic-num">${String(i+1).padStart(2,"0")}</div><div class="topic-info"><h3>${t[0]}</h3><p>${t[1]}</p>${i===0?'<small class="topic-hours">2 академических часа · Материал открыт</small>':i===1?'<small class="topic-hours">Следующая тема курса</small>':''}</div><button data-topic="${i}">${i<2?"Открыть урок →":done.includes(i)?"✓ Изучено":"Отметить изученным"}</button></article>`).join("");document.querySelectorAll("[data-topic]").forEach(b=>b.addEventListener("click",()=>{const i=Number(b.dataset.topic);if(i===0){showPage("lesson-physics");return;}if(i===1){showPage("lesson-kinematics");return;}const d=getDone();setDone(d.includes(i)?d.filter(x=>x!==i):[...d,i])}))}
function updateProgress(){const n=getDone().length,p=Math.round(n/topics.length*100);$("progressPercent").textContent=p+"%";$("progressBar").style.width=p+"%"}
function renderTerms(q=""){const filtered=terms.filter(t=>(t[0]+" "+t[1]).toLowerCase().includes(q.toLowerCase()));$("glossaryList").innerHTML=filtered.map(t=>`<article class="term"><b>${t[0]}</b><p>${t[1]}</p></article>`).join("")||'<p class="muted">Ничего не найдено.</p>'}
$("glossarySearch").addEventListener("input",e=>renderTerms(e.target.value));
let lab="centrifuge";

function renderCentrifugeGraph(radiusM, rpm){
  const curve=$("graphCurve"), point=$("graphPoint"), guide=$("graphGuide"), label=$("graphCurrent");
  if(!curve||!point||!guide||!label)return;
  const x0=58,x1=610,y0=22,y1=184,minN=500,maxN=8000;
  const maxRadius=0.20;
  const maxA=Math.pow(2*Math.PI*maxN/60,2)*maxRadius;
  const pts=[];
  for(let i=0;i<=120;i++){
    const n=minN+(maxN-minN)*i/120;
    const a=Math.pow(2*Math.PI*n/60,2)*radiusM;
    const x=x0+(n-minN)/(maxN-minN)*(x1-x0);
    const y=y1-(a/maxA)*(y1-y0);
    pts.push((i===0?"M":"L")+x.toFixed(2)+","+y.toFixed(2));
  }
  curve.setAttribute("d",pts.join(" "));
  const aNow=Math.pow(2*Math.PI*rpm/60,2)*radiusM;
  const px=x0+(rpm-minN)/(maxN-minN)*(x1-x0);
  const py=y1-(aNow/maxA)*(y1-y0);
  point.setAttribute("cx",px.toFixed(2));point.setAttribute("cy",py.toFixed(2));
  guide.setAttribute("x1",px.toFixed(2));guide.setAttribute("x2",px.toFixed(2));
  guide.setAttribute("y1",py.toFixed(2));guide.setAttribute("y2",y1);
  label.textContent=`${rpm.toLocaleString("ru-RU")} об/мин · r=${radiusM.toFixed(2).replace(".",",")} м`;
}
function renderFlowGraph(radiusMm, pressurePa, viscosity, length){
  const curve=document.getElementById("flowGraphCurve");
  const point=document.getElementById("flowGraphPoint");
  const guide=document.getElementById("flowGraphGuide");
  const label=document.getElementById("flowGraphCurrent");
  if(!curve||!point||!guide||!label)return;
  const x0=58,x1=610,y0=22,y1=184,minR=1,maxR=4;
  const qAt=(rMm)=>{
    const r=rMm/1000;
    return Math.PI*Math.pow(r,4)*pressurePa/(8*viscosity*length)*60*1e6;
  };
  const maxQ=qAt(maxR);
  if(!Number.isFinite(maxQ)||maxQ<=0)return;
  const pts=[];
  for(let i=0;i<=100;i++){
    const r=minR+(maxR-minR)*i/100;
    const x=x0+(r-minR)/(maxR-minR)*(x1-x0);
    const y=y1-(qAt(r)/maxQ)*(y1-y0);
    pts.push(`${i===0?"M":"L"}${x.toFixed(2)},${y.toFixed(2)}`);
  }
  curve.setAttribute("d",pts.join(" "));
  const safeR=Math.min(maxR,Math.max(minR,Number(radiusMm)));
  const qNow=qAt(safeR);
  const px=x0+(safeR-minR)/(maxR-minR)*(x1-x0);
  const py=y1-(qNow/maxQ)*(y1-y0);
  point.setAttribute("cx",px.toFixed(2));
  point.setAttribute("cy",py.toFixed(2));
  guide.setAttribute("x1",px.toFixed(2));
  guide.setAttribute("x2",px.toFixed(2));
  guide.setAttribute("y1",py.toFixed(2));
  guide.setAttribute("y2",y1);
  label.textContent=`r=${safeR.toFixed(1).replace(".",",")} мм · Q=${qNow.toFixed(1).replace(".",",")} мл/мин`;
}
function setResult(value, unit, label){
  $("resultValue").textContent=value;
  $("resultUnit").textContent=unit;
  $("resultLabel").textContent=label;
}
function calcLab(){
  const gReadout=$("gReadout");
  gReadout.classList.toggle("hidden",lab!=="centrifuge");
  $("flowExtra").classList.toggle("hidden",lab!=="flow");
  $("centrifugeGraphCard").classList.toggle("hidden",lab!=="centrifuge");
  $("flowGraphCard").classList.toggle("hidden",lab!=="flow");
  $("flowGraphCard").style.display=lab==="flow"?"block":"none";

  if(lab==="centrifuge"){
    const rpm=Number($("rpm").value);
    const radiusM=Number($("radius").value)/100;
    const omega=2*Math.PI*rpm/60;
    const acceleration=omega*omega*radiusM;
    $("rpmOut").textContent=rpm.toLocaleString("ru-RU");
    $("radiusOut").textContent=radiusM.toFixed(2).replace(".",",");
    setResult(Math.round(acceleration).toLocaleString("ru-RU"),"м/с²","Центростремительное ускорение");
    $("gValue").textContent=(acceleration/9.80665).toLocaleString("ru-RU",{maximumFractionDigits:0})+" g";
    $("formula").innerHTML="a = ω²r <span>ω = 2πn / 60</span>";
    $("rotor").style.animationDuration=Math.max(.25,60/rpm*8)+"s";
    renderCentrifugeGraph(radiusM,rpm);
    $("labExplain").textContent="Образцы движутся по окружности вместе с ротором. Центростремительное ускорение направлено к оси вращения и растёт пропорционально квадрату частоты.";
  } else if(lab==="motion"){
    const speed=Number($("speed").value), time=Number($("time").value);
    const distance=speed*time;
    $("speedOut").textContent=speed.toLocaleString("ru-RU");
    $("timeOut").textContent=time.toLocaleString("ru-RU");
    setResult(distance.toFixed(1).replace(".",","),"м","Путь за выбранное время");
    $("formula").innerHTML="s = vt <span>Путь = скорость × время</span>";
    $("movingDot").style.left=Math.min(92,speed/10*92)+"%";
    $("labExplain").textContent="При равномерном прямолинейном движении путь прямо пропорционален скорости и времени движения.";
  } else {
    const radiusMm=Number($("vesselRadius").value);
    const pressurePa=Number($("pressure").value);
    const radius=radiusMm/1000;
    const length=0.5;              // учебная длина участка сосуда, м
    const viscosity=0.0035;        // динамическая вязкость модельной жидкости, Па·с
    const flowM3s=Math.PI*Math.pow(radius,4)*pressurePa/(8*viscosity*length);
    const flowMlMin=flowM3s*60*1e6;
    const meanVelocity=flowM3s/(Math.PI*radius*radius);
    $("vesselRadiusOut").textContent=radiusMm.toFixed(1).replace(".",",");
    $("pressureOut").textContent=pressurePa.toLocaleString("ru-RU");
    setResult(flowMlMin.toFixed(1).replace(".",","),"мл/мин","Объёмный расход (учебная модель)");
    $("formula").innerHTML="Q = πr⁴ΔP / (8ηL) <span>Закон Пуазёйля · ламинарное течение</span>";
    $("flowVelocity").textContent=meanVelocity.toFixed(2).replace(".",",")+" м/с";
    $("vessel").style.height=(64+radiusMm*9)+"px";
    $("bloodStream").style.height=(24+radiusMm*5)+"px";
    $("bloodStream").style.opacity=String(.5+Math.min(.4,pressurePa/5000));
    $("labExplain").textContent="Модель показывает ламинарное течение ньютоновской жидкости в жёстком цилиндрическом сосуде. Расход зависит от четвёртой степени радиуса и прямо пропорционален перепаду давления.";
    renderFlowGraph(radiusMm,pressurePa,viscosity,length);
    requestAnimationFrame(()=>renderFlowGraph(Number($("vesselRadius").value),Number($("pressure").value),viscosity,length));
  }
}
function switchLab(next){
  if(!["centrifuge","motion","flow"].includes(next))return;
  lab=next;
  document.querySelectorAll(".lab-tab").forEach(button=>{
    const active=button.dataset.lab===next;
    button.classList.toggle("active",active);
    button.setAttribute("aria-pressed",String(active));
  });
  const states={
    centrifuge:["centrifugeControls","centrifugeScene"],
    motion:["motionControls","motionScene"],
    flow:["flowControls","flowScene"]
  };
  ["centrifugeControls","motionControls","flowControls","centrifugeScene","motionScene","flowScene"].forEach(id=>{
    $(id).classList.add("hidden");
  });
  states[next].forEach(id=>$(id).classList.remove("hidden"));
  $("flowGraphCard").style.display=next==="flow"?"block":"none";
  $("controlTitle").textContent=next==="centrifuge"?"Параметры центрифуги":next==="motion"?"Параметры движения":"Параметры потока";
  $("labMode").textContent=next==="centrifuge"?"ЭКСПЕРИМЕНТ 01":next==="motion"?"ЭКСПЕРИМЕНТ 02":"ЭКСПЕРИМЕНТ 03";
  $("questionTitle").textContent=next==="centrifuge"
    ?"Как изменится ускорение, если увеличить частоту вращения в 2 раза?"
    :next==="motion"
    ?"Как изменится путь, если при той же скорости увеличить время в 2 раза?"
    :"Что произойдёт с расходом, если радиус сосуда увеличить в 2 раза?";
  $("questionText").textContent=next==="centrifuge"
    ?"Измени частоту вращения. При постоянном радиусе ускорение зависит от квадрата частоты."
    :next==="motion"
    ?"Измени время движения. При постоянной скорости путь изменяется прямо пропорционально времени."
    :"Сравни два значения радиуса при неизменных давлении, вязкости и длине сосуда. В модели Пуазёйля расход пропорционален r⁴.";
  calcLab();
  if(next==="flow"){
    requestAnimationFrame(()=>renderFlowGraph(Number($("vesselRadius").value),Number($("pressure").value),0.0035,0.5));
  }
}
document.querySelectorAll(".lab-tab[data-lab]").forEach(button=>{
  button.addEventListener("click",()=>switchLab(button.dataset.lab));
});
["rpm","radius","speed","time","vesselRadius","pressure"].forEach(id=>{
  $(id).addEventListener("input",calcLab);
});
["vesselRadius","pressure"].forEach(id=>{
  $(id).addEventListener("input",()=>{
    if(lab==="flow"){
      const r=Number($("vesselRadius").value);
      const p=Number($("pressure").value);
      requestAnimationFrame(()=>renderFlowGraph(r,p,0.0035,0.5));
    }
  });
});
$("resetLab").addEventListener("click",()=>{
  $("rpm").value=3000; $("radius").value=10;
  $("speed").value=2; $("time").value=5;
  $("vesselRadius").value=2; $("pressure").value=1500;
  calcLab();
});
document.querySelectorAll(".answer").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".answer").forEach(x=>x.disabled=true);if(b.dataset.answer==="b"){b.classList.add("correct");$("quizFeedback").textContent="Верно! Ускорение пропорционально квадрату частоты вращения: при увеличении частоты в 2 раза ускорение увеличится в 4 раза."}else{b.classList.add("wrong");document.querySelector('[data-answer="b"]').classList.add("correct");$("quizFeedback").textContent="Не совсем. Вспомни формулу a = ω²r: ускорение зависит от квадрата угловой скорости. Правильный ответ — Б."}}));
$("nextQuestion").addEventListener("click",()=>{document.querySelectorAll(".answer").forEach(x=>{x.disabled=false;x.classList.remove("correct","wrong")});$("quizFeedback").textContent=""});
$("kinCheck").addEventListener("click",()=>{const answers={kinq1:"1",kinq2:"2",kinq3:"0"};let score=0,answered=0;for(const [q,answer] of Object.entries(answers)){const selected=document.querySelector(`input[name="${q}"]:checked`);if(selected){answered++;if(selected.value===answer)score++;}}const box=$("kinFeedback");if(answered<3){box.textContent="Ответь на все три вопроса, затем проверь результат.";return;}box.textContent=`Результат: ${score} из 3. `+(score===3?"Отлично! Основные понятия кинематики усвоены.":"Повтори материал и попробуй ещё раз.");if(score===3){const d=getDone();if(!d.includes(1))setDone([...d,1]);}});
$("lessonCheck").addEventListener("click",()=>{const answers={lq1:"b",lq2:"a",lq3:"b"};let score=0,answered=0;for(const [q,a] of Object.entries(answers)){const selected=document.querySelector(`input[name="${q}"]:checked`);if(selected){answered++;if(selected.value===a)score++;}}const box=$("lessonFeedback");if(answered<3){box.textContent="Ответь на все три вопроса, затем проверь результат.";return;}box.textContent=`Результат: ${score} из 3. `+(score===3?"Отлично! Ты освоил основные положения темы.":"Повтори материал и попробуй ещё раз.");if(score===3){const d=getDone();if(!d.includes(0))setDone([...d,0]);}});
$("connection").textContent=navigator.onLine?"Подключение активно":"Автономный режим";
window.addEventListener("online",()=>$("connection").textContent="Подключение активно");window.addEventListener("offline",()=>$("connection").textContent="Автономный режим");
renderTopics();updateProgress();renderTerms();switchLab("centrifuge");
if("serviceWorker" in navigator && location.protocol!=="file:"){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}))}
