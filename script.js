window.onload = () => {
    const drawablesContainer = document.querySelector("#drawablesContainer");
    const modeObject = document.querySelector("#mode");
    const colorPicker = document.querySelector("#colorpicker")

    const hoverOpacity = 0.4;

    let selectToggled = false;

    for (let i = 0; i < 256; i++) {
        const drawable = document.createElement("div");

        drawable.className = "drawable";
        drawable.style.opacity = "1";

        drawable.onmouseenter = (e) => {
            e.target.dataPrevOpacity = e.target.style.opacity
            e.target.style.opacity = hoverOpacity;

            // Left click
            if (e.buttons == 1) {
                draw(e.target);
                return
            }

            // Right click
            if (e.buttons == 2) {
                draw(e.target, true);
                return
            }
        }

        drawable.onmouseleave = (e) => {
            console.log(e.target.dataPrevOpacity)
            e.target.style.opacity = e.target.dataPrevOpacity;
        }

        drawable.onclick = (e) => {
            draw(e.target);
        }

        drawable.oncontextmenu = (e) => {
            draw(e.target, true);
        }

        drawablesContainer.appendChild(drawable);
    }

    modeObject.onclick = () => {
        selectToggled = !selectToggled;

        if (selectToggled) {
            modeObject.style.borderRadius = "0px";
            modeObject.style.borderTopLeftRadius = "5px";
            modeObject.style.borderTopRightRadius = "5px";
            return;
        }
        
        modeObject.style.borderRadius = "5px";
    }

    modeObject.onchange = () => {
        console.log(modeObject.value.toLowerCase())
        if (modeObject.value.toLowerCase() == "color") {
            colorPicker.style.display = "";
            return;
        }
        colorPicker.style.display = "none";
    }

    function draw(drawableElement, erase=false) {
        if (erase) {
            drawableElement.style.backgroundColor = "";
            return;
        }

        mode = modeObject.value.toLowerCase();

        if (mode == "color") {
            drawableElement.style.backgroundColor = colorPicker.value;
            drawableElement.style.opacity = 1;
            drawableElement.dataPrevOpacity = 1;
        } else if (mode == "rgb") {
            randomColor = `${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}`;
            drawableElement.style.backgroundColor = `rgb(${randomColor})`;
            drawableElement.style.opacity = 1;
            drawableElement.dataPrevOpacity = 1;
        } else if (mode == "darken") {
            drawableElement.dataPrevOpacity = Math.max(0.1, drawableElement.dataPrevOpacity - 0.1);
        }
        
    }

}