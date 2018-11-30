import '../scss/page/mobile.scss';
import Socket from './Socket'
import MobileControls from "./MobileControls";
import spells from "./spells/spells";

let socket = new Socket(playerInformation);
window.controls = new MobileControls(socket, spells.spells);