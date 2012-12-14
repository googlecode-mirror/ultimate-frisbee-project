var hraci= [];
var pom = 0;
var xx_pom = 0;
var yy_pom = 0;
var tt_pom = 0;
var kde = 0;
var nakres = 0;
var nakresPohybu = 0;
var limit = 0;

function animation()
{
 
  this.hraci2 = [];
 
 this.PridajHraca= function(x,y,t,color,inter){
 hrac= new Hrac(x,y,t,hraci.length,color,inter);
 hraci.push(hrac);
 }
 
 this.load = function(file){
 hraci2 = file.split("##");
    this.hraci2 = [];
    limit = hraci2[0];
    for(var i in hraci2)
    {
       if(i>0)
      {
        lines = hraci2[i].split("#");
        hrac2 = new Hrac();
        hrac2.farba = lines[0];
        hrac2.interval = parseInt(lines[1]);
        hrac2.id = i-1;
       
         for(var j in lines)
        {
          if(j>1)
          {
            data = lines[j].split(" ");
            if(!isNaN(data[0]) && !isNaN(data[1]) && !isNaN(data[2])){
                hrac2.addPoint(parseInt(data[0]), parseInt(data[1]), parseInt(data[2]));
                //this.field.spanPoint(parseInt(data[0]), parseInt(data[1]));
            }
          }
         }
        hraci.push(hrac2);
      }
    }
   
    animation.draw();
 } 
 
 this.skuska = function(){
   var text = limit + '##';
   
   for(var i in hraci){
   text += hraci[i].farba+ '#' ;
   text += hraci[i].interval + '#';
   for(var j in hraci[i].points) {
    text += hraci[i].points[j].x + ' ' + hraci[i].points[j].y + ' ' + hraci[i].points[j].t + '#' ;  
    }
      if(i != hraci.length -1){
        text+= '#';            
      }
   }
   
   
 
  return  text;
 }
 
 this.draw= function (){
   
    for(var i in hraci)
    {
     var ide = hraci[i].getElement();
     $(ide).remove();
    }
   
    var html= '';
    for(var i in hraci)
    {
      html += hraci[i].getHtml();
    }
    $('#ihrisko').append(html);
     for(var i in hraci)
    {
      hraci[i].setup();  
    }    
 }
 
 this.hrac = function(color,cislo){
  limit = cislo;
    $('#pridavanie').show();
    //vymazanie premennych
    $('#x-os').val('');
    $('#y-os').val('');
        $('#xx').val('');
        $('#yy').val('');
        $('#tt').val('');
        $('#dlzkaPohybu').val('');
     
     kde = 0;
    $('#tlacidlo').html('POTVRD POZICIU');
   
    $('#tlacidlo').unbind('click').click(function(){
   
    if(($('#dlzkaPohybu').val() > 0) && ($('#dlzkaPohybu').val() <= limit)){
      animation.pohyb(color);
     }else{
       alert("Zadaj spravne dlzku pohybu, musi byt mensia ako dlzka animacie!" + limit);
     }
    });
  }
 
  this.pohyb = function(color){
   
    animation.PridajHraca( $('#x-os').val(), $('#y-os').val(),$('#x-os').val(),color,$('#dlzkaPohybu').val());  
   
    hraci[hraci.length -1].addPoint($('#x-os').val(), $('#y-os').val(),0);
         
    animation.draw();
   
    kde =1;
    $('#pridavaniePohybu').show();
    $('#pohyboveTlacidlo').attr("disabled", true);
    $('#pohyboveTlacidlo').click(function(){
    if (pom == 1) {
      pom = 0;
        $('#xx').val('');
        $('#yy').val('');
        $('#tt').val('');
        $('h5').after('<div class="novyy"> <label for="xxx">x: </label>  <input name="xxx" type="text" size="7" maxlength="3" id="xxx" value='+xx_pom +' /><label for="yyy">y: </label><input name="yyy" type="text" size="7" maxlength="3" id="yyy" value='+yy_pom +' /> <br/><label for="ttt">Cas za kolko ms tam ma byt:</label> <input name="ttt" type="text" size="7" maxlength="3" id="ttt" value='+tt_pom +' /> </div>');
        $('.potvrdPohyb').attr("disabled", false);
        $('#pohyboveTlacidlo').attr("disabled", true);
      }  
    });
   
    $('#tlacidlo').html('POTVRD HRACA');
    $('#tlacidlo').unbind('click').click(function(){
      animation.potvrd();
    });
   
    $(".potvrdPohyb").unbind('click').click(function(){
       $('.potvrdPohyb').attr("disabled", true);
       $('#pohyboveTlacidlo').attr("disabled", false);  
      hraci[hraci.length -1].addPoint($('#xx').val(),$('#yy').val(),$('#tt').val());
       
      animation.kreslenieCiary(hraci[hraci.length -1].points[hraci[hraci.length -1].points.length - 2].x,hraci[hraci.length -1].points[hraci[hraci.length -1].points.length - 2].y,hraci[hraci.length -1].points[hraci[hraci.length -1].points.length - 1].x,hraci[hraci.length -1].points[hraci[hraci.length -1].points.length - 1].y);
     
       xx_pom = $('#xx').val();
       yy_pom = $('#yy').val();
       tt_pom = $('#tt').val();
      pom = pom + 1;
    });
  }  
 
  this.pos = function(){    
   $("#ihrisko").unbind('click').click(function(e){
   if(nakres == 1){
    $(".nakres").remove();
   }
   if(nakresPohybu == 1){
    $(".nakresPohybu").remove();
   }
   
   if(kde == 0){
  var x = e.pageX;
  var y = e.pageY;
   $('#x-os').val(x-409);                //event.screenX- 419
    $('#y-os').val(y-9);                // event.screenY- 72
    if(nakres == 0) {nakres = nakres + 1;}
    $("#ihrisko").append("<div style=\"position:absolute;border:1px solid black;width:5px;height:5px;\" class=\"nakres\"></div> ");
    $('.nakres').css({"background-color":"black"});
    $('.nakres').css({"left": $('#x-os').val() + "px"});
    $('.nakres').css({"top": $('#y-os').val()+ "px"});  
     
   }
   if(kde == 1){
  if(nakresPohybu == 0) {nakresPohybu = nakresPohybu + 1;}
  var x = e.pageX;
  var y = e.pageY;
    $('#xx').val(x-409);
    $('#yy').val(y-9);
    $("#ihrisko").append("<div style=\"position:absolute;border:1px solid black;width:5px;height:5px;\" class=\"nakresPohybu\"></div> ")
    $('.nakresPohybu').css({"background-color":"black"});
    $('.nakresPohybu').css({"left": $('#xx').val() + "px"});
    $('.nakresPohybu').css({"top": $('#yy').val()+ "px"});
   
   
   
   }
   
   });
  }
 
 
 
  this.potvrd = function(){
    $('#pridavanie').hide();
    $('#pridavaniePohybu').hide();
    $('.potvrdPohyb').attr("disabled", false);    
    $('#x-os').val('');
    $('#y-os').val('');
    kde =2;
   
    $(".nakresPohybu").remove();
    $('.novyy').remove();
    pom=0;
   
 
    $('#tlacidlo').hide();
   
    $('#vyberTimov').show();
    $('#form1').show();
   
 //  $('#save').unbind('click').click(function(){
   //   $('#tlacidlo').html('EDIT');
   //   animation.kreslenieCiary('a','b','c','d');
  // });
  }
 
   this.run = function(){
      for(var i in hraci)
    {
      hraci[i].animate(0,0,limit);
    }
   
   }
   
 this.kreslenieCiary = function(x1,y1,x2,y2) {

var theCanvas  = $('#paint');
var ctx = theCanvas[0].getContext('2d');

 if(x1 >=0){
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
       
 }
 if(x1 == 'a'){
  ctx.clearRect(0,0,500,600);
 }      
}
 
}