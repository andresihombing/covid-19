class AppBar extends HTMLElement {
    connectedCallback(){
        this.render();
    }

    render() {
        this.innerHTML = `Covid 19`;
    }
}

customElements.define("app-bar", AppBar);