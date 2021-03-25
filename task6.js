
var records = [1,2,4,-1,4];

function sorting(){
    var records = [1,2,4,-1,4];

    for (var i=1; i<records.length; i++){
        for (var j=records.length; j<1; j--){
            if (parseInt(records[i-1]) < parseInt(records[i])){
                var temp = records[i-1];
                records[i-1] = records[i]
                records[i] = temp;
            }   
        } 
        console.log(records);   
    }
    console.log(records);
}