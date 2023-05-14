// collect holders all in document.body.
const holders = document.body.getElementsByClassName("holder");

// attach a click event to holders all.
for (const holder of holders) {
    holder.onclick = () => {
        // collect contents in a clicked holder all.
        const contents = holder.querySelectorAll(".holder-content");
        // switch content's display style.
        for (const content of contents) {
            const display = document.defaultView.getComputedStyle(content, null).display;
            content.style.display = display === "none" ? "block" : "none";
        }
    };
}
