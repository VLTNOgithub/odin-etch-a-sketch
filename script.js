window.onload = () => {
    const drawablesContainer = document.querySelector("#drawablesContainer");

    for (let i = 0; i < 256; i++) {
        const grid = document.createElement("div");

        grid.className = "drawable";
        grid.onmouseenter = (e) => {
            // Left click
            if (e.buttons == 1) {
                changeColor(e.target, "red");
                return
            }

            // Right click
            if (e.buttons == 2) {
                changeColor(e.target, "");
                return
            }
        }

        grid.onclick = (e) => {
            changeColor(e.target, "red");
        }

        grid.oncontextmenu = (e) => {
            changeColor(e.target, "")
        }

        drawablesContainer.appendChild(grid);
    }

    function changeColor(drawableElement, color = "") {
        drawableElement.style.backgroundColor = color;
    }

}