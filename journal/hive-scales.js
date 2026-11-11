(function(){
const $w=id=>document.getElementById(id);let rows=[],busy=false;
const escW=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
const fmt=v=>Number(v).toLocaleString('ru-RU',{maximumFractionDigits:3});
const localDT=()=>{const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,16)};
function fill(){
 const a=$w('weightApiary'),h=$w('weightHive'),f=$w('weightFilterHive');if(!a||!h)return;
 const oldA=a.value,oldH=h.value;a.innerHTML='<option value="">Выберите пасеку</option>'+(state.apiaries||[]).map(x=>'<option value="'+escW(x.id)+'">'+escW(x.name)+'</option>').join('');if(oldA)a.value=oldA;
 const hs=(state.hives||[]).filter(x=>!a.value||x.apiary_id===a.value);h.innerHTML='<option value="">Выберите улей</option>'+hs.map(x=>'<option value="'+escW(x.id)+'">Улей №'+escW(x.hive_number)+'</option>').join('');if(oldH&&hs.some(x=>x.id===oldH))h.value=oldH;
 if(f){const old=f.value;f.innerHTML='<option value="">Все ульи</option>'+(state.hives||[]).map(x=>'<option value="'+escW(x.id)+'">Улей №'+escW(x.hive_number)+'</option>').join('');if(old)f.value=old}
}
function render(){
 const box=$w('weightHistory');if(!box)return;const filter=$w('weightFilterHive')?.value||'',list=rows.filter(x=>!filter||x.hive_id===filter).sort((a,b)=>new Date(a.measured_at)-new Date(b.measured_at));
 const hm=Object.fromEntries((state.hives||[]).map(x=>[x.id,x.hive_number])),am=Object.fromEntries((state.apiaries||[]).map(x=>[x.id,x.name]));
 const lastByHive={};const deltas=list.map(x=>{const prev=lastByHive[x.hive_id];lastByHive[x.hive_id]=x;return prev?Number(x.weight_kg)-Number(prev.weight_kg):null});
 if(!list.length){box.innerHTML='<div class="empty">Измерений пока нет. Добавьте первое показание.</div>';$w('weightSummary').innerHTML='';$w('weightChart').innerHTML='';return}
 const last=list[list.length-1],prev=list.slice(0,-1).reverse().find(x=>x.hive_id===last.hive_id),delta=prev?Number(last.weight_kg)-Number(prev.weight_kg):null;
 $w('weightSummary').innerHTML='<div class="card"><b>Последний вес</b><div class="big">'+fmt(last.weight_kg)+' кг</div><div class="muted">'+new Date(last.measured_at).toLocaleString('ru-RU')+'</div></div><div class="card"><b>Изменение к предыдущему</b><div class="big">'+(delta===null?'—':(delta>0?'+':'')+fmt(delta)+' кг')+'</div><div class="muted">Разница между измерениями, не чистый медосбор</div></div>';
 const event={measurement:'Измерение',feeding:'Подкормка',honey_harvest:'Откачка мёда',equipment_change:'Изменение комплектации',other:'Другое'},scale={mechanical:'Механические',electronic:'Электронные',bluetooth:'Bluetooth'};
 box.innerHTML='<div class="table-wrap"><table class="table"><thead><tr><th>Дата</th><th>Пасека / улей</th><th>Вес, кг</th><th>Изменение</th><th>Весы</th><th>Событие / примечание</th><th></th></tr></thead><tbody>'+list.slice().reverse().map((r,ri)=>{const i=list.length-1-ri,d=deltas[i],dt=new Date(r.measured_at).toLocaleString('ru-RU');return '<tr><td>'+escW(dt)+'</td><td>'+escW(am[r.apiary_id]||'—')+' / №'+escW(hm[r.hive_id]||'—')+'</td><td><b>'+fmt(r.weight_kg)+'</b></td><td style="font-weight:700;color:'+(d>0?'#26713a':d<0?'#a33b2d':'var(--muted)')+'">'+(d===null?'—':(d>0?'+':'')+fmt(d)+' кг')+'</td><td>'+escW(scale[r.scale_type]||r.scale_type)+'</td><td>'+escW(event[r.event_type]||r.event_type)+(r.notes?'<br><small>'+escW(r.notes)+'</small>':'')+'</td><td><button class="btn danger weight-del" data-id="'+escW(r.id)+'" type="button">Удалить</button></td></tr>'}).join('')+'</tbody></table></div>';
 box.querySelectorAll('.weight-del').forEach(b=>b.onclick=async()=>{if(!confirm('Удалить измерение?'))return;b.disabled=true;const {error}=await db.from('hive_weight_readings').delete().eq('id',b.dataset.id);if(error){toast(error.message);b.disabled=false}else{await load();toast('Измерение удалено')}});
 const data=list.filter(x=>x.hive_id===($w('weightFilterHive')?.value||''));if(!$w('weightFilterHive')?.value||data.length<2){$w('weightChart').innerHTML='<div class="empty">Выберите конкретный улей и добавьте минимум два измерения для графика.</div>';return}const chartData=data.slice(-14);
 const vals=chartData.map(x=>Number(x.weight_kg)),mn=Math.min(...vals),mx=Math.max(...vals),rg=Math.max(mx-mn,.1),points=vals.map((v,i)=>(25+i*550/(vals.length-1))+','+(140-(v-mn)/rg*110)).join(' ');
 $w('weightChart').innerHTML='<svg viewBox="0 0 600 165" style="width:100%;height:auto"><polyline points="'+points+'" fill="none" stroke="#1d6337" stroke-width="3"/><text x="25" y="15" fill="#708078" font-size="11">'+fmt(mx)+' кг</text><text x="25" y="160" fill="#708078" font-size="11">'+fmt(mn)+' кг</text></svg><small class="muted">Динамика общей массы улья по последним измерениям.</small>';
}
async function load(){
 if(guestMode){$w('weightEditor').style.display='none';$w('weightGuestNote').style.display='block';$w('weightHistory').textContent='История доступна владельцу журнала после входа.';return}
 if(busy)return;busy=true;$w('weightHistory').textContent='Загрузка…';
 try{const {data,error}=await db.from('hive_weight_readings').select('*').order('measured_at',{ascending:false});if(error)throw error;rows=data||[];state.hiveWeightReadings=rows;render()}
 catch(e){$w('weightHistory').textContent='Не удалось загрузить показания: '+(e.message||e)}
 finally{busy=false}
}
async function save(e){
 e.preventDefault();if(guestMode)return toast('Гостевой просмотр — только чтение');
 const form=e.currentTarget;const b=form.querySelector('[type=submit]');b.disabled=true;
 try{
 const {data:{user},error:ue}=await db.auth.getUser();if(ue)throw ue;if(!user)throw Error('Войдите в журнал');
 const apiary_id=$w('weightApiary').value,hive_id=$w('weightHive').value,weight_kg=Number($w('weightValue').value);
 if(!apiary_id||!hive_id)throw Error('Выберите пасеку и улей');if(!(weight_kg>0&&weight_kg<1000))throw Error('Проверьте вес в килограммах');
 const {error}=await db.from('hive_weight_readings').insert({user_id:user.id,apiary_id,hive_id,weight_kg,measured_at:new Date($w('weightMeasuredAt').value||new Date()).toISOString(),scale_type:$w('weightScaleType').value,reading_method:'manual',event_type:$w('weightEventType').value,notes:$w('weightNotes').value.trim()||null});
 if(error)throw error;form.reset();$w('weightMeasuredAt').value=localDT();fill();await load();toast('Показание сохранено');
 }catch(err){toast('Не удалось сохранить: '+(err.message||err))}finally{b.disabled=false}
}
function init(){if(!$w('page-weights'))return;$w('weightApiary').onchange=fill;$w('weightFilterHive').onchange=render;$w('weightForm').onsubmit=save;$w('weightRefreshBtn').onclick=load;document.querySelectorAll('[data-page="weights"]').forEach(b=>b.addEventListener('click',()=>{fill();load()}));fill();$w('weightMeasuredAt').value=localDT()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();