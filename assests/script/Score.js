class Score {
    #date;
    #hits;
    #percentage;

    constructor(date,hits,percentage){
        this.#date = date;
        this.#hits = hits;
        this.#percentage = percentage;
    }
    get date(){
        return this.#date;
    }
    get hits(){
        return this.#hits;
    }
    get percentage(){
        return this.#percentage;
    }
    getInfo(){
        return `Date: ${this.#date}  Hits: ${this.#hits}  Percentage: ${this.#percentage}`;
    }
}
export { Score };