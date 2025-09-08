// 【恢复】预加载所有颜色的PT背景图的代码
const ptBoxImages = {
    W: new Image(), U: new Image(), B: new Image(), R: new Image(), G: new Image(), M: new Image(), A: new Image()
};
for (const key of Object.keys(ptBoxImages)) {
    setImageUrl(ptBoxImages[key], `/img/frames/m15/regular/m15PT${key}.png`);
}

// 使用您想要的鲜艳颜色代码
const pipColorMap = {
    'W': '#F8F6D8', // 经典白色 (略带羊皮纸黄)
    'U': '#0077C8', // 经典蓝色 (鲜艳)
    'B': '#231F20', // 经典黑色 (深邃)
    'R': '#D82B2B', // 经典红色 (纯正)
    'G': '#008858', // 经典绿色 (饱满)
    'M': '#E6A219', // 经典金色 (明亮)
    'A': '#9E9D9D'  // 神器/无色 (中性灰)
};

if (!loadedVersions.includes('/js/frames/versionSpaceship.js')) {
    loadedVersions.push('/js/frames/versionSpaceship.js');
    
    sizeCanvas('spaceshipPreFrame');
    sizeCanvas('spaceshipPostFrame');
    
    document.querySelector('#creator-menu-tabs').innerHTML += '<h3 class="selectable readable-background" onclick="toggleCreatorTabs(event, `spaceship`)">Station</h3>';
    
    var newHTML = document.createElement('div');
    newHTML.id = 'creator-menu-spaceship';
    newHTML.classList.add('hidden');
    newHTML.innerHTML = `
    <div class='readable-background padding'>
        <h5 class='padding margin-bottom input-description'>Station abilities are charged from top to bottom. Configure each station level below:</h5>
        <h5 class='padding margin-bottom input-description'>Top Station Level (Low Charge):</h5>
        <div class='padding input-grid margin-bottom'>
            <input id='spaceship-charge-0' type='text' class='input' oninput='spaceshipEdited();' placeholder='8+' value='8+'>
            <input id='spaceship-height-0' type='number' class='input' oninput='spaceshipEdited();' min='0' value='80'>
            <input id='spaceship-shift-0' type='number' class='input' oninput='spaceshipEdited();' value='0'>
        </div>
        <h5 class='padding margin-bottom input-description'>Bottom Station Level (High Charge):</h5>
        <div class='padding input-grid margin-bottom'>
            <input id='spaceship-charge-1' type='text' class='input' oninput='spaceshipEdited();' placeholder='16+' value='16+'>
            <input id='spaceship-height-1' type='number' class='input' oninput='spaceshipEdited();' min='0' value='80'>
            <input id='spaceship-shift-1' type='number' class='input' oninput='spaceshipEdited();' value='0'>
        </div>
        <h5 class='padding margin-bottom input-description'>Station Count:</h5>
        <select id='spaceship-count' class='input margin-bottom' onchange='spaceshipEdited();'>
            <option value='0'>No Station Abilities</option>
            <option value='1' selected>1 Station Level</option>
            <option value='2'>2 Station Levels</option>
        </select>
        <h5 class='padding margin-bottom input-description'>Charge Pip Color:</h5>
        <select id='spaceship-pip-color' class='input margin-bottom' onchange='spaceshipEdited();'>
            <option value="A" selected>Artifact</option>
            <option value="W">White</option>
            <option value="U">Blue</option>
            <option value="B">Black</option>
            <option value="R">Red</option>
            <option value="G">Green</option>
            <option value="M">Multicolored</option>
        </select>
    </div>`;
    
    if (!card.spaceship) {
        card.spaceship = {
            charges: ['8+', '16+'], stationAdjust: [0, 0], count: 1, x: 0.086, width: 0.828,
            pipColor: 'A'
        };
    }
    
    window.spaceshipStationLayout = [ [], [0.8239], [0.7439, 0.8239] ];
    document.querySelector('#creator-menu-sections').appendChild(newHTML);

    resetSpaceshipImages();
    
} else {
    resetSpaceshipImages(fixSpaceshipInputs(spaceshipEdited));
}

function spaceshipEdited() {
    if (!card.text.rules || !card.text.station0 || !card.spaceship) { return; }

    card.spaceship.charges[0] = document.querySelector('#spaceship-charge-0').value;
    card.spaceship.charges[1] = document.querySelector('#spaceship-charge-1').value;
    card.spaceship.stationAdjust[0] = document.querySelector('#spaceship-shift-0').value / card.height;
    card.spaceship.stationAdjust[1] = document.querySelector('#spaceship-shift-1').value / card.height;
    card.spaceship.count = parseInt(document.querySelector('#spaceship-count').value);
    card.spaceship.pipColor = document.querySelector('#spaceship-pip-color').value;
    
    if (card.spaceship.count == 0) {card.text.rules.height = 0.2875;} else if (card.spaceship.count == 1) {card.text.rules.height = 0.1875;} else {card.text.rules.height = 0.1075;}
    const heights = [parseFloat((parseInt(document.querySelector('#spaceship-height-0').value) / card.height).toFixed(4)), parseFloat((parseInt(document.querySelector('#spaceship-height-1').value) / card.height).toFixed(4))];
    if (card.spaceship.count == 1) {card.text.station0.y = -1; card.text.station1.height = heights[1]; card.text.station1.y = spaceshipStationLayout[1][0] + card.spaceship.stationAdjust[1];} else {for (var i = 0; i < 2; i++) {card.text['station' + i].height = heights[i]; if (i < card.spaceship.count) {card.text['station' + i].y = spaceshipStationLayout[2][i] + card.spaceship.stationAdjust[i];} else {card.text['station' + i].y = -1;}}}
    if (card.text.pt) {if (card.spaceship.count > 0) {const bottomStation = card.text.station1; const centerY = bottomStation.y + (bottomStation.height / 2); card.text.pt.y = centerY - (card.text.pt.height / 2);} else {card.text.pt.y = -1;}}
    fixSpaceshipInputs();
    
    spaceshipPreFrameContext.clearRect(0, 0, spaceshipPreFrameCanvas.width, spaceshipPreFrameCanvas.height);
    spaceshipPostFrameContext.clearRect(0, 0, spaceshipPostFrameCanvas.width, spaceshipPostFrameCanvas.height);
    
    const stationsToDraw = [];
    if (card.spaceship.count === 1) {stationsToDraw.push(1);} else if (card.spaceship.count === 2) {stationsToDraw.push(0, 1);}

    spaceshipPostFrameContext.globalCompositeOperation = 'source-over';
    stationsToDraw.forEach(i => {
        var x = scaleX(card.spaceship.x);
        var y = scaleY(card.text['station' + i].y);
        var width = scaleWidth(card.spaceship.width);
        var height = scaleHeight(card.text['station' + i].height);
        const stationColor = (i === 0) ? '#d0d0d8' : '#e8e8f0';
        
        spaceshipPostFrameContext.fillStyle = stationColor;
        spaceshipPostFrameContext.globalAlpha = 0.7;
        spaceshipPostFrameContext.fillRect(x, y, width, height);
        spaceshipPostFrameContext.globalAlpha = 1;
    });
    
    if (card.spaceship.count > 0 && card.text.pt) {
        const pipColor = card.spaceship.pipColor;
        const ptBoxImage = ptBoxImages[pipColor];
        if (ptBoxImage && ptBoxImage.complete) {
            const ptWidth = 0.188; const ptHeight = 0.0733; const ptX = 0.7573;
            const bottomStation = card.text.station1; const dynamicCenterY = bottomStation.y + (bottomStation.height / 2);
            const ptY = dynamicCenterY - (ptHeight / 2);
            spaceshipPostFrameContext.drawImage(ptBoxImage, scaleX(ptX), scaleY(ptY), scaleWidth(ptWidth), scaleHeight(ptHeight));
        }
    }
    
    stationsToDraw.forEach(i => {
        var stationCharge = card.spaceship.charges[i];
        var stationPlacement = scaleY(card.text['station' + i].y + card.text['station' + i].height/2);
        if (stationCharge) {
            const centerX = scaleX(0.086); const centerY = stationPlacement; const outerRadius = scaleWidth(0.04); const innerRadius = scaleWidth(0.03);
            
            // 【修改】增加对黑色的特殊处理
            let outerRingColor;
            if (card.spaceship.pipColor === 'B') {
                // 如果选择的是黑色，则外圈使用神器的灰色
                outerRingColor = pipColorMap['A']; 
            } else {
                // 否则，正常使用颜色表
                outerRingColor = pipColorMap[card.spaceship.pipColor] || pipColorMap['A'];
            }
            spaceshipPostFrameContext.fillStyle = outerRingColor;
            spaceshipPostFrameContext.beginPath(); spaceshipPostFrameContext.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI); spaceshipPostFrameContext.fill();
            
            spaceshipPostFrameContext.fillStyle = '#141210';
            spaceshipPostFrameContext.beginPath(); spaceshipPostFrameContext.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI); spaceshipPostFrameContext.fill();
            
            spaceshipPostFrameContext.fillStyle = 'white'; spaceshipPostFrameContext.shadowColor = 'black'; spaceshipPostFrameContext.shadowOffsetY = scaleHeight(0.001); spaceshipPostFrameContext.shadowBlur = scaleHeight(0.002);
            spaceshipPostFrameContext.font = scaleHeight(0.025) + 'px belerenbsc'; spaceshipPostFrameContext.textAlign = 'center';
            const chargeTextX = 0.086; 
            spaceshipPostFrameContext.fillText(stationCharge, scaleX(chargeTextX), stationPlacement + scaleHeight(0.0086));
            spaceshipPostFrameContext.shadowColor = 'transparent';
        }
    });

    drawTextBuffer();
    drawCard();
}

function fixSpaceshipInputs(callback) {
    if (!card.text.station0 || !card.spaceship) { return; }
    document.querySelector('#spaceship-charge-0').value = card.spaceship.charges[0];
    document.querySelector('#spaceship-charge-1').value = card.spaceship.charges[1];
    document.querySelector('#spaceship-height-0').value = scaleHeight(card.text.station0.height);
    document.querySelector('#spaceship-height-1').value = scaleHeight(card.text.station1.height);
    document.querySelector('#spaceship-shift-0').value = scaleHeight(card.spaceship.stationAdjust[0]);
    document.querySelector('#spaceship-shift-1').value = scaleHeight(card.spaceship.stationAdjust[1]);
    document.querySelector('#spaceship-count').value = card.spaceship.count;
    document.querySelector('#spaceship-pip-color').value = card.spaceship.pipColor;
    if (callback) { callback(); }
}

function resetSpaceshipImages(callback) {
    if (callback) { callback(); }
}