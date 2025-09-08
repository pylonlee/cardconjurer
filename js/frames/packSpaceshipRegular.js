//Create objects for common properties across available frames (复用现有资源)
var masks = [
    {src:'/img/frames/m15/regular/m15MaskPinline.png', name:'Pinline'}, 
    {src:'/img/frames/m15/regular/m15MaskTitle.png', name:'Title'}, 
    {src:'/img/frames/m15/regular/m15MaskType.png', name:'Type'}, 
    {src:'/img/frames/m15/regular/m15MaskRules.png', name:'Rules'}, 
    {src:'/img/frames/m15/regular/m15MaskFrame.png', name:'Frame'}, 
    {src:'/img/frames/m15/regular/m15MaskBorder.png', name:'Border'}

];

//defines available frames (主要复用无色/奥札奇frame资源)
availableFrames = [
    {name:'White Frame', src:'/img/frames/m15/regular/m15FrameW.png', masks:masks},
    {name:'Blue Frame', src:'/img/frames/m15/regular/m15FrameU.png', masks:masks},
    {name:'Black Frame', src:'/img/frames/m15/regular/m15FrameB.png', masks:masks},
    {name:'Red Frame', src:'/img/frames/m15/regular/m15FrameR.png', masks:masks},
    {name:'Green Frame', src:'/img/frames/m15/regular/m15FrameG.png', masks:masks},
    {name:'Multicolored Frame', src:'/img/frames/m15/regular/m15FrameM.png', masks:masks},
    {name:'Artifact Frame', src:'/img/frames/m15/regular/m15FrameA.png', masks:masks}

];

//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = false;

//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = async function() {
    //resets things so that every frame doesn't have to
    await resetCardIrregularities();
    
    //sets card version
    card.version = 'spaceshipRegular';
    
    //art bounds
    card.artBounds = {x:0.076, y:0.111, width:0.848, height:0.4429};
    autoFitArt();
    
    //set symbol bounds
    card.setSymbolBounds = {x:0.9213, y:0.5955, width:0.12, height:0.0372, vertical:'center', horizontal: 'right'};
    resetSetSymbol();
    
    //watermark bounds
    card.watermarkBounds = {x:0.5, y:0.7762, width:0.75, height:0.2305};
    resetWatermark();
    
    //text
    loadTextOptions({
        mana: {name:'Mana Cost', text:'', y:0.0613, width:0.9292, height:71/2100, oneLine:true, size:71/1638, align:'right', shadowX:-0.001, shadowY:0.0029, manaCost:true, manaSpacing:0, fontSize: 0},
        title: {name:'Title', text:'', x:0.0851, y:0.0522, width:0.8148, height:0.0543, oneLine:true, font:'belerenb', size:0.0381, fontSize: 0},
        type: {name:'Type', text:'', x:0.0851, y:0.5693, width:0.8148, height:0.0522, oneLine:true, font:'belerenb', size:0.0324, fontSize: 0},
        rules: {name:'Rules Text', text:'', x:0.086, y:0.6303, width:0.828, height:0.1875, size:0.0362, fontSize: 0},
        station0: {name:'Station Ability 1', text:'', x:0.18, y:0.8239, width:0.58, height:0.08, size:0.0324, fontSize: 0},
        station1: {name:'Station Ability 2', text:'', x:0.18, y:0.7439, width:0.58, height:0.08, size:0.0324, fontSize: 0},
        // 【修改此行】将 x 恢复为标准右下角位置 0.7928
        pt: {name:'Power/Toughness', text:'', x:0.7928, y:0.862, width:0.1367, height:0.0572, size:0.0372, font:'belerenbsc', oneLine:true, align:'center', fontSize: 0}
    });

    // NOW load the script that contains the logic
    card.onload = '/js/frames/versionSpaceship.js';
    loadScript('/js/frames/versionSpaceship.js');
}

//loads available frames
loadFramePack();