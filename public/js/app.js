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
    var promise = $.ajax({
      url: 'http://10.0.0.1:10000/sony/camera',
      method: 'POST',
      dataType: 'json',
      processData: false,
      data: takePicture
    });
    promise.done(function(data) {
      imageURL = data.result[0][0];
      data.result.forEach(function(pic){
        $('body').append(
          '<img src="'+pic+'" class="result"></img><br /><hr /><br /><button id="print-image">PRINT</button>'
        );
        $('#print-image').click(function() {
          var newWindow = window.open(imageURL);
          newWindow.window.print();
          // newWindow.window.close();
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

});


// PRINT VAR & FUNCTION

var imageURL = "";
