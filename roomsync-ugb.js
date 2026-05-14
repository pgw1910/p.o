// ═══════════════════════════════════════
// DATA
// ═══════════════════════════════════════
const ROOMS = [
  {id:'ICEB-01',name:'Sala 01',building:'ICEB',cap:70,occ:0.92},
  {id:'ICEB-02',name:'Sala 02',building:'ICEB',cap:60,occ:0.85},
  {id:'ICEB-03',name:'Sala 03',building:'ICEB',cap:44,occ:0.78},
  {id:'ICEB-04',name:'Sala 04',building:'ICEB',cap:55,occ:0.71},
  {id:'ICEB-05',name:'Sala 05',building:'ICEB',cap:44,occ:0.63},
  {id:'ICEB-06',name:'Sala 06',building:'ICEB',cap:53,occ:0.88},
  {id:'ICEB-07',name:'Sala 07',building:'ICEB',cap:70,occ:0.95},
  {id:'ICEB-08',name:'Sala 08',building:'ICEB',cap:60,occ:0.80},
  {id:'ICEB-09',name:'Sala 09',building:'ICEB',cap:50,occ:0.72},
  {id:'ICEB-10',name:'Sala 10',building:'ICEB',cap:50,occ:0.66},
  {id:'ICEB-14',name:'Sala 14',building:'ICEB',cap:40,occ:0.75},
  {id:'ICEB-18',name:'Sala 18',building:'ICEB',cap:50,occ:0.58},
  {id:'ICEB-19',name:'Sala 19',building:'ICEB',cap:50,occ:0.84},
  {id:'ICEB-21',name:'Sala 21',building:'ICEB',cap:53,occ:0.91},
  {id:'ICEB-22',name:'Sala 22',building:'ICEB',cap:40,occ:0.45},
  {id:'ICEB-23',name:'Sala 23',building:'ICEB',cap:50,occ:0.77},
  {id:'PAV-101',name:'Sala 101',building:'Pavilhão',cap:60,occ:0.88},
  {id:'PAV-102',name:'Sala 102',building:'Pavilhão',cap:60,occ:0.93},
  {id:'PAV-103',name:'Sala 103',building:'Pavilhão',cap:60,occ:0.75},
  {id:'PAV-104',name:'Sala 104',building:'Pavilhão',cap:60,occ:0.62},
  {id:'PAV-105',name:'Sala 105',building:'Pavilhão',cap:60,occ:0.55},
  {id:'PAV-106',name:'Sala 106',building:'Pavilhão',cap:60,occ:0.80},
  {id:'PAV-201',name:'Sala 201',building:'Pavilhão',cap:60,occ:0.70},
  {id:'PAV-202',name:'Sala 202',building:'Pavilhão',cap:60,occ:0.85},
  {id:'PAV-203',name:'Sala 203',building:'Pavilhão',cap:54,occ:1.13},
  {id:'PAV-204',name:'Sala 204',building:'Pavilhão',cap:60,occ:0.78},
  {id:'PAV-205',name:'Sala 205',building:'Pavilhão',cap:60,occ:0.90},
  {id:'PAV-206',name:'Sala 206',building:'Pavilhão',cap:60,occ:0.67},
  {id:'PAV-207',name:'Sala 207',building:'Pavilhão',cap:60,occ:0.82},
  {id:'PAV-208',name:'Sala 208',building:'Pavilhão',cap:60,occ:0.43},
  {id:'PAV-209',name:'Sala 209',building:'Pavilhão',cap:60,occ:0.76},
  {id:'PAV-210',name:'Sala 210',building:'Pavilhão',cap:60,occ:0.88},
  {id:'PAV-211',name:'Sala 211',building:'Pavilhão',cap:60,occ:0.95},
  {id:'PAV-213',name:'Sala 213',building:'Pavilhão',cap:60,occ:0.72},
  {id:'PAV-214',name:'Sala 214',building:'Pavilhão',cap:60,occ:0.60},
  {id:'PAV-215',name:'Sala 215',building:'Pavilhão',cap:60,occ:0.50},
];

const COURSES=['Eng. Civil','Administração','Direito','Med. Veterinária','Farmácia','Psicologia','Eng. Produção','Contabilidade','Biomedicina','Nutrição'];
const SUBJS=['Cálculo I','Álgebra Linear','Física I','Resistência dos Mat.','Microeconomia','Direito Civil','Anatomia Veterinária','Farmacologia','Psicopatologia','Contabilidade Geral','Termodinâmica','Estatística','Gestão de Projetos','Bioquímica','Fisiologia'];
const DAYS=['Seg','Ter','Qua','Qui','Sex','Sáb'];
const TIMES=['07h30','08h30','09h30','10h30','11h30','12h00','13h00','14h00','15h00','16h00','17h00','18h10','19h00','20h00','21h00'];

const ALLOCS=[];
for(let i=0;i<60;i++){
  const r=ROOMS[Math.floor(Math.random()*ROOMS.length)];
  const course=COURSES[Math.floor(Math.random()*COURSES.length)];
  const subj=SUBJS[Math.floor(Math.random()*SUBJS.length)];
  const day=DAYS[Math.floor(Math.random()*DAYS.length)];
  const time=TIMES[Math.floor(Math.random()*TIMES.length)];
  const period=Math.ceil(Math.random()*8);
  const students=Math.floor(r.cap*(0.5+Math.random()*0.8));
  const status=students>r.cap?'excess':r.occ<0.55?'idle':'ok';
  ALLOCS.push({room:r.name,building:r.building,cap:r.cap,day,time,subj,course,period,turma:`${course.slice(0,3).toUpperCase()}-${period}P-${String.fromCharCode(65+Math.floor(Math.random()*3))}`,students,status,id:r.id});
}

// ═══════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════
function doLogin(){
  const ls=document.getElementById('login-screen');
  const app=document.getElementById('app');
  ls.style.opacity='0';ls.style.transition='opacity 400ms';
  setTimeout(()=>{ls.classList.add('hidden');app.style.display='flex';initApp();},400);
}

// Enter key login
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&document.getElementById('login-screen')&&!document.getElementById('login-screen').classList.contains('hidden'))doLogin()});

// ═══════════════════════════════════════
// CORE FIELD (login bg canvas)
// ═══════════════════════════════════════
(function(){
  const c=document.getElementById('core-canvas');
  if(!c)return;
  const ctx=c.getContext('2d');
  let t=0;
  function resize(){c.width=c.offsetWidth;c.height=c.offsetHeight}
  resize();window.addEventListener('resize',resize);
  const particles=Array.from({length:60},()=>({
    a:Math.random()*Math.PI*2,r:100+Math.random()*300,
    speed:(0.001+Math.random()*0.003)*(Math.random()<0.5?1:-1),
    col:`hsl(${Math.floor(Math.random()*360)},80%,60%)`,
    size:1+Math.random()*2
  }));
  function draw(){
    ctx.clearRect(0,0,c.width,c.height);
    const cx=c.width/2,cy=c.height/2;
    for(const p of particles){
      p.a+=p.speed;
      p.r-=0.15;
      if(p.r<20){p.r=200+Math.random()*200;p.a=Math.random()*Math.PI*2}
      ctx.beginPath();
      ctx.arc(cx+Math.cos(p.a)*p.r,cy+Math.sin(p.a)*p.r,p.size,0,Math.PI*2);
      ctx.fillStyle=p.col;ctx.globalAlpha=0.6;ctx.fill();ctx.globalAlpha=1;
    }
    // Center void
    const g=ctx.createRadialGradient(cx,cy,0,cx,cy,80);
    g.addColorStop(0,'rgba(0,0,0,1)');
    g.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,80,0,Math.PI*2);ctx.fill();
    requestAnimationFrame(draw);
  }
  draw();
})();

// ═══════════════════════════════════════
// NAVIGATE
// ═══════════════════════════════════════
function navigate(screen,el){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  const s=document.getElementById('screen-'+screen);
  if(s)s.classList.add('active');
  if(el)el.classList.add('active');
  else{
    const map={dashboard:0,allocs:1,rooms:2,classes:3,optimizer:4,map:5};
    const items=document.querySelectorAll('.nav-item');
    if(map[screen]!==undefined)items[map[screen]].classList.add('active');
  }
  if(screen==='map')drawMap();
  if(screen==='optimizer')initConvCanvas();
}

// ═══════════════════════════════════════
// INIT APP
// ═══════════════════════════════════════
function initApp(){
  drawGauge();
  buildHeatmap();
  buildAllocTable();
  buildRoomsGrid();
  buildClassesTable();
  initConvCanvas();
}

// ═══════════════════════════════════════
// GAUGE
// ═══════════════════════════════════════
function drawGauge(){
  const c=document.getElementById('gauge-canvas');
  if(!c)return;
  const ctx=c.getContext('2d');
  const cx=70,cy=70,r=55;
  ctx.clearRect(0,0,140,140);
  // Track
  ctx.beginPath();ctx.arc(cx,cy,r,Math.PI*0.75,Math.PI*2.25);
  ctx.strokeStyle='#262626';ctx.lineWidth=8;ctx.lineCap='round';ctx.stroke();
  // Fill (87.3%)
  const pct=0.873;
  ctx.beginPath();ctx.arc(cx,cy,r,Math.PI*0.75,Math.PI*0.75+pct*Math.PI*1.5);
  ctx.strokeStyle='#D4A853';ctx.lineWidth=8;ctx.lineCap='round';ctx.stroke();
  // Inner glow
  const g=ctx.createRadialGradient(cx,cy,10,cx,cy,50);
  g.addColorStop(0,'rgba(212,168,83,0.06)');g.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,50,0,Math.PI*2);ctx.fill();
  // Center text
  ctx.fillStyle='#D4A853';ctx.font='bold 20px Geist Mono,monospace';
  ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('87.3',cx,cy-8);
  ctx.fillStyle='#52525B';ctx.font='10px Geist Mono,monospace';
  ctx.fillText('SCORE',cx,cy+12);
}

// ═══════════════════════════════════════
// HEATMAP
// ═══════════════════════════════════════
function buildHeatmap(){
  const cont=document.getElementById('heatmap-container');
  if(!cont)return;
  const rooms=ROOMS.slice(0,12);
  const schedules=['07h30','08h30','09h30','10h30','12h00','13h00','14h00','15h00','16h00','18h10','19h00','20h00'];
  let html=`<div style="display:grid;grid-template-columns:90px repeat(${schedules.length},30px);gap:2px;align-items:center">`;
  html+=`<div></div>`;
  schedules.forEach(s=>{html+=`<div class="hm-col-label">${s.slice(0,5)}</div>`});
  rooms.forEach(r=>{
    html+=`<div class="hm-label">${r.building.slice(0,1)}-${r.name.slice(-2)}</div>`;
    schedules.forEach((_,si)=>{
      const occ=Math.random();
      let bg,title;
      if(occ>1){bg='#3A0A0A';title='Excesso'}
      else if(occ>0.75){bg='rgba(34,197,94,0.5)';title='Alta'}
      else if(occ>0.5){bg='rgba(249,115,22,0.5)';title='Média'}
      else if(occ>0.1){bg='rgba(249,115,22,0.2)';title='Baixa'}
      else{bg='#1A1A1A';title='Livre'}
      html+=`<div class="hm-cell" style="background:${bg}" title="${r.name} · ${title}" onclick="openRoomModal('${r.id}')"></div>`;
    });
  });
  html+='</div>';
  cont.innerHTML=html;
}

// ═══════════════════════════════════════
// ALLOC TABLE
// ═══════════════════════════════════════
function buildAllocTable(){
  const tbody=document.getElementById('alloc-body');
  if(!tbody)return;
  let html='';
  ALLOCS.slice(0,40).forEach((a,i)=>{
    const sc=a.status==='excess'?'s-excess':a.status==='idle'?'s-idle':'s-ok';
    const sl=a.status==='excess'?'EXCESSO':a.status==='idle'?'OCIOSO':'OK';
    html+=`<tr onclick="toggleExpand(${i},this)">
      <td class="mono">${a.room}</td>
      <td class="mono">${a.cap}</td>
      <td class="mono">${a.day} ${a.time}</td>
      <td>${a.subj}</td>
      <td style="color:var(--text-2)">${a.course}</td>
      <td class="mono">${a.period}°</td>
      <td class="mono" style="color:var(--gold)">${a.turma}</td>
      <td class="mono" style="color:${a.students>a.cap?'var(--red)':'var(--text)'}">${a.students}</td>
      <td><span class="status-badge ${sc}">${sl}</span></td>
    </tr>
    <tr class="expand-row" id="expand-${i}" style="display:none">
      <td colspan="9">
        <div class="expand-content">
          <div>
            <div style="font-size:12px;color:var(--text-3);font-family:var(--mono);margin-bottom:8px">DETALHES DA ALOCAÇÃO</div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;font-size:12px">
              <div><span style="color:var(--text-3)">Prédio:</span> ${a.building}</div>
              <div><span style="color:var(--text-3)">Sala:</span> ${a.room}</div>
              <div><span style="color:var(--text-3)">Capacidade:</span> ${a.cap}</div>
              <div><span style="color:var(--text-3)">Alunos:</span> <span style="color:${a.students>a.cap?'var(--red)':'var(--green)'}">${a.students}</span></div>
              <div><span style="color:var(--text-3)">Ocupação:</span> ${Math.round(a.students/a.cap*100)}%</div>
              <div><span style="color:var(--text-3)">Turno:</span> ${parseInt(a.time)<12?'Manhã':parseInt(a.time)<18?'Tarde':'Noite'}</div>
            </div>
          </div>
          <div class="expand-actions">
            <button class="btn-sm btn-gold-sm" onclick="showToast('Realocação iniciada para '+${JSON.stringify(a.turma)});event.stopPropagation()">Realocar</button>
            <button class="btn-sm btn-outline" onclick="showToast('Troca de sala iniciada');event.stopPropagation()">Trocar</button>
            <button class="btn-sm btn-outline" onclick="showToast('Histórico carregado');event.stopPropagation()">Histórico</button>
          </div>
        </div>
      </td>
    </tr>`;
  });
  tbody.innerHTML=html;
}

let expandedRow=-1;
function toggleExpand(i,row){
  const er=document.getElementById('expand-'+i);
  if(expandedRow===i){er.style.display='none';expandedRow=-1}
  else{
    if(expandedRow>=0){const prev=document.getElementById('expand-'+expandedRow);if(prev)prev.style.display='none'}
    er.style.display='';expandedRow=i;
  }
}

// ═══════════════════════════════════════
// ROOMS GRID
// ═══════════════════════════════════════
let currentFilter='all';
function buildRoomsGrid(){
  const grid=document.getElementById('rooms-grid');
  if(!grid)return;
  const rooms=currentFilter==='all'?ROOMS:ROOMS.filter(r=>r.building===currentFilter);
  grid.innerHTML=rooms.map(r=>{
    const pct=Math.round(r.occ*100);
    const col=r.occ>1?'var(--red)':r.occ>0.75?'var(--green)':r.occ>0.5?'var(--orange)':'var(--text-3)';
    return`<div class="room-card" onclick="openRoomModal('${r.id}')">
      <div class="room-card-name">${r.name}</div>
      <div class="room-card-building">${r.building}</div>
      <div class="room-card-cap">Capacidade: <strong style="color:var(--text)">${r.cap}</strong> alunos</div>
      <div style="font-size:11px;color:${col};margin-top:4px">${pct}% ocupado</div>
      <div class="occ-mini"><div class="occ-mini-fill" style="width:${Math.min(pct,100)}%;background:${col}"></div></div>
    </div>`;
  }).join('');
}

function filterRooms(f,el){
  currentFilter=f;
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
  buildRoomsGrid();
}

// ═══════════════════════════════════════
// CLASSES TABLE
// ═══════════════════════════════════════
function buildClassesTable(){
  const tbody=document.getElementById('classes-body');
  if(!tbody)return;
  let html='';
  for(let i=0;i<50;i++){
    const c=COURSES[i%COURSES.length];
    const s=SUBJS[i%SUBJS.length];
    const per=Math.ceil((i%8)+1);
    const students=20+Math.floor(Math.random()*50);
    const turn=['Manhã','Tarde','Noite'][i%3];
    const room=ROOMS[i%ROOMS.length];
    const ok=students<=room.cap;
    html+=`<tr>
      <td class="mono" style="color:var(--gold)">${c.slice(0,3).toUpperCase()}${per}0${i%5}-${String.fromCharCode(65+i%3)}</td>
      <td>${s}</td>
      <td style="color:var(--text-2)">${c}</td>
      <td class="mono">${per}°</td>
      <td class="mono" style="color:${ok?'var(--text)':'var(--red)'}">${students}</td>
      <td>${turn}</td>
      <td class="mono">${room.name}</td>
      <td><span class="status-badge ${ok?'s-ok':'s-excess'}">${ok?'OK':'EXCESSO'}</span></td>
    </tr>`;
  }
  tbody.innerHTML=html;
}

// ═══════════════════════════════════════
// OPTIMIZER
// ═══════════════════════════════════════
let optRunning=false,optInterval=null,optTime=0,convBest=[],convCurrent=[];
function initConvCanvas(){
  const c=document.getElementById('conv-canvas');
  if(!c)return;
  c.width=c.offsetWidth*2;c.height=360;
  c.style.height='180px';
  drawConv();
}

function drawConv(){
  const c=document.getElementById('conv-canvas');
  if(!c)return;
  const ctx=c.getContext('2d');
  const W=c.width,H=c.height;
  ctx.clearRect(0,0,W,H);
  // Grid
  ctx.strokeStyle='rgba(255,255,255,0.025)';ctx.lineWidth=1;
  for(let i=0;i<=5;i++){ctx.beginPath();ctx.moveTo(0,i*H/5);ctx.lineTo(W,i*H/5);ctx.stroke()}
  for(let i=0;i<=8;i++){ctx.beginPath();ctx.moveTo(i*W/8,0);ctx.lineTo(i*W/8,H);ctx.stroke()}
  if(convBest.length<2)return;
  const maxV=770000,minV=630000,range=maxV-minV;
  function drawLine(data,color){
    ctx.beginPath();
    data.forEach((v,i)=>{
      const x=i/(data.length-1)*W;
      const y=H-(v-minV)/range*H;
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    });
    ctx.strokeStyle=color;ctx.lineWidth=2;ctx.stroke();
  }
  drawLine(convCurrent,'rgba(161,161,170,0.4)');
  drawLine(convBest,'#D4A853');
}

function runOptimizer(){
  if(optRunning){
    clearInterval(optInterval);optRunning=false;
    document.getElementById('run-btn').textContent='Iniciar Otimização';
    return;
  }
  optRunning=true;optTime=0;convBest=[767902];convCurrent=[767902];
  document.getElementById('run-btn').textContent='⏹ Parar Otimização';
  document.getElementById('run-btn').disabled=false;
  let best=767902,cur=767902,iter=0,temp=5000;
  const startMs=Date.now();
  const log=document.getElementById('opt-log');
  addLog('Iniciando Simulated Annealing...');
  addLog(`T₀=5000 · α=0.98 · iter/T=2500`);
  optInterval=setInterval(()=>{
    iter+=250;temp*=0.98;
    cur=best+(Math.random()-0.4)*temp*2;
    if(cur<best){best=cur;addLog(`[${iter}] Nova melhor solução: ${Math.round(best).toLocaleString('pt-BR')}`)}
    convBest.push(best);convCurrent.push(cur);
    if(convBest.length>120){convBest.shift();convCurrent.shift()}
    drawConv();
    const elapsed=Math.round((Date.now()-startMs)/1000);
    const m=Math.floor(elapsed/60),s=elapsed%60;
    document.getElementById('p-temp').textContent=Math.round(temp).toLocaleString('pt-BR');
    document.getElementById('p-iter').textContent=iter.toLocaleString('pt-BR');
    document.getElementById('p-best').textContent=Math.round(best).toLocaleString('pt-BR');
    document.getElementById('p-imp').textContent=((1-best/767902)*100).toFixed(1)+'%';
    document.getElementById('p-time').textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    if(temp<0.1||iter>300000){
      clearInterval(optInterval);optRunning=false;
      document.getElementById('run-btn').textContent='Iniciar Otimização';
      addLog('✓ Otimização concluída.');
      showToast('Otimização finalizada · Melhor: '+Math.round(best).toLocaleString('pt-BR')+' pts');
    }
  },150);
}

function addLog(msg){
  const log=document.getElementById('opt-log');
  if(!log)return;
  log.innerHTML+=`<div><span style="color:var(--text-3)">›</span> ${msg}</div>`;
  log.scrollTop=log.scrollHeight;
}

// ═══════════════════════════════════════
// ISOMETRIC MAP
// ═══════════════════════════════════════
let mapRooms=[];
function drawMap(){
  const c=document.getElementById('map-canvas');
  if(!c)return;
  c.width=c.parentElement.offsetWidth;
  c.height=c.parentElement.offsetHeight;
  const ctx=c.getContext('2d');
  const W=c.width,H=c.height;
  ctx.clearRect(0,0,W,H);
  mapRooms=[];
  // Isometric helpers
  function isoX(gx,gy){return W/2+(gx-gy)*40}
  function isoY(gx,gy){return H/2.5+(gx+gy)*22}
  function drawRoom(gx,gy,room,label){
    const x=isoX(gx,gy),y=isoY(gx,gy);
    const w=38,h=18,dz=14;
    const occ=room.occ;
    const col=occ>1?'#EF4444':occ>0.75?'#22C55E':occ>0.5?'#F97316':'#2A2A2A';
    const colDark=occ>1?'#7A1010':occ>0.75?'#0F5A2A':occ>0.5?'#7A3800':'#1A1A1A';
    const colSide=occ>1?'#A01010':occ>0.75?'#0D4A22':occ>0.5?'#6A2E00':'#161616';
    // Top
    ctx.beginPath();ctx.moveTo(x,y-dz);ctx.lineTo(x+w,y-dz+h);ctx.lineTo(x,y-dz+2*h);ctx.lineTo(x-w,y-dz+h);ctx.closePath();
    ctx.fillStyle=col;ctx.fill();ctx.strokeStyle='rgba(0,0,0,0.4)';ctx.lineWidth=0.5;ctx.stroke();
    // Right side
    ctx.beginPath();ctx.moveTo(x+w,y-dz+h);ctx.lineTo(x+w,y+h);ctx.lineTo(x,y+2*h);ctx.lineTo(x,y-dz+2*h);ctx.closePath();
    ctx.fillStyle=colSide;ctx.fill();ctx.strokeStyle='rgba(0,0,0,0.4)';ctx.stroke();
    // Left side
    ctx.beginPath();ctx.moveTo(x-w,y-dz+h);ctx.lineTo(x-w,y+h);ctx.lineTo(x,y+2*h);ctx.lineTo(x,y-dz+2*h);ctx.closePath();
    ctx.fillStyle=colDark;ctx.fill();ctx.strokeStyle='rgba(0,0,0,0.4)';ctx.stroke();
    // Label
    ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='8px Geist Mono,monospace';ctx.textAlign='center';
    ctx.fillText(label,x,y-dz+h+3);
    mapRooms.push({x,y:y-dz,w:w*1.2,h:h*2.5,room});
  }

  // Building label
  function buildingLabel(x,y,text){
    ctx.fillStyle='rgba(212,168,83,0.5)';ctx.font='600 12px Geist Mono,monospace';
    ctx.textAlign='center';ctx.fillText(text,x,y);
  }

  // ICEB 4x4 grid
  buildingLabel(W/2-160,H/2-140,'ICEB');
  const icebRooms=ROOMS.filter(r=>r.building==='ICEB');
  icebRooms.forEach((r,i)=>{
    const col=i%4,row=Math.floor(i/4);
    drawRoom(col-6,row-1,r,r.name.slice(-2));
  });

  // Pavilhão 5x4 grid
  buildingLabel(W/2+100,H/2-180,'Pavilhão');
  const pavRooms=ROOMS.filter(r=>r.building==='Pavilhão');
  pavRooms.forEach((r,i)=>{
    const col=i%5,row=Math.floor(i/5);
    drawRoom(col+1,row-3,r,r.name.slice(-3));
  });

  // Legend line
  ctx.strokeStyle='rgba(212,168,83,0.1)';ctx.setLineDash([4,6]);
  ctx.beginPath();ctx.moveTo(W/2-20,100);ctx.lineTo(W/2-20,H-100);ctx.stroke();
  ctx.setLineDash([]);
}

// Map tooltip
document.addEventListener('mousemove',e=>{
  const c=document.getElementById('map-canvas');
  const tip=document.getElementById('room-tooltip');
  if(!c||!tip||!mapRooms.length)return;
  const rect=c.getBoundingClientRect();
  const mx=e.clientX-rect.left,my=e.clientY-rect.top;
  let found=null;
  for(const mr of mapRooms){
    if(mx>=mr.x-mr.w/2&&mx<=mr.x+mr.w/2&&my>=mr.y&&my<=mr.y+mr.h){found=mr;break}
  }
  if(found){
    const r=found.room;const pct=Math.round(r.occ*100);
    tip.innerHTML=`<div style="font-family:var(--mono);font-size:12px;font-weight:500;color:var(--gold);margin-bottom:6px">${r.name}</div>
    <div style="font-size:11px;color:var(--text-3);margin-bottom:4px">${r.building}</div>
    <div style="font-size:12px">Capacidade: <strong>${r.cap}</strong> alunos</div>
    <div style="font-size:12px;color:${r.occ>1?'var(--red)':r.occ>0.75?'var(--green)':'var(--orange)'}">${pct}% ocupado</div>`;
    tip.style.left=(e.clientX-rect.left+12)+'px';
    tip.style.top=(e.clientY-rect.top-40)+'px';
    tip.classList.add('show');
  }else tip.classList.remove('show');
});
document.getElementById('map-canvas').addEventListener('click',e=>{
  const c=document.getElementById('map-canvas');
  const rect=c.getBoundingClientRect();
  const mx=e.clientX-rect.left,my=e.clientY-rect.top;
  for(const mr of mapRooms){
    if(mx>=mr.x-mr.w/2&&mx<=mr.x+mr.w/2&&my>=mr.y&&my<=mr.y+mr.h){openRoomModal(mr.room.id);return}
  }
});

// ═══════════════════════════════════════
// MODAL
// ═══════════════════════════════════════
function openRoomModal(id){
  const r=ROOMS.find(x=>x.id===id);
  if(!r)return;
  const pct=Math.round(r.occ*100);
  const col=r.occ>1?'var(--red)':r.occ>0.75?'var(--green)':r.occ>0.5?'var(--orange)':'var(--text-3)';
  document.getElementById('modal-title').textContent=`${r.building} — ${r.name}`;
  document.getElementById('modal-sub').textContent=`${r.building} · Capacidade: ${r.cap} alunos · Ocupação atual: ${pct}%`;
  // Weekly grid
  const turns=['Manhã','Tarde','Noite'];
  let weekHtml=`<div style="display:grid;grid-template-columns:60px repeat(6,1fr);gap:4px">
    <div style="font-size:10px;color:var(--text-3);font-family:var(--mono)"></div>`;
  DAYS.forEach(d=>{weekHtml+=`<div style="font-size:10px;color:var(--text-3);font-family:var(--mono);text-align:center">${d}</div>`});
  turns.forEach(t=>{
    weekHtml+=`<div style="font-size:10px;color:var(--text-3);font-family:var(--mono);display:flex;align-items:center">${t}</div>`;
    DAYS.forEach(()=>{
      const v=Math.random();
      const bg=v>0.7?'rgba(34,197,94,0.3)':v>0.4?'rgba(249,115,22,0.25)':v>0.1?'rgba(38,38,38,0.6)':'#1A1A1A';
      const subj=v>0.1?SUBJS[Math.floor(Math.random()*SUBJS.length)].slice(0,6):'';
      weekHtml+=`<div class="mw-cell" style="background:${bg};font-size:9px;color:var(--text-3)">${subj}</div>`;
    });
  });
  weekHtml+='</div>';
  const turnBars=['Manhã','Tarde','Noite'].map(t=>{
    const pctT=Math.round(Math.random()*100);
    const c=pctT>75?'var(--green)':pctT>50?'var(--orange)':'var(--text-3)';
    return`<div class="occ-bar-row">
      <div class="occ-bar-label">${t}</div>
      <div class="occ-bar-track"><div class="occ-bar-fill" style="width:${pctT}%;background:${c}"></div></div>
      <div style="font-family:var(--mono);font-size:11px;color:var(--text-2);min-width:30px">${pctT}%</div>
    </div>`;
  }).join('');
  document.getElementById('modal-body').innerHTML=`
    ${weekHtml}
    <div style="font-size:11px;color:var(--text-3);font-family:var(--mono);letter-spacing:1px;text-transform:uppercase">Ocupação por Turno</div>
    <div class="occ-bar-wrap">${turnBars}</div>
    <div class="modal-actions">
      <button class="btn-sm btn-gold-sm" onclick="showToast('Editar alocações de '+${JSON.stringify(r.name)})">Editar Alocações</button>
      <button class="btn-sm btn-outline" onclick="showToast('Histórico de '+${JSON.stringify(r.name)})">Ver Histórico</button>
      <button class="btn-sm btn-outline" onclick="closeModal()">Fechar</button>
    </div>`;
  document.getElementById('modal-bg').classList.add('show');
}
function closeModal(){document.getElementById('modal-bg').classList.remove('show')}

// ═══════════════════════════════════════
// TOAST
// ═══════════════════════════════════════
let toastTimer;
function showToast(msg){
  const t=document.getElementById('toast');
  document.getElementById('toast-msg').textContent=msg;
  t.classList.add('show');clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),3000);
}

// ═══════════════════════════════════════
// RESIZE MAP
// ═══════════════════════════════════════
window.addEventListener('resize',()=>{
  const s=document.getElementById('screen-map');
  if(s&&s.classList.contains('active'))drawMap();
});
