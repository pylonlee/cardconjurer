//Create objects for common properties across available frames
var masks = [{src:'/img/frames/custom/m15-eighth/token/regular-textless/pinline.png', name:'Pinline'}, {src:'/img/frames/custom/m15-eighth/token/regular-textless/frame.png', name:'Frame'}, {src:'/img/frames/custom/m15-eighth/token/regular-textless/title.png', name:'Title'}, {src:'/img/frames/custom/m15-eighth/token/regular-textless/type.png', name:'Type'}, {src:'/img/frames/custom/m15-eighth/regular/Border.png', name:'Border'}];
var bounds = {x:0.7573, y:2538/2814, width:0.188, height:0.0733};
//defines available frames
availableFrames = [
	{name:'White Frame', src:'/img/frames/custom/m15-eighth/token/ub-textless/w.png', masks:masks},
	{name:'Blue Frame', src:'/img/frames/custom/m15-eighth/token/ub-textless/u.png', masks:masks},
	{name:'Black Frame', src:'/img/frames/custom/m15-eighth/token/ub-textless/b.png', masks:masks},
	{name:'Red Frame', src:'/img/frames/custom/m15-eighth/token/ub-textless/r.png', masks:masks},
	{name:'Green Frame', src:'/img/frames/custom/m15-eighth/token/ub-textless/g.png', masks:masks},
	{name:'Multicolored Frame', src:'/img/frames/custom/m15-eighth/token/ub-textless/m.png', masks:masks},
	{name:'Artifact Frame', src:'/img/frames/custom/m15-eighth/token/ub-textless/a.png', masks:masks},
	{name:'Land Frame', src:'/img/frames/custom/m15-eighth/token/ub-textless/l.png', masks:masks},

	{name:'White Power/Toughness', src:'/img/frames/m15/ub/pt/w.png', bounds:bounds},
	{name:'Blue Power/Toughness', src:'/img/frames/m15/ub/pt/u.png', bounds:bounds},
	{name:'Black Power/Toughness', src:'/img/frames/m15/ub/pt/b.png', bounds:bounds},
	{name:'Red Power/Toughness', src:'/img/frames/m15/ub/pt/r.png', bounds:bounds},
	{name:'Green Power/Toughness', src:'/img/frames/m15/ub/pt/g.png', bounds:bounds},
	{name:'Multicolored Power/Toughness', src:'/img/frames/m15/ub/pt/m.png', bounds:bounds},
	{name:'Artifact Power/Toughness', src:'/img/frames/m15/ub/pt/a.png', bounds:bounds},
	{name:'Vehicle Power/Toughness', src:'/img/frames/m15/ub/pt/v.png', bounds:bounds},
	{name:'Colorless Power/Toughness', src:'/img/frames/m15/ub/pt/c.png', bounds:bounds},
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
	//resets things so that every frame doesn't have to
	await resetCardIrregularities();
	//sets card version
	card.version = 'm15EighthUBTokenTextless';
	//art bounds
	card.artBounds = {x:153/2010, y:352/2814, width:1704/2010, height:1974/2814};
	autoFitArt();
	//set symbol bounds
	card.setSymbolBounds = {x:0.9213, y:2425/2814, width:0.12, height:0.0410, vertical:'center', horizontal: 'right'};
	resetSetSymbol();
	//watermark bounds
	card.watermarkBounds = {x:-1, y:-1, width:0.0007, height:0.0005};
	resetWatermark();
	//text
	loadTextOptions({
		mana: {name:'Mana Cost', text:'', y:0.0613, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0},
		title: {name:'Title', text:'', x:0.0854, y:0.0522, width:0.8292, height:0.0543, oneLine:true, font:'belerenbsc', size:120/2814, color:'#fde367', align:'center'},
		type: {name:'Type', text:'', x:0.0854, y:2356/2814, width:0.8292, height:0.0543, oneLine:true, font:'belerenb', size:0.0324},
		pt: {name:'Power/Toughness', text:'', x:0.7928, y:2587/2814, width:0.1367, height:0.0372, size:0.0372, font:'belerenbsc', oneLine:true, align:'center'}
	});
	//bottom info
	loadBottomInfo({
		top: {text:'{conditionalcolor:M15_Border,Vehicle_Frame:white}\uFFEE {elemidinfo-artist}', x:0.0647, y:1973/2100, width:0.8107, height:0.0248, oneLine:true, font:'belerenbsc', size:0.02095, color:'black'},
		wizards: {name:'wizards', text:'{conditionalcolor:M15_Border,Land_Frame,Vehicle_Frame,Colorless_Frame,White_Land_Frame,Blue_Land_Frame,Black_Land_Frame,Red_Land_Frame,Green_Land_Frame,Multicolored_Land_Frame:white}\u2122 & \u00a9 1993-{elemidinfo-year} Wizards of the Coast, Inc. {elemidinfo-number}', x:0.0647, y:1958/2100, width:0.8107, height:0.0153, oneLine:true, font:'mplantin', size:0.0153, color:'black', shadowX:0.0007, shadowY:0.0005},
	});
}
//loads available frames
loadFramePack();