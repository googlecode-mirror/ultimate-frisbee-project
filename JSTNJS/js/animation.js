var hraci= [];
var pom = 0;
var xx_pom = 0;
var yy_pom = 0;
var tt_pom = 0;
var kde = 0;
var nakres = 0;
var nakresPohybu = 0; 

function animation()
{
 
 
 this.PridajHraca= function(x,y,t,color){
 hrac= new Hrac(x,y,t,hraci.length,color);
 hraci.push(hrac);
 }
 
 this.skuska = function(){
   var text = "12000" + '\n\n';
   text += "blue" + '\n';
   for(var i in hraci){
   for(var j in hraci[i].points) {
    text += hraci[i].points[j].x + ' ' + hraci[i].points[j].y + ' ' + hraci[i].points[j].t  + '\n';  
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
 
 this.hrac = function(color){
    $('#pridavanie').show();
    //vymazanie premennych
    $('#x-os').val('');
    $('#y-os').val(''); 
        $('#xx').val('');
        $('#yy').val('');
        $('#tt').val('');
      
     kde = 0; 
    $('#tlacidlo').html('POTVRD POZICIU');
    
    $('#tlacidlo').unbind('click').click(function(){
      animation.pohyb(color);
    });
  }
  
  this.pohyb = function(color){
    
    animation.PridajHraca( $('#x-os').val(), $('#y-os').val(),$('#x-os').val(),color);  
    
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
      
       alert($('#xx').val() + $('#yy').val() + $('#tt').val());
       xx_pom = $('#xx').val();
       yy_pom = $('#yy').val();
       tt_pom = $('#tt').val();
      pom = pom + 1;
    });
  }   
  
  this.pos = function(){     
   $("#ihrisko").click(function(){
   if(nakres == 1){
    $(".nakres").remove();
   } 
   if(nakresPohybu == 1){
    $(".nakresPohybu").remove();
   }
    
   if(kde == 0){
  // alert(kde);
   $('#x-os').val(event.screenX - 419);
    $('#y-os').val(event.screenY- 72);
    if(nakres == 0) {nakres = nakres + 1;}
    $("#ihrisko").append("<div style=\"position:absolute;border:1px solid black;width:5px;height:5px;\" class=\"nakres\"></div> ");
    $('.nakres').css({"background-color":"black"});
    $('.nakres').css({"left": $('#x-os').val() + "px"});
    $('.nakres').css({"top": $('#y-os').val()+ "px"});  
     
   } 
   if(kde == 1){
  // alert(kde);
  if(nakresPohybu == 0) {nakresPohybu = nakresPohybu + 1;}
    $('#xx').val(event.screenX - 419);
    $('#yy').val(event.screenY- 72);
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
      hraci[i].animate(0,0,hraci[i].id);
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
