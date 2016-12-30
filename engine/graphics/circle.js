class Circle {

    constructor(x, y, radius, speed, bounds) {
        this.position = new Vector2(x, y);
        this.velocity = new Vector2(0, 0);
        this.mass = 5;
        this.max_force = speed / 2;
        this.max_speed = speed;
        this.radius = radius;
        this.wanderAngle = 15;
        this.target = new Vector2(getRandomInt(0, 1000), getRandomInt(0, 600));
        this.screenBounds = bounds;
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

        this.wrap();
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

    wander() {
        // Calculate the circle center
        var circleCenter = this.velocity.clone();
        circleCenter.normalize();
        circleCenter.mul(30);
        //
        // Calculate the displacement force
        var displacement = new Vector2(0, -1);
        displacement.mul(this.radius);

        //
        // Randomly change the vector direction
        // by making it change its current angle
        displacement = setAngle(displacement, this.wanderAngle);
        //
        // Change wanderAngle just a bit, so it
        // won't have the same value in the
        // next game frame.
        this.wanderAngle += Math.random() * 30 - 30 * .5;
        //
        // Finally calculate and return the wander force
        var wanderForce = circleCenter.add(displacement);
        return wanderForce;
    }

    wrap() {

        var x = this.position.x;
        var y = this.position.y;

        if (this.position.x < 0) {
            x = this.screenBounds.width;
        } else if (this.position.x > this.screenBounds.width) {
            x = 0;
        }

        if (this.position.y < 0) {
            y = this.screenBounds.height;
        } else if (this.position.y > this.screenBounds.height) {
            y = 0;
        }
        this.position = new Vector2(x, y);
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
