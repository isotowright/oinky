$(document).ready(function(){
	
//setTimeout(function(){ alert("Hello"); }, 3000);
var donation = 0;
// Setup your personal infos here:
var API_ID = 'O6vnBwxFTg',
API_SECRET = 'PEU664HSW6',
BOARD_ID = 'A5GK5I4VJQ';
// Start new websocket istance.
var client = new Messaging.Client("cloud.smartables.io", 8001, RandomClientId());
console.log("Client instantiated.");
client.startTrace();
console.log("Now trying to connect...");
client.qos = 0;
client.connect({
useSSL: true,
userName: API_ID,
password: API_SECRET,
onSuccess: onSuccess,
onFailure: onFailure,
timeout:10
});
// Function to trigger connection success.
// Do the main JOBs here!
function onSuccess() {
console.log("connection established");
// Sample code for subscribe a specific topic.
//client.subscribe(API_ID+'/'+BOARD_ID+'/SENSE/2');
// the accel
client.subscribe(API_ID+'/'+BOARD_ID+'/SENSE/10_1');
client.subscribe(API_ID+'/'+BOARD_ID+'/SENSE/1');
//curl -k -X PUT --data '{"rgb":[1,199,50,167]}' --header "X-APISecret: PEU664HSW6" -H "Content-Type: application/json" "https://cloud.smartables.io/api/write/O6vnBwxFTg/A5GK5I4VJQ/ACT/1"
// Sample code to emit a websocket message.
//var message = new Messaging.Message(JSON.stringify({
//"rgb":[1,245,10,174]
//}));
//message.destinationName = API_ID+'/'+BOARD_ID+'/ACT/1 ';
//message.qos = 2;
//message.retained = true;
//client.send(message);
}
// Attach a function when a new message is received.
client.onMessageArrived = function(message) {
//alert('ddd');
console.log(message.payloadString);
var obj = $.parseJSON(message.payloadString);
console.log(obj);
if (obj.single_tap == 1)
{
//$('#accel').text('Single tap');

var message = new Messaging.Message(JSON.stringify({
"rgb":[1,200,200,209]
}));
message.destinationName = API_ID+'/'+BOARD_ID+'/ACT/1 ';
message.qos = 2;
message.retained = true;
client.send(message);

}

if (obj.double_tap == 1)
{
donation++;
monies = donation;
$('#anount').text('£'+monies);
//$('#accel').text('Double tap');
//console.log($('#accel').text('Double tap'));
 $('#player').get(0).play();
 
 // $('#player').get(0).pause();
//curl -k -X PUT --data '{"rgb":[1,31,61,209]}' --header "X-APISecret: PEU664HSW6" -H "Content-Type: application/json" "https://cloud.smartables.io/api/write/O6vnBwxFTg/A5GK5I4VJQ/ACT/1"

var message = new Messaging.Message(JSON.stringify({
"rgb":[1,31,61,209]
}));
message.destinationName = API_ID+'/'+BOARD_ID+'/ACT/1 ';
message.qos = 2;
message.retained = true;
client.send(message);
}


//
//if (message.payloadString == '{"dig":0}')
//{
// $('#switch').text('Switch is off');
//curl -k -X PUT --data '{"rgb":[1,26,5,19]}' --header "X-APISecret: PEU664HSW6" -H "Content-Type: application/json" "https://cloud.smartables.io/api/
//alert('switch off');
//console.log("switch on");
// message.destinationName = API_ID+'/'+BOARD_ID+'/ACT/3';
//message.qos = 2;
//message.retained = true;
//client.send(message);
//}
}
// Function to trigger connection error.
function onFailure() {
console.log("connection failure");
}
// Attach a function when connection lost.
client.onConnectionLost = function() {
console.log("connection lost");
}	
	
	
  monies = 0;	
  var n=1;
  setInterval(increment,1000);

  function increment(){
    n++;
    setCounter(n);
 
  }
  
  function setCounter(v){
    var counter=$(".counter");
    var old=counter.children(".counter-value");
    var oldContent=old.children(".counter-value-mask");

    var t=0.4;
    var d=t*0.0;
    var d2=t*0.3;
    var padding=55;
    var offset=5;
    var w=old.data("w");
    w+=padding;
    TweenMax.to(old,t,{delay:d,x:w,ease:Quad.easeIn});
    TweenMax.to(oldContent,t,{delay:d,x:-(w-offset),ease:Quad.easeIn});
    setTimeout(function(){old.remove()},t*1000);
    
    var neu=$("<div/>").addClass("counter-value").appendTo(counter);
    var neuContent=$("<div/>").addClass("counter-value-mask").appendTo(neu).html('&pound;'+monies);
    var saving=$(".loading").css('height',monies+'%');
    
    w=neuContent.width();
    neu.data("w",w);
    neu.css({
      width:w
    })
    w+=padding;
    TweenMax.from(neu,t,{delay:d2,x:-w});
    TweenMax.from(neuContent,t,{delay:d2,x:w-offset});
  }
})