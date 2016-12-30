class Boid extends Entity {
    constructor(x, y, radius, mass, max_speed, max_force) {
        super(x, y);
        this.velocity = new Vector2(0, 0);
        this.mass = mass;
        this.max_force = max_force;
        this.max_speed = max_speed;
        this.wanderAngle = 15;
        this.radius = radius;
    }

    update() {
        this.wrap();

        super.update();
    }

    render(context) {
        super.render(context);
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
            x = this.game.bounds.width;
        } else if (this.position.x > this.game.bounds.width) {
            x = 0;
        }

        if (this.position.y < 0) {
            y = this.game.bounds.height;
        } else if (this.position.y > this.game.bounds.height) {
            y = 0;
        }
        this.position = new Vector2(x, y);
    }
}
