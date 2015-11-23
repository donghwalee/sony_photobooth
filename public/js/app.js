



$(function(){
  $.ajax({
    url: 'http://10.0.0.1:10000/sony/camera',
    method: 'POST',
    dataType: 'json',
    processData: false,
    data: "{\r\"method\": \"actTakePicture\",\r\"params\": [],\r\"id\": 1,\r\"version\": \"1.0\"\r}"
    ,
    success: function (data, status, jqXHR) {
      console.log("success");
      console.log(data);
      console.log(status);
      console.log(jqXHR);
    },
    error: function (jqXHR, status, error) {
      console.log("error");
      console.log(jqXHR);
      console.log(status);
      console.log(error);
    }
  });
});
