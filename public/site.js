/* SimpliiGood shared site JS (sub-pages). Native scroll, no fake cursor. */
document.documentElement.classList.add('js-on');
(function(){
  var nav=document.getElementById('nav'),navLinks=document.getElementById('navLinks'),burger=document.getElementById('burger');
  if(nav){var onScroll=function(){nav.classList.toggle('scrolled',window.scrollY>40);};onScroll();window.addEventListener('scroll',onScroll,{passive:true});}
  if(burger&&navLinks){burger.addEventListener('click',function(){navLinks.classList.toggle('open');burger.classList.toggle('open');});
    navLinks.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){navLinks.classList.remove('open');burger.classList.remove('open');});});}
})();
/* image guard */
document.querySelectorAll('img').forEach(function(img){
  img.addEventListener('error',function(){
    if(img.dataset.guarded)return;img.dataset.guarded=1;
    img.src="data:image/svg+xml,"+encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#FEE62D'/><stop offset='1' stop-color='#31B278'/></linearGradient></defs><rect width='600' height='600' fill='url(#g)'/><text x='50%' y='52%' font-family='Arial' font-weight='bold' font-size='42' fill='#154048' text-anchor='middle'>SimpliiGood</text></svg>");
  });
});
function forceShow(){document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('in');});}
if(window.gsap&&window.ScrollTrigger){
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.reveal').forEach(function(el){ScrollTrigger.create({trigger:el,start:'top 88%',once:true,onEnter:function(){el.classList.add('in');}});});
  gsap.utils.toArray('.count').forEach(function(el){var to=+el.dataset.to;var obj={v:0};ScrollTrigger.create({trigger:el,start:'top 90%',once:true,onEnter:function(){gsap.to(obj,{v:to,duration:1.4,ease:'power2.out',onUpdate:function(){el.textContent=Math.round(obj.v);}});}});});
  gsap.to('#scrollProg',{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:0.3}});
  gsap.to('.phero-aura',{yPercent:22,ease:'none',scrollTrigger:{trigger:'.phero',start:'top top',end:'bottom top',scrub:true}});
  var fwm=document.querySelector('.footer .wm');
  if(fwm){ScrollTrigger.create({trigger:'.footer-wm-wrap',start:'top 96%',once:true,onEnter:function(){fwm.classList.add('in');}});}
  setTimeout(function(){ScrollTrigger.refresh();},350);
  window.addEventListener('load',function(){ScrollTrigger.refresh();});
}else{forceShow();}
window.addEventListener('load',function(){setTimeout(function(){document.querySelectorAll('.reveal:not(.in)').forEach(function(el){var r=el.getBoundingClientRect();if(r.top<window.innerHeight+200)el.classList.add('in');});},800);});
/* smooth anchor jumps (native) */
document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var id=a.getAttribute('href');if(id.length<2)return;var t=document.querySelector(id);if(!t)return;e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});});});
/* forms */
document.querySelectorAll('form[data-confirm]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();if(!f.checkValidity()){f.reportValidity();return;}var m=f.querySelector('.formmsg');if(m)m.style.display='block';var b=f.querySelector('button[type=submit]');if(b)b.textContent=f.dataset.confirm||'Sent';f.querySelectorAll('input,select,textarea,button').forEach(function(x){x.disabled=true;});});});
(function(){var nf=document.getElementById('newsForm');if(!nf)return;nf.addEventListener('submit',function(e){e.preventDefault();if(!nf.checkValidity()){nf.reportValidity();return;}var b=nf.querySelector('button');if(b)b.textContent="You're in";var i=nf.querySelector('input');if(i){i.value='';i.disabled=true;}});})();
(function(){var t=document.getElementById('toTop');if(!t)return;t.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});})();
/* Premium pointer feel: magnetic buttons + subtle card tilt (fine-pointer only) */
if(window.matchMedia&&matchMedia('(hover:hover) and (pointer:fine)').matches&&window.gsap){
  document.querySelectorAll('.card,.galg figure').forEach(function(card){
    gsap.set(card,{transformPerspective:900,transformStyle:'preserve-3d'});
    var rxTo=gsap.quickTo(card,'rotationX',{duration:0.4,ease:'power3'}),ryTo=gsap.quickTo(card,'rotationY',{duration:0.4,ease:'power3'}),yTo=gsap.quickTo(card,'y',{duration:0.4,ease:'power3'});
    card.addEventListener('pointermove',function(e){var r=card.getBoundingClientRect();var px=(e.clientX-r.left)/r.width-0.5,py=(e.clientY-r.top)/r.height-0.5;ryTo(px*6);rxTo(-py*6);yTo(-6);});
    card.addEventListener('pointerleave',function(){gsap.to(card,{rotationX:0,rotationY:0,y:0,duration:0.6,ease:'power3'});});
  });
  document.querySelectorAll('.btn,.totop,.socials a').forEach(function(b){
    var xTo=gsap.quickTo(b,'x',{duration:0.4,ease:'power3'}),yTo=gsap.quickTo(b,'y',{duration:0.4,ease:'power3'});
    b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();xTo((e.clientX-(r.left+r.width/2))*0.2);yTo((e.clientY-(r.top+r.height/2))*0.22);});
    b.addEventListener('pointerleave',function(){gsap.to(b,{x:0,y:0,duration:0.6,ease:'elastic.out(1,0.45)'});});
  });
}
/* Reactive cursor ring: trails the pointer, grows + labels over cards/buttons/text (fine-pointer only) */
(function(){
  if(!window.matchMedia||!matchMedia('(hover:hover) and (pointer:fine)').matches||!window.gsap)return;
  var ring=document.getElementById('cursor'); if(!ring)return;
  var lbl=document.createElement('span'); lbl.className='clabel'; ring.appendChild(lbl);
  var xTo=gsap.quickTo(ring,'x',{duration:.42,ease:'power3'}),yTo=gsap.quickTo(ring,'y',{duration:.42,ease:'power3'});
  var on=false;
  window.addEventListener('pointermove',function(e){xTo(e.clientX);yTo(e.clientY);if(!on){on=true;ring.classList.add('on');}},{passive:true});
  document.addEventListener('mouseleave',function(){on=false;ring.classList.remove('on');});
  document.querySelectorAll('.galg figure,.split-media,.phero-media').forEach(function(el){if(!el.getAttribute('data-cursor'))el.setAttribute('data-cursor','View');});
  document.querySelectorAll('a[href*="shop"]').forEach(function(el){if(!el.getAttribute('data-cursor'))el.setAttribute('data-cursor','Shop');});
  var sel='a,button,.btn,.card,.galg figure,.split-media,.phero-media,h1,h2,h3,.totop,.socials a,[data-cursor]';
  document.querySelectorAll(sel).forEach(function(el){
    el.addEventListener('pointerenter',function(){ring.classList.add('grow');lbl.textContent=el.getAttribute('data-cursor')||'';});
    el.addEventListener('pointerleave',function(){ring.classList.remove('grow');lbl.textContent='';});
  });
})();
