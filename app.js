const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];
const pages = {home:'今日', coach:'AI 私教', meal:'轻食方案', workout:'宿舍训练', data:'成长数据'};
function showPage(id){$$('.page').forEach(x=>x.classList.toggle('active',x.id===id));$$('.nav-item').forEach(x=>x.classList.toggle('active',x.dataset.page===id));$('#page-title').innerHTML=id==='home'?'早上好，林同学 <span>✦</span>':pages[id];window.scrollTo({top:0,behavior:'smooth'});}
$$('.nav-item').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.page)));
$$('[data-jump]').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.jump)));
setTimeout(()=>$('#splash').classList.add('hide'),1750);
const responses={
  '午餐怎么吃？':'可以按「一拳主食 + 一掌蛋白 + 两拳蔬菜」来挑：半份杂粮饭、番茄鸡蛋配去皮鸡腿、再加一份深色叶菜。吃饱比硬扛更容易坚持。',
  '我今天不想练':'完全没关系。今天把目标换成 3 分钟肩颈舒展，完成就算赢。长期变好靠的是弹性，不是逼自己硬撑。',
  '晚睡如何调整？':'晚睡当天不需要补偿性节食或高强度训练。记得规律吃饭、午后少喝浓咖啡，今晚用 2 分钟呼吸练习帮身体缓下来。'
};
function answer(text){const lower=text.toLowerCase();if(responses[text])return responses[text];if(/苹果|不吃|节食|断食/.test(lower))return '不建议用不吃饭或只吃水果来减脂。这样容易饿、影响学习，也更难长期维持。我们先保证三餐规律，再一起调整搭配。';if(/食堂|午餐|吃什么/.test(lower))return responses['午餐怎么吃？'];if(/不想练|累|运动/.test(lower))return responses['我今天不想练'];if(/熬夜|晚睡/.test(lower))return responses['晚睡如何调整？'];return '我听见你的想法啦。先不用追求一次做到满分，告诉我你现在是饿、累，还是时间不够？我会给你一个能执行的小方案。'}
function addMessage(text,who='ai'){const el=document.createElement('div');el.className='msg '+who;el.innerHTML=`<span>${who==='ai'?'燃':'林'}</span><p>${text}</p>`;$('#messages').append(el);$('#messages').scrollTop=9999;}
function send(text){if(!text.trim())return;addMessage(text,'user');setTimeout(()=>addMessage(answer(text)),420)}
$('#chat-form').addEventListener('submit',e=>{e.preventDefault();const input=$('#chat-input');send(input.value);input.value=''});
$$('.quick-asks button').forEach(b=>b.addEventListener('click',()=>send(b.textContent)));
$('#clear-chat').addEventListener('click',()=>{$('#messages').innerHTML='<div class="msg ai"><span>燃</span><p>聊天记录已清空。但我还在这里，随时陪你把今天过得舒服一点。</p></div>'});
$('#voice-btn').addEventListener('click',()=>{const phrase='今天不用追求完美。好好吃饭，动一动，就已经很棒了。';if('speechSynthesis'in window){speechSynthesis.cancel();speechSynthesis.speak(new SpeechSynthesisUtterance(phrase));}toast('小燃正在温柔提醒你 ✦')});
function toast(text){const t=$('#toast');t.textContent=text;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2800)}
$$('.add-food').forEach(b=>b.addEventListener('click',()=>{b.textContent='✓';b.style.background='#69bfa3';b.style.color='#fff';toast('已加入今日午餐记录') }));
$$('.task').forEach(b=>b.addEventListener('click',()=>{if(!b.dataset.jump&&!b.classList.contains('done')){b.classList.add('done');b.querySelector('i').textContent='✓';toast('小任务已完成，真不错！')}}));
let running=false, seconds=720, tick;function renderTime(){const m=Math.floor(seconds/60),s=seconds%60;$('#timer-number').textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`}
$('#start-workout').addEventListener('click',()=>{if(running){clearInterval(tick);running=false;$('#start-workout').innerHTML='继续跟练 <span>→</span>';return}running=true;$('#start-workout').innerHTML='暂停训练 <span>Ⅱ</span>';tick=setInterval(()=>{seconds--;renderTime();if(seconds<=0){clearInterval(tick);running=false;toast('训练完成！记得补水和拉伸 ✦')}},1000)});

