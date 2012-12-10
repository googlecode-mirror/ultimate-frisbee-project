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
  
  $('#tlacidlo').html('EDIT').unbind('click').click(function(){
  $('#start').hide(); 
  $('#tlacidlo').hide();   
  $('#vyberTimov').show();
   $('#form1').show();
  });
  
  $('#prvyTim').unbind('click').click(function(){
  $('#tlacidlo').show();
  $('#vyberTimov').hide();
  $('#form1').hide();
  
    animation.pos();
    animation.hrac("blue");
  });
  
  $('#druhyTim').unbind('click').click(function(){
  $('#tlacidlo').show();
  $('#vyberTimov').hide();
  $('#form1').hide();
  
    animation.pos();
    animation.hrac("red");
  });
  
  $('#lopta').unbind('click').click(function(){
  $('#tlacidlo').show();
  $('#vyberTimov').hide();
  $('#form1').hide();
 
    animation.pos();
    animation.hrac("white");
  });
  
  $('#start').unbind('click').click(function(){
  $('#start').html('START');
  $('#tlacidlo').hide();
  $('#loadNastavenia').show();
  animation.load();
  //animation.run();
  });

}


