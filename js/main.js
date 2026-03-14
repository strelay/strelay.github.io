(function () {
    var canvas = document.getElementById("heroCanvas");
    var ctx = canvas.getContext("2d");
    var blobs = [];
    var dpr = window.devicePixelRatio || 1;

    function resize() {
        var hero = canvas.parentElement;
        canvas.width = hero.offsetWidth * dpr;
        canvas.height = hero.offsetHeight * dpr;
        canvas.style.width = hero.offsetWidth + "px";
        canvas.style.height = hero.offsetHeight + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createBlobs() {
        var w = canvas.width / dpr;
        var h = canvas.height / dpr;
        blobs = [
            { x: w * 0.2, y: h * 0.3, r: 260, dx: 0.35,  dy: 0.2,   color: "rgba(79,70,229,0.18)" },
            { x: w * 0.7, y: h * 0.5, r: 220, dx: -0.25, dy: 0.3,   color: "rgba(168,85,247,0.15)" },
            { x: w * 0.5, y: h * 0.7, r: 200, dx: 0.2,   dy: -0.25, color: "rgba(59,130,246,0.14)" }
        ];
    }

    function draw() {
        var w = canvas.width / dpr;
        var h = canvas.height / dpr;
        ctx.clearRect(0, 0, w, h);

        for (var i = 0; i < blobs.length; i++) {
            var b = blobs[i];
            b.x += b.dx;
            b.y += b.dy;

            if (b.x - b.r < -100 || b.x + b.r > w + 100) b.dx *= -1;
            if (b.y - b.r < -100 || b.y + b.r > h + 100) b.dy *= -1;

            var g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
            g.addColorStop(0, b.color);
            g.addColorStop(1, "rgba(255,255,255,0)");
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
            ctx.fill();
        }

        requestAnimationFrame(draw);
    }

    resize();
    createBlobs();
    draw();

    window.addEventListener("resize", function () {
        resize();
        createBlobs();
    });
})();
