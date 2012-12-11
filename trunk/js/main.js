$(document).ready(function(){
  animation = new animation();
  Start();
});

function Start()
{
  $('#pridavanie').hide();
  $('#vyberTimov').hide();
  $('#pridavaniePohybu').hide();
   $('#form1').hide();
   $('#loadNastavenia').hide();
   $('#start').hide();
   $('#opatovnyStart').hide();
   
   $('#opatovnyStart').unbind('click').click(function(){ 
    animation.run();
   });
  
  $('#tlacidlo').html('EDIT').unbind('click').click(function(){
  $('#load').hide(); 
  $('#tlacidlo').hide();   
  $('#vyberTimov').show();
   $('#form1').show();
  });
  
  $('#prvyTim').unbind('click').click(function(){ 
  if($('#dlzkaCyklu').val() > 1999) {
      $('#tlacidlo').show();
      $('#vyberTimov').hide();
      $('#form1').hide();
  
      animation.pos();
      animation.hrac("blue",$('#dlzkaCyklu').val());  
    } else {
     alert("Zadal si zly vstup na dlzke animacie! Dlzka musi byt vacsia ako 2000!")
    }
  });
  
  $('#druhyTim').unbind('click').click(function(){
  if($('#dlzkaCyklu').val() > 1999) {
      $('#tlacidlo').show();
      $('#vyberTimov').hide();
      $('#form1').hide();
  
      animation.pos();
      animation.hrac("red",$('#dlzkaCyklu').val());  
    } else {
     alert("Zadal si zly vstup na dlzke animacie! Dlzka musi byt vacsia ako 2000!")
    }
  });
  
  $('#lopta').unbind('click').click(function(){ 
  if($('#dlzkaCyklu').val() > 1999) {
      $('#tlacidlo').show();
      $('#vyberTimov').hide();
      $('#form1').hide();
  
      animation.pos();
      animation.hrac("white",$('#dlzkaCyklu').val());  
    } else {
     alert("Zadal si zly vstup na dlzke animacie! Dlzka musi byt vacsia ako 2000!")
    }
  });
  
  

}


