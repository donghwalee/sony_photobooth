var express     = require ('express'),
    request     = require ('request'),
    server      = express();

server.use(express.static('./public'));

server.listen(3000, function(){
  console.log("Server is listening");
});
