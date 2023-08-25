function setToLatitude(val){
    if (val === "utm") {
        document.getElementsByName('latitude')[0].placeholder="";
        document.getElementsByName('longitude')[0].placeholder="";
    }
    else{
        document.getElementsByName('latitude')[0].placeholder="00°00'00.00&quot;S";
        document.getElementsByName('longitude')[0].placeholder="00°00'00.00&quot;W";
    }
};