 	var http = require('http');
	var server = http.createServer(function(request, response) {
	request.method = "GET";
	var url  = request.url.substring(request.url.lastIndexOf("/")+1,request.url.length);
	response.writeHead(200, { 'Content-Type': 'application/json' });  
	var temp =[];
	
	if(!isNaN(filterInt(url))){
	    var mydate  =new Date(filterInt(url)*1000);
	    temp.push(filterInt(url));
	    temp.push(convertMonth(mydate.getMonth())+" "+mydate.getDate()+", "+mydate.getFullYear());
	}else if((Date.parse(url.replace(/\%20/g,' ')))){
	    temp.push(Date.parse((url.replace(/\%20/g,' ')))/1000);
	    temp.push(url.replace(/\%20/g,' '));
	}
	else{
	    temp.push(null);
	    temp.push(null);
	}

	console.log(temp);
	response.write(JSON.stringify({unix : temp[0], natural : temp[1]}));
	
	
	response.end();
	
	
	
});
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Timestamp works on: ", addr.address + ":" + addr.port);
});

function convertMonth(input){
    switch (input) {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
    }
}
function filterInt (value) {
  if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
    return Number(value);
  return NaN;
}


