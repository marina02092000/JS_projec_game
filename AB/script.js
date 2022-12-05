var ch;
var p=0;
var arrayOFALPHAPTIC;
var index=1;
var arr=[];
var org_arr=[];
var AZ=document.getElementById('AZ');
var imges=document.querySelectorAll('.itemsone div');
var ABitems
var photo=document.getElementsByTagName('img');
var WriteHere=document.getElementById('WriteHere');
var SETME=document.getElementById('setMe');
var imgAZ;
var bool;
var song=document.getElementById('song');
var fly=document.getElementById('fly');
var MeME=["goat","cat","tomato","Elephant","dinosaur","giraffe","frog","Lion","horse","Donkey","Tortoise","Eggplant"];
var Rchar="";
var writed;
var q=-1;
var Winer=0;
var k;
var l;
var audio=new Audio('voice/best.mp3');


var boffy;

var voicearray=['voice/best.mp3','voice/best.mp3','voice/best.mp3',
'voice/best.mp3','voice/best.mp3','voice/best.mp3',
                'voice/best.mp3','voice/best.mp3','voice/best.mp3',
                'voice/best.mp3','voice/best.mp3','voice/best.mp3'];
function SowData()
{
    for(var i=0;i<26;i++)
    {
        
        var rand = (Math.floor(Math.random()*26))+65;
        ch=String.fromCharCode(rand);
        
        bool= arr.indexOf(ch);
        // console.log(bool);
        if(bool==-1){
        AZ.innerHTML+=`<div onclick="AZClick(this)" class=\"items\" id="element${index}">${ch}</div>`;
        index+=1;
        arr.push(ch);
        }
        else{
            i--;
        }   
    }

    AZ.innerHTML+=`<div onclick="DELETEME()" class=\"items\" id="element26"><img src=\"img/rem.jpg\" class=\"del\"></div>`;
    AZ.innerHTML+=`<div onclick="DonE()" class=\"items\" id="element27"><img src=\"img/ok.jpg" class=\"del\"></div>`;
    DisplayImage();

}


function DisplayImage()
{   
    setTimeout(function()
    { 
        for(var i=0;i<photo.length-2;i++)
    {
        
        photo[i].onclick=function(){
            console.log(this);
            x=this;
        //    imges[i].style.color = "red";
            x.style.opacity = "1";
            
        
           imgAZ =Number(this.id);
       var divv="phot"+imgAZ;
       var ll=document.getElementById(divv);
        console.log(ll);
          ll.style.background="none";
           photo[i].style.disabled="false";

        }
}

},900);

}
//Write Char 
function AZClick(el)
{  
    Rchar=el.innerText;
    // console.log(Rchar);
    
       WriteHere.value+= el.innerText;
        q++;
        console.log(q);
        
    
}
//Delete Char
function DELETEME()
{
    writed = new String(WriteHere.value);
    WriteHere.value=writed.substring(0,writed.length-1);
    q--;   
    // console.log(WriteHere.value);

}
 
    //  console.log(fly[5]);
//Check Correct
function DonE()
{
    
    if(WriteHere.value==(MeME[imgAZ].toUpperCase()))
    {
        
        WriteHere.value="";
        q=-1;
        Winer+=1;
        if(Winer%3==0)
        {

            SETME.innerHTML+=` <span class="time"><span style="font-size:500%;color:#ff008a;">&hearts;</span></span> `;
        }
        else
        {
         
               fly.innerHTML="";
   
                fly.innerHTML+=` <span class="time"><span style="font-size:500%;color:pink;" class="FlyME">&#128525;</span></span> `;
                fly.innerHTML+=` <span class="time"  ><span style="font-size:500%;color:pink;" id="f1" class="FlyME">&#128525;</span></span> `;
                fly.innerHTML+=` <span class="time"  ><span style="font-size:500%;color:pink;" id="f2" class="FlyME">&#128525;</span></span> `;

        
    }}
    else
    {
        fly.innerHTML="";
        fly.innerHTML+=` <span class="time"><span style="font-size:500%;color:red;" class="FlyME">😥</span></span> `;
        fly.innerHTML+=` <span class="time"><span style="font-size:500%;color:red;" id="f3" class="FlyME">😥</span></span> `;
        fly.innerHTML+=` <span class="time"><span style="font-size:500%;color:red;" id="f4" class="FlyME">😥</span></span> `;


        WriteHere.value="";
    
        
    }
    }
Timer();
function Timer()
{
   k=2,
    l=59;
    
    setInterval(function()
    {
        var timerGame=document.querySelector('.voiceMe');
        var timerGamer=`0:${k}:${l}`;
        timerGame.innerHTML=timerGamer;

       l--;
       if(l==0)
         { 
            l=59
           
            if(k==0)
            {

                WinarOrDraw();            }
            else
            {
                k--;
            }
            timerGamer=`0:${k}:${l}`;
            timerGame.innerHTML=timerGamer;
            

         }
         
        },1000);
    }
    

function WinarOrDraw()
{
        
        if(Winer>=7)
    {
        var boffy= document.body;
        boffy.innerHTML="";
        boffy.style.backgroundImage="url(img/con2.gif)";
        boffy.style.backgroundRepeat="no-repeat";
        boffy.style.backgroundPosition="center";
        boffy.style.backgroundSize="auto";
        boffy.style.backgroundAttachment="fixed";
        var but=document.createElement("div");
        but.setAttribute("class","fdiv");
        var divbut=but.innerText=document.createElement("button");
        document.body.appendChild(divbut);
        divbut.innerText="RetrY";
        divbut.setAttribute("class","But");
        divbut.onclick=function()
        {
               window.location.href = 'index.html';
   
        }        

    }
    else if(Winer<6)
    {
        
        var boffy= document.body;
        boffy.innerHTML="";
        boffy.style.backgroundImage="url(img/780.gif)";
        boffy.style.backgroundRepeat="no-repeat";
        boffy.style.backgroundSize="auto";

        boffy.style.backgroundPosition="center";
        boffy.style.backgroundAttachment="fixed";
        boffy.style.backgroundColor="black";
        var but=document.createElement("div");
        but.setAttribute("class","fdiv");
        var divbut=but.innerText=document.createElement("button");
        document.body.appendChild(divbut);
        divbut.innerText="RetrY";
        divbut.setAttribute("class","But");
        divbut.setAttribute("id","Butid");
        divbut.onclick=function()
        {
               window.location.href = 'index.html';
   
        }
    }
}
song.onclick=function()
{

    if((k==0&&l==1 && Winer<=6)||!audio.paused)
    {
        audio.pause();
        song.innerHTML='<span id="song" ><i class="fas fa-pause-circle"></span>'
    }
   
    else 
    {
        //console.log("M");
        audio.play();
    }
}

// }
// https://www.freepik.com/free-photos-vectors/animal-icons
// if(Winer==12)
// {
//         window.location.href = 'test2.html';
//         // window.location.href = "http://net-informations.com";
    
// }