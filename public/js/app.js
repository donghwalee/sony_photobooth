var getStatus      = "{\r\"method\": \"getEvent\",\r\"params\": [true],\r\"id\": 1,\r\"version\": \"1.0\"\r}";
var takePicture    = "{\r\"method\": \"actTakePicture\",\r\"params\": [],\r\"id\": 1,\r\"version\": \"1.0\"\r}";
var zoomIn         = "{\r\"method\": \"actZoom\",\r\"params\": [\"in\",\"1shot\"],\r\"id\": 1,\r\"version\": \"1.0\"\r}";
var zoomOut        = "{\r\"method\": \"actZoom\",\r\"params\": [\"out\",\"1shot\"],\r\"id\": 1,\r\"version\": \"1.0\"\r}";
var zoomInFull     = "{\r\"method\": \"actZoom\",\r\"params\": [\"in\",\"start\"],\r\"id\": 1,\r\"version\": \"1.0\"\r}";
var zoomOutFull    = "{\r\"method\": \"actZoom\",\r\"params\": [\"out\",\"start\"],\r\"id\": 1,\r\"version\": \"1.0\"\r}";
var startLiveView  = "{\r\"method\": \"startLiveview\",\r\"params\": [],\r\"id\": 1,\r\"version\": \"1.0\"\r}";
var stopLiveView   = "{\r\"method\": \"stopLiveview\",\r\"params\": [],\r\"id\": 1,\r\"version\": \"1.0\"\r}";


// AJAX FUNCTIONS

$(function(){

  //TAKE PICTURE
  $('#take-picture').click(function(event) {
    event.preventDefault();
    getOrientation();
    var promise = $.ajax({
      url: 'http://10.0.0.1:10000/sony/camera',
      method: 'POST',
      dataType: 'json',
      processData: false,
      data: takePicture
    });
    promise.done(function(data) {
      $('#picture-area').empty();
      imageURL = data.result[0][0];
      data.result.forEach(function(pic){
        $('#picture-area').append(
          '<img src="'+pic+'" id="rotate"></img><div id="result-controls"><hr /><button id="print-image">PRINT</button><button id="fb-share">SHARE ON FACEBOOK</button></div>'
        );
        $('#rotate').css({
          WebkitTransform: 'rotate(' + orientation + 'deg)'
        });
        $('#rotate').css({
          '-moz-transform': 'rotate(' + orientation + 'deg)'
        });
        if (orientation == 90 || orientation == 270) {
          $('#result-controls').css({'margin-top': $('#rotate').width()/7});
          $('#top-controls').css({'margin-bottom': $('#rotate').width()/7});
        } else {
          $('#rotate-controls').css({'margin-top': 0});
          $('#top-controls').css({'margin-bottom': 0});
        }
        $('#print-image').click(function() {
          var newWindow = window.open(imageURL);
          newWindow.window.print();
          // newWindow.window.close();
        });
        $('#fb-share').click(function() {
          console.log(imageURL);
        });
      });
    });
    promise.error(function(data) {
      console.log("error");
    });
  });

  //ZOOM IN SMALL
  $('#zoom-in').click(function(event) {
    event.preventDefault();
    var promise = $.ajax({
      url: 'http://10.0.0.1:10000/sony/camera',
      method: 'POST',
      dataType: 'json',
      processData: false,
      data: zoomIn
    });
    promise.done(function(data) {
      console.log(data);
    });
    promise.error(function(data) {
      console.log("error");
    });
  });

  //ZOOM OUT SMALL
  $('#zoom-out').click(function(event) {
    event.preventDefault();
    var promise = $.ajax({
      url: 'http://10.0.0.1:10000/sony/camera',
      method: 'POST',
      dataType: 'json',
      processData: false,
      data: zoomOut
    });
    promise.done(function(data) {
      console.log(data);
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


// PRINT VAR & FUNCTION

var imageURL = "";


// ORIENTATION

var orientation = 0;
