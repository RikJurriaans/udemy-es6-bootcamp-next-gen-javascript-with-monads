export class Kleisli {
    // f :: x -> Monad y
    constructor(f) {
        // zo voer je de zooi uit
        this.run = x => f(x);

        // zo kunnen we kleisli's aan elkaar lijmen
        this.pipe = g => new Kleisli(x => this.run(x).then(g.run));

        // zo kun je meer dan 1 kleisli aan elkaar lijmen
        this.pipeTo = g => new Kleisli(x => this.run(x).then(g));
    };
}

// shorthand notation for creating kleisli's
export let kleisli = (f) => new Kleisli(f);
