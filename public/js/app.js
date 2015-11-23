var takePicture   = "{\r\"method\": \"actTakePicture\",\r\"params\": [],\r\"id\": 1,\r\"version\": \"1.0\"\r}";
var zoomIn        = "{\r\"method\": \"actZoom\",\r\"params\": [\"in\",\"1shot\"],\r\"id\": 1,\r\"version\": \"1.0\"\r}";
var zoomOut       = "{\r\"method\": \"actZoom\",\r\"params\": [\"out\",\"1shot\"],\r\"id\": 1,\r\"version\": \"1.0\"\r}";
var zoomInFull    = "{\r\"method\": \"actZoom\",\r\"params\": [\"in\",\"start\"],\r\"id\": 1,\r\"version\": \"1.0\"\r}";
var zoomOutFull   = "{\r\"method\": \"actZoom\",\r\"params\": [\"out\",\"start\"],\r\"id\": 1,\r\"version\": \"1.0\"\r}";


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
      data.result.forEach(function(item){
        $('body').append('<img src="'+item+'" class="result"></img>');
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
