(function(ext){
  var hostname = '';
  var hub = '';
  var port = 0;
  var preset = {
	'Seven Color Cross Fade':  	37, 
	'Red Gradual Change':      	38, 
	'Green Gradual Change':    	39, 
	'Blue Gradual Change':     	40, 
	'Yellow Gradual Change':   	41, 
	'Cyan Gradual Change':     	42, 
	'Purple Gradual Change':   	43, 
	'White Gradual Change':    	44, 
	'Red Green Cross Fade':    	45, 
	'Red Blue Cross Fade':     	46, 
	'Green Blue Cross Fade':   	47, 
	'Seven Color Strobe Flash':	48, 
	'Red Strobe Flash':        	49, 
	'Green Strobe Flash':      	50, 
	'Blue Strobe Flash':       	51, 
	'Yellow Strobe Flash':     	52, 
	'Cyan Strobe Flash':       	53, 
	'Purple Strobe Flash':     	54, 
	'White Strobe Flash':      	55, 
	'Seven Color Jumping':     	56 
  };

  ext._shutdown = function() {};

  ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
  };
  ext.set_hostname = function(str) {
    hostname = str;
  };
  /* usb hub per port power control*/
  ext.usbHubCtrl = function(hub, port, power) {
    console.log("on:");
    $.ajax({
          url:'https://' + hostname + '/usbhub?hub=' + hub + '&port=' + port + '&power=' + power,
          type:'GET',
          timeout:5000,
          dataType:'text',
          success: function(data){
            console.log(data.result);
          },
          error : function(){
            console.log('error');
          }
    });
  };
  /* wifibulb power control*/
  ext.bulbCtrl = function(ip, power) {
    console.log("on:");
    $.ajax({
          url:'https://' + hostname + '/bulb?ip=' + ip + '&power=' + power,
          type:'GET',
          timeout:5000,
          dataType:'text',
          success: function(data){
            console.log(data.result);
          },
          error : function(){
            console.log('error');
          }
    });
  };
  /* wifibulb color control*/
  ext.bulbColor= function(ip, r, g, b) {
    console.log("on:");
    $.ajax({
          url:'https://' + hostname + '/bulb?ip=' + ip + '&color=' + r + ',' + g + ',' + b,
          type:'GET',
          timeout:5000,
          dataType:'text',
          success: function(data){
            console.log(data.result);
          },
          error : function(){
            console.log('error');
          }
    });
  };
  /* wifibulb preset control*/
  ext.bulbPreset= function(ip, pattern, speed) {
    console.log("on:",ip,pattern,preset[pattern],speed);
	pattern = preset[pattern];  
    $.ajax({
          url:'https://' + hostname + '/bulb?ip=' + ip + '&preset=' +  pattern + '&speed=' + speed,
          type:'GET',
          timeout:5000,
          dataType:'text',
          success: function(data){
            console.log(data.result);
          },
          error : function(){
            console.log('error');
          }
    });
  };

  /* CO2 */
  ext.get_co2 = function(callback) {
    $.ajax({
            url:'https://' + hostname + '/co2.json',
            dataType:'json',
            timeout:5000,
            success: function(data){
                        //console.log("success");
                        callback(data.co2);
                     },
            error : function(){
                        //console.log("error");
                    },
            complete: function(data){
                        //console.log("complete");
                      }
    });
  };

  /* Temp */
  ext.get_temp= function(callback) {
    $.ajax({
            url:'https://' + hostname + '/temp.json',
            dataType:'json',
            timeout:5000,
            success: function(data) {
                callback(data.temp);
            },
            error : function(){
            },
            complete: function(data) {
            }
    });
  };

  /* Temp & Humidity */
  ext.get_humidity = function(callback) {
    $.ajax({
            url:'https://' + hostname + '/humidity.json',
            dataType:'json',
            timeout:5000,
            success: function(data) {
                callback(data.humidity);
            },
            error : function(){
            },
            complete: function(data) {
            }
    });
  };

  /* light */
  ext.get_light= function(callback) {
    $.ajax({
            url:'https://' + hostname + '/light.json',
            dataType:'json',
            timeout:5000,
            success: function(data) {
                callback(data.light);
            },
            error : function(){
            },
            complete: function(data) {
            }
    });
  };

  /* Motion Detect */
  ext.get_pir= function(callback) {
    $.ajax({
            url:'https://' + hostname + '/pir.json',
            dataType:'json',
            timeout:5000,
            success: function(data) {
                callback(data.Motion);
            },
            error : function(){
            },
            complete: function(data) {
            }
    });
  };
  /* Distance */
  ext.get_distance = function(callback) {
    $.ajax({
            url:'https://' + hostname + '/distance.json',
            dataType:'json',
            timeout:5000,
            success: function(data) {
                callback(data.distance);
            },
            error : function(){
            },
            complete: function(data) {
            }
    });
  };

  /* Shot */
  ext.shot = function(callback) {
    $.ajax({
            url:'https://' + hostname + '/shot',
            dataType:'text',
            timeout:5000,
            success: function(data) {
            	console.log(data.result);
            },
            error : function(){
		console.log('Error');
            }
    });
  };


var strings = {
	ON:	'on',
	OFF:	'off'
};
  
var descriptor = {
  "blocks": [
    [" ", "コントローラの接続先を %s にする", "set_hostname", 'hostname',""],
    /* usb hub per port power control*/
    [" ", "usbhub %s ポート %n を %m.power にする", "usbHubCtrl", 'hub', 'port', 'power',""],
    [" ", "wifiBulb %s を %m.power にする", "bulbCtrl", 'ip', 'power',""],
    [" ", "wifiBulb %s の色を %n, %n, %n にする", "bulbColor", 'ip', 'r','g','b',""],
    [" ", "wifiBulb %s の色を %m.pattern にspeedを %n にする", "bulbPreset", 'ip', 'pattern', 'speed', ""],
    [" ", "カメラ撮影をする", "shot", '', ""],
    ["R", "CO2濃度センサーの値", "get_co2", ""],
    ["R", "温度センサーの値", "get_temp",""],
    ["R", "湿度センサーの値", "get_temp_humidity",""],
    ["R", "照度センサーの値", "get_light",""],
    ["R", "動きセンサーの値", "get_pir",""],
    ["R", "距離センサーの値", "get_distance",""]
  ],
//  "menus": {
//     display:["表示する","表示しない"]
  "menus": {
	 power: [ strings.ON, strings.OFF ],
	 pattern: Object.keys(preset)
  }
//  }
};

ScratchExtensions.register("計測とLED,USB Hubの制御", descriptor, ext);

})({});
