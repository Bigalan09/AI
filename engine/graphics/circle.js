class Circle {

    constructor(x, y, radius, speed) {
        this.position = new Vector2(x, y);
        this.velocity = new Vector2(0, 0);
        this.mass = 5;
        this.max_force = speed;
        this.max_speed = speed;
        this.radius = radius;

        this.target = new Vector2(getRandomInt(0, 1000), getRandomInt(0, 600));
    }

    update() {

        var desired_velocity = this.target.sub(this.position);
        var distance = desired_velocity.length();

        // Check the distance to detect whether the character
        // is inside the slowing area
        if (distance < 50) {
            // Inside the slowing area
            desired_velocity = desired_velocity.normalize().mul(this.max_speed * (distance / 50));
        } else {
            // Outside the slowing area.
            desired_velocity = desired_velocity.normalize().mul(this.max_speed);
        }

        // Set the steering based on this
        var steering = desired_velocity.sub(this.velocity);

        this.velocity = truncate(this.velocity.add(steering), this.max_speed);
        this.position = this.position.add(this.velocity);
    }

    draw(context) {
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'rgba(220,235,255,0.3)';
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = 'rgba(20,40,80,0.5)';
        context.stroke();
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function truncate(vector, max) {
    var i;
    i = max / vector.length();
    i = i < 1.0 ? i : 1.0;
    return vector.mul(i);
}
