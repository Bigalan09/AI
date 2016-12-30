class Circle extends Boid {

    constructor(x, y, radius, speed) {
        super(x, y, radius, radius * speed, speed, speed / 2);
    }

    update() {
        /*
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
*/
        // Set the steering based on this
        var steering = this.wander(); //desired_velocity.sub(this.velocity);
        steering = truncate(steering, this.max_force);
        steering = steering.div(this.mass);

        this.velocity = truncate(this.velocity.add(steering), this.max_speed);
        this.position = this.position.add(this.velocity);

        super.update();
    }

    render(context) {
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'rgba(220,235,255,0.3)';
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = 'rgba(60,60,60,0.5)';
        context.stroke();
        super.render(context)
    }

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setAngle(vector, value) {
    var len = vector.length();
    vector.x = Math.cos(value) * len;
    vector.y = Math.sin(value) * len;
    return vector;
}

function truncate(vector, max) {
    var i;
    i = max / vector.length();
    i = i < 1.0 ? i : 1.0;
    return vector.mul(i);
}
