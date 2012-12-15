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

 <button onclick="window.location.href='<?php echo $_SERVER['PHP_SELF']; ?>'">NEW</button>
<button id="load">LOAD</button> 
<button id="edit">EDIT</button>

<?php 
if (isset($_POST["save"]) && isset($_POST["pom"]) && isset($_POST["saveFileName"])){
    $_GET['drill'] = $_POST["saveFileName"];   
    $text = $_POST["pom"];
    $myFile = "drills/".$_POST["saveFileName"].".txt";
    $fh = fopen($myFile, 'w') or die("can't open file");
    fwrite($fh, $text);
    fclose($fh); 
    ?>
    <script type="text/javascript">
        $('#loadNastavenia').load('drills_hyperlinks.php');
    </script>
    <?php
}

if(isset($_GET['drill'])){   
     ?>
     <button id="run">START</button> <br/>
     <button id="editAnimacie">EDIT ANIMACIE</button>
     <div id="uprava"></div>
  
     <?php
     $filename = 'drills/'.$_GET['drill'].'.txt';
     $fh = fopen($filename,'r');
     $stringData = fread($fh,filesize($filename));
     ?>
     <script type="text/javascript">
            $(document).ready(function(){
                $('.nastavenia').hide();
                
                animation.load("<?= $stringData; ?>");
            });
     </script>
     <?php
     fclose($fh);  
}
?> 

<div id="editNastavenia" class="nastavenia">
    
<div id="vyberTimov">
<h1> Nastavenie animacie</h1>
 <label for="dlzkaCyklu">Zvol dlzku cyklu pre celu animaciu: </label>
<input  name="dlzkaCyklu" type="text" size="5" maxlength="5" id="dlzkaCyklu" value="" /> ms

<h2> Moznosti vyberu hracov a lopty: </h2>
<h4> Stlac ak ma patrit do prveho timu: </h4>
  <button id="prvyTim">PRVY TIM</button>  <br />
<h4> Stlac ak ma patrit do druheho timu: </h4>
  <button id="druhyTim">DRUHY TIM</button>    <br />
<h4> Stlac ak urcujes pohyb lopty: </h4>  
  <button id="lopta">LOPTA</button>       <br />
</div>
        
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
  <button id="pohyboveTlacidlo">NOVY POHYB</button>      <br />
  </fieldset>
 </div>

               
</div>
   
<button id="tlacidlo"></button>
   
<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" name="form1" id="form1">
   <h3>Uloz animaciu:</h3>
   <label for="saveFileName">Ulozit ako:</label>
   <input name="saveFileName" type="text" size="15" maxlength="15" id="saveFileName"  value="" /> <br/>
   <input name="pom" id="pom" type="hidden" />
   <button id="save" name="save">SAVE</button>   
</form>  

</div>

 
<div id="loadNastavenia" class="nastavenia">
    <?php
    include "drills_hyperlinks.php";
    ?> 
</div> 



 </div>
 
 
 
<div id="pravaStrana">
    <h2>
    <?php echo isset($_GET['drill']) ? $_GET['drill'] : ""; ?>
    </h2>
<div id="ihrisko"> <canvas id="paint"  width="500px" height="600px"> </canvas>

</div>
</div>



</body>
</html>