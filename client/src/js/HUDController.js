import Health from "./hud/bar/Health";
import Mana from "./hud/bar/Mana";

export default class {
    constructor(scene)
    {
        this.scene = scene;
    }

    load(){
        this.elements = {
            "health": new Health(this.scene),
            "mana": new Mana(this.scene)
        }

        for(let i in this.elements) {
            this.elements[i].load();
        }
    }

    update()
    {
        for(let i in this.elements) {
            this.elements[i].update();
        }
    }
}