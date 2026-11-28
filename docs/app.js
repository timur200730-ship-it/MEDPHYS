const topics=[
["Физика — наука о природе","Введение в физику и методы научного познания."],
["Основы кинематики","Раздел 1 · Механика · Тема 1.1 · 6 академических часов."],
["Основы динамики","Раздел 1 · Механика · Тема 1.2 · 6 академических часов."],
["Практическое занятие № 1","Решение задач по теме «Кинематика» · 2 академических часа."],
["Практическое занятие № 2","Решение задач на движение тела под действием нескольких сил · 2 академических часа."],
["Законы сохранения","Раздел 1 · Механика · Тема 1.3 · 2 академических часа."],
["Основы молекулярно-кинетической теории","Раздел 2 · Молекулярная физика и термодинамика · Тема 2.1 · 4 академических часа."],
["Практическое занятие № 3","Решение задач на уравнение состояния идеального газа, изопроцессы в газах · 2 академических часа."],
["Основы термодинамики","Раздел 2 · Молекулярная физика и термодинамика · Тема 2.2 · 4 академических часа."],
["Практическое занятие № 4","Решение задач на расчёт количества теплоты и составление уравнения теплового баланса · 2 академических часа."],
["Агрегатные состояния вещества и фазовые переходы","Раздел 2 · Молекулярная физика и термодинамика · Тема 2.3 · 2 академических часа."],
["Контрольная работа № 1","Контроль по разделу 2 · 2 академических часа."]
];
const terms=[
["Ускорение","Векторная физическая величина, характеризующая быстроту изменения скорости тела."],
["Скорость","Физическая величина, показывающая, какое перемещение совершает тело за единицу времени."],
["Траектория","Линия, по которой движется тело."],
["Частота вращения","Число полных оборотов за единицу времени."],
["Угловая скорость","Величина, характеризующая быстроту изменения угла поворота."],
["Центростремительное ускорение","Ускорение при движении по окружности, направленное к её центру."],
["Радиус","Расстояние от центра окружности до её точки."],
["Давление","Физическая величина, равная отношению силы, действующей перпендикулярно поверхности, к площади этой поверхности."],
["Инерция","Явление сохранения телом состояния покоя или равномерного прямолинейного движения при нулевой равнодействующей сил."],
["Равнодействующая сила","Векторная сумма всех сил, действующих на тело."],
["Сила тяжести","Сила, с которой Земля или другое небесное тело притягивает объект."],
["Сила упругости","Сила, возникающая при деформации и направленная к восстановлению исходной формы тела."],
["Сила трения","Сила, препятствующая относительному движению соприкасающихся поверхностей."],
["Невесомость","Состояние, при котором вес тела равен нулю, то есть тело не действует на опору или подвес."]
];
const pages={overview:"Обзор",program:"Учебная программа","lesson-physics":"Физика — наука о природе","lesson-kinematics":"Основы кинематики","lesson-dynamics":"Основы динамики","practice-kinematics":"Практическое занятие № 1","practice-dynamics":"Практическое занятие № 2","lesson-conservation":"Законы сохранения","lesson-molecular":"Основы молекулярно-кинетической теории","control-molecular":"Контрольная работа № 1","practice-gas-laws":"Практическое занятие № 3",lab:"Виртуальная лаборатория",practice:"Практикум",glossary:"Словарь терминов"};
const $=id=>document.getElementById(id);

const themeButton=$("themeToggle");
function applyTheme(theme){
  const light=theme==="light";
  document.documentElement.dataset.theme=light?"light":"dark";
  if(themeButton){
    themeButton.querySelector(".theme-icon").textContent=light?"☾":"☀";
    themeButton.querySelector(".theme-label").textContent=light?"Тёмная тема":"Светлая тема";
    themeButton.setAttribute("aria-label",light?"Включить тёмную тему":"Включить светлую тему");
    themeButton.title=light?"Переключить на тёмную тему":"Переключить на светлую тему";
  }
}
let savedTheme="dark";
try{savedTheme=localStorage.getItem("medphys-theme")||"dark"}catch{}
applyTheme(savedTheme);
if(themeButton)themeButton.addEventListener("click",()=>{
  const next=document.documentElement.dataset.theme==="light"?"dark":"light";
  applyTheme(next);
  try{localStorage.setItem("medphys-theme",next)}catch{}
});

const courseSequence=[
  ["lesson-physics","Физика — наука о природе"],
  ["lesson-kinematics","Основы кинематики"],
  ["practice-kinematics","Практическое занятие № 1"],
  ["lesson-dynamics","Основы динамики"],
  ["practice-dynamics","Практическое занятие № 2"],
  ["lesson-conservation","Законы сохранения"],
  ["lesson-molecular","Основы молекулярно-кинетической теории"],
  ["practice-gas-laws","Практическое занятие № 3"],
  ["lesson-thermo","Основы термодинамики"],
  ["practice-heat","Практическое занятие № 4"],
  ["lesson-phase","Агрегатные состояния вещества и фазовые переходы"],
  ["control-molecular","Контрольная работа № 1"]
];
function renderCourseNavigation(name){
  const index=courseSequence.findIndex(item=>item[0]===name);
  if(index<0)return;
  const page=$("page-"+name), layout=page?.querySelector(".lesson-layout");
  if(!layout)return;
  let nav=layout.querySelector(".lesson-nav");
  if(!nav){nav=document.createElement("nav");nav.className="lesson-nav";nav.setAttribute("aria-label","Переход между темами курса");layout.appendChild(nav);}
  const previous=courseSequence[index-1], next=courseSequence[index+1];
  nav.innerHTML=`<div class="lesson-nav-side">${previous?`<button class="secondary-btn lesson-nav-button" type="button" data-course-target="${previous[0]}"><span aria-hidden="true">←</span><span><small>Предыдущий материал</small><b>${previous[1]}</b></span></button>`:""}</div><div class="lesson-nav-side lesson-nav-next">${next?`<button class="secondary-btn lesson-nav-button" type="button" data-course-target="${next[0]}"><span><small>Следующий материал</small><b>${next[1]}</b></span><span aria-hidden="true">→</span></button>`:""}</div>`;
  nav.querySelectorAll("[data-course-target]").forEach(button=>button.addEventListener("click",()=>showPage(button.dataset.courseTarget)));
}
function showPage(name){document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id==="page-"+name));document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===name));$("crumbName").textContent=pages[name]||"Обзор";$("sidebar").classList.remove("open");renderCourseNavigation(name);window.scrollTo(0,0)}
document.querySelectorAll("[data-page]").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.page)));
$("menuBtn").addEventListener("click",()=>$("sidebar").classList.toggle("open"));
function getDone(){try{return JSON.parse(localStorage.getItem("medphys-done")||"[]")}catch{return []}}
function setDone(a){localStorage.setItem("medphys-done",JSON.stringify(a));renderTopics();updateProgress()}
function renderTopics(){
  const done=getDone();
  const groups=[
    {title:"Введение в физику",items:[{i:0,num:"01"}]},
    {title:"Раздел 1 · Механика · 18 академических часов",items:[
      {i:1,num:"1.1"},{i:3,num:"ПЗ 1"},{i:2,num:"1.2"},{i:4,num:"ПЗ 2"},{i:5,num:"1.3"}
    ]},
    {title:"Раздел 2 · Молекулярная физика и термодинамика · 16 академических часов",items:[{i:6,num:"2.1"},{i:7,num:"ПЗ 3"},{i:8,num:"2.2"},{i:9,num:"ПЗ 4"},{i:10,num:"2.3"},{i:11,num:"КР 1"}]}
  ];
  const routes={0:"lesson-physics",1:"lesson-kinematics",2:"lesson-dynamics",3:"practice-kinematics",4:"practice-dynamics",5:"lesson-conservation",6:"lesson-molecular",7:"practice-gas-laws",8:"lesson-thermo",9:"practice-heat",10:"lesson-phase",11:"control-molecular"};
  const hours={0:"2 академических часа",1:"6 академических часов",2:"6 академических часов",3:"2 академических часа",4:"2 академических часа",5:"2 академических часа",6:"4 академических часа",7:"2 академических часа",8:"4 академических часа",9:"2 академических часа",10:"2 академических часа",11:"2 академических часа"};
  $("topicList").innerHTML=groups.map(g=>`<section class="program-group"><h2>${g.title}</h2><div class="program-group-items">${g.items.map(item=>{
    const i=item.i,t=topics[i];
    return `<article class="topic ${done.includes(i)?"done":""}"><div class="topic-num">${item.num}</div><div class="topic-info"><h3>${t[0]}</h3><p>${t[1]}</p><small class="topic-hours">${hours[i]} · Материал открыт</small></div><button data-topic="${i}">Открыть →</button></article>`;
  }).join("")}</div></section>`).join("");
  document.querySelectorAll("[data-topic]").forEach(b=>b.addEventListener("click",()=>{
    const i=Number(b.dataset.topic);showPage(routes[i]||"program");
  }));
}
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
  const qAt=(rMm, pressure=pressurePa)=>{
    const r=rMm/1000;
    return Math.PI*Math.pow(r,4)*pressure/(8*viscosity*length)*60*1e6;
  };
  // Единая шкала: верхняя граница соответствует r=4 мм и ΔP=3000 Па.
  // Поэтому при изменении давления график не перенормируется автоматически.
  const maxQ=qAt(maxR,3000);
  if(!Number.isFinite(maxQ)||maxQ<=0)return;
  const pts=[];
  for(let i=0;i<=100;i++){
    const r=minR+(maxR-minR)*i/100;
    const x=x0+(r-minR)/(maxR-minR)*(x1-x0);
    const y=y1-Math.min(1,qAt(r)/maxQ)*(y1-y0);
    pts.push(`${i===0?"M":"L"}${x.toFixed(2)},${y.toFixed(2)}`);
  }
  curve.setAttribute("d",pts.join(" "));
  const safeR=Math.min(maxR,Math.max(minR,Number(radiusMm)));
  const qNow=qAt(safeR);
  const px=x0+(safeR-minR)/(maxR-minR)*(x1-x0);
  const py=y1-Math.min(1,qNow/maxQ)*(y1-y0);
  point.setAttribute("cx",px.toFixed(2));
  point.setAttribute("cy",py.toFixed(2));
  guide.setAttribute("x1",px.toFixed(2));
  guide.setAttribute("x2",px.toFixed(2));
  guide.setAttribute("y1",py.toFixed(2));
  guide.setAttribute("y2",y1);
  label.textContent=`r=${safeR.toFixed(1).replace(".",",")} мм · ΔP=${pressurePa} Па · Q=${qNow.toFixed(1).replace(".",",")} мл/мин`;
}
function renderFlowPressureGraph(radiusMm, pressurePa, viscosity, length){
  const curve=$("flowPressureCurve"),point=$("flowPressurePoint"),guide=$("flowPressureGuide"),label=$("flowPressureCurrent");
  if(!curve||!point||!guide||!label)return;
  const x0=58,x1=610,y0=22,y1=184,minP=500,maxP=3000;
  const qAt=p=>Math.PI*Math.pow(radiusMm/1000,4)*p/(8*viscosity*length)*60*1e6;
  const maxQ=qAt(maxP);
  if(!Number.isFinite(maxQ)||maxQ<=0)return;
  const pts=[];
  for(let i=0;i<=100;i++){
    const p=minP+(maxP-minP)*i/100;
    const x=x0+(p-minP)/(maxP-minP)*(x1-x0);
    const y=y1-qAt(p)/maxQ*(y1-y0);
    pts.push((i?"L":"M")+x.toFixed(2)+","+y.toFixed(2));
  }
  curve.setAttribute("d",pts.join(" "));
  const safeP=Math.min(maxP,Math.max(minP,pressurePa)),q=qAt(safeP);
  const px=x0+(safeP-minP)/(maxP-minP)*(x1-x0),py=y1-q/maxQ*(y1-y0);
  point.setAttribute("cx",px.toFixed(2));point.setAttribute("cy",py.toFixed(2));
  guide.setAttribute("x1",px.toFixed(2));guide.setAttribute("x2",px.toFixed(2));
  guide.setAttribute("y1",py.toFixed(2));guide.setAttribute("y2",y1);
  label.textContent="ΔP="+safeP+" Па · r="+radiusMm.toFixed(1).replace(".",",")+" мм";
  $("flowPressureFlowValue").textContent=q.toFixed(1).replace(".",",")+" мл/мин";
  const ratio=safeP/1500;
  $("flowPressureRatioValue").textContent=ratio.toLocaleString("ru-RU",{maximumFractionDigits:2})+"×";
  $("flowPressureText").textContent=ratio>1
    ?"Перепад выше 1500 Па: при том же радиусе модельный расход увеличивается прямо пропорционально ΔP."
    :ratio<1
    ?"Перепад ниже 1500 Па: при том же радиусе модельный расход уменьшается прямо пропорционально ΔP."
    :"Перепад равен 1500 Па — базовая точка сравнения для выбранного радиуса.";
}
function setResult(value, unit, label){
  $("resultValue").textContent=value;
  $("resultUnit").textContent=unit;
  $("resultLabel").textContent=label;
}

function renderDynamicsGraph(mass, netForce){
  const curve=$("dynGraphCurve"),point=$("dynGraphPoint"),guide=$("dynGraphGuide"),label=$("dynGraphCurrent");
  if(!curve||!point||!guide||!label)return;
  const x0=58,x1=610,y0=22,y1=184,minF=-100,maxF=200;
  const xAt=f=>x0+(f-minF)/(maxF-minF)*(x1-x0);
  const maxA=maxF/mass,minA=minF/mass;
  const yAt=a=>y0+(maxA-a)/(maxA-minA)*(y1-y0);
  const pts=[];
  for(let i=0;i<=120;i++){
    const f=minF+(maxF-minF)*i/120;
    pts.push((i?"L":"M")+xAt(f).toFixed(2)+","+yAt(f/mass).toFixed(2));
  }
  curve.setAttribute("d",pts.join(" "));
  const f=Math.max(minF,Math.min(maxF,netForce)),a=f/mass,px=xAt(f),py=yAt(a),zeroY=yAt(0);
  point.setAttribute("cx",px.toFixed(2));point.setAttribute("cy",py.toFixed(2));
  guide.setAttribute("x1",px.toFixed(2));guide.setAttribute("x2",px.toFixed(2));
  guide.setAttribute("y1",py.toFixed(2));guide.setAttribute("y2",zeroY.toFixed(2));
  label.textContent=`ΣF=${f.toFixed(0)} Н · a=${a.toFixed(2).replace(".",",")} м/с²`;
}
let motionState={elapsed:0,duration:5,speed:2,running:false,raf:0,last:0};
function stopMotionAnimation(){motionState.running=false;if(motionState.raf)cancelAnimationFrame(motionState.raf);motionState.raf=0;}
function updateMotionView(t){const elapsed=Math.max(0,Math.min(motionState.duration,t)),x=motionState.speed*elapsed;const dot=$("movingDot");if(dot){dot.style.left=Math.min(100,x)+"%";dot.setAttribute("aria-label",`Положение ${x.toFixed(1)} метра`);}$("motionTimeNow").textContent=elapsed.toFixed(1).replace(".",",")+" с";$("motionXNow").textContent="x = "+x.toFixed(1).replace(".",",")+" м";$("motionVNow").textContent="v = "+motionState.speed+" м/с";const distanceLabel=$("motionDistanceLabel");if(distanceLabel)distanceLabel.textContent=`Пройденный путь: ${x.toFixed(1).replace(".",",")} м за ${elapsed.toFixed(1).replace(".",",")} с`;$("motionPlay").textContent=elapsed>=motionState.duration?"↻ Повторить":motionState.running?"▶ Идёт движение":"▶ Продолжить";$("motionPause").disabled=!motionState.running;const tl=$("motionTimeline");tl.innerHTML="";for(let k=0;k<=motionState.duration;k++){const e=document.createElement("span");e.textContent=k+" с";e.className=k<=elapsed?"passed":"";tl.appendChild(e);}const positionPoint=$("motionPositionPoint"),velocityPoint=$("motionVelocityPoint");if(positionPoint){positionPoint.setAttribute("cx",(58+552*elapsed/motionState.duration).toFixed(1));positionPoint.setAttribute("cy",(180-150*x/Math.max(1,motionState.speed*motionState.duration)).toFixed(1));}if(velocityPoint)velocityPoint.setAttribute("cx",(58+552*elapsed/motionState.duration).toFixed(1));}
function renderMotionGraphs(speed,duration,elapsed){const vy=180-(speed/10)*150;$("motionPositionCurve").setAttribute("d","M58 180 L610 30");$("motionVelocityCurve").setAttribute("d",`M58 ${vy} L610 ${vy}`);$("motionTimeAxis").textContent=duration+" с";$("motionVelocityTimeAxis").textContent=duration+" с";motionState.elapsed=elapsed;motionState.duration=duration;motionState.speed=speed;updateMotionView(elapsed);}
function motionFrame(now){if(!motionState.running)return;if(!motionState.last)motionState.last=now;motionState.elapsed=Math.min(motionState.duration,motionState.elapsed+(now-motionState.last)/1000);motionState.last=now;updateMotionView(motionState.elapsed);if(motionState.elapsed>=motionState.duration){stopMotionAnimation();updateMotionView(motionState.duration);return;}motionState.raf=requestAnimationFrame(motionFrame);}
function startMotionAnimation(){if(motionState.elapsed>=motionState.duration)motionState.elapsed=0;motionState.running=true;motionState.last=0;updateMotionView(motionState.elapsed);motionState.raf=requestAnimationFrame(motionFrame);}
function calcDynamics(){
  const m=Number($("dynMass").value),f=Number($("dynForce").value),fr=Number($("dynFriction").value),net=f-fr,a=net/m;
  $("dynMassOut").textContent=m;$("dynForceOut").textContent=f;$("dynFrictionOut").textContent=fr;
  setResult(a.toFixed(2).replace(".",","),"м/с²","Ускорение тележки (учебная модель)");
  $("formula").innerHTML="ΣF = ma <span>Второй закон Ньютона</span>";
  $("formulaLegend").classList.remove("hidden");
  $("formulaLegend").innerHTML="<b>Обозначения:</b> Σ (сигма) — сумма; F — сила; m — масса тела; a — ускорение. ΣF — равнодействующая всех сил.";

  $("gReadout").classList.add("hidden");$("flowExtra").classList.add("hidden");
  const forceLen=38+Math.min(1,f/200)*125,frictionLen=38+Math.min(1,fr/100)*125;
  $("dynForceArrow").setAttribute("d",`M395 145 H${395+forceLen} M${380+forceLen} 132 L${395+forceLen} 145 L${380+forceLen} 158`);
  $("dynFrictionArrow").setAttribute("d",`M205 145 H${205-frictionLen} M${220-frictionLen} 132 L${205-frictionLen} 145 L${220-frictionLen} 158`);
  $("dynForceArrow").style.opacity=f===0?".12":"1";$("dynFrictionArrow").style.opacity=fr===0?".12":"1";
  $("dynForceLabel").textContent=`F тяги · ${f} Н`;$("dynFrictionLabel").textContent=`F сопр. · ${fr} Н`;
  const acc=$("dynAccelerationArrow"),accLabel=$("dynAccelerationLabel");
  if(net>0){acc.setAttribute("d","M300 82 H430 M414 68 L432 82 L414 96");acc.style.opacity="1";accLabel.setAttribute("x","440");}
  else if(net<0){acc.setAttribute("d","M300 82 H170 M186 68 L168 82 L186 96");acc.style.opacity="1";accLabel.setAttribute("x","72");}
  else{acc.style.opacity=".12";accLabel.setAttribute("x","440");}
  accLabel.textContent=`a = ${a.toFixed(2).replace(".",",")} м/с²`;
  $("dynSceneCaption").textContent=net>0?"Равнодействующая направлена вправо. При начальной скорости вправо тележка разгоняется.":net<0?"Равнодействующая направлена влево. При начальной скорости вправо тележка сначала замедляется; при движении влево — разгоняется.":"Силы уравновешены: ускорение равно нулю, скорость не изменяется.";
  $("labExplain").textContent=`Сила тяги: ${f} Н вправо. Сила сопротивления: ${fr} Н влево. Равнодействующая ΣF = ${net} Н. По второму закону Ньютона a = ΣF/m = ${a.toFixed(2).replace(".",",")} м/с². Направление ускорения совпадает с направлением равнодействующей.`;
  renderDynamicsGraph(m,net);
}
function calcLab(){
  const gReadout=$("gReadout");
  $("formulaLegend").classList.toggle("hidden",lab!=="dynamics");
  gReadout.classList.toggle("hidden",lab!=="centrifuge");
  $("flowExtra").classList.toggle("hidden",lab!=="flow");
  $("centrifugeGraphCard").classList.toggle("hidden",lab!=="centrifuge");
  $("flowGraphCard").classList.toggle("hidden",lab!=="flow");
  $("flowGraphCard").style.display=lab==="flow"?"block":"none";
  $("dynamicsGraphCard").classList.toggle("hidden",lab!=="dynamics");
  $("motionGraphCard").classList.toggle("hidden",lab!=="motion");
  $("dynamicsGraphCard").style.display=lab==="dynamics"?"block":"none";
  $("dynamicsControls").classList.toggle("hidden",lab!=="dynamics");
  $("dynamicsScene").classList.toggle("hidden",lab!=="dynamics");

  if(lab==="dynamics"){calcDynamics();return;}
  if(lab==="centrifuge"){
    const rpm=Number($("rpm").value);
    const radiusM=Number($("radius").value)/100;
    const omega=2*Math.PI*rpm/60;
    const acceleration=omega*omega*radiusM;
    $("rpmOut").textContent=rpm.toLocaleString("ru-RU");
    $("radiusOut").textContent=radiusM.toFixed(2).replace(".",",");
    setResult(Number(acceleration.toPrecision(3)).toLocaleString("ru-RU"),"м/с²","Центростремительное ускорение");
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
    if(motionState.running)stopMotionAnimation();
    motionState.elapsed=0;motionState.duration=time;motionState.speed=speed;
    renderMotionGraphs(speed,time,0);
    $("motionGraphCard").classList.remove("hidden");
    $("labExplain").textContent=`Равномерное движение: за каждую секунду тело проходит ${speed} м. За ${time} с путь составит ${distance} м. Координата отсчитывается от x₀ = 0; положительное направление выбрано вправо.`;
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
    const relativeFlow=Math.pow(radiusMm/2,4)*100;
    const resistanceFactor=Math.pow(2/radiusMm,4);
    $("flowRelativeValue").textContent=relativeFlow.toLocaleString("ru-RU",{maximumFractionDigits:1})+"%";
    $("flowResistanceValue").textContent=resistanceFactor.toLocaleString("ru-RU",{maximumFractionDigits:2})+"×";
    $("flowStenosisText").textContent=radiusMm<2
      ? "Просвет уже условной нормы: при том же перепаде давления расход уменьшается, а сопротивление резко возрастает."
      : radiusMm>2
      ? "Просвет шире условной нормы: при тех же условиях модельный расход возрастает, а сопротивление уменьшается."
      : "Радиус совпадает с условной точкой сравнения 2 мм. Изменение расхода и сопротивления отсчитывается от неё.";
    $("labExplain").textContent="Модель показывает ламинарное течение ньютоновской жидкости в жёстком цилиндрическом сосуде. Расход зависит от четвёртой степени радиуса и прямо пропорционален перепаду давления.";
    renderFlowGraph(radiusMm,pressurePa,viscosity,length);
    renderFlowPressureGraph(radiusMm,pressurePa,viscosity,length);
    requestAnimationFrame(()=>renderFlowGraph(Number($("vesselRadius").value),Number($("pressure").value),viscosity,length));
  }
}
function switchLab(next){
  if(!["centrifuge","motion","flow","dynamics"].includes(next))return;
  lab=next;
  const bloodLesson=$("centrifugeBloodLesson");
  if(bloodLesson)bloodLesson.classList.toggle("hidden",next!=="centrifuge");
  document.querySelectorAll(".lab-tab").forEach(button=>{
    const active=button.dataset.lab===next;
    button.classList.toggle("active",active);
    button.setAttribute("aria-pressed",String(active));
  });
  const states={
    centrifuge:["centrifugeControls","centrifugeScene"],
    motion:["motionControls","motionScene"],
    flow:["flowControls","flowScene"],
    dynamics:["dynamicsControls","dynamicsScene"]
  };
  ["centrifugeControls","motionControls","flowControls","dynamicsControls","centrifugeScene","motionScene","flowScene","dynamicsScene"].forEach(id=>{
    $(id).classList.add("hidden");
  });
  states[next].forEach(id=>$(id).classList.remove("hidden"));
  $("flowGraphCard").style.display=next==="flow"?"block":"none";
  $("controlTitle").textContent=next==="centrifuge"?"Параметры центрифуги":next==="motion"?"Параметры движения":next==="flow"?"Параметры потока":"Параметры динамики";
  $("labMode").textContent=next==="centrifuge"?"ЭКСПЕРИМЕНТ 01":next==="motion"?"ЭКСПЕРИМЕНТ 02":next==="flow"?"ЭКСПЕРИМЕНТ 03":"ЭКСПЕРИМЕНТ 04";
  $("questionTitle").textContent=next==="centrifuge"
    ?"Как изменится ускорение, если увеличить частоту вращения в 2 раза?"
    :next==="motion"
    ?"Как изменится путь, если при той же скорости увеличить время в 2 раза?"
    :next==="flow"
    ?"Как изменится объёмный расход, если увеличить радиус сосуда?"
    :"Что произойдёт с ускорением, если при той же массе увеличить равнодействующую силу в 2 раза?";
  $("questionText").textContent=next==="centrifuge"
    ?"Измени частоту вращения. При постоянном радиусе ускорение зависит от квадрата частоты."
    :next==="motion"
    ?"Измени время движения. При постоянной скорости путь изменяется прямо пропорционально времени."
    :next==="flow"
    ?"Меняй радиус сосуда, сохраняя давление, вязкость и длину неизменными. По закону Пуазёйля Q пропорционален r⁴."
    :"Меняй силу тяги и сопротивление. При постоянной массе ускорение прямо пропорционально равнодействующей силе.";
  if(next==="dynamics"){$("dynamicsExtra").classList.remove("hidden");setDynamicsMode(activeDynamicsMode);$("questionTitle").textContent="Как изменится ускорение, если равнодействующую силу увеличить в 2 раза?";$("questionText").textContent="Меняй силу тяги и сопротивление. При постоянной массе ускорение прямо пропорционально равнодействующей силе."}
  calcLab();
  if(next==="flow"){
    requestAnimationFrame(()=>renderFlowGraph(Number($("vesselRadius").value),Number($("pressure").value),0.0035,0.5));
    requestAnimationFrame(()=>renderFlowPressureGraph(Number($("vesselRadius").value),Number($("pressure").value),0.0035,0.5));
  }
}

const dynamicsModes={
  forces:{desc:"Измени две силы, направленные в противоположные стороны. Модель покажет их равнодействующую.",labels:["Сила вправо","Сила влево","Масса тела"],units:["Н","Н","кг"],min:[0,0,1],max:[100,100,50],step:[1,1,1],values:[50,20,10],medical:"В организме несколько мышц могут одновременно тянуть кости в разных направлениях. Модель помогает понять, почему важна не только величина, но и направление силы."},
  friction:{desc:"Измени силу прижатия и коэффициент трения. Сравни силу трения с приложенной тягой.",labels:["Сила прижатия","Коэффициент трения ×100","Сила тяги"],units:["Н","","Н"],min:[10,5,0],max:[200,80,200],step:[1,1,1],values:[100,30,40],medical:"Трение между стопой и опорой помогает человеку сохранять устойчивость при ходьбе. При скольжении сцепление уменьшается."},
  incline:{desc:"Измени угол наклона и массу тела. Наблюдай, как меняется составляющая силы тяжести вдоль плоскости.",labels:["Масса тела","Угол наклона","Коэффициент трения ×100"],units:["кг","°",""],min:[1,1,0],max:[100,60,80],step:[1,1,1],values:[10,25,10],medical:"При перемещении пациента на каталке по пандусу угол наклона влияет на составляющую силы тяжести вдоль поверхности и требуемое усилие."},
  atwood:{desc:"Измени массы двух грузов. Модель оценит ускорение идеальной системы с лёгкой нитью и невесомым блоком.",labels:["Масса груза 1","Масса груза 2","g (условно)"],units:["кг","кг","м/с²"],min:[1,1,1],max:[20,20,12],step:[1,1,0.1],values:[8,5,9.81],medical:"Это базовая учебная модель связанных тел. Она помогает понять натяжение нити и действие сил в системах перемещения грузов, в том числе в учебных моделях тракции."}
};
let activeDynamicsMode="forces";
function setDynamicsMode(mode){
 const cfg=dynamicsModes[mode]; if(!cfg)return; activeDynamicsMode=mode;
 document.querySelectorAll(".dynamics-subtab").forEach(b=>b.classList.toggle("active",b.dataset.dynmode===mode));
 $("dynExtraDescription").textContent=cfg.desc;
 for(let i=1;i<=3;i++){const n=i-1;$("dynExtraLabel"+i).textContent=cfg.labels[n];$("dynExtraOut"+i).textContent=String(cfg.values[n]).replace(".",",");$("dynExtraUnit"+i).textContent=cfg.units[n];$("dynExtra"+i).min=cfg.min[n];$("dynExtra"+i).max=cfg.max[n];$("dynExtra"+i).step=cfg.step[n];$("dynExtra"+i).value=cfg.values[n];}
 $("dynExtraMedical").innerHTML="<b>Связь с медициной.</b> "+cfg.medical;
 calcDynamicsExtra();
}
function calcDynamicsExtra(){
 const mode=activeDynamicsMode,cfg=dynamicsModes[mode],v=[1,2,3].map(i=>Number($("dynExtra"+i).value));
 for(let i=1;i<=3;i++)$("dynExtraOut"+i).textContent=String(v[i-1]).replace(".",",");
 let result="",caption="",f1=0,f2=0,unit="Н";
 if(mode==="forces"){
   const net=v[0]-v[1],acc=net/v[2];result=`ΣF = ${net.toFixed(1).replace(".",",")} Н · a = ${acc.toFixed(2).replace(".",",")} м/с²`;
   caption=net>0?"Равнодействующая направлена вправо":net<0?"Равнодействующая направлена влево":"Силы уравновешены";f1=v[0];f2=v[1];
 }else if(mode==="friction"){
   const friction=.01*v[1]*v[0],net=v[2]-friction;result=`Fтр ≈ ${friction.toFixed(1).replace(".",",")} Н · ΣF = ${net.toFixed(1).replace(".",",")} Н`;
   caption=net>0?"Тяга превышает модельную силу трения":net<0?"Силы трения достаточно, чтобы противодействовать тяге":"Тяга и трение уравновешены";f1=v[2];f2=friction;
 }else if(mode==="incline"){
   const theta=v[1]*Math.PI/180,parallel=v[0]*9.81*Math.sin(theta),normal=v[0]*9.81*Math.cos(theta),fr=.01*v[2]*normal,net=parallel-fr;
   result=`F∥ = ${parallel.toFixed(1).replace(".",",")} Н · Fтр ≈ ${fr.toFixed(1).replace(".",",")} Н · ΣF = ${net.toFixed(1).replace(".",",")} Н`;
   caption=`Составляющая силы тяжести вдоль плоскости: ${parallel.toFixed(1).replace(".",",")} Н`;f1=parallel;f2=fr;
 }else{
   const acc=(v[0]-v[1])*v[2]/(v[0]+v[1]),tension=(2*v[0]*v[1]*v[2])/(v[0]+v[1]);
   result=`a = ${acc.toFixed(2).replace(".",",")} м/с² · T = ${tension.toFixed(1).replace(".",",")} Н`;
   caption=v[0]===v[1]?"Массы равны — система в равновесии":v[0]>v[1]?"Груз 1 движется вниз":"Груз 2 движется вниз";f1=v[0]*v[2];f2=v[1]*v[2];unit="Н";
 }
 $("dynExtraResult").textContent=result+" · "+caption;
 const scale=Math.max(1,f1,f2),len1=60+Math.min(150,f1/scale*150),len2=60+Math.min(150,f2/scale*150);
 const p1=$("dynExtraVector1"),p2=$("dynExtraVector2");
 p1.setAttribute("d",`M360 110 H${Math.min(570,360+len1)} M${Math.min(554,360+len1-16)} 96 L${Math.min(572,360+len1+2)} 110 L${Math.min(554,360+len1-16)} 124`);
 p2.setAttribute("d",`M260 110 H${Math.max(50,260-len2)} M${Math.max(66,260-len2+16)} 96 L${Math.max(48,260-len2-2)} 110 L${Math.max(66,260-len2+16)} 124`);
 if(mode==="incline"){
   $("dynExtraVisual").querySelector("svg").setAttribute("aria-label","Схема наклонной плоскости и действующих сил");
   $("dynExtraVisual").querySelector("svg").innerHTML=`<path d="M70 150 L540 ${150- Math.tan(v[1]*Math.PI/180)*300} L540 150 Z" fill="#263f49" stroke="#8ca9a5" stroke-width="3"/><rect x="275" y="${Math.max(28,120-v[1]*1.1)}" width="70" height="42" rx="8" fill="#dce8e3" stroke="#62bfae" stroke-width="3" transform="rotate(${-v[1]} 310 140)"/><text x="80" y="178" fill="#dce6e1" font-size="13">Угол ${v[1]}°</text><text x="310" y="25" fill="#dfb66b" text-anchor="middle" font-size="14">F тяжести</text>`;
 }else if(mode==="atwood"){
   $("dynExtraVisual").querySelector("svg").innerHTML=`<path d="M180 24 H440 M310 24 V42" stroke="#91a9a8" stroke-width="7" stroke-linecap="round"/><circle cx="310" cy="68" r="27" fill="#203943" stroke="#dfb66b" stroke-width="5"/><circle cx="310" cy="68" r="5" fill="#dfb66b"/><path d="M283 68 V139 Q283 150 270 150 M337 68 V139 Q337 150 350 150" stroke="#e4e9e4" stroke-width="3" fill="none"/><rect x="239" y="150" width="62" height="34" rx="7" fill="#dce8e3" stroke="#62bfae" stroke-width="3"/><rect x="319" y="150" width="62" height="34" rx="7" fill="#dce8e3" stroke="#62bfae" stroke-width="3"/><text x="270" y="172" text-anchor="middle" fill="#20323a" font-size="14" font-weight="700">m₁</text><text x="350" y="172" text-anchor="middle" fill="#20323a" font-size="14" font-weight="700">m₂</text><text x="270" y="142" text-anchor="middle" fill="#dfb66b" font-size="12">${v[0]} кг</text><text x="350" y="142" text-anchor="middle" fill="#dfb66b" font-size="12">${v[1]} кг</text><path d="${v[0]===v[1]?"":v[0]>v[1]?"M210 122 V165 M200 153 L210 167 L220 153":"M210 165 V122 M200 134 L210 120 L220 134"}" stroke="#dfb66b" stroke-width="3" fill="none"/><path d="${v[0]===v[1]?"":v[1]>v[0]?"M410 122 V165 M400 153 L410 167 L420 153":"M410 165 V122 M400 134 L410 120 L420 134"}" stroke="#d87578" stroke-width="3" fill="none"/><text x="310" y="14" text-anchor="middle" fill="#dfb66b" font-size="12">Неподвижная опора · блок · лёгкая нить</text>`;
 }else{
   $("dynExtraVisual").querySelector("svg").innerHTML=`<line x1="35" y1="145" x2="585" y2="145" stroke="#789196" stroke-width="3"/><rect x="260" y="92" width="100" height="52" rx="10" fill="#dce8e3" stroke="#62bfae" stroke-width="3"/><text x="310" y="124" text-anchor="middle" fill="#20323a" font-size="18" font-weight="700">ТЕЛО</text><path d="M360 110 H${Math.min(570,360+len1)}" stroke="#dfb66b" stroke-width="6"/><path d="M260 110 H${Math.max(50,260-len2)}" stroke="#d87578" stroke-width="6"/><text x="490" y="80" fill="#dfb66b" font-size="15">F₁</text><text x="105" y="80" fill="#d87578" font-size="15">F₂</text>`;
 }
}
document.querySelectorAll(".dynamics-subtab").forEach(b=>b.addEventListener("click",()=>setDynamicsMode(b.dataset.dynmode)));
["dynExtra1","dynExtra2","dynExtra3"].forEach(id=>$(id).addEventListener("input",calcDynamicsExtra));

document.querySelectorAll(".lab-tab[data-lab]").forEach(button=>{
  button.addEventListener("click",()=>switchLab(button.dataset.lab));
});
["rpm","radius","speed","time","vesselRadius","pressure","dynMass","dynForce","dynFriction"].forEach(id=>{
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
document.addEventListener("click",event=>{
  const button=event.target.closest("#motionPlay,#motionPause,#motionReset");
  if(!button)return;
  event.preventDefault();
  if(button.id==="motionPlay"){
    if(motionState.running)return;
    if(motionState.elapsed>=motionState.duration)motionState.elapsed=0;
    motionState.running=true;motionState.last=0;
    updateMotionView(motionState.elapsed);
    motionState.raf=requestAnimationFrame(motionFrame);
  }else if(button.id==="motionPause"){
    stopMotionAnimation();updateMotionView(motionState.elapsed);
  }else{
    stopMotionAnimation();motionState.elapsed=0;updateMotionView(0);
  }
});
document.addEventListener("visibilitychange",()=>{if(document.hidden&&motionState.running){stopMotionAnimation();updateMotionView(motionState.elapsed);}});
$("resetLab").addEventListener("click",()=>{
  stopMotionAnimation();motionState.elapsed=0;$("rpm").value=3000; $("radius").value=10;
  $("speed").value=2; $("time").value=5;
  $("vesselRadius").value=2; $("pressure").value=1500;
  $("dynMass").value=20;$("dynForce").value=50;$("dynFriction").value=10;
  calcLab();setDynamicsMode(activeDynamicsMode);
});
document.querySelectorAll(".answer").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".answer").forEach(x=>x.disabled=true);if(b.dataset.answer==="b"){b.classList.add("correct");$("quizFeedback").textContent="Верно! Ускорение пропорционально квадрату частоты вращения: при увеличении частоты в 2 раза ускорение увеличится в 4 раза."}else{b.classList.add("wrong");document.querySelector('[data-answer="b"]').classList.add("correct");$("quizFeedback").textContent="Не совсем. Вспомни формулу a = ω²r: ускорение зависит от квадрата угловой скорости. Правильный ответ — Б."}}));
$("nextQuestion").addEventListener("click",()=>{document.querySelectorAll(".answer").forEach(x=>{x.disabled=false;x.classList.remove("correct","wrong")});$("quizFeedback").textContent=""});
$("kinCheck").addEventListener("click",()=>{const answers={kinq1:"1",kinq2:"1",kinq3:"2",kinq4:"0",kinq5:"1",kinq6:"2"};let score=0,answered=0;for(const [q,answer] of Object.entries(answers)){const selected=document.querySelector(`input[name="${q}"]:checked`);if(selected){answered++;if(selected.value===answer)score++;}}const box=$("kinFeedback");if(answered<6){box.textContent="Ответь на все шесть вопросов, затем проверь результат.";return;}box.textContent=`Результат: ${score} из 6. `+(score>=5?"Отлично! Тема освоена на необходимом уровне.":"Повтори материал и попробуй ещё раз.");if(score>=5){const d=getDone();if(!d.includes(1))setDone([...d,1]);}});

$("dynCheck").addEventListener("click",()=>{const ans={dynq1:"b",dynq2:"a",dynq3:"b",dynq4:"a"};let score=0,n=0;for(const [q,v] of Object.entries(ans)){const x=document.querySelector(`input[name="${q}"]:checked`);if(x){n++;if(x.value===v)score++;}}const box=$("dynFeedback");if(n<4){box.textContent="Ответь на все четыре вопроса.";return;}box.textContent=`Результат: ${score} из 4. `+(score===4?"Отлично! Основные законы динамики усвоены.":"Повтори соответствующий раздел и попробуй ещё раз.");if(score===4){const d=getDone();if(!d.includes(2))setDone([...d,2]);}});

$("gasPracticeCheck").addEventListener("click",()=>{const answers={gpq1:"b",gpq2:"a",gpq3:"a"};let score=0,n=0;for(const [q,a] of Object.entries(answers)){const x=document.querySelector(`input[name="${q}"]:checked`);if(x){n++;if(x.value===a)score++;}}const box=$("gasPracticeFeedback");if(n<3){box.textContent="Ответь на все три вопроса.";return;}box.textContent=`Результат: ${score} из 3. `+(score===3?"Отлично! Газовые законы усвоены.":"Повтори формулы изопроцессов и попробуй ещё раз.");});
$("phaseCheck").addEventListener("click",()=>{const answers={phq1:"b",phq2:"a",phq3:"a",phq4:"a"};let score=0,n=0;for(const [q,a] of Object.entries(answers)){const x=document.querySelector(`input[name="${q}"]:checked`);if(x){n++;if(x.value===a)score++;}}const box=$("phaseFeedback");if(n<4){box.textContent="Ответь на все четыре вопроса.";return;}box.textContent=`Результат: ${score} из 4. `+(score===4?"Отлично!":"Повтори материал и попробуй ещё раз.");if(score===4){const d=getDone();if(!d.includes(10))setDone([...d,10]);}});
$("heatPracticeCheck").addEventListener("click",()=>{const answers={hpq1:"a",hpq2:"a",hpq3:"a"};let score=0,n=0;for(const [q,a] of Object.entries(answers)){const x=document.querySelector(`input[name="${q}"]:checked`);if(x){n++;if(x.value===a)score++;}}const box=$("heatPracticeFeedback");if(n<3){box.textContent="Ответь на все три вопроса.";return;}box.textContent=`Результат: ${score} из 3. `+(score===3?"Отлично! Практическое занятие освоено.":"Повтори материал и попробуй ещё раз.");if(score===3){const d=getDone();if(!d.includes(9))setDone([...d,9]);}});
$("thermoCheck").addEventListener("click",()=>{const answers={thq1:"b",thq2:"a",thq3:"b",thq4:"a"};let score=0,n=0;for(const [q,a] of Object.entries(answers)){const x=document.querySelector(`input[name="${q}"]:checked`);if(x){n++;if(x.value===a)score++;}}const box=$("thermoFeedback");if(n<4){box.textContent="Ответь на все четыре вопроса.";return;}box.textContent=`Результат: ${score} из 4. `+(score===4?"Отлично! Основы термодинамики усвоены.":"Повтори материал и попробуй ещё раз.");if(score===4){const d=getDone();if(!d.includes(8))setDone([...d,8]);}});
$("lessonCheck").addEventListener("click",()=>{const answers={lq1:"b",lq2:"a",lq3:"b"};let score=0,answered=0;for(const [q,a] of Object.entries(answers)){const selected=document.querySelector(`input[name="${q}"]:checked`);if(selected){answered++;if(selected.value===a)score++;}}const box=$("lessonFeedback");if(answered<3){box.textContent="Ответь на все три вопроса, затем проверь результат.";return;}box.textContent=`Результат: ${score} из 3. `+(score===3?"Отлично! Ты освоил основные положения темы.":"Повтори материал и попробуй ещё раз.");if(score===3){const d=getDone();if(!d.includes(0))setDone([...d,0]);}});
$("connection").textContent=navigator.onLine?"Подключение активно":"Автономный режим";
window.addEventListener("online",()=>$("connection").textContent="Подключение активно");window.addEventListener("offline",()=>$("connection").textContent="Автономный режим");
renderTopics();updateProgress();renderTerms();switchLab("centrifuge");
if("serviceWorker" in navigator && location.protocol!=="file:"){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}))}
