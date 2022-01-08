song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;

function preload(){
    song= loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}

function draw(){
    image(video,0,0,600,500);
    fill("#ff0000"); //This is the hex code for the red color
    stroke("#ff0000"); //This is the hex code to make the border red
    circle(leftWristX,leftWristY,20); //This is a circle that is going to drawn on the left wrist
    inNumberleftWristY=Number(leftWristY);
    removeDecimals=floor(inNumberleftWristY);
    volume=removeDecimals/500;
    document.getElementById("volume").innerHTML="volume="+volume;
    song.setVolume(volume);
}

function play(){
    song.play();
    song.setVolume(1); //Range is 0-1 (0 is silence and 1 is full volume)
    song.rate(1); //1 is the normal pitch
}

function modelLoaded(){
    console.log("poseNet is initialized");
}

function gotPoses(results){ //results is an array which is going to give us the 17 key points of the body
    //and from these 17 key points in the results array, we will take out the left and right wrist values
    if(results.length>0){ //Here we are checking what is the length of the array if it is greater than 0, which means our results array contains some value
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX="+leftWristX+"leftWristY="+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX="+rightWristX+"rightWristY="+rightWristY);
    }
}
/**
 * This is a multi-line comment
*/