// COMMANDS - from API reference

var getStatus      = "{\r\"method\": \"getEvent\",\r\"params\": [true],\r\"id\": 1,\r\"version\": \"1.0\"\r}";
var takePicture    = "{\r\"method\": \"actTakePicture\",\r\"params\": [],\r\"id\": 1,\r\"version\": \"1.0\"\r}";
var zoomIn         = "{\r\"method\": \"actZoom\",\r\"params\": [\"in\",\"1shot\"],\r\"id\": 1,\r\"version\": \"1.0\"\r}";
var zoomOut        = "{\r\"method\": \"actZoom\",\r\"params\": [\"out\",\"1shot\"],\r\"id\": 1,\r\"version\": \"1.0\"\r}";
var zoomInFull     = "{\r\"method\": \"actZoom\",\r\"params\": [\"in\",\"start\"],\r\"id\": 1,\r\"version\": \"1.0\"\r}";
var zoomOutFull    = "{\r\"method\": \"actZoom\",\r\"params\": [\"out\",\"start\"],\r\"id\": 1,\r\"version\": \"1.0\"\r}";
var startLiveView  = "{\r\"method\": \"startLiveview\",\r\"params\": [],\r\"id\": 1,\r\"version\": \"1.0\"\r}";
var stopLiveView   = "{\r\"method\": \"stopLiveview\",\r\"params\": [],\r\"id\": 1,\r\"version\": \"1.0\"\r}";

// ORIENTATION

var orientation = 0;

// IMAGE

var imageURL = "";

// PRINT FUNCTION

var printImage = function() {
         var WindowObject = window.open();
         WindowObject.document.open();
         WindowObject.document.writeln('<html><body><div style="max-width: 100%;"><img style="max-width: 100%;" src="'+imageURL+'"></img></div></body></html>');
         WindowObject.document.close();
         WindowObject.focus();
         WindowObject.onload = function() {
           WindowObject.print();
           setTimeout(function() {
             WindowObject.close();
           }, 300);
         };
 };

// FACEBOOK SHARE


// AJAX FUNCTIONS

$(function(){

  // SMILE
  $('#take-picture').mouseover(function() {
    window.speechSynthesis.speak(smile);
  });

  $('#take-picture').mouseout(function() {
    window.speechSynthesis.cancel();
  });

  //TAKE PICTURE
  $('#take-picture').click(function(event) {

    $('#status-code').empty();
    getOrientation();

    var promise = $.ajax({
      url: 'http://10.0.0.1:10000/sony/camera',
      method: 'POST',
      dataType: 'json',
      processData: false,
      data: takePicture
    });

    // AFTER TAKING A PICTURE

    promise.done(function(data) {
      window.speechSynthesis.speak(lookNice);
      $('#picture-area').empty();
      $('#bottom-controls').empty();
      imageURL = data.result[0][0];

      data.result.forEach(function(pic){
        $('#picture-area').append(
          '<img src="'+pic+'" id="rotate"></img>'
        );
        $('#bottom-controls').append(
          '<div id="result-controls"><button class="metal linear" id="print-image"><span class="glyphicon glyphicon-print" aria-hidden="true"></span></button>'
        );
        $('#status-code').append(
          'PICTURE TAKEN'
        );
        $('#rotate').css({
          WebkitTransform: 'rotate(' + orientation + 'deg)'
        });
        $('#rotate').css({
          '-moz-transform': 'rotate(' + orientation + 'deg)'
        });
        if (orientation == 90 || orientation == 270) {
          // $('#bottom-controls').css({'margin-top': $('#rotate').width()/5});
          // $('#top-controls').css({'margin-bottom': $('#rotate').width()/5});
          $('#picture-area').css({'padding-top': '120px'});
        } else {
          $('#bottom-controls').css({'margin-top': 0});
          $('#top-controls').css({'margin-bottom': 0});
          $('#picture-area').css({'padding-top': '100px'});
        }
        $('#print-image').click(function() {
          printImage();
        });
        $('#fb-share').click(function() {
          event.preventDefault();
          console.log(imageURL);

        });

      });
    });

    promise.error(function(data) {
      $('#status-code').empty();
      console.log("error");
    });
  });

  //ZOOM IN SMALL
  $('#zoom-in').click(function(event) {
    event.preventDefault();
    $('#status-code').empty();
    var promise = $.ajax({
      url: 'http://10.0.0.1:10000/sony/camera',
      method: 'POST',
      dataType: 'json',
      processData: false,
      data: zoomIn
    });
    promise.done(function(data) {
      console.log(data);
      $('#status-code').append(
        'ZOOM IN'
      );
    });
    promise.error(function(data) {
      console.log("error");
    });
  });

  //ZOOM OUT SMALL
  $('#zoom-out').click(function(event) {
    event.preventDefault();
    $('#status-code').empty();
    var promise = $.ajax({
      url: 'http://10.0.0.1:10000/sony/camera',
      method: 'POST',
      dataType: 'json',
      processData: false,
      data: zoomOut
    });
    promise.done(function(data) {
      console.log(data);
      $('#status-code').append(
        'ZOOM OUT'
      );
    });
    promise.error(function(data) {
      console.log("error");
    });
  });

  //GET STATUS
  // $('#get-status').click(function(event) {
  //   event.preventDefault();
  //   var promise = $.ajax({
  //     url: 'http://10.0.0.1:10000/sony/camera',
  //     method: 'POST',
  //     dataType: 'json',
  //     processData: false,
  //     data: getStatus
  //   });
  //   promise.done(function(data) {
  //     if (data.result == undefined || data.result[4] == null) {
  //       console.log("no change or error");
  //     } else if (data.result[4] === 0 || 90 || 180 || 270 ) {
  //       orientation = data.result[4].liveviewOrientation;
  //       console.log(orientation);
  //     }
  //   });
  //   promise.error(function(data) {
  //     console.log("error");
  //   });
  // });

  getOrientation = function() {
    var promise = $.ajax({
      url: 'http://10.0.0.1:10000/sony/camera',
      method: 'POST',
      dataType: 'json',
      processData: false,
      data: getStatus
    });
    promise.done(function(data) {
      if (data.result == undefined || data.result[4] == null) {
        console.log("no change or error");
      } else if (data.result[4] === 0 || 90 || 180 || 270 ) {
        orientation = data.result[4].liveviewOrientation;
        console.log(orientation);
      }
    });
    promise.error(function(data) {
      console.log("error");
    });
  }

});

// TEXT TO SPEECH?

var smile = new SpeechSynthesisUtterance('Give me a nice big smile!');
var lookNice = new SpeechSynthesisUtterance('You look very nice, did you do something to your hair?');
