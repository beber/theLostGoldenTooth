import Health from "./hud/bar/Health";
import Mana from "./hud/bar/Mana";
import Element from "./hud/Element";
import MonsterCounter from "./hud/MonsterCounter";
import Timer from "./hud/Timer";

export default class {
    constructor(scene)
    {
        this.scene = scene;
    }

    load(){
        this.elements = {
            "health": new Health(this.scene),
            "mana": new Mana(this.scene),
            "element": new Element(this.scene),
            "monster_counter": new MonsterCounter(this.scene),
            "timer": new Timer(this.scene)
        };

        for(let i in this.elements) {
            this.elements[i].load();
        }
    }
}