
    <?php
    if ($handle = opendir('drills')) {
        $pocet = 0;
        while (false !== ($entry = readdir($handle))) {
            if ($entry != "." && $entry != "..") {
                $drill = substr($entry,0,strrpos($entry,"."));
                ?>
                <a href="<?php echo $_SERVER['PHP_SELF'].'?drill='.$drill; ?>"
                <?php
                if(isset($_GET['drill']) && $drill == $_GET['drill']){
                    ?>
                    style="background-color: lightgray"
                    <?php
                }
                ?>
                >
                <?php echo $drill ?>
                </a><br />
                <?php
                $pocet++;
            }
        }
        if($pocet == 0){
            echo "Na serveri nie je žiaden súbor s taktikou.";
        }
        closedir($handle);
    }
    ?> 