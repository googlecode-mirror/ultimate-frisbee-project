$(document).ready(function(){
  animation = new animation();
  Start();
});

function Start()
{
   $('.nastavenia').hide();
   $('#opatovnyStart').hide();
   
   $('#opatovnyStart').unbind('click').click(function(){
        animation.run();
   });
    
   $('#start').click(function() {
        animation.run();
   });
   
  $('#save').click(function(){
      var skuska = animation.skuska();
      document.getElementById("save").value = skuska;
      document.getElementById("pom").value = document.getElementById("textSave").value + ".txt";
      $("#loadNazvy").append("<p>" + document.getElementById("pom").value + "</p>");
  });

  $('#load').click(function(){
      $('.nastavenia').hide();
      $('#loadNastavenia').show();
  });   
 
  $('#edit').unbind('click').click(function(){
      $('.nastavenia').hide();
     $('#pridavanie').hide();
     $('#pridavaniePohybu').hide();
     $('#editNastavenia').show(); 
     $('#vyberTimov').show();
     $('#form1').hide();
     $('#tlacidlo').hide();
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
