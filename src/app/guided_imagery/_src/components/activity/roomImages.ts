import livingCluttered from "../../assets/rooms/living-room-cluttered.jpg";
import livingClean from "../../assets/rooms/living-room-clean.jpg";
import bedroomCluttered from "../../assets/rooms/bedroom-cluttered.jpg";
import bedroomClean from "../../assets/rooms/bedroom-clean.jpg";
import kitchenCluttered from "../../assets/rooms/kitchen-cluttered.jpg";
import kitchenClean from "../../assets/rooms/kitchen-clean.jpg";
import studyCluttered from "../../assets/rooms/study-cluttered.jpg";
import studyClean from "../../assets/rooms/study-clean.jpg";
import hallwayCluttered from "../../assets/rooms/hallway-cluttered.jpg";
import hallwayClean from "../../assets/rooms/hallway-clean.jpg";
import storeroomCluttered from "../../assets/rooms/storeroom-cluttered.jpg";
import storeroomClean from "../../assets/rooms/storeroom-clean.jpg";
import type { RoomType } from "./PickSpaceScreen";

export const roomImages: Record<RoomType, { cluttered: string; clean: string }> = {
  'living-room': { cluttered: livingCluttered, clean: livingClean },
  'bedroom': { cluttered: bedroomCluttered, clean: bedroomClean },
  'kitchen': { cluttered: kitchenCluttered, clean: kitchenClean },
  'study': { cluttered: studyCluttered, clean: studyClean },
  'hallway': { cluttered: hallwayCluttered, clean: hallwayClean },
  'storeroom': { cluttered: storeroomCluttered, clean: storeroomClean },
};
