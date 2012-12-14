$(document).ready(function(){
  animation = new animation();
  Start();
});

function Start()
{
   $('.nastavenia').hide();
   $('#opatovnyStart').hide();
   $('#editNastavenia').show(); 
   $('#pridavanie').hide();
   $('#pridavaniePohybu').hide();
   $('#vyberTimov').show();
   $('#tlacidlo').hide();
   
   $('#opatovnyStart').unbind('click').click(function(){
        animation.run();
   });
    
   $('#start').click(function() {
        animation.run();
   });
   
  $('#save').click(function(){
      $('.nastavenia').hide();
      var skuska = animation.skuska();
      document.getElementById("pom").value = skuska;
  });

  $('#load').click(function(){
      $('.nastavenia').hide();
      $('#loadNastavenia').show();
  });   
 
  $('#edit').unbind('click').click(function(){
     $('.nastavenia').hide();
     $('#editNastavenia').show(); 
  });
 
  $('#prvyTim').unbind('click').click(function(){
  if($('#dlzkaCyklu').val() > 1999) {
      $('#tlacidlo').show();
      $('#vyberTimov').hide();
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
      animation.pos();
      animation.hrac("white",$('#dlzkaCyklu').val());  
    } else {
     alert("Zadal si zly vstup na dlzke animacie! Dlzka musi byt vacsia ako 2000!")
    }
  });
 
 

}
