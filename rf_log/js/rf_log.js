(function(){
  var ICON={
    pause:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
    play:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4v16l13-8z"/></svg>',
    skip:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M5 4v16l11-8z"/><rect x="17" y="4" width="3" height="16" rx="1"/></svg>',
    refresh:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 0 1 14-5.3L20 8"/><path d="M20 4v4h-4"/><path d="M20 12a8 8 0 0 1-14 5.3L4 16"/><path d="M4 20v-4h4"/></svg>'
  };
  function dot(c){return '<span style="color:'+c+'">●</span> ';}

  var tabs=document.querySelectorAll('.tab');
  var onDemo=true;
  tabs.forEach(function(t){
    t.addEventListener('click',function(){
      tabs.forEach(function(x){x.classList.remove('active');});
      t.classList.add('active');
      var id=t.getAttribute('data-tab');
      document.querySelectorAll('.panel').forEach(function(p){p.classList.remove('active');});
      document.getElementById('panel-'+id).classList.add('active');
      onDemo=(id==='demo');
      if(onDemo && playing){ clearTimeout(timer); loop(); } else { clearTimeout(timer); }
    });
  });

  var NS=8, PER=128, TOT=NS*PER, MAXMK=4;
  var CX=200, CY=200, RO=154, RI=86, PILL=120, HEAD=166, NUM=186;
  var TXP=['USER','LOW 1','LOW 2','LOW 3','LOW 4','LOW 5','MID','HIGH'];
  var IVS=[60,30,10,5,2,1], ENDURANCE=100000*1024, REF_DAYS=3652.5;
  var entries=0, erases=0, lap=0, markerCount=0, markersThisLap=0, lastMarker=false;
  var markers=[], fill=new Array(NS).fill(0), cycles=new Array(NS).fill(0);
  var playing=true, speed=3, timer=null;
  var bg=document.getElementById('rf-bg'), fg=document.getElementById('rf-fg'), sep=document.getElementById('rf-sep'), mk=document.getElementById('rf-mk'), cyc=document.getElementById('rf-cyc'), head=document.getElementById('rf-head'), cap=document.getElementById('rf-cap');
  var btnPlay=document.getElementById('rf-play'), btnWrap=document.getElementById('rf-wrap'), btnReset=document.getElementById('rf-reset');

  btnPlay.innerHTML=ICON.pause+'<span>Pause</span>';
  btnWrap.innerHTML=ICON.skip+'<span>Jump to wrap</span>';
  btnReset.innerHTML=ICON.refresh+'<span>Reset</span>';

  function polar(r,deg){var a=(deg-90)*Math.PI/180;return (CX+r*Math.cos(a)).toFixed(2)+' '+(CY+r*Math.sin(a)).toFixed(2);}
  function wedge(a0,a1){return 'M'+polar(RO,a0)+' A'+RO+' '+RO+' 0 0 1 '+polar(RO,a1)+' L'+polar(RI,a1)+' A'+RI+' '+RI+' 0 0 0 '+polar(RI,a0)+' Z';}

  var b='';
  for(var i=0;i<NS;i++){b+='<path id="bg'+i+'" d="'+wedge(i*45,(i+1)*45)+'" fill="var(--surface-1)" stroke="var(--border)" stroke-width="0.5"></path>';}
  bg.innerHTML=b;
  var s='';
  for(var j=0;j<NS;j++){
    var l0=polar(RI,j*45).split(' '), l1=polar(RO,j*45).split(' ');
    s+='<line x1="'+l0[0]+'" y1="'+l0[1]+'" x2="'+l1[0]+'" y2="'+l1[1]+'" stroke="var(--surface-0)" stroke-width="1.5"></line>';
    var np=polar(NUM,j*45+22.5).split(' ');
    s+='<text x="'+np[0]+'" y="'+(parseFloat(np[1])+4)+'" text-anchor="middle" font-size="13" font-family="var(--font-sans)" fill="var(--text-secondary)">'+(j+1)+'</text>';
  }
  sep.innerHTML=s;

  function render(){
    var f='';
    for(var i=0;i<NS;i++){ if(fill[i]>0){ var a1=i*45+(fill[i]/PER)*45; f+='<path d="'+wedge(i*45,a1)+'" fill="url(#grad-fill)" stroke="none"></path>'; } }
    fg.innerHTML=f;
    var m='';
    for(var k=0;k<markers.length;k++){ var p0=polar(RI,markers[k].deg).split(' '), p1=polar(RO,markers[k].deg).split(' ');
      m+='<line x1="'+p0[0]+'" y1="'+p0[1]+'" x2="'+p1[0]+'" y2="'+p1[1]+'" stroke="#7C6FF0" stroke-width="2.5"></line>'; }
    mk.innerHTML=m;
    var c='';
    for(var n=0;n<NS;n++){
      var pp=polar(PILL,n*45+22.5).split(' '), px=parseFloat(pp[0]), py=parseFloat(pp[1]);
      c+='<rect x="'+(px-23)+'" y="'+(py-8)+'" width="46" height="16" rx="8" fill="var(--surface-0)" opacity="0.92" stroke="var(--border)" stroke-width="0.5"></rect>';
      c+='<text x="'+px+'" y="'+(py+4)+'" font-size="11" fill="'+(cycles[n]>0?'var(--text-primary)':'var(--text-muted)')+'">'+cycles[n]+'/100k</text>';
    }
    cyc.innerHTML=c;
    var slot=entries===0?0:(entries-1)%TOT, sect=Math.floor(slot/PER);
    var hp=polar(HEAD,sect*45+(fill[sect]/PER)*45).split(' ');
    var hc=head.querySelectorAll('circle');
    hc[0].setAttribute('cx',hp[0]); hc[0].setAttribute('cy',hp[1]);
    hc[1].setAttribute('cx',hp[0]); hc[1].setAttribute('cy',hp[1]);
  }

  function flashErase(sc){
    var el=document.getElementById('bg'+sc); if(!el)return;
    el.setAttribute('fill','#EF4444');
    setTimeout(function(){el.setAttribute('fill','var(--surface-1)');},300);
  }

  function newEvent(){
    var tx=Math.random()<0.28;
    document.getElementById('ram-type').textContent=tx?'TX':'RX';
    var d=3+Math.floor(Math.random()*120);
    document.getElementById('ram-dur').textContent=('0'+Math.floor(d/60)).slice(-2)+':'+('0'+(d%60)).slice(-2);
    if(tx){
      document.getElementById('ram-metric-k').textContent='Power';
      document.getElementById('ram-sm').textContent=TXP[1+Math.floor(Math.random()*7)];
    } else {
      document.getElementById('ram-metric-k').textContent='S-meter';
      document.getElementById('ram-sm').textContent='S'+(2+Math.floor(Math.random()*8));
    }
    document.getElementById('ram-bat').textContent=(7.4+Math.random()*0.7).toFixed(2)+' V';
    return tx;
  }

  function counters(){
    document.getElementById('c-entries').textContent=entries;
    document.getElementById('c-prog').textContent=entries*2;
    document.getElementById('c-erase').textContent=erases;
    document.getElementById('c-mark').textContent=markerCount;
    var slot=entries===0?0:(entries-1)%TOT;
    document.getElementById('c-lap').textContent=(lap+1)+' · '+(Math.floor(slot/PER)+1);
  }

  function gauge(){
    var iv=IVS[speed-1];
    var lifeDays=ENDURANCE*iv/86400, lifeYears=lifeDays/365.25;
    var wear=Math.min((REF_DAYS*86400/iv)/ENDURANCE*100,100);
    document.getElementById('g-rate').textContent='1 event / '+(iv>=60?(iv/60+' min'):(iv+' s'));
    var gl=document.getElementById('g-life');
    gl.textContent='≈ '+(lifeYears>=1?lifeYears.toFixed(1)+' years':Math.round(lifeDays)+' days');
    gl.style.color=wear>=100?'#EF4444':(wear>=40?'#F59F00':'#12B5A5');
    document.getElementById('g-mask').style.width=(100-wear)+'%';
    document.getElementById('g-knob').style.left=wear+'%';
    document.getElementById('g-wear').textContent='Wear after 10 years: '+(wear>=100?'≥100% (worn out)':(wear<10?wear.toFixed(1):Math.round(wear))+'%');
    document.getElementById('g-days').textContent=Math.round(lifeDays).toLocaleString('en-US')+' days to 100k erase cycles';
  }

  function step(){
    if(entries%TOT===0) markersThisLap=0;
    var slot=entries%TOT, sect=Math.floor(slot/PER), boundaryMsg=null;
    if(slot%PER===0 && entries>=TOT){ fill[sect]=0; erases++; cycles[sect]++; flashErase(sect);
      markers=markers.filter(function(x){return x.sect!==sect;});
      boundaryMsg=dot('#EF4444')+'Back to sector '+(sect+1)+', already used on the previous lap → <strong>1 erase</strong> (4 KiB reset to 0xFF). Sector '+(sect+1)+' now sits at <strong>'+cycles[sect]+'/100k</strong> cycles — its own budget, untouched by the others.';
    } else if(slot%PER===0 && entries>0){
      boundaryMsg=dot('#12B5A5')+'Sector '+(((sect+NS-1)%NS)+1)+' full → move to sector '+(sect+1)+', <strong>no erase</strong>: its slots are still blank.';
    }
    var isMarker=(entries===0)||(!lastMarker && markersThisLap<MAXMK && Math.random()<0.004);
    var msg;
    if(isMarker){
      markers.push({sect:sect, deg:sect*45+((fill[sect]+0.5)/PER)*45});
      markerCount++; markersThisLap++; lastMarker=true;
      msg=boundaryMsg||(dot('#7C6FF0')+'POWER ON — rare event: it consumes 1 slot (2 program commands) but is <strong>not counted</strong> among the 512 traffic events.');
    } else {
      lastMarker=false;
      var tx=newEvent();
      msg=boundaryMsg||(tx
        ? dot('#3B82F6')+'End of <strong>TX</strong> event → 1 entry: duration + <strong>power</strong> recorded (the S-meter byte stores the TX level).'
        : dot('#12B5A5')+'End of <strong>RX</strong> event → 1 entry: duration + <strong>S-meter</strong> recorded.');
    }
    fill[sect]++; entries++;
    if(entries%TOT===0) lap++;
    render(); counters(); cap.innerHTML=msg;
  }

  function loop(){ if(!playing||!onDemo)return; step(); timer=setTimeout(loop,150-speed*20); }

  btnPlay.addEventListener('click',function(){
    playing=!playing;
    btnPlay.innerHTML=playing?(ICON.pause+'<span>Pause</span>'):(ICON.play+'<span>Play</span>');
    if(playing)loop(); else clearTimeout(timer);
  });
  btnReset.addEventListener('click',function(){
    clearTimeout(timer);
    entries=0;erases=0;lap=0;markerCount=0;markersThisLap=0;lastMarker=false;
    markers=[];fill=new Array(NS).fill(0);cycles=new Array(NS).fill(0);
    for(var i=0;i<NS;i++){document.getElementById('bg'+i).setAttribute('fill','var(--surface-1)');}
    newEvent();render();counters();cap.innerHTML='Initial state: blank ring, every sector at 0/100k cycles. At startup, a power-on marker takes the first slot.';
    if(playing)loop();
  });
  btnWrap.addEventListener('click',function(){
    clearTimeout(timer); entries=TOT-8; lap=0; markers=[]; lastMarker=false; markersThisLap=MAXMK;
    cycles=new Array(NS).fill(0);
    for(var i=0;i<NS;i++){fill[i]=i<7?PER:(entries-7*PER); document.getElementById('bg'+i).setAttribute('fill','var(--surface-1)');}
    render();counters();cap.innerHTML='First lap almost complete: all 8 sectors are full, yet every one is still at 0/100k cycles. The next entries will trigger the first erases.';
    if(playing)loop();
  });
  document.getElementById('rf-speed').addEventListener('input',function(){speed=parseInt(this.value,10);gauge();});

  newEvent(); render(); counters(); gauge();
  cap.innerHTML='Each event lives in RAM: RX tracks the S-meter, TX tracks the power level. At the end, a single entry is added to the next blank slot.';
  loop();
})();
