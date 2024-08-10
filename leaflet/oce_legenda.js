
var legendS = L.control({ position: 'bottomcenter' });
legendS.onAdd = function (map) {     
var div = L.DomUtil.create('div'),
    labelx = ["leaflet/images/SPL.svg"];
    div.innerHTML +=
            ("<br><img src="+ labelx +" height='50' width='500'>")
    return div;
};
map.on('overlayadd', function(eventLayer){
    if (eventLayer.name === "Suhu Permukaan Laut"){
        map.addControl(legendS);
    } 
});
map.on('overlayremove', function(eventLayer){
    if (eventLayer.name === "Suhu Permukaan Laut"){
        map.removeControl(legendS);
    } 
});

var legendSL = L.control({ position: 'bottomcenter' });
legendSL.onAdd = function (map) {     
var div = L.DomUtil.create('div'),
    labelx = ["leaflet/images/Salinitas.svg"];
    div.innerHTML +=
            ("<br><img src="+ labelx +" height='50' width='500'>")
    return div;
};
map.on('overlayadd', function(eventLayer){
    if (eventLayer.name === "Salinitas"){
        map.addControl(legendSL);
    } 
});
map.on('overlayremove', function(eventLayer){
    if (eventLayer.name === "Salinitas"){
        map.removeControl(legendSL);
    } 
});

var legendW = L.control({ position: 'bottomcenter' });
legendW.onAdd = function (map) {     
var div = L.DomUtil.create('div'),
    labelx = ["leaflet/images/TinggiGelombang.svg"];
    div.innerHTML +=
            ("<br><img src="+ labelx +" height='50' width='500'>")
    return div;
};
map.on('overlayadd', function(eventLayer){
    if (eventLayer.name === "Tinggi Gelombang"){
        map.addControl(legendW);
    } 
});
map.on('overlayremove', function(eventLayer){
    if (eventLayer.name === "Tinggi Gelombang"){
        map.removeControl(legendW);
    } 
});

var legendK = L.control({ position: 'bottomcenter' });
legendK.onAdd = function (map) {     
var div = L.DomUtil.create('div'),
    labelx = ["leaflet/images/Kelembapan.svg"];
    div.innerHTML +=
            ("<br><img src="+ labelx +" height='50' width='500'>")
    return div;
};
map.on('overlayadd', function(eventLayer){
    if (eventLayer.name === "Kelembapan Udara"){
        map.addControl(legendW);
    } 
});
map.on('overlayremove', function(eventLayer){
    if (eventLayer.name === "Kelembapan Udara"){
        map.removeControl(legendW);
    } 
});

 //LEGENDA ANGIN--------------------------------------------
var legendw1 = L.control({position: 'topleft'});
legendw1.onAdd = function (map) {

var div = L.DomUtil.create('div', 'info legend');
labels = ['<strong>Angin</strong>'];
categories = [0, 1, 2, 3, 4, 5, 6];
categori = [0,'<strong>< 1</strong>', 2, 3, 4, 5,'<strong>> 6</strong>'];

for (var i = 1; i < categories.length; i++) {
    function getColor(d) {
        return d > 6 ? '#800026' :
               d > 5  ? '#BD0026' :
               d > 4 ? '#E31A1C' :
               d > 3  ? '#FC4E2A' :
               d > 2  ? '#FD8D3C' :
               d > 1  ? '#FEB24C' :
               d > 0   ? '#FED976' :
                          '#FFEDA0';
        };

        div.innerHTML += 
        labels.push(
            '<i class="circle" style="background:' + getColor(categories[i]) + '"></i> ' +
            (categories[i] ? categori[i] : '+'));

    }
    div.innerHTML = labels.join('<br>');
    div.innerHTML +='<br></i><span>m/s</span><br>';
return div;
};

map.on('overlayadd', function(eventLayer){
    if (eventLayer.name === 'Angin Pemukaaan'){
        map.addControl(legendw1);
    } 
});
map.on('overlayremove', function(eventLayer){
    if (eventLayer.name === 'Angin Pemukaaan'){
        map.removeControl(legendw1);
    } 
});

//LEGENDA ARUS--------------------------------

var legendW2 = L.control({position: 'topleft'});
legendW2.onAdd = function (map) {

var div = L.DomUtil.create('div', 'info legend');
labels = ['<strong>Arus</strong>'];
categories = [0, 0.2, 0.4, 0.6, 0.8, 1.0];
categori = [0,'<strong>> 0.0</strong>', 0.2, 0.4, 0.8, '<strong>> 1.0</strong>'];

for (var i = 1; i < categories.length; i++) {
    function getColor(d) {
        return d > 1 ? '#800026' :
               d > 0.8  ? '#BD0026' :
               d > 0.6 ? '#E31A1C' :
               d > 0.4  ? '#FC4E2A' :
               d > 0.2  ? '#FD8D3C' :
               d > 0.0  ? '#FEB24C' :
                '#FED976';
        };

        div.innerHTML += 
        labels.push(
            '<i class="circle" style="background:' + getColor(categories[i]) + '"></i> ' +
            (categories[i] ? categori[i] : '+'));

    }
    div.innerHTML = labels.join('<br>');
    div.innerHTML +='<br></i><span>m/s</span><br>';
return div;
};
map.on('overlayadd', function(eventLayer){
    if (eventLayer.name === 'Arus Permukaan'){
        map.addControl(legendW2);
    } 
});
map.on('overlayremove', function(eventLayer){
    if (eventLayer.name === 'Arus Permukaan'){
        map.removeControl(legendW2);
    } 
});
