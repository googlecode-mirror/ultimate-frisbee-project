function Hrac(x,y,t,id,farba,interv)
{
  this.x=x;
  this.y=y;
  this.t=t;
  this.points= [];
  this.farba = farba;
  this.id=id;  
  this.interval = interv;
  var hrac = this;
  
  
  this.addPoint = function(x,y,t){
    this.points.push(new Point(x,y,t));    
  }
  
  this.getX = function(){
   return this.x;
  }
  
  this.getHtml = function(){
    return "<div style=\"position:absolute;border:1px solid black;width:5px;height:5px;\" id=\"" + this.id + "\"></div>";
  }
  this.getElement = function(){
    return $('#' + this.id);
  }
  this.setup = function(){ 
    this.getElement().css({"background-color": this.farba });
    this.getElement().css({"left": this.points[0].x + "px"});
    this.getElement().css({"top": this.points[0].y + "px"});
  }
  
  this.animate = function(cycle,i,limit){
    
    var elem = this.getElement();
    var nextI = (i+1)%this.points.length;
    var nextCycle = cycle;
    if(nextI == 0)nextCycle++;
    var now = parseInt(cycle * this.interval) + parseInt(this.points[i].t);
    var then = parseInt(nextCycle * this.interval) + parseInt(this.points[nextI].t);
  //  if(now>=then){
  //    alert('som v errori '+this.points[i].t+ '; '+ this.points[nextI].t+ '; ' +nextCycle + cycle + nextI+ i + this.id);
  //    console.log('Fatal: animation time now='+now+', then='+then);
  //    console.log('Cycle='+cycle+', i='+i);
  //    console.log('Next cycle='+nextCycle+', nextI='+nextI);
  //    console.log(this);
 //   }
   
    if(nextCycle*this.interval + parseInt(this.points[nextI].t) <= limit)
    {
      elem = elem.animate(
        {left:this.points[nextI].x,top:this.points[nextI].y},
        then - now,
        'linear',
        function(){
          hrac.animate(nextCycle,nextI,limit);
        }        
      );
    }
    else
    {
      $('#loadNastavenia').show();
      $('#start').hide();
      $('#opatovnyStart').show();
    }

    return this;
  }
  
 
}