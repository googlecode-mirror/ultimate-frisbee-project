<?php 
  $text = 'Tato sprava bola vygenerovana s php a po nacitani sa zobrazi.'; 
?>

<!DOCTYPE html>
<head>
<title>TISKO</title>
 
<script type="text/javascript" src="js/jquery-1.7.1.js"></script>
<script type="text/javascript" src="js/jquery.pause.js"></script>
<script type="text/javascript" src="js/jquery.ui.core.js"></script>
<script type="text/javascript" src="js/jquery.ui.widget.js"></script>
<script type="text/javascript" src="js/jquery.ui.mouse.js"></script>
<script type="text/javascript" src="js/jquery.ui.slider.js"></script>
<script type="text/javascript" src="js/main.js"></script>
<script type="text/javascript" src="js/animation.js"></script>
<script type="text/javascript" src="js/Hrac.js"></script>
<script type="text/javascript" src="js/Point.js"></script>

<style type="text/css"> 
#lavaStrana{  
float:left;
width: 400px;
}

#pravaStrana{
position: relative;
margin-left: 400px;
}

#ihrisko{
width: 500px;
height: 600px;
background-color: rgb(0,204,0); 
border: thin rgb(0,0,0) solid;
position: relative;
}


#novy{
width: 320px;
}

.line{
    padding;1px;
  }
</style>
</head>
<body >
<div id="lavaStrana"> 
<div id="pridavanie"> 

<h1>Nastavenia hraca</h1>
  <label for="dlzkaPohybu">Zvol dlzku cyklu pre daneho hraca: </label>
  <input  name="dlzkaPohybu" type="text" size="5" maxlength="5" id="dlzkaPohybu" value="" /> ms  <br/><br/>
    <p>Klik na ihrisko</p>
	  <label for="x-os">x: </label>  
		<input name="x-os" type="text" size="7" maxlength="3" id="x-os" value="" /> <br/>
		<label for="y-os">y: </label> 
		<input name="y-os" type="text" size="7" maxlength="3" id="y-os" value="" /> <br/>
</div>

<div id="pridavaniePohybu">

 <div id="novy">
 <fieldset>
  <div id="dole">
  <h3>Nastavenia pohybu hraca</h3>
  <h5>Klik na ihrisko</h5>
	  <label for="xx">x: </label>  
		<input name="xx" type="text" size="5" maxlength="3" id="xx" value="" /> 
		<label for="yy">y: </label> 
		<input name="yy" type="text" size="5" maxlength="3" id="yy" value="" />  <br/>
		<label for="tt">Cas za kolko ms tam ma byt: </label> 
		<input name="tt" type="text" size="5" maxlength="5" id="tt" value="" /> ms
	 </div>
  
  <button class="potvrdPohyb">ULOZ!</button>  |  
  <button id="pohyboveTlacidlo">NOVY POHYB</button>	 </br>
  </fieldset>
 </div>

		
</div>
  <button id="tlacidlo">EDIT</button>
  
  <div id="vyberTimov">
  <h1> Nastavenie animacie</h1>
   <label for="dlzkaCyklu">Zvol dlzku cyklu pre celu animaciu: </label>
  <input  name="dlzkaCyklu" type="text" size="5" maxlength="5" id="dlzkaCyklu" value="" /> ms
  
  <h2> Moznosti vyberu hracov a lopty: </h2>
  <h4> Stlac ak ma patrit do prveho timu: </h4>
    <button id="prvyTim">PRVY TIM</button>  </br>
  <h4> Stlac ak ma patrit do druheho timu: </h4>
    <button id="druhyTim">DRUHY TIM</button>    </br>
  <h4> Stlac ak urcujes pohyb lopty: </h4>  
    <button id="lopta">LOPTA</button>       </br>
  </div>



<div id="loadNastavenia">
<form enctype=".//">
  Choose a file to upload: <input name="uploadedfile" id="uploadedfile" type="file" /><br />
</form>  
</div> 
 <button id="load">LOAD</button>  
 <button id="opatovnyStart">SPUST ZNOVA</button>
 <span class="readBytesButtons">
   <button id="start">START</button>
</span>


  

  <script type="text/javascript"> 
  
$(document).ready(function(){
 $('#save').unbind('click').click(function(){
    
      var skuska = animation.skuska();
    alert(skuska);   
     
   document.getElementById("save").value = skuska;
   document.getElementById("pom").value = document.getElementById("textSave").value + ".txt";
   alert(document.getElementById("pom").value);
   $("#loadNazvy").append("<p>" + document.getElementById("pom").value + "</p>");
    });
    
 $('#load').unbind('click').click(function(){
  $('#start').show();
   $('#load').hide();
  $('#tlacidlo').hide();
  $('#loadNastavenia').show();
    
  //nacitanie   
    function readBlob(opt_startByte, opt_stopByte) {

    var files = document.getElementById('uploadedfile').files;
    if (!files.length) {
      alert('Please select a file!');
      return;
    }

    var file = files[0];
    var start = parseInt(opt_startByte) || 0; 
    var stop = parseInt(opt_stopByte) || file.size - 1;

    var reader = new FileReader();

    reader.onloadend = function(evt) {
      if (evt.target.readyState == FileReader.DONE) {
       animation.load(evt.target.result);
      }
    };

    var blob = file.slice(start, stop + 1);
    reader.readAsBinaryString(blob);
    
    
  }
  
  document.querySelector('.readBytesButtons').addEventListener('click', function(evt) {
    if (evt.target.tagName.toLowerCase() == 'button') {
      var startByte = evt.target.getAttribute('data-startbyte');
      var endByte = evt.target.getAttribute('data-endbyte');
      readBlob(startByte, endByte);
    }
  }, false);
    
  //nacitanie      
  });    
});

</script> 
   
<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" name="form1" id="form1">
   <h3>Uloz animaciu:</h3>
   <label for="textSave">Ulozit ako:</label>
   <input name="textSave" type="text" size="15" maxlength="15" id="textSave"  value="" /> <br/>
   <input name="pom" id="pom" type="hidden" />
   <input name="pomLoad" id="pomLoad" type="hidden" />
   <button id="save" name="save">SAVE</button>        

    
 <?php
   if (isset ($_POST["save"]) && isset($_POST["textSave"])){
   $text = $_POST["save"];
    $myFile = $_POST["pom"];
    
    $fh = fopen($myFile, 'w') or die("can't open file");
    $stringData =  $text;
    fwrite($fh, $stringData);
    fclose($fh);                   
   }
      
   
  ?>   
</form>   
   





</div>

<div id="pravaStrana"> 
<div id="ihrisko"> <canvas id="paint"  width="500px" height="600px"> </canvas> 

</div>
</div>

</body>
</html>