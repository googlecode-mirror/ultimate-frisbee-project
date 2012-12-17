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
   $('#editZmena').hide();
   
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
  animation.mozeIstDalej("blue");
  });
 
  $('#druhyTim').unbind('click').click(function(){
  animation.mozeIstDalej("red");
  });
 
  $('#lopta').unbind('click').click(function(){
 animation.mozeIstDalej("white");
  });
 
 

}
