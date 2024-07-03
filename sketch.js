let ball_size = 20;
let ball_x, ball_y;
let ball_speed_x = 5;
let ball_speed_y = 5;
let paddle_width = 20;
let paddle_height = 100;
let paddle_speed = 10;
let player1_x;
let player1_y;
let player2_x;
let player2_y;
let player1_score = 0;
let player2_score = 0;
let isMobile;

function setup() {
    if (windowWidth < 800 || windowHeight < 600) {
        isMobile = true;
        createCanvas(windowWidth, windowHeight);
        paddle_height = 75;  // Adjust paddle height for smaller screens
    } else {
        isMobile = false;
        createCanvas(800, 600);
    }
    ball_x = width / 2 - ball_size / 2;
    ball_y = height / 2 - ball_size / 2;
    player1_x = 50;
    player1_y = height / 2 - paddle_height / 2;
    player2_x = width - 50 - paddle_width;
    player2_y = height / 2 - paddle_height / 2;
    textAlign(CENTER, CENTER);
    textSize(35);
}

function draw() {
    background(0);
    fill(255);
    rect(player1_x, player1_y, paddle_width, paddle_height);
    rect(player2_x, player2_y, paddle_width, paddle_height);
    ellipse(ball_x, ball_y, ball_size, ball_size);

    ball_x += ball_speed_x;
    ball_y += ball_speed_y;

    if (ball_y <= 0 || ball_y >= height - ball_size) {
        ball_speed_y *= -1;
    }

    if (ball_x <= player1_x + paddle_width && player1_y < ball_y && ball_y < player1_y + paddle_height) {
        ball_speed_x *= -1;
    }

    if (ball_x >= player2_x - ball_size && player2_y < ball_y && ball_y < player2_y + paddle_height) {
        ball_speed_x *= -1;
    }

    if (ball_x <= 0) {
        player2_score++;
        resetBall();
    }

    if (ball_x >= width - ball_size) {
        player1_score++;
        resetBall();
    }

    if (isMobile) {
        touchControls();
    } else {
        if (keyIsDown(87) && player1_y > 0) { // 'W' key
            player1_y -= paddle_speed;
        }

        if (keyIsDown(83) && player1_y < height - paddle_height) { // 'S' key
            player1_y += paddle_speed;
        }

        if (keyIsDown(UP_ARROW) && player2_y > 0) {
            player2_y -= paddle_speed;
        }

        if (keyIsDown(DOWN_ARROW) && player2_y < height - paddle_height) {
            player2_y += paddle_speed;
        }
    }

    text(`${player1_score} - ${player2_score}`, width / 2, 20);
    textSize(20); // Set font size for the author text
    text("Made by Harsh Rathod", width / 2, 50); // Display the author text
}

function touchControls() {
    if (touches.length > 0) {
        let touch = touches[0];
        if (touch.x < width / 2) {
            player1_y = touch.y - paddle_height / 2;
        } else {
            player2_y = touch.y - paddle_height / 2;
        }
    }
}

function resetBall() {
    ball_x = width / 2 - ball_size / 2;
    ball_y = height / 2 - ball_size / 2;
}

function windowResized() {
    if (isMobile) {
        resizeCanvas(windowWidth, windowHeight);
    }
}
