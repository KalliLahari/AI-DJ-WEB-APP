song="";
leftWrist_y=0;
rightWrist_x=0;
leftWrist_x=0;
rightWrist_y=0;
leftWrist_score=0;
rightWrist_score=0;

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}

function modelLoaded(){
    console.log("poseNet Initialized");
}

function preload(){
    song=loadSound("music.mp3");
}

function draw(){
    image(video,0,0,600,500);

    stroke("red");
    fill("red");
    if(leftWrist_score>0.2){
        circle(leftWrist_x,leftWrist_y,20);
        intonumber=Number(leftWrist_y);
        nodecimal=floor(intonumber);
        volume=nodecimal/500;
        document.getElementById("volume").innerHTML="Volume : "+volume;
        song.setVolume(volume);
    }

    if(rightWrist_score>0.2){
        circle(rightWrist_x,rightWrist_y,20);
        if(rightWrist_y>0 && rightWrist_y<100){
            document.getElementById("speed").innerHTML="Speed : 0.5x";
            song.rate(0.5);
        }
        
        else if(rightWrist_y>100 && rightWrist_y<200){
            document.getElementById("speed").innerHTML="Speed : 1x";
            song.rate(1);
        }
        else if(rightWrist_y>200 && rightWrist_y<300){
            document.getElementById("speed").innerHTML="Speed : 1.5x";
            song.rate(1.5);
        }
        else if(rightWrist_y>300 && rightWrist_y<400){
            document.getElementById("speed").innerHTML="Speed : 2x";
            song.rate(2);
        }
        else if(rightWrist_y>400 && rightWrist_y<500){
            document.getElementById("speed").innerHTML="Speed : 2.5x";
            song.rate(2.5);
        }
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftWrist_x=results[0].pose.leftWrist.x;
        leftWrist_y=results[0].pose.leftWrist.y;
        console.log("leftWrist x : "+leftWrist_x+" ,leftWrist y : "+leftWrist_y);

        rightWrist_x=results[0].pose.rightWrist.x;
        rightWrist_y=results[0].pose.rightWrist.y;
        console.log("rightWrist x : "+rightWrist_x+" ,rightWrist y : "+rightWrist_y);

        leftWrist_score=results[0].pose.keypoints[9].score;
        console.log("leftWrist score : "+leftWrist_score);
        
        rightWrist_score=results[0].pose.keypoints[10].score;
        console.log("rightWrist score : "+rightWrist_score);
    }
}