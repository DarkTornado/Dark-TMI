/*
Dark TMI (Dark Too Many Items)
© 2016 Dark Tornado, All rights reserved.
version 1.0
소스 도용 금지.
*/

const ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
const sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();


var btn = null;
var menu = null;
var menu2 = null;
var version = "1.0";
var version2 = "N/A";
var white = android.graphics.Color.WHITE;
var number = android.text.InputType.TYPE_CLASS_NUMBER;
var xyz = false;
var ride = false;
var heal = false;
var kill = false;
var instaBreak = false;
var walk = false;
var timeLock = false;
var timeData = false;
var antiEnt = false;
var spawnMode = false;
var spawnType = null;


var forder = new java.io.File(sdcard+"/darkTornado/");
var forder2 = new java.io.File(sdcard+"/darkTornado/DarkTMI/");
forder.mkdir();
forder2.mkdir();
var file = new java.io.File(sdcard+"/darkTornado/DarkTMI/.nomedia");
file.createNewFile();


var TMI = {
save : function(name, msg){
try{
var file = new java.io.File(sdcard+"/darkTornado/DarkTMI/"+name+".txt");
var fos = new java.io.FileOutputStream(file);
var str = new java.lang.String(msg);
fos.write(str.getBytes());
fos.close();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
},
read : function(name){
try{
var file = new java.io.File(sdcard+"/darkTornado/DarkTMI/"+name+".txt");
if(!(file.exists())) return "";
var fis = new java.io.FileInputStream(file);
var isr = new java.io.InputStreamReader(fis);
var br = new java.io.BufferedReader(isr);
var str = br.readLine();
var line = "";
while((line = br.readLine()) != null){
str += "\n" + line;
}
fis.close();
isr.close();
br.close();
return str;
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
},
isMulti : function(){
if(Entity.getEntityTypeId(Player.getEntity())==0) return true;
else return false;
},
receiveMessage : function(){
new java.lang.Thread({
run : function(){
try{
var str = new java.lang.StringBuilder();
var url = new java.net.URL("https://raw.githubusercontent.com/DarkTornado/Dark-TMI/master/version.txt");
var con = url.openConnection();
if(con!=null){
con.setConnectTimeout(5000);
con.setUseCaches(false);
var isr = new java.io.InputStreamReader(con.getInputStream());
var br = new java.io.BufferedReader(isr);
while(true){
var line=br.readLine();
if(line==null) break;
str.append(line+"\n");
}
br.close();
con.disconnect();
}
var msg = str.toString().split("::");
version2 = msg[0];
if(msg[1]=="true") showDialog(msg[2], msg[3]);
}
catch(e){
return;
clientMessage(e+", "+e.lineNumber);
}
}
}).start();
},
download : function(file, url){
ctx.runOnUiThread(new java.lang.Runnable({
run: function(){
try{
var uri = new android.net.Uri.parse(url);
var dm = new android.app.DownloadManager.Request(uri);
dm.setTitle("Dark TMI 추가 파일 다운로드");
dm.setDescription("추가 파일 다운로드 중...");
dm.setDestinationInExternalPublicDir("darkTornado/DarkTMI", file);
dm.setNotificationVisibility(1);
ctx.getSystemService(android.content.Context.DOWNLOAD_SERVICE).enqueue(dm);
}
catch(e){
toast("다운로드 실패. 오류 : "+e);
}
}
}));
},
downloadDialog : function(){
ctx.runOnUiThread(new java.lang.Runnable({
run : function(){
try{
var dialog = new MinecraftDialog();
dialog.setTitle("Dark TMI 추가 파일 다운로드");
dialog.setMessage("Dark TMI(Dark Too Many Items)에서 사용할 추가 이미지 파일 다운로드가 필요합니다. 지금 다운로드 하시겠습니까?");
dialog.setNegativeButton("아니요", null);
dialog.setPositiveButton("네", function(){
TMI.download("toastBack.jpg", "https://raw.githubusercontent.com/DarkTornado/Dark-TMI/master/toastBack.jpg");
print("다운로드를 시작합니다.");
});
dialog.show();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}



};


Entity.getHealth = function(e){
if(e==null||Entity.getEntityTypeId(e)>=64) return;
else return net.zhuoweizhang.mcpelauncher.ScriptManager.nativeGetMobHealth(e);
};
Entity.setHealth = function(e, n){
if(e==null||Entity.getEntityTypeId(e)>=64){
return;
}
else{
try{
var vers = ModPE.getMinecraftVersion().toString().split(".");
if(Number(vers[1])>=12&&Player.isPlayer(e)&&n<=20){
net.zhuoweizhang.mcpelauncher.ScriptManager.nativeSetMobHealth(e, Number(n)+6);
Entity.addEffect(e, MobEffect.harm, 10, 0, true, false);
}
else{
net.zhuoweizhang.mcpelauncher.ScriptManager.nativeSetMobHealth(e, n);
}
}
catch(e){
net.zhuoweizhang.mcpelauncher.ScriptManager.nativeSetMobHealth(e, n);
}
}
};


ModPE.langEdit("menu.copyright", "©Mojang AB §eDark TMI §0by Dark Tornado");


function dip2px(ctx, dips){
return Math.ceil(dips*ctx.getResources().getDisplayMetrics().density);
}


function toast(msg){
ctx.runOnUiThread(new java.lang.Runnable({
run : function(){
try{
var toast = android.widget.Toast.makeText(ctx, "<TMI> "+msg, android.widget.Toast.LENGTH_LONG);
var image = new android.graphics.BitmapFactory.decodeFile(sdcard+"/darkTornado/DarkTMI/toastBack.jpg");
var btnBackData = new android.graphics.drawable.BitmapDrawable(image);
toast.getView().setBackgroundDrawable(btnBackData);
toast.show();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


function nightCheck(){
var nc1, nc2, nc3;
nc1 = Level.getTime();
try{
var vers = ModPE.getMinecraftVersion().toString().split(".");
if(Number(vers[1])>=12) nc2 = nc1/24000;
else nc2 = nc1/19200;
}
catch(e){
nc2 = nc1/19200;
}
nc3 = nc2-Math.floor(nc2);
if(nc3<0.5) return false;
else if(nc3>=0.5) return true;
}


function newLevel(){
makeButton();
TMI.receiveMessage();
var file = new java.io.File(sdcard+"/darkTornado/DarkTMI/toastBack.jpg");
if(!file.exists()) TMI.downloadDialog();
}


function leaveGame(){
ctx.runOnUiThread(new java.lang.Runnable({
run : function(){
if(btn!=null){
btn.dismiss();
btn = null;
}
if(menu!=null){
menu.dismiss();
menu = null;
}
}
}));
}


function makeButton(){
ctx.runOnUiThread(new java.lang.Runnable({
run : function(){
try{
btn = new android.widget.PopupWindow();
var layout = new android.widget.RelativeLayout(ctx);
var button = new android.widget.Button(ctx);
button.setText("M");
button.setTextSize(13);
button.setBackgroundDrawable(btnBack(1));
button.setOnClickListener(new android.view.View.OnClickListener({
onClick : function(v){
if(TMI.isMulti()) toast("싱글 전용입니다.");
else tooMany();
}
}));
var longTouchCheck = false;
button.setOnLongClickListener(new android.view.View.OnLongClickListener({ onLongClick: function(v){
longTouchCheck = true;
return true;
}
}));
button.setOnTouchListener(new android.view.View.OnTouchListener({
onTouch: function(v, ev) {
try{
if(longTouchCheck){
switch(ev.action){
case android.view.MotionEvent.ACTION_MOVE : 
btn.update(ev.getRawX(), ev.getRawY(), btn.getWidth(), btn.getHeight());
break;
case android.view.MotionEvent.ACTION_UP : 
longTouchCheck = false;
button.setBackgroundDrawable(btnBack(1));
break;
}
}
else{
switch(ev.action){
case android.view.MotionEvent.ACTION_DOWN : 
button.setBackgroundDrawable(btnBack(2));
break;
case android.view.MotionEvent.ACTION_UP : 
button.setBackgroundDrawable(btnBack(1));
break;
}
}
return false;
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
layout.addView(button);
btn.setContentView(layout);
btn.setWidth(dip2px(ctx, 35));
btn.setHeight(dip2px(ctx, 35));
btn.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
btn.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT|android.view.Gravity.TOP, dip2px(ctx, 2), dip2px(ctx, 30));
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


function tooMany(){
ctx.runOnUiThread(new java.lang.Runnable({
run : function(){
try{
menu = new android.widget.PopupWindow();
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(0);
var title = new android.widget.TextView(ctx);
title.setText("Too Many Items v."+version);
title.setTextSize(27);
title.setTextColor(android.graphics.Color.YELLOW);
title.setGravity(android.view.Gravity.CENTER);
title.setBackgroundDrawable(btnBack(3));
var pad = dip2px(ctx, 7);
title.setPadding(pad, pad, pad, dip2px(ctx, 11));
var checkTf = false;

var layout1 = new android.widget.LinearLayout(ctx);
layout1.setOrientation(1);
var title1 = new android.widget.TextView(ctx);
title1.setText("인벤토리\n");
title1.setTextSize(23);
title1.setTextColor(white);
title1.setGravity(android.view.Gravity.CENTER);
title1.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()*1/3-dip2px(ctx, 6));
layout1.addView(title1);
var menus1 = ["아이템 지급", "인벤토리 리셋", "갑옷 바로 입기", "아이템 목록", "아이템 검색"];
var btns1 = new Array();
for(var n in menus1){
btns1[n] = new MinecraftButton(ctx);
btns1[n].setText(menus1[n]);
btns1[n].setId(n);
btns1[n].setOnClickListener(new android.view.View.OnClickListener({
onClick: function(v){
switch(v.getId()){
case 0 : 
addItem();
break;
case 1 : 
for(var n=0;n<55;n++)
Player.clearInventorySlot(n);
toast("인벤토리가 리셋되었습니다.");
break;
case 2 : 
selectArmor();
break
case 3 : 
toast("아이템 목록을 불러오는 중...");
new java.lang.Thread({
run : function(){
java.lang.Thread.sleep(100);
showItemList();
}
}).start();
break;
case 4 : 
itemSearch();
break;
}
}
}));
layout1.addView(btns1[n]);
}

var layout2 = new android.widget.LinearLayout(ctx);
layout2.setOrientation(1);
var title2 = new android.widget.TextView(ctx);
title2.setText("월드\n");
title2.setTextSize(23);
title2.setTextColor(white);
title2.setGravity(android.view.Gravity.CENTER);
title2.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()*1/3-dip2px(ctx, 6));
layout2.addView(title2);
var tym = Level.getTime();
while(tym>24000) tym -= 24000;
var time = new android.widget.TextView(ctx);
time.setText("시간 : "+tym);
time.setTextSize(17);
time.setTextColor(white);
time.setOnClickListener(new android.view.View.OnClickListener({
onClick : function(v){
timeDialog(time, clock);
}
}));
layout2.addView(time);
var clock = new android.widget.SeekBar(ctx);
clock.setMax(24000);
clock.setProgress(tym);
clock.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
onProgressChanged : function(seek){
Level.setTime(seek.getProgress());
time.setText("시간 : "+seek.getProgress());
}
}));
layout2.addView(clock);
var menusT2 = ["공중 부양", "플레이어 좌표", "시간 고정", "체력 고정"];
var btnT2 = new Array();
for(var n in menusT2){
btnT2[n] = new MinecraftToggleButton(ctx);
btnT2[n].setTextOn(menusT2[n]);
btnT2[n].setTextOff(menusT2[n]);
btnT2[n].setId(n);
}
for(var n in menusT2)
btnT2[n].setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
onCheckedChanged : function(toggle, onoff){
if(checkTf){
switch(toggle.getId()){
case 0 : 
Player.setCanFly(onoff);
break;
case 1 : 
xyz = onoff;
break;
case 2 : 
timeLock = onoff;
if(onoff) timeData = Level.getTime();
break;
case 3 : 
heal = onoff;
break;
}
}
if(onoff) btnT2[toggle.getId()].setBackgroundDrawable(btnBack(2));
else btnT2[toggle.getId()].setBackgroundDrawable(btnBack(1));
}
}));
btnT2[0].setChecked(Player.canFly());
btnT2[1].setChecked(xyz);
btnT2[2].setChecked(timeLock);
btnT2[3].setChecked(heal);
for(var n in menusT2)
layout2.addView(btnT2[n]);
var menus2 = ["게임 모드 변경", "체력 설정", "플레이어 이동", "날씨 설정", "레벨/경험치 설정", "포션 효과 부여/삭제"];
var btns2 = new Array();
for(var n in menus2){
btns2[n] = new MinecraftButton(ctx);
btns2[n].setText(menus2[n]);
btns2[n].setId(n);
btns2[n].setOnClickListener(new android.view.View.OnClickListener({
onClick: function(v){
switch(v.getId()){
case 0 : 
if(Level.getGameMode()==0){
Level.setGameMode(1);
toast("크리에이티브로 변경되었습니다.");
}
else if(Level.getGameMode()==1){
Level.setGameMode(0);
toast("서바이벌로 변경되었습니다.");
}
break;
case 1 : 
playerHealth();
break;
case 2 : 
playerTp();
break;
case 3 : 
weatherSet();
break
case 4 : 
inputLevelAndExp();
break;
case 5 : 
giveEffectType(Player.getEntity());
break;
}
}
}));
layout2.addView(btns2[n]);
}
btns2[4].setOnLongClickListener(new android.view.View.OnLongClickListener({
onLongClick: function(v){
Entity.removeAllEffects(Player.getEntity());
toast("포션 효과가 삭제되었습니다.");
return true;
}
}));

var layout3 = new android.widget.LinearLayout(ctx);
layout3.setOrientation(1);
var title3 = new android.widget.TextView(ctx);
title3.setText("엔티티\n");
title3.setTextSize(23);
title3.setTextColor(white);
title3.setGravity(android.view.Gravity.CENTER);
title3.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()*1/3-dip2px(ctx, 6));
layout3.addView(title3);
var btnT3 = new MinecraftToggleButton(ctx);
btnT3.setTextOn("엔티티 스폰 방지");
btnT3.setTextOff("엔티티 스폰 방지");
btnT3.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
onCheckedChanged : function(toggle, onoff){
if(checkTf){
antiEnt = onoff;
}
if(onoff) btnT3.setBackgroundDrawable(btnBack(2));
else btnT3.setBackgroundDrawable(btnBack(1));
}
}));
btnT3.setChecked(antiEnt);
layout3.addView(btnT3);
var menus3 = ["엔티티 스폰", "엔티티 삭제", "모든 엔티티 삭제", "엔티티 탑승"];
var btns3 = new Array();
for(var n in menus3){
btns3[n] = new MinecraftButton(ctx);
btns3[n].setText(menus3[n]);
btns3[n].setId(n);
btns3[n].setOnClickListener(new android.view.View.OnClickListener({
onClick: function(v){
switch(v.getId()){
case 0 : 
entityList(true);
break;
case 1 : 
entityList(false);
break;
case 2 : 
var ents = Entity.getAll();
for(var n in ents){
if(!(Player.isPlayer(ents[n])||Entity.getEntityTypeId(ents[n])==83))
Entity.remove(ents[n]);
}
toast("플레이어와 그림을 제외한 모든 엔티티가 삭제되었습니다.");
break
case 3 : 
ride = true;
toast("탑승할 엔티티를 터치하세요...");
break;
}
}
}));
layout3.addView(btns3[n]);
}

var layout4 = new android.widget.LinearLayout(ctx);
layout4.setOrientation(1);
var title4 = new android.widget.TextView(ctx);
title4.setText("기타 기능\n");
title4.setTextSize(23);
title4.setTextColor(white);
title4.setGravity(android.view.Gravity.CENTER);
title4.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()*1/3-dip2px(ctx, 6));
layout4.addView(title4);
var menus4 = ["게임 속도 설정", "최신 버전 확인", "제작자 블로그", "스크립트 정보"];
var btns4 = new Array();
for(var n in menus4){
btns4[n] = new MinecraftButton(ctx);
btns4[n].setText(menus4[n]);
btns4[n].setId(n);
btns4[n].setOnClickListener(new android.view.View.OnClickListener({
onClick: function(v){
switch(v.getId()){
case 0 : 
gameSpeed();
break;
case 1 : 
showDialog("최신 버전 확인", "현재 버전 : "+version+"\n최신 버전 : "+version2+"\n최신 버전은 제작자의 블로그에서 다운받으실 수 있습니다.");
break;
case 2 : 
var uri = new android.net.Uri.parse("http://blog.naver.com/dt3141592");
var link = new android.content.Intent(android.content.Intent.ACTION_VIEW, uri);
ctx.startActivity(link);
break;
case 3 : 
infoDialog();
break;
}
}
}));
layout4.addView(btns4[n]);
}

checkTf = true;

var pad = dip2px(ctx, 5);
layout1.setPadding(pad, pad, pad, pad);
layout2.setPadding(pad, pad, pad, pad);
layout3.setPadding(pad, pad, pad, pad);
layout4.setPadding(pad, pad, pad, pad);
var scroll1 = new android.widget.ScrollView(ctx);
var scroll2 = new android.widget.ScrollView(ctx);
var scroll3 = new android.widget.ScrollView(ctx);
var scroll4 = new android.widget.ScrollView(ctx);
scroll1.addView(layout1);
scroll2.addView(layout2);
scroll3.addView(layout3);
scroll4.addView(layout4);
layout.addView(scroll1);
layout.addView(scroll2);
layout.addView(scroll3);
layout.addView(scroll4);

var scroll = new android.widget.HorizontalScrollView(ctx);
scroll.addView(layout);
var pad = dip2px(ctx, 18);
scroll.setPadding(pad, pad, pad, pad);
var svParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.FILL_PARENT, android.widget.RelativeLayout.LayoutParams.FILL_PARENT);
scroll.setLayoutParams(svParams);
var Layout = new android.widget.LinearLayout(ctx);
Layout.setOrientation(1);
Layout.addView(title);
Layout.addView(scroll);
Layout.setBackgroundDrawable(btnBack(1));
var Layout2 = new android.widget.LinearLayout(ctx);
Layout2.setOrientation(1);
Layout2.addView(Layout);
Layout2.setPadding(dip2px(ctx, 40), dip2px(ctx, 20), dip2px(ctx, 40), dip2px(ctx, 20));
menu.setContentView(Layout2);
menu.setFocusable(true);
menu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(70, 0, 0, 0)));
menu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth());
menu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight());
menu.showAtLocation(ctx.getWindow().getDecorView(),android.view.Gravity.CENTER|android.view.Gravity.CENTER, 0, 0);
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


function useItem(x, y, z, i, b, s, it, bd){
if(spawnMode){
if(spawnType==93) Level.spawnMob(x, y+1, z, spawnType);
else Level.spawnMob(x, y+3, z, spawnType);
}

}


function attackHook(a, v){
if(ride){
Entity.rideAnimal(a, v);
ride = false;
preventDefault();
}


}


function entityAddedHook(e){
if(antiEnt&&!Player.isPlayer(e)&&Entity.getEntityTypeId(e)!=83){
Entity.remove(e);
}

}


function modTick(){
if(xyz) ModPE.showTipMessage("\n\n\nX : "+Math.round(Player.getX()-0.5)+", Y : "+Math.floor(Player.getY())+", Z : "+Math.round(Player.getZ()-0.5));
if(heal) Player.setHealth(20);
if(timeLock) Level.setTime(timeData);

}


function addItem(){
ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
try{
var dialog = new MinecraftDialog();
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
var loc1 = new android.widget.TextView(ctx);
var loc2 = new android.widget.EditText(ctx);
var loc3 = new android.widget.TextView(ctx);
var loc4 = new android.widget.EditText(ctx);
var loc5 = new android.widget.TextView(ctx);
var loc6 = new android.widget.EditText(ctx);
loc1.setText("아이템 아이디 : ");
loc1.setTextSize(18);
loc1.setTextColor(white);
loc2.setHint("아이템 아이디를 입력하세요...");
loc2.setTextColor(white);
loc2.setBackgroundDrawable(btnBack(2));
loc2.setInputType(number);
loc3.setText("아이템 개수 : ");
loc3.setTextSize(18);
loc3.setTextColor(white);
loc4.setHint("아이템 개수를 입력하세요...");
loc4.setTextColor(white);
loc4.setInputType(number|android.text.InputType.TYPE_NUMBER_FLAG_SIGNED);
loc4.setBackgroundDrawable(btnBack(2));
loc5.setText("아이템 데미지 : ");
loc5.setTextSize(18);
loc5.setTextColor(white);
loc6.setHint("아이템 데미지를 입력하세요...");
loc6.setTextColor(white);
loc6.setInputType(number);
loc6.setBackgroundDrawable(btnBack(2));
layout.addView(loc1);
layout.addView(loc2);
layout.addView(loc3);
layout.addView(loc4);
layout.addView(loc5);
layout.addView(loc6);
dialog.setView(layout);
dialog.setTitle("아이템 지급");
dialog.setNegativeButton("취소", null);
dialog.setPositiveButton("확인", function(){
addItemInventory(loc2.getText(), loc4.getText(), loc6.getText());
toast("지급되었습니다.");
});
dialog.show();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


function selectArmor(){
ctx.runOnUiThread(new java.lang.Runnable({
run: function(){
try{
var dialog = new MinecraftDialog();
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
var btns = new Array();
var menus = ["가죽 갑옷 세트", "사슬 갑옷 세트", "철 갑옷 세트", "다이아몬드 갑옷 세트", "금 갑옷 세트"];
for(var n in menus){
btns[n] = new MinecraftButton(ctx);
btns[n].setText(menus[n]);
btns[n].setId(n);
btns[n].setOnClickListener(new android.view.View.OnClickListener({
onClick: function(v){
switch(v.getId()){
case 0 : 
Player.setArmorSlot(0, 298, 0);
Player.setArmorSlot(1, 299, 0);
Player.setArmorSlot(2, 300, 0);
Player.setArmorSlot(3, 301, 0);
break;
case 1 : 
Player.setArmorSlot(0, 302, 0);
Player.setArmorSlot(1, 303, 0);
Player.setArmorSlot(2, 304, 0);
Player.setArmorSlot(3, 305, 0);
break;
case 2 : 
Player.setArmorSlot(0, 306, 0);
Player.setArmorSlot(1, 307, 0);
Player.setArmorSlot(2, 308, 0);
Player.setArmorSlot(3, 309, 0);
break;
case 3 : 
Player.setArmorSlot(0, 310, 0);
Player.setArmorSlot(1, 311, 0);
Player.setArmorSlot(2, 312, 0);
Player.setArmorSlot(3, 313, 0);
break;
case 4 : 
Player.setArmorSlot(0, 314, 0);
Player.setArmorSlot(1, 315, 0);
Player.setArmorSlot(2, 316, 0);
Player.setArmorSlot(3, 317, 0);
break;
}
toast(menus[v.getId()]+"를 착용하였습니다.");
dialog.close();
}
}));
layout.addView(btns[n]);
}
dialog.setView(layout);
dialog.setTitle("갑옷 종류 선택");
dialog.setNegativeButton("취소", null);
dialog.show();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


function showItemList(){
ctx.runOnUiThread(new java.lang.Runnable({
run: function(){
try{
var dialog = new MinecraftDialog();
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
var names = [], codes = [];
for(var n=0;n<4096;n++){
if(net.zhuoweizhang.mcpelauncher.ScriptManager.nativeIsValidItem(n)){
names.push(n+"번 : "+net.zhuoweizhang.mcpelauncher.ScriptManager.nativeGetItemName(n, 0, false));
codes.push(n);
}
}
var codes2 = [0, 64, 95, 97, 140, 144, 246, 248, 249, 255, 373, 383];
var names2 = ["공기", "문(블록)", "보이지 않는 베드락", "몬스터 스폰알(?)", "화분", "머리", "빛나는 옵시디언", "업데이트 블록 1", "업데이트 블록 2", "오류 돌", "물병(포션)", "스폰알"];
for(var n in codes2)
names.splice(codes.indexOf(codes2[n]), 1, codes2[n]+ "번 : "+names2[n]);
var btns = new Array();
for(var n in names){
btns[n] = new MinecraftButton(ctx);
btns[n].setText(names[n]);
btns[n].setId(n);
btns[n].setOnClickListener(new android.view.View.OnClickListener({
onClick: function(v){
var codes3 = [1, 5, 6, 17, 18, 24, 35, 38, 43, 44, 79, 97, 98, 155, 159, 161, 162, 171, 175, 333, 349, 350, 351, 373, 383, 438];
if(codes3.indexOf(codes[v.getId()])!=-1){
itemDamageList(names[v.getId()], codes[v.getId()], codes3.indexOf(codes[v.getId()]));
}
else{
if(Level.getGameMode()==0){
inputAmount(codes[v.getId()], 0);
}
else{
Entity.setCarriedItem(Player.getEntity(), codes[v.getId()], 5, 0);
toast("설정되었습니다.");
}
}
dialog.close();
}
}));
layout.addView(btns[n]);
}
dialog.setView(layout);
dialog.setTitle("아이템 아이디 목록");
dialog.setNegativeButton("닫기", null);
dialog.show();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


function itemDamageList(title, code, nn){
ctx.runOnUiThread(new java.lang.Runnable({
run: function(){
try{
var dialog = new MinecraftDialog();
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
var codes3 = [1, 5, 6, 17, 18, 24, 35, 38, 43, 44, 79, 97, 98, 155, 159, 161, 162, 171, 175, 333, 349, 350, 351, 373, 383, 438];
var lengths = [7, 6, 6, 4, 4, 3, 16, 9, 8, 8, 2, 6, 3, 3, 16, 2, 2, 16, 6, 6, 4, 4, 16, 36, null, 36];
var names = [], codes = [];
if(code==383){
var entityIds = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
for(var n=0;n<entityIds.length;n++){
names.push("아이템 데미지 : "+entityIds[n]+", 이름 : "+net.zhuoweizhang.mcpelauncher.ScriptManager.nativeGetItemName(code, entityIds[n], false));
codes.push(entityIds[n]);
}
var codes2 = [20, 21, 44];
var names2 = ["아이언 골램 생성", "스노우 골램 생성", "좀비 주민 생성"];
for(var n in codes2)
names.splice(codes.indexOf(codes2[n]), 1, "아이템 데미지 : "+codes2[n]+", 이름 : "+names2[n]);
}
else{
for(var n=0;n<lengths[nn];n++){
names.push("아이템 데미지 : "+n+", 이름 : "+net.zhuoweizhang.mcpelauncher.ScriptManager.nativeGetItemName(code, n, false));
codes.push(n);
}
}
var btns = new Array();
for(var n in names){
btns[n] = new MinecraftButton(ctx);
btns[n].setText(names[n]);
btns[n].setId(n);
btns[n].setOnClickListener(new android.view.View.OnClickListener({
onClick: function(v){
if(Level.getGameMode()==0){
inputAmount(code, codes[v.getId()]);
}
else{
Entity.setCarriedItem(Player.getEntity(), code, 5, codes[v.getId()]);
toast("설정되었습니다.");
}
dialog.close();
}
}));
layout.addView(btns[n]);
}
dialog.setView(layout);
dialog.setTitle(title);
dialog.setNegativeButton("닫기", null);
dialog.show();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


function inputAmount(itemId, itemDemage){
ctx.runOnUiThread(new java.lang.Runnable({
run: function(){
try{
var dialog = new MinecraftDialog();
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
var loc2 = new android.widget.EditText(ctx);
loc2.setHint("개수를 입력하세요...");
loc2.setTextColor(white);
loc2.setInputType(number);
loc2.setBackgroundDrawable(btnBack(2));
layout.addView(loc2);
dialog.setView(layout);
dialog.setTitle("아이템 지급 - 개수 입력");
dialog.setNegativeButton("취소", null);
dialog.setPositiveButton("확인", function(){
addItemInventory(itemId, loc2.getText(), itemDemage);
toast("지급되었습니다.");
});
dialog.show();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


function itemSearch(){
ctx.runOnUiThread(new java.lang.Runnable({
run: function(){
try{
var dialog = new MinecraftDialog();
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
var loc2 = new android.widget.EditText(ctx);
loc2.setTextColor(white);
loc2.setHint("검색어를 입력하세요...");
loc2.setBackgroundDrawable(btnBack(2));
layout.addView(loc2);
var scroll = android.widget.ScrollView(ctx);
scroll.addView(layout);
dialog.setView(scroll);
dialog.setTitle("아이템 검색");
dialog.setNegativeButton("취소", null);
dialog.setPositiveButton("확인", function(){
try{
var items = [];
var codes = [0, 9, 11, 64, 95, 97, 140, 144, 246, 248, 249, 255, 373, 383, 439];
var names = ["공기", "멈춘 물", "멈춘 용암", "문(블록)", "보이지 않는 베드락", "몬스터 스폰알(?)", "화분", "머리", "빛나는 옵시디언", "업데이트 블록 1", "업데이트 블록 2", "오류 돌", "물병(포션)", "스폰알", "카메라"];
var codes2 = [1, 5, 6, 17, 18, 24, 35, 38, 43, 44, 79, 97, 98, 155, 159, 161, 162, 171, 175, 333, 349, 350, 351, 373, 438];
var lengths = [7, 6, 6, 4, 4, 3, 16, 9, 8, 8, 2, 6, 3, 3, 16, 2, 2, 16, 6, 6, 4, 4, 16, 36, 36];
for(var n=0;n<4096;n++){
if(net.zhuoweizhang.mcpelauncher.ScriptManager.nativeIsValidItem(n)){
if(codes.indexOf(n)==-1){
items.push([n, 0, net.zhuoweizhang.mcpelauncher.ScriptManager.nativeGetItemName(n, 0, false)]);
}
else if(n==383){
var entityIds = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
var codes3 = [20, 21, 44];
var names3 = ["아이언 골램 생성", "스노우 골램 생성", "좀비 주민 생성"];
for(var m=0;m<entityIds.length;m++){
if(codes3.indexOf(m)!=-1) items.push([383, codes3[codes3.indexOf(m)], names3[codes3.indexOf(m)]]);
else items.push([383, entityIds[m], net.zhuoweizhang.mcpelauncher.ScriptManager.nativeGetItemName(383, entityIds[m], false)]);
}
}
else{
items.push([n, 0, names[codes.indexOf(n)]]);
}
if(codes2.indexOf(n)!=-1){
for(var m=1;m<lengths[codes2.indexOf(n)];m++){
items.push([n, m, net.zhuoweizhang.mcpelauncher.ScriptManager.nativeGetItemName(n, m, false)]);
}
}
}
}
var str = loc2.getText().toString();
var result = [];
var result2 = [];
for(var n in items){
if(items[n].toString().search(str)!=-1){
result.push(items[n]);
result2.push("아이디 : "+items[n][0]+", 데미지 : "+items[n][1]+", 이름 : "+items[n][2]);
}
}
if(result[0]!=null) showResult(str, result, result2);
else toast("검색 결과가 없습니다.");
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
});
dialog.show();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


function showResult(str, items, names){
ctx.runOnUiThread(new java.lang.Runnable({
run : function(){
try{
var dialog = new MinecraftDialog();
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
var btns = new Array();
for(var n in names){
btns[n] = new MinecraftButton(ctx);
btns[n].setText(names[n]);
btns[n].setId(n);
btns[n].setOnClickListener(new android.view.View.OnClickListener({
onClick: function(v){
if(Level.getGameMode()==0){
inputAmount(items[v.getId()][0], items[v.getId()][1]);
}
else{
Entity.setCarriedItem(Player.getEntity(), items[v.getId()][0], 5, items[v.getId()][1]);
toast("설정되었습니다.");
}
dialog.close();
}
}));
layout.addView(btns[n]);
}
dialog.setView(layout);
dialog.setTitle("아이템 검색 - 검색 결과 ("+str+")");
dialog.setNegativeButton("취소", null);
dialog.show();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


function timeDialog(txt, seek){
ctx.runOnUiThread(new java.lang.Runnable({
run: function(){
try{
var dialog = new MinecraftDialog();
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
var loc2 = new android.widget.EditText(ctx);
loc2.setHint("시간을 입력하세요...");
loc2.setTextColor(white);
loc2.setInputType(number);
loc2.setBackgroundDrawable(btnBack(2));
layout.addView(loc2);
dialog.setView(layout);
dialog.setTitle("시간 설정");
dialog.setNegativeButton("취소", null);
dialog.setPositiveButton("확인", function(){
seek.setProgress(Number(loc2.getText()));
txt.setText("시간 : "+loc2.getText());
Level.setTime(loc2.getText());
toast("설정되었습니다.");
});
dialog.show();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


function playerHealth(){
ctx.runOnUiThread(new java.lang.Runnable({
run: function(){
try{
var dialog = new MinecraftDialog();
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
var loc2 = new android.widget.EditText(ctx);
loc2.setHint("체력을 입력하세요...");
loc2.setTextColor(white);
loc2.setInputType(number);
loc2.setBackgroundDrawable(btnBack(2));
layout.addView(loc2);
dialog.setView(layout);
dialog.setTitle("체력 설정");
dialog.setNegativeButton("취소", null);
dialog.setPositiveButton("확인", function(){
Player.setHealth(loc2.getText());
toast("설정되었습니다.");
});
dialog.show();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


function playerTp(){
ctx.runOnUiThread(new java.lang.Runnable({
run: function(){
try{
var dialog = new MinecraftDialog();
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
var loc1 = new android.widget.TextView(ctx);
var loc2 = new android.widget.EditText(ctx);
var loc3 = new android.widget.TextView(ctx);
var loc4 = new android.widget.EditText(ctx);
var loc5 = new android.widget.TextView(ctx);
var loc6 = new android.widget.EditText(ctx);
loc1.setText("X : ");
loc1.setTextSize(18);
loc1.setTextColor(white);
loc2.setHint("x좌표를 입력하세요...");
loc2.setInputType(number|android.text.InputType.TYPE_NUMBER_FLAG_SIGNED);
loc2.setBackgroundDrawable(btnBack(2));
loc2.setTextColor(white);
loc3.setText("Y : ");
loc3.setTextSize(18);
loc3.setTextColor(white);
loc4.setHint("y좌표를 입력하세요...");
loc4.setInputType(number|android.text.InputType.TYPE_NUMBER_FLAG_SIGNED);
loc4.setTextColor(white);
loc4.setBackgroundDrawable(btnBack(2));
loc5.setText("Z : ");
loc5.setTextSize(18);
loc5.setTextColor(white);
loc6.setHint("z좌표를 입력하세요...");
loc6.setInputType(number|android.text.InputType.TYPE_NUMBER_FLAG_SIGNED);
loc6.setTextColor(white);
loc6.setBackgroundDrawable(btnBack(2));
layout.addView(loc1);
layout.addView(loc2);
layout.addView(loc3);
layout.addView(loc4);
layout.addView(loc5);
layout.addView(loc6);
dialog.setView(layout);
dialog.setTitle("플레이어 이동");
dialog.setNegativeButton("취소", null);
dialog.setPositiveButton("확인", function(){
Entity.setPosition(Player.getEntity(), loc2.getText(), loc4.getText(), loc6.getText());
toast("이동되었습니다.");
});
dialog.show();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


function weatherSet(){
ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
try{
var dialog = new MinecraftDialog();
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
var loc1 = new android.widget.TextView(ctx);
var loc2 = new android.widget.SeekBar(ctx);
var loc3 = new android.widget.TextView(ctx);
var loc4 = new android.widget.SeekBar(ctx);
var txt1 =  Math.round(Level.getRainLevel()*100);
var txt2 =  Math.round(Level.getLightningLevel()*100);
loc1.setText("비 강도 : "+(txt1/100));
loc1.setTextSize(18);
loc3.setText("번개 강도 : "+(txt2/100));
loc3.setTextSize(18);
loc2.setMax(100);
loc4.setMax(100);
loc2.setProgress(txt1);
loc4.setProgress(txt2);
loc2.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
onProgressChanged : function(seek){
loc1.setText("비 강도 : "+(seek.getProgress()/100));
txt1 = seek.getProgress();
}
}));
loc4.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
onProgressChanged : function(seek){
loc3.setText("번개 강도 : "+(seek.getProgress()/100));
txt2 = seek.getProgress();
}
}));
loc1.setTextColor(white);
loc3.setTextColor(white);
layout.addView(loc1);
layout.addView(loc2);
layout.addView(loc3);
layout.addView(loc4);
dialog.setView(layout);
dialog.setTitle("날씨 설정");
dialog.setNegativeButton("취소", null);
dialog.setPositiveButton("확인", function(){
Level.setRainLevel(txt1/100);
Level.setLightningLevel(txt2/100);
toast("날씨가 설정되었습니다.");
});
dialog.show();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


function inputLevelAndExp(){
ctx.runOnUiThread(new java.lang.Runnable({
run: function(){
try{
var dialog = new MinecraftDialog();
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
var loc1 = new android.widget.TextView(ctx);
var loc2 = new android.widget.EditText(ctx);
loc1.setTextColor(white);
loc2.setTextColor(white);
loc2.setBackgroundDrawable(btnBack(2));
loc1.setText("레벨 : ");
loc1.setTextSize(18);
loc2.setHint("레벨을 입력하세요...");
loc2.setText(Player.getLevel()+"");
loc2.setInputType(number);
layout.addView(loc1);
layout.addView(loc2);
var loc3 = new android.widget.TextView(ctx);
var loc4 = new android.widget.EditText(ctx);
loc3.setTextColor(white);
loc4.setTextColor(white);
loc4.setBackgroundDrawable(btnBack(2));
loc3.setText("경험치 : ");
loc3.setTextSize(18);
loc4.setHint("경험치를 입력하세요...");
loc4.setText(Player.getExp()+"");
loc4.setInputType(number|android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL);
layout.addView(loc3);
layout.addView(loc4);
var scroll = android.widget.ScrollView(ctx);
scroll.addView(layout);
dialog.setView(scroll);
dialog.setTitle("레벨/경험치 설정");
dialog.setNegativeButton("취소", null);
dialog.setPositiveButton("확인", function(){
Player.setLevel(loc2.getText());
Player.setExp(loc4.getText());
toast("설정되었습니다.");
});
dialog.show();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


function giveEffectType(target){
ctx.runOnUiThread(new java.lang.Runnable({
run: function(){
try{
var dialog = new MinecraftDialog();
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
layout.setGravity(android.view.Gravity.CENTER);
var types = ["포화", "흡수", "체력 신장", "위더", "독", "나약함", "허기", "야간투시", "실명", "투명화", "수중 호흡", "화염저항", "저항", "재생", "멀미", "점프 강화", "즉시 데미지", "즉시 회복", "힘", "피로", "성급함", "구속", "신속"];
var typeId = new Array();
var checks = new Array();
for(var n in types){
checks[n] = new android.widget.CheckBox(ctx);
checks[n].setText(types[n]);
checks[n].setId(n);
checks[n].setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
onCheckedChanged : function(check, onoff){
if(onoff) typeId.push(check.getId());
else typeId.splice(typeId.indexOf(check.getId()), 1);
}
}));
layout.addView(checks[n]);
}
dialog.setView(layout);
dialog.setTitle("포션 효과 부여 - 종류");
dialog.setNegativeButton("취소", null);
dialog.setPositiveButton("확인", function(){
giveEffectTime(target, typeId);
});
dialog.show();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


function giveEffectTime(target, typeId){
ctx.runOnUiThread(new java.lang.Runnable({
run: function(){
try{
var type = [MobEffect.saturation, MobEffect.absorption, MobEffect.healthBoost, MobEffect.wither, MobEffect.poison, MobEffect.weakness, MobEffect.hunger, MobEffect.nightVision, MobEffect.blindness, MobEffect.invisibility, MobEffect.waterBreathing, MobEffect.fireResistance, MobEffect.damageResistance, MobEffect.regeneration, MobEffect.confusion, MobEffect.jump, MobEffect.harm, MobEffect.heal, MobEffect.damageBoost, MobEffect.digSlowdown, MobEffect.digSpeed, MobEffect.movementSlowdown, MobEffect.movementSpeed];
var dialog = new MinecraftDialog();
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
var txt1 = new android.widget.TextView(ctx);
txt1.setText("지속 시간(초)");
txt1.setTextSize(18);
txt1.setTextColor(white);
var txt2 = new android.widget.EditText(ctx);
txt2.setHint("지속 시간을 입력하세요...");
txt2.setInputType(number);
txt2.setTextColor(white);
txt2.setBackgroundDrawable(btnBack(2));
var txt3 = new android.widget.TextView(ctx);
txt3.setText("강도");
txt3.setTextSize(18);
txt3.setTextColor(white);
var txt4 = new android.widget.EditText(ctx);
txt4.setHint("강도를 입력하세요...");
txt4.setInputType(number|android.text.InputType.TYPE_NUMBER_FLAG_SIGNED);
txt4.setTextColor(white);
txt4.setBackgroundDrawable(btnBack(2));
layout.addView(txt1);
layout.addView(txt2);
layout.addView(txt3);
layout.addView(txt4);
dialog.setView(layout);
dialog.setTitle("포션 효과 부여 - 지속 시간&강도");
dialog.setNegativeButton("취소", null);
dialog.setPositiveButton("확인", function(){
for(var n in typeId){
Entity.addEffect(target, type[typeId[n]], 20*Number(txt2.getText()), Number(txt4.getText())-1, true, false);
}
toast("포션 효과를 부여하였습니다.");
});
dialog.show();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


function entityList(tf){
ctx.runOnUiThread(new java.lang.Runnable({
run : function(){
try{
var dialog = new MinecraftDialog();
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
var btns = new Array();
var names = ["닭", "소", "돼지", "양", "늑대", "NPC", "버섯소", "오징어", "토끼", "박쥐", "아이언 골램", "스노우 골램", "오셸롯", "좀비", "크리퍼", "스켈레톤", "거미", "좀비 피그맨", "슬라임", "엔더맨", "좀벌레", "동굴 거미", "가스트", "마그마 큐브", "블레이즈", "좀비 NPC", "마녀", "드롭된 아이템", "활성화된 TNT", "떨어지는 블록", "경험치 포션", "경험치", "낚싯대", "화살", "눈덩이", "달걀", "그림", "마인카트", "화염구", "투척 포션", "보트", "번개", "작은 화염구", "카메라", "깔때기 마인 카트", "TNT 마인 카트", "창고 마인 카트"];
var entId = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 64, 65, 66, 68, 69, 77, 80, 81, 82, 83, 84, 85, 86, 90, 93, 94, 95, 96, 97, 98];
for(var n in names){
btns[n] = new MinecraftButton(ctx);
btns[n].setText(names[n]);
btns[n].setId(n);
btns[n].setOnClickListener(new android.view.View.OnClickListener({
onClick: function(v){
if(tf){
makeSpawnBtn();
spawnMode = true;
spawnType = entId[v.getId()];
toast("터치하시면 스폰됩니다.");
}
else{
var ents = Entity.getAll();
for(var n in ents){
if(Entity.getEntityTypeId(ents[n])==entId[v.getId()])
Entity.remove(ents[n]);
}
toast(names[v.getId()]+"(이)가 삭제되었습니다.");
}
dialog.close();
}
}));
layout.addView(btns[n]);
}
if(tf) dialog.setTitle("엔티티 스폰");
else dialog.setTitle("엔티티 삭제");
dialog.setView(layout);
dialog.setNegativeButton("취소", null);
dialog.show();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


function makeSpawnBtn(entityId){
ctx.runOnUiThread(new java.lang.Runnable({
run : function(){
try{
var btn = new android.widget.PopupWindow();
var layout = new android.widget.RelativeLayout(ctx);
var button = new android.widget.Button(ctx);
button.setText("스폰 모드 끝내기");
button.setTextSize(13);
button.setBackgroundDrawable(btnBack(1));
button.setOnClickListener(new android.view.View.OnClickListener({
onClick : function(v){
spawnMode = false;
btn.dismiss();
}
}));
var longTouchCheck = false;
button.setOnLongClickListener(new android.view.View.OnLongClickListener({ onLongClick: function(v){
longTouchCheck = true;
return true;
}
}));
button.setOnTouchListener(new android.view.View.OnTouchListener({
onTouch: function(v, ev) {
try{
if(longTouchCheck){
switch(ev.action){
case android.view.MotionEvent.ACTION_MOVE : 
btn.update(ev.getRawX()-ctx.getWindowManager().getDefaultDisplay().getWidth()/2, ev.getRawY(), btn.getWidth(), btn.getHeight());
break;
case android.view.MotionEvent.ACTION_UP : 
longTouchCheck = false;
button.setBackgroundDrawable(btnBack(1));
break;
}
}
else{
switch(ev.action){
case android.view.MotionEvent.ACTION_DOWN : 
button.setBackgroundDrawable(btnBack(2));
break;
case android.view.MotionEvent.ACTION_UP : 
button.setBackgroundDrawable(btnBack(1));
break;
}
}
return false;
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
layout.addView(button);
btn.setContentView(layout);
btn.setWidth(dip2px(ctx, 75));
btn.setHeight(dip2px(ctx, 40));
btn.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
btn.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER|android.view.Gravity.TOP, 0, dip2px(ctx, 15));
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


function gameSpeed(){
ctx.runOnUiThread(new java.lang.Runnable({
run: function(){
try{
var speed = 0;
var dialog = new MinecraftDialog();
var layout = new android.widget.LinearLayout(ctx);
layout.setGravity(android.view.Gravity.CENTER);
layout.setOrientation(1);
var layout1 = new android.widget.LinearLayout(ctx);
layout1.setGravity(android.view.Gravity.CENTER);
layout1.setOrientation(0);
var t1 = new MinecraftButton(ctx);
var t2 = new MinecraftButton(ctx);
var t3 = new MinecraftButton(ctx);
t1.setText("×0.5");
t2.setText("×1");
t3.setText("×2");
t1.setOnClickListener(new android.view.View.OnClickListener({
onClick: function(v){
speed = 1;
}
}));
t2.setOnClickListener(new android.view.View.OnClickListener({
onClick: function(v){
speed = 2;
}
}));
t3.setOnClickListener(new android.view.View.OnClickListener({
onClick: function(v){
speed = 3;
}
}));
layout1.addView(t1);
layout1.addView(t2);
layout1.addView(t3);
var layout2 = new android.widget.LinearLayout(ctx);
layout2.setGravity(android.view.Gravity.CENTER);
layout2.setOrientation(0);
var t4 = new MinecraftButton(ctx);
var t5 = new MinecraftButton(ctx);
var t6 = new MinecraftButton(ctx);
t4.setText("×3");
t5.setText("×5");
t6.setText("×10");
t4.setOnClickListener(new android.view.View.OnClickListener({
onClick: function(v){
speed = 4;
}
}));
t5.setOnClickListener(new android.view.View.OnClickListener({
onClick: function(v){
speed = 5;
}
}));
t6.setOnClickListener(new android.view.View.OnClickListener({
onClick: function(v){
speed = 6;
}
}));
layout2.addView(t4);
layout2.addView(t5);
layout2.addView(t6);
layout.addView(layout1);
layout.addView(layout2);
dialog.setView(layout);
dialog.setTitle("게임 속도 설정");
dialog.setNegativeButton("취소", null);
dialog.setPositiveButton("확인", function(){
var speeds = [null, 0.5, 1, 2, 3, 5, 10];
var speedData = [null, 10, 20, 40, 50, 100, 200];
ModPE.setGameSpeed(speedData[speed]);
toast("게임속도가 "+speeds[speed]+" 배속으로 설정되었습니다.");
});
dialog.show();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


function showDialog(title, msg){
ctx.runOnUiThread(new java.lang.Runnable({
run : function(){
try{
var dialog = new MinecraftDialog();
dialog.setTitle(title);
dialog.setMessage(msg.toString());
dialog.setNegativeButton("닫기", null);
dialog.show();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


function infoDialog(){
ctx.runOnUiThread(new java.lang.Runnable({
run : function(){
try{
var dialog = new MinecraftDialog();
var layout = new android.widget.LinearLayout(ctx)
layout.setOrientation(1);
var text = new android.widget.TextView(ctx);
text.setText("스크립트 이름 : Dark TMI (Dark Too Many Items)\n스크립트 버전 : "+version+"\n리뷰 및 2차 공유는 허가하나 제작자를 밝혀주시길 바랍니다. 조건 공유(비덧 공유 등)은 금지하며, 무단 수정이나 제작자를 속이는 행위 역시 금지합니다.");
text.setTextColor(white);
text.setTextSize(17);
layout.addView(text);
var maker = new android.widget.TextView(ctx);
maker.setText("\n© 2016 Dark Tornado, All rights reserved.");
maker.setTextSize(12);
maker.setTextColor(white);
maker.setGravity(android.view.Gravity.CENTER);
layout.addView(maker);
dialog.setView(layout);
dialog.setTitle("스크립트 정보");
dialog.setNegativeButton("닫기",null);
dialog.show();
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}
}));
}


//---

var guiFile = new android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/spritesheet.png"));
var btnBack1 = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(guiFile, 8, 32, 8, 8), dip2px(ctx, 8), dip2px(ctx, 8), false);
var btnBack2 = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(guiFile, 0, 32, 8, 8), dip2px(ctx, 8), dip2px(ctx, 8), false);
var matrix = new android.graphics.Matrix(); 
matrix.postScale(-1, -1);
var btnBack3 = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(guiFile, 0, 32, 8, 8, matrix, false), dip2px(ctx, 8), dip2px(ctx, 8), false);


function btnBack(type){
if(type==1) return createNinePatch(btnBack1, dip2px(ctx, 3), dip2px(ctx, 3),dip2px(ctx, 3), dip2px(ctx, 3));
if(type==2) return createNinePatch(btnBack2, dip2px(ctx, 3), dip2px(ctx, 3),dip2px(ctx, 3), dip2px(ctx, 3));
if(type==3) return createNinePatch(btnBack3, dip2px(ctx, 3), dip2px(ctx, 3),dip2px(ctx, 3), dip2px(ctx, 3));
}


function createNinePatch(bitmap, x, y, xx, yy){   //Original Sorce from 아보카도맨
var NO_COLOR = 0x00000001;
var buffer = java.nio.ByteBuffer.allocate(56).order(java.nio.ByteOrder.nativeOrder());
buffer.put(0x01);
buffer.put(0x02);
buffer.put(0x02); 
buffer.put(0x02);
buffer.putInt(0); 
buffer.putInt(0); 
buffer.putInt(0);
buffer.putInt(0);
buffer.putInt(0); 
buffer.putInt(0);
buffer.putInt(0);
buffer.putInt(y-1); 
buffer.putInt(yy);
buffer.putInt(x-1); 
buffer.putInt(xx); 
buffer.putInt(NO_COLOR);
buffer.putInt(NO_COLOR); 
var drawable = new android.graphics.drawable.NinePatchDrawable(ctx.getResources(), bitmap, buffer.array(), new android.graphics.Rect(), null);
return drawable;
}


function MinecraftDialog(){
this.dialog = new android.widget.PopupWindow();
this.title = "";
this.msg = "";
this.pBtn = false;
this.pStr = "";
this.pFunc = function(){};
this.nBtn = false;
this.nStr = "";
this.nFunc = function(){};
this.view = null;
this.list = false;
}

MinecraftDialog.prototype = {
close : function(){
try{
this.dialog.dismiss();
}
catch(e){
print(e);
}
},
setTitle : function(str){
this.title = str.toString();
},
setMessage : function(str){
this.msg = str.toString();
},
setPositiveButton : function(str, func){
this.pBtn = true;
this.pStr = str.toString();
this.pFunc = func;
},
setNegativeButton : function(str, func){
this.nBtn = true;
this.nStr = str.toString();
this.nFunc = func;
},
setView : function(layout){
this.view = layout;
},
show : function(){
try{
var dialog = this.dialog;
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(1);
var title = new android.widget.TextView(ctx);
title.setText(this.title);
title.setTextSize(25);
title.setTextColor(android.graphics.Color.YELLOW);
title.setGravity(android.view.Gravity.CENTER);
title.setBackgroundDrawable(btnBack(3));
var pad = dip2px(ctx, 10);
title.setPadding(pad, pad, pad, pad);
var text = new android.widget.TextView(ctx);
text.setText(this.msg);
text.setTextColor(white);
text.setTextSize(20);
layout.addView(text);
var btnLayout = new android.widget.LinearLayout(ctx);
btnLayout.setOrientation(0);
if(this.nBtn){
var btnN = new android.widget.Button(ctx);
var funcN = this.nFunc;
btnN.setText(this.nStr);
btnN.setTextColor(white);
btnN.setBackgroundDrawable(btnBack(1));
if(this.pBtn) btnN.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()*1/3-dip2px(ctx, 15));
else btnN.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()*2/3-dip2px(ctx, 30));
btnN.setOnClickListener(new android.view.View.OnClickListener({
onClick: function(v){
try{
if(funcN!=null) funcN();
dialog.dismiss();
}
catch(e){
print(e);
}
}
}));
btnN.setOnTouchListener(new android.view.View.OnTouchListener({
onTouch : function(v, ev){
if(ev.action==android.view.MotionEvent.ACTION_DOWN){
btnN.setBackgroundDrawable(btnBack(2));
}
else{
btnN.setBackgroundDrawable(btnBack(1));
}
return false;
}
}));
btnLayout.addView(btnN);
}
if(this.pBtn){
var btnP = new android.widget.Button(ctx);
var funcP = this.pFunc;
btnP.setText(this.pStr);
btnP.setTextColor(white);
btnP.setBackgroundDrawable(btnBack(1));
if(this.nBtn) btnP.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()*2/3-dip2px(ctx, 15));
else btnP.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()*1/3-dip2px(ctx, 30));
btnP.setOnClickListener(new android.view.View.OnClickListener({
onClick: function(v){
try{
if(funcP!=null) funcP();
dialog.dismiss();
}
catch(e){
print(e);
}
}
}));
btnP.setOnTouchListener(new android.view.View.OnTouchListener({
onTouch : function(v, ev){
if(ev.action==android.view.MotionEvent.ACTION_DOWN){
btnP.setBackgroundDrawable(btnBack(2));
}
else{
btnP.setBackgroundDrawable(btnBack(1));
}
return false;
}
}));
btnLayout.addView(btnP);
}
if(this.view!=null) layout.addView(this.view);
var blank = new android.widget.TextView(ctx);
blank.setText("   ");
blank.setTextSize(20);
layout.addView(blank);
layout.addView(btnLayout);
var svParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.FILL_PARENT, android.widget.RelativeLayout.LayoutParams.FILL_PARENT);
var scroll = new android.widget.ScrollView(ctx);
var pad = dip2px(ctx, 15);
scroll.setPadding(pad, pad, pad, pad);
scroll.setLayoutParams(svParams);
scroll.addView(layout);
var layout2 = new android.widget.LinearLayout(ctx);
layout2.setOrientation(1);
layout2.addView(title);
layout2.addView(scroll);
dialog.setContentView(layout2);
dialog.setFocusable(true);
dialog.setBackgroundDrawable(btnBack(1));
dialog.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()*2/3);
dialog.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight()*4/5);
dialog.showAtLocation(ctx.getWindow().getDecorView(),android.view.Gravity.CENTER|android.view.Gravity.CENTER, 0, 0);
}
catch(e){
clientMessage(e+", "+e.lineNumber);
}
}


};


function MinecraftButton(ctx){
var btn = new android.widget.Button(ctx);
btn.setBackgroundDrawable(btnBack(1));
btn.setTextColor(white);
btn.setOnTouchListener(new android.view.View.OnTouchListener({
onTouch : function(v, ev){
if(ev.action==android.view.MotionEvent.ACTION_DOWN){
btn.setBackgroundDrawable(btnBack(2));
}
else{
btn.setBackgroundDrawable(btnBack(1));
}
return false;
}
}));
return btn;
}


function MinecraftToggleButton(ctx){
var btn = new android.widget.ToggleButton(ctx);
btn.setBackgroundDrawable(btnBack(1));
btn.setTextColor(white);
return btn;
}


//--

