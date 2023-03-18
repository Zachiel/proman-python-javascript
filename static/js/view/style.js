const offset = 50;

export let styling = {
    adjustContentPadding: () => {
        const mainContent = document.querySelector("main");
        const faderLayer = document.querySelector(".fader");
        const navbarHeight = document
            .querySelector("nav.navbar")
            .getBoundingClientRect().bottom;
        mainContent.style.paddingTop = navbarHeight + offset + "px";
        faderLayer.style.setProperty("--faderOffset", navbarHeight + "px");
    },
    adjustBackgroundImageSize: () => {
        const documentHeight = window.innerHeight;
        const documentWidth = window.innerWidth;
        if (documentHeight > documentWidth) {
            document.body.style.setProperty("--h", `${documentHeight * 1.1}px`);
            document.body.style.setProperty("--w", `auto`);
        } else {
            document.body.style.setProperty("--w", `${documentWidth * 1.1}px`);
            document.body.style.setProperty("--h", `auto`);
        }
    },
    parallaxBackground: (x, y) => {
        document.body.style.setProperty("--x", `${50 * (x + 1)}%`);
        document.body.style.setProperty("--y", `${50 * (y + 1)}%`);
    },
};
