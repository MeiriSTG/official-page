// a flag that is true when header is animating.
let is_animating = false;
// a variable to save the current color.
const WHITE = 0;
const BLACK = 1;
let current_color = WHITE;

// get a header div and set an event to raise is_animating flag.
const header = document.getElementById("header");
header.onanimationend = () => is_animating = false;

// set a window scroll event.
window.onscroll = () => {
    // when the header is animating, nothing happens.
    if (is_animating)
        return;
    // otherwise.
    const scroll = window.scrollY;
    if (scroll < 200) {
        if (current_color === WHITE)
            return;
        header.style.animation = "black-to-white 0.1s linear forwards";
        current_color = WHITE;
    } else {
        if (current_color === BLACK)
            return;
        header.style.animation = "white-to-black 0.1s linear forwards";
        current_color = BLACK;
    }
    is_animating = true;
};
