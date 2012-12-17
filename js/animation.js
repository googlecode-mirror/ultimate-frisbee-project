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
 
this.zmenNastavenia = function(){  
 $('#zmenPridajHraca').hide();
 $('#zmenVymazHraca').hide();
 $('#vyberNovehoHraca').hide();
  $('#zmenPridajPohyb').hide(); 
 
 $('#editAnimacie').click(function(){
    $('#uprava').html('<div class="zmenaHraca"></div><div class="player-detail"></div>');
    $('.zmenaHraca').append('Zmen dlzku animacie: <input id="zmenLimit" value="'+limit+'"></input> <br/>')
    for(var i in hraci){
      $('.zmenaHraca').append('<button class="edit-player" playerid="'+i+'">'+i+"</button> ");
      hraci[i].getElement().html(i);
    }
    $('#zmenPridajHraca').show(); 
    $('#editZmena').show();
   animation.zmenHraca(); 
 });
 
  $('#zmenPridajHraca').click(function(){
   // $('#zmenPridajHraca').hide();  
    $('#vyberNovehoHraca').show(); 
  });
}

this.vykresliPohyby = function(nekresli){
  for(var i in hraci){
    if(hraci[i] != nekresli){
      for(var j in hraci[i].points){
        if(j < hraci[i].points.length - 1){ 
          animation.kreslenieCiary(hraci[i].points[j].x,hraci[i].points[j].y,hraci[i].points[parseInt(j)+parseInt(1)].x,hraci[i].points[parseInt(j)+parseInt(1)].y,hraci[i].points[parseInt(j)+parseInt(1)].t,'black');           
        }
      }
    }
  } 
}

this.zmenHraca = function(){
var menenyHrac = '';
 animation.kreslenieCiary('a','b','c','d','e','f');
 animation.vykresliPohyby(" ");  
 
$('button.edit-player').click(function(){
 animation.kreslenieCiary('a','b','c','d','e','f');
 $('#zmenVymazHraca').show();
 $('#zmenPridajPohyb').show();
 
 menenyHrac = hraci[$(this).attr('playerid')]; 
 animation.vykresliPohyby(menenyHrac); 
  var html ='';  
    html += 'Zmen dlzku animacie hraca: <input id="hracInterval" value="'+menenyHrac.interval+'"><br/>';
  for(j in menenyHrac.points){
     
     var wp = menenyHrac.points[j];
        html += '<input class="x'+j+'" value="'+wp.x+'"></input>:<input class="y'+j+'" value="'+wp.y+'"></input>';
        html += '<input class="t'+j+'" value="'+wp.t+'"><button id="'+menenyHrac.id+j+'">REMOVE</button><br/>';
        
    if(j < menenyHrac.points.length - 1){     
      animation.kreslenieCiary(menenyHrac.points[j].x,menenyHrac.points[j].y,menenyHrac.points[parseInt(j)+parseInt(1)].x,menenyHrac.points[parseInt(j)+parseInt(1)].y,menenyHrac.points[parseInt(j)+parseInt(1)].t,menenyHrac.farba);           
    }
  }
 $('.player-detail').html(html); 
 
for(k in menenyHrac.points){ 
 $('button#'+menenyHrac.id+k+'').click(function(){
    
        alert(menenyHrac.points[k].x);
        
        menenyHrac.points.splice(k,1);
        

 });   
}
 
  $('#zmenVymazHraca').click(function(){ 
    animation.vymazHraca(menenyHrac);
    menenyHrac = '';
    $('#zmenVymazHraca').hide();
  });
  
  $('#zmenPridajPohyb').click(function(){
   $('#editNastavenia').show();
  $('#form1').hide();
   $('#pridavanie').hide();
  $('#vyberTimov').hide();
   $('#pridavaniePohybu').show();
    $('h3').hide();
   $('#pohyboveTlacidlo').hide();
   kde = 1;
   animation.pos(); 
   animation.zmenPridajPohybFunkcia(menenyHrac); 
   menenyHrac = '';
 $('#zmenPridajPohyb').hide();
});
 
 }); 
 
$('#editZmena').click(function(){ 
 if(limit != $('#zmenLimit').val()){
    animation.zmenHodnotyVPoli('limit');
  }else{
  animation.zmenHodnotyVPoli(menenyHrac);
  }
}); 

}

this.zmenPridajPohybFunkcia = function(kto){
  for(var i in hraci){
    if(hraci[i].id == kto.id){
      $('.potvrdPohyb').click(function(){
        if($('#xx').val() > 0 && $('#yy').val() > 0 && $('#tt').val() > 0 && $('#tt').val() <= kto.interval){
          alert($('#tt').val());
          kto.addPoint($('#xx').val(),$('#yy').val(),$('#tt').val());
          
          animation.kreslenieCiary('a','b','c','d','e','f');
          animation.vykresliPohyby(kto); 
          var html ='';  
            for(j in kto.points){
              var wp = kto.points[j];
                  html += '<input class="x'+j+'" value="'+wp.x+'"></input>:<input class="y'+j+'" value="'+wp.y+'"></input>';
                  html += '<input class="t'+j+'" value="'+wp.t+'"><br/>';
        
              if(j < kto.points.length - 1){     
                animation.kreslenieCiary(kto.points[j].x,kto.points[j].y,kto.points[parseInt(j)+parseInt(1)].x,kto.points[parseInt(j)+parseInt(1)].y,kto.points[parseInt(j)+parseInt(1)].t,kto.farba);           
              }
            }
            $('.player-detail').html(html); 
          
           $('#editNastavenia').hide();
           $('#pridavaniePohybu').hide();
           $('#zmenPridajPohyb').show();
           kde = 2;
           $(".nakresPohybu").remove();
        }else{
         alert('Zadal si zle vstupy, t musi byt mensie ako hracova dlzka animacie!');
        }
      });
    }
  }
}

this.vymazHraca = function(kto){
 for(var i in hraci){
  if(hraci[i].id == kto.id){
    
  var ide = hraci[i].getElement();
     $(ide).remove();
    hraci.splice(i,1);
    
    for(var j in hraci){
     hraci[j].id = j;
    }
    var ide = '#' + hraci.length;
     $(ide).remove();
    animation.draw();      
    
    $('#uprava').html('<div class="zmenaHraca"></div><div class="player-detail"></div>');
    $('.zmenaHraca').append('Zmen dlzku animacie: <input id="zmenLimit" value="'+limit+'"></input> <br/>')
    for(var j in hraci){
     $('.zmenaHraca').append('<button class="edit-player" playerid="'+j+'">'+j+"</button> ");
      hraci[j].getElement().html(j);
    }
     animation.zmenHraca(); 
  }
 }
}

this.zmenHodnotyVPoli = function(kto){

if(kto == 'limit'){
 if(limit != $('#zmenLimit').val()){
  alert("Dlzka animacie bola zmenena z "+limit +" na "+$('#zmenLimit').val());
   limit = $('#zmenLimit').val();
 }
}else{
 if(kto.interval != $('#hracInterval').val()){
    alert("Dlzka animacie hraca bola zmenena z "+kto.interval +" na "+$('#hracInterval').val());
    kto.interval = $('#hracInterval').val();
 }

 for(j in kto.points){
  if($(".x"+j+"").val() != kto.points[j].x){
   kto.points[j].x = $(".x"+j+"").val();
   }
   
   if($(".y"+j+"").val() != kto.points[j].y){
   kto.points[j].y = $(".y"+j+"").val();
   }
   
   if($(".t"+j+"").val() != kto.points[j].t){
   kto.points[j].t = $(".t"+j+"").val();
   }
   
 }
 animation.kreslenieCiary('a','b','c','d','e','f');
 animation.vykresliPohyby(kto); 
 for(k in kto.points){
     if(k < kto.points.length - 1){     
      animation.kreslenieCiary(kto.points[k].x,kto.points[k].y,kto.points[parseInt(k)+parseInt(1)].x,kto.points[parseInt(k)+parseInt(1)].y,kto.points[parseInt(k)+parseInt(1)].t,kto.farba);           
    }
   }
                
   animation.draw(); 
   for(var i in hraci){
   hraci[i].getElement().html(i); 
   }
}
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
   animation.startuj(); 
   animation.zmenNastavenia();
 }
 
 this.startuj = function(){
   $('#run').html('START').unbind('click').click(function(){
    animation.run();
   });
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
       
      animation.kreslenieCiary(hraci[hraci.length -1].points[hraci[hraci.length -1].points.length - 2].x,hraci[hraci.length -1].points[hraci[hraci.length -1].points.length - 2].y,hraci[hraci.length -1].points[hraci[hraci.length -1].points.length - 1].x,hraci[hraci.length -1].points[hraci[hraci.length -1].points.length - 1].y,hraci[hraci.length -1].points[hraci[hraci.length -1].points.length - 1].t,hraci[hraci.length -1].farba);
      
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
   
  var x = e.pageX - $("#ihrisko").offset().left;
  var y = e.pageY - $("#ihrisko").offset().top;
   $('#x-os').val(parseInt(x));                //event.screenX- 419
    $('#y-os').val(parseInt(y));                // event.screenY- 72
    if(nakres == 0) {nakres = nakres + 1;}
    $("#ihrisko").append("<div style=\"position:absolute;border:1px solid black;width:5px;height:5px;\" class=\"nakres\"></div> ");
    $('.nakres').css({"background-color":"black"});
    $('.nakres').css({"left": $('#x-os').val() + "px"});
    $('.nakres').css({"top": $('#y-os').val()+ "px"});  
     
   } 
   if(kde == 1){
  if(nakresPohybu == 0) {nakresPohybu = nakresPohybu + 1;}
  var x = e.pageX - $("#ihrisko").offset().left;
  var y = e.pageY - $("#ihrisko").offset().top;
    $('#xx').val(parseInt(x));
    $('#yy').val(parseInt(y));
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
    
    if($('#zmenPridajHraca').show()){
     alert("velkost pola: " + hraci.length);
     var kolko= hraci.length - 1;
      $('.zmenaHraca').append('<button class="edit-player" playerid="'+kolko+'">'+ kolko+'</button>');
      for(var j in hraci){
       hraci[j].getElement().html(j);
      }      
      animation.zmenHraca();  
      $('#form1').show();
    }else{
      $('#vyberTimov').show();
      $('#form1').show();
   }
   
  }
  
   this.run = function(){
      for(var i in hraci)
    {
      hraci[i].animate(0,0,limit);
    }
   
   }
   
 this.kreslenieCiary = function(x1,y1,x2,y2,n,H) {

var theCanvas  = $('#paint');
var ctx = theCanvas[0].getContext('2d');
var i = 3;
 if(x1 >=0){  
        
        ctx.strokeStyle = H;
        ctx.lineWidth = 2;
     if(H != 'black') {
       ctx.lineWidth = 5;
     }   
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);       
        ctx.fillStyle = H;
      if(H != 'black'){ 
       i = 20; 
       var j = 25;
        ctx.font=" bold " + j + "px Arial"; 
        ctx.fillText(n,parseInt(x2)+parseInt(i),parseInt(y2) +parseInt(i));
      }else{
       i = 10;
          ctx.font="10px Arial";
          ctx.fillText(n,parseInt(x2)+parseInt(i),parseInt(y2) +parseInt(i));
      }
        
        ctx.stroke();
          
 }
 if(x1 == 'a'){
  ctx.clearRect(0,0,500,600);
 }       
}

this.mozeIstDalej = function(sfarbenie){
  if(limit > 0){
  $('.nastavenia').show();
     $('#tlacidlo').show();
      $('#vyberTimov').hide();
       $('#vyberNovehoHraca').hide();
      $('#form1').hide();
      animation.pos();
      animation.hrac(sfarbenie,limit); 
  }else{
    if($('#dlzkaCyklu').val() > 1999) {
      $('#tlacidlo').show();
      $('#vyberTimov').hide();
      animation.pos();
      animation.hrac(sfarbenie,$('#dlzkaCyklu').val());  
      } else {
     alert("Zadal si zly vstup na dlzke animacie! Dlzka musi byt vacsia ako 2000!");
    }
  } 
}
 
}
