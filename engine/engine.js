class Engine {

    constructor(canvas, context) {
        this.entities = [];
        this.mainCanvas = canvas;
        this.mainContext = context;
        this.width = canvas.width;
        this.height = canvas.height;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
        this.bounds = new Rectangle(0, 0, this.width, this.height);
    }

    add(entity) {
        entity.game = this;
        this.entities.push(entity);
    }

    update() {
        for (var i = 0; i < this.entities.length; i++) {

            var entity = this.entities[i];
            entity.update();
        }
    }

    render() {
        this.mainContext.clearRect(0, 0, this.width, this.height);

        for (var i = 0; i < this.entities.length; i++) {

            var entity = this.entities[i];
            entity.render(this.mainContext);
        }
    }

}
