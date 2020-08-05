class Interchanger {
    interchangerList = [];
    contact (interchanger) {
        interchanger instanceof Interchanger && this.interchangerList.push(interchanger);
    }
    talk (message) {
        this.interchangerList.forEach(item => item.receive(message));
    }
    receive (message) {}
}
