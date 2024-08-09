var value = 0
//let dates = new Date(Date.now()+value*24*60*60*1000).toISOString().slice(0, 10)
var dates = new Date(Date.now()+value*24*60*60*1000);
var day = dates.getDate();
var month = dates.getMonth()+1;
var yy = dates.getYear();
var year = yy < 1000 ? yy + 1900 : yy;
const formattedToday = year + "-" + month + "-" +day 
//const formattedTodaym = yyyy+ '-' + mm + '-' + ddm;
//console.log(formattedToday); 
var bounds = [[-13.88,90.05], [10,142]];
var bounds2 = [[-13.82,90.11], [9.98,141.91]];
var lo1 = 90.0;
var la1 = 10.0;
var d = 0.5;
var nx = 105;
var ny = 52;
const arrayColumn = (arr, n) => arr.map(x => x[n]);
       
function initMap() {
    //BASEMAP/////////////////////////////  
    var Esri_DarkGreyCanvas = L.tileLayer(
        "http://{s}.sm.mapstack.stamen.com/" +
        "(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/" +
        "{z}/{x}/{y}.png",
        {
        attribution:
            "Tiles &copy; Esri &mdash; Esri"
        }
    );
    var Esri_WorldImagery = L.tileLayer(
        "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
        attribution:
            "Tiles &copy; Esri &mdash"
        }
    );
    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>',
                        maxZoom: 18,
                    }); 
    /*var dark_nolabels = L.tileLayer("http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png", {attribution: "OSM & Carto",
                subdomains: "abcd",
                maxZoom: 19,}); -- 
        'Dark.Carto': dark_nolabels,*/
    /*var Esri_OceanBasemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
                    attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
                    maxZoom: 13
                }); -- "Esri.Ocean.Basemap":Esri_OceanBasemap, */
    var CartoDB_PositronNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                    subdomains: 'abcd',
                    maxZoom: 20
                });

    var baseLayers = {
        "Grey.Canvas": Esri_DarkGreyCanvas,
        "Open.Street.Map": osm,
        "Esri.World.Imagery":Esri_WorldImagery,
        "CartoDB.Positron.NoLabels":CartoDB_PositronNoLabels
    };

    //OCEANOGRAPHY DATA/////////////////////////////  
    var WindLayer = new L.velocityLayer({
        particleMultiplier: 1/15,
        frameRate: 15,
        lineWidth: 1,
        particleAge: 20,
        displayValues: true,
        displayOptions: {
            showCardinal: true,
            velocityType: 'Angin 10 meter',
            // no data at cursor
            emptyString: 'No velocity data',
            // direction label prefix
            directionString: "Arah",
            // speed label prefix
            speedString: "Kecepatan",
            // 'kt' | 'k/h' | 'mph' | 'm/s'
            speedUnit: 'm/s',
            angleConvention: 'bearingCW',
            colorScale: [
                "rgb(36,104, 180)",
                "rgb(60,157, 194)",
                "rgb(128,205,193 )",
                "rgb(151,218,168 )",
                "rgb(198,231,181)",
                "rgb(238,247,217)",
                "rgb(255,238,159)",
                "rgb(252,217,125)",
                "rgb(255,182,100)",
                "rgb(252,150,75)",
                "rgb(250,112,52)",
                "rgb(245,64,32)",
                "rgb(237,45,28)",
                "rgb(220,24,32)",
                "rgb(180,0,35)"
              ],
        },
        minVelocity: 0.01,
        maxVelocity: 8,
        velocityScale: .008
    });

    var CurrLayer= new L.velocityLayer({
        particleMultiplier: 1/50,
        frameRate: 15,
        lineWidth: 1,
        particleAge: 50,
        displayValues: true,
        displayOptions: {
            showCardinal: true,
            velocityType: 'Arus Permukaan',
            // no data at cursor
            emptyString: 'No velocity data',
            // direction label prefix
            directionString: "Arah",
            // speed label prefix
            speedString: "Kecepatan",
            // 'kt' | 'k/h' | 'mph' | 'm/s'
            speedUnit: 'm/s',
            angleConvention: 'bearingCW',
        },
        minVelocity: 0.01,
        maxVelocity: 1,
        velocityScale: .05,
    });
    var Curr_Layer= new L.velocityLayer({
        particleMultiplier: 1/50,
        frameRate: 15,
        lineWidth: 1,
        particleAge: 50,
        displayValues: true,
        displayOptions: {
            showCardinal: true,
            velocityType: 'Arus Permukaan',
            // no data at cursor
            emptyString: 'No velocity data',
            // direction label prefix
            directionString: "Arah",
            // speed label prefix
            speedString: "Kecepatan",
            // 'kt' | 'k/h' | 'mph' | 'm/s'
            speedUnit: 'm/s',
            angleConvention: 'bearingCW',
        },
        minVelocity: 0.01,
        maxVelocity: 1,
        velocityScale: .05,
    });
    
    var gLayer = new L.geoJson(null,{
        style: function(feature){ 
            return {
                color: '#4264fb',
                fillColor:feature.properties.fill, 
                weight:0.1,   
                fill0pacity:1};
        }
    });
    

    
    /*
   
    */
   //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    var date = document.getElementById("Date");
    date.innerHTML = year + "-" + month + "-" + day;
    $("#slide").on("click", function(e) {
        
        date.innerHTML = year + "-" + month + "-" + day;
        e.preventDefault();
        e.stopPropagation();
        htmlRange.val(3);
        htmlRange.trigger("input"); 
    });
    
    $("#myRange").on("input", function(e) {
        let value = parseInt(e.target.value);
        dates = new Date(Date.now()+value*24*60*60*1000);
        day = dates.getDate();
        month = dates.getMonth()+1;
      
        if (value >=0) {
        date.innerHTML = year + "-" + month + "-" + day;
        const formattedToday = year + "-" + month + "-" + day;

    //SPL////////////////////////////////
    var URL_WIND =("https://pae-paha.pacioos.hawaii.edu/erddap/griddap/ncep_global_lon180.json?ugrd10m%5B("
        +formattedToday+
        "T12:00:00Z):1:("
        +formattedToday+
        "T12:00:00Z)%5D%5B(-16):1:(10)%5D%5B(90):1:(142)%5D,vgrd10m%5B("
        +formattedToday+
        "T12:00:00Z):1:("
        +formattedToday+
        "T12:00:00Z)%5D%5B(-16):1:(10)%5D%5B(90):1:(142)%5D");

        
    $.getJSON(URL_WIND, function(jsonData) {
        var U1 = [], V1 = []
        jsonData.table.rows.map(d => U1.push(d[3]));
        jsonData.table.rows.map(d => V1.push(d[4]));
        var head_u= {'parameterCategory': 2,
                    'parameterNumber': 2,
                    'lo1': lo1,
                    'la1': la1,
                    'dx': d,
                    'dy': d,
                    'nx': nx,
                    'ny': ny,
                    'refTime': formattedToday +"T12:00:00Z",
                    }
        var headu = $.extend(true, {'header':head_u},{"data": U1})
        var head_v = {'parameterCategory': 2,
                    'parameterNumber': 3,
                    'lo1': lo1,
                    'la1': la1,
                    'dx': d,
                    'dy': d,
                    'nx': nx,
                    'ny': ny,
                    'refTime': formattedToday +"T12:00:00Z",
                    };
        var headv = $.extend(true, {'header':head_v},{"data": V1});
        const vel_json = JSON.stringify([headu,headv]);
        const wind  = JSON.parse(vel_json );
        WindLayer.setData(wind);
        
    }); 

    //ARUS PERMUKAAN////////////////////////////////
    var URL_CURR =("https://www.ncei.noaa.gov/erddap/griddap/Hycom_sfc_3d.json?water_u%5B("
        +formattedToday+"T00:00:00Z):1:("
        +formattedToday+"T00:00:00Z)%5D%5B(0.0):1:(0.0)%5D%5B(-16):1:(10)%5D%5B(90):1:(142)%5D,water_v%5B("
        +formattedToday+"T00:00:00Z):1:("
        +formattedToday+"T00:00:00Z)%5D%5B(0.0):1:(0.0)%5D%5B(-16):1:(10)%5D%5B(90):1:(142)%5D");

    $.getJSON(URL_CURR, function(jsonData) {
        var U1 = [], V1 = []
        jsonData.table.rows.map(d => U1.push(d[4]));
        jsonData.table.rows.map(d => V1.push(d[5]));
        var dd = 0.08
        var nxd= 650
        var nyd= 325
        var lo1= 90.00001525878906
        var la1= 10
        var head_u= {'parameterCategory': 2,
                    'parameterNumber': 2,
                    'lo1': lo1,
                    'la1': la1,
                    'dx': dd,
                    'dy': dd,
                    'nx': nxd,
                    'ny': nyd,
                    'refTime': formattedToday +"T12:00:00Z",
                    }
        var headu = $.extend(true, {'header':head_u},{"data": U1})
        var head_v = {'parameterCategory': 2,
                    'parameterNumber': 3,
                    'lo1': lo1,
                    'la1': la1,
                    'dx': dd,
                    'dy': dd,
                    'nx': nxd,
                    'ny': nyd,
                    'refTime': formattedToday +"T12:00:00Z",
                    };
        var headv = $.extend(true, {'header':head_v},{"data": V1});
        const vel_json = JSON.stringify([headu,headv]);
        const Curr = JSON.parse(vel_json );
        CurrLayer.setData(Curr);
    });
    
    /*
    //ISOBAND---------------------------------------------------------
    //----------------------------------------------------------------
    var SPLURL =("https://pae-paha.pacioos.hawaii.edu/erddap/griddap/ncep_global_lon180.json?tmpsfc%5B("+
    formattedToday+
    "T12:00:00Z):1:("+
    formattedToday+
    "T12:00:00Z)%5D%5B(-16):1:(10)%5D%5B(90):1:(142)%5D");

    $.getJSON(SPLURL, function (jsonData) {
        var points = jsonData.table.rows.map(row => {
            return turf.point([row[2], row[1]],{value: JSON.stringify(row[3]-273.15)},{"type": "FeatureCollection"});
            });
            const pointArr = {
            "type": "FeatureCollection",
            "features": points
            };
            //console.log(pointArr); 
            var interpolate_options = {
            gridType: "points",
            property: "value",
            units: "degrees",
            weight: 10
            };
            var grid = turf.interpolate(pointArr, 0.3, interpolate_options);
            grid.features.map((i) => (i.properties.value = i.properties.value.toFixed(2)))
            
            var isobands_options = {
                zProperty: "value",
                commonProperties: {
                    "fill-opacity": 1
                },
                breaksProperties: [
                            { fill:"#FF00CC"},
                            { fill:"#FF33CC"},
                            { fill:"#FF66CC"},
                            { fill:"#FF99CC"},
                            { fill:"#FFCCCC"},
                            { fill:"#FFFF99"},
                            { fill:"#FFFF00"},
                            { fill:"#FFCC00"},
                            { fill:"#FF9900"},
                            { fill:"#FF6600"},
                            { fill:"#FF3300"},
                            { fill:"#FF0000"},
                            { fill:"#660000"},
                            { fill:"#330000"}
                            ]
                };
    
            var breaks = [10,22,23,25,25.5,26,26.5,27,27.5,28,28.5,29,29.5,30,30.5,31,32,33,34,35];
           
            var isobands = turf.isobands(grid, breaks, isobands_options);
            
            //var isobands = turf.flatten(isobands); 
            gLayer.addData(isobands);
      }); */
    }}); 

    ///////////////////////////////////////////////
    //SPL/////////////////////////////////////////
    var a = ["0","1","2","3"];
    var formattedToday = []
    for(var i in a){
        let value = parseInt(i);
        dates = new Date(Date.now()+value*24*60*60*1000);
        day = dates.getDate();
        month = dates.getMonth()+1;
        formattedToday.push(year + "-" + month + "-" + (day + value))
    }

    //setting default label of the slider
    document.getElementById("myRange").innerHTML = formattedToday[0]
    
    //change the prefix of the url if your images are not in the same folder as your script
    var URL_SPL = ("https://www.ncei.noaa.gov/erddap/griddap/Hycom_sfc_3d.transparentPng?water_temp%5B("+
    formattedToday[0]+
    "T12:00:00Z):1:("+
    formattedToday[0]+
    "T12:00:00Z)%5D%5B(0.0):1:(0.0)%5D%5B(-14):1:(10)%5D%5B(90):1:(142)%5D")
    var SPL = L.imageOverlay(URL_SPL, bounds2,
        {interactive: false
        });


    //Kelembapan////////////////////////////////
    URL_Kelembapan  =("https://pae-paha.pacioos.hawaii.edu/erddap/griddap/ncep_global_lon180.transparentPng?rh2m%5B("+
    formattedToday[0]+
    "T12:00:00Z):1:("+
    formattedToday[0]+
    "T12:00:00Z)%5D%5B(-14):1:(10)%5D%5B(90):1:(142)%5D")
    var Kelembapan = L.imageOverlay(URL_Kelembapan, bounds,
        {interactive: false
        });

    //Salinitas////////////////////////////////
    URL_Salinitas  =("https://www.ncei.noaa.gov/erddap/griddap/Hycom_sfc_3d.transparentPng?salinity%5B("+
    formattedToday[0]+
    "T12:00:00Z):1:("+
    formattedToday[0]+
    "T12:00:00Z)%5D%5B(0.0):1:(0.0)%5D%5B(-14):1:(10)%5D%5B(90):1:(142)%5D");
    var Salinitas = L.imageOverlay(URL_Salinitas, bounds2,
        {interactive: false
        });

    //Gelombang////////////////////////////////
    URL_Gelombang  =("https://pae-paha.pacioos.hawaii.edu/erddap/griddap/ww3_global.transparentPng?Thgt%5B("+
    formattedToday[0]+
    "T12:00:00Z):1:("+
    formattedToday[0]+
    "T12:00:00Z)%5D%5B(0.0):1:(0.0)%5D%5B(-14):1:(10)%5D%5B(90):1:(142)%5D");
    var Gelombang = L.imageOverlay(URL_Gelombang , bounds,
        {interactive: false
        });

    //function when sliding
    var slider = document.getElementById("myRange");
    slider.max = 3;
    slider.oninput = function() {
    //changing the label
    document.getElementById("myRange").innerHTML = formattedToday[this.value]

    SPL.setUrl("https://www.ncei.noaa.gov/erddap/griddap/Hycom_sfc_3d.transparentPng?water_temp%5B("+
        formattedToday[this.value]+
        "T12:00:00Z):1:("+
        formattedToday[this.value]+
        "T12:00:00Z)%5D%5B(0.0):1:(0.0)%5D%5B(-14):1:(10)%5D%5B(90):1:(142)%5D");

    Kelembapan.setUrl("https://pae-paha.pacioos.hawaii.edu/erddap/griddap/ncep_global_lon180.transparentPng?rh2m%5B("+
        formattedToday[this.value]+
        "T12:00:00Z):1:("+
        formattedToday[this.value]+
        "T12:00:00Z)%5D%5B(-14):1:(10)%5D%5B(90):1:(142)%5D");

    Salinitas.setUrl("https://www.ncei.noaa.gov/erddap/griddap/Hycom_sfc_3d.transparentPng?salinity%5B("+
        formattedToday[this.value]+
        "T12:00:00Z):1:("+
        formattedToday[this.value]+
        "T12:00:00Z)%5D%5B(0.0):1:(0.0)%5D%5B(-14):1:(10)%5D%5B(90):1:(142)%5D");
    Gelombang.setUrl("https://pae-paha.pacioos.hawaii.edu/erddap/griddap/ww3_global.transparentPng?Thgt%5B("+
        formattedToday[this.value]+
        "T12:00:00Z):1:("+
        formattedToday[this.value]+
        "T12:00:00Z)%5D%5B(0.0):1:(0.0)%5D%5B(-14):1:(10)%5D%5B(90):1:(142)%5D");
    }  
    //GROUP LAYER//////////////////////////////    
    var groupedOverlays = {
            "Velocity Data": {
            "Angin Pemukaaan": WindLayer,
            "Arus Permukaan": CurrLayer,
            "Kosongkan":L.tileLayer('')
            },
            "Heatmap data": {
            "Suhu Permukaan Laut": SPL,
            //"S.P.L": gLayer,
            "Kelembapan Udara": Kelembapan,
            "Salinitas": Salinitas,
            "Tinggi Gelombang": Gelombang,
            "Kosongkan":L.tileLayer('')
            },
        };
    
    //////////////////////////////////////////  
        var extents = [[-15,89], [12,145]];
        var map = L.map("map", {
            layers: [CartoDB_PositronNoLabels],
            maxBounds: extents,
            minZoom: 4
        });
        
    ////////////////////////////////////////// 
    
    var layerControl =L.control.groupedLayers(baseLayers, groupedOverlays,Option = {exclusiveGroups: ["Velocity Data","Heatmap data","Interpolation data"], position:'topleft'}); 
    layerControl.addTo(map); 
    
    L.control.scale({position:'bottomright'}).addTo(map); 
    map.setView([-3,116], 5);
    return {
        map: map,
        layerControl: layerControl
    };
}
// demo map
var mapStuff = initMap(); 
var map = mapStuff.map;
var layerControl = mapStuff.layerControl;

///////////////////////////////////////////////////////
//////////////////////////////////////////////////////
/*
$.getJSON(URL_WIND, function(jsonData) {
    var U1 = [], V1 = []
      jsonData.table.rows.map(d => U1.push(d[3]));
      jsonData.table.rows.map(d => V1.push(d[4]));
    var head_u= {'parameterCategory': 2,
                  'parameterNumber': 2,
                  'lo1': lo1,
                  'la1': la1,
                  'dx': d,
                  'dy': d,
                  'nx': nx,
                  'ny': ny,
                  'refTime': formattedToday +"T12:00:00Z",
                  }
    var headu = $.extend(true, {'header':head_u},{"data": U1})
    var head_v = {'parameterCategory': 2,
                'parameterNumber': 3,
                'lo1': lo1,
                'la1': la1,
                'dx': d,
                'dy': d,
                'nx': nx,
                'ny': ny,
                'refTime': formattedToday +"T12:00:00Z",
                };
    var headv = $.extend(true, {'header':head_v},{"data": V1});
    var wind_uv = JSON.stringify([headu,headv]);
    const wind  = JSON.parse(wind_uv);

    var velocitycurr = L.velocityLayer({
      displayValues: true,
      displayOptions: {
        velocityType: "Arus Laut",
        position: "bottomleft",
        emptyString: "No water data",
        showCardinal: true
      },
      data:wind,
      maxVelocity: 1,
      velocityScale: .1
    });
    layerControl.addOverlay(velocitycurr, "ArusLaut", "Heatmap data"); 
  });


  $.getJSON(SPLURL, function(jsonData) {
	var points = jsonData.table.rows.map(row => {
      return turf.point([row[2], row[1]],{value: JSON.stringify(row[3]-273.15)},{"type": "FeatureCollection"});
    });

    //console.log(points);;
    var geojsonMarkerOptions = {
      color: "green"
    };

   const geoJSONPointArr = jsonData.table.rows.map(row => {
      return {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [row[2], row[1]]
        },
        "properties": {value:JSON.stringify(row[3]-273.15)}
      }
    });

    //console.log(geoJSONPointArr);// to GeoJSON.FeatureCollection
    const pointArr = {
      "type": "FeatureCollection",
      "features": points
    };
    
    //console.log(pointArr);
 		
    var interpolate_options = {
      gridType: "points",
      property: "value",
      units: "degrees",
      weight: 10
    };
    let grid = turf.interpolate(pointArr, 0.3, interpolate_options);
    grid.features.map((i) => (i.properties.value = i.properties.value.toFixed(2)))
    
    var isobands_options = {
      zProperty: "value",
      commonProperties: {
        "fill-opacity": 0.8
      },
      breaksProperties: [
                   { fill:"#FF00CC"},
                   { fill:"#FF33CC"},
                   { fill:"#FF66CC"},
                   { fill:"#FF99CC"},
                   { fill:"#FFCCCC"},
                   { fill:"#FFFF99"},
                   { fill:"#FFFF00"},
                   { fill:"#FFCC00"},
                   { fill:"#FF9900"},
                   { fill:"#FF6600"},
                   { fill:"#FF3300"},
                   { fill:"#FF0000"},
                   { fill:"#660000"},
                   { fill:"#330000"}
                  ]
        	};

    var breaks = [10,22,23,25,25.5,26,26.5,27,27.5,28,28.5,29,29.5,30,30.5,31,32,33,34,35];
    //let isobands = turf.isobands(pointArr ,breaks , isobands_options);
    var isobands = turf.isobands(grid, breaks, isobands_options);
    isobands = turf.flatten(isobands)
    var isobandslay = L.geoJSON(isobands, {
    style: function(feature){ return {color: '#4264fb',fillColor:feature.properties.fill, weight:0.1,   fill0pacity:1};}});
    
    map.addLayer(isobandslay, "S P L", "Heatmap data") 
});

**/