import { writable } from "svelte/store";

export const loaferData = writable(null);
export const selectedObjectName = writable("Leather");
export const selectedColor = writable(null);
export const selectedMaterial = writable(null);
export const hoverPart = writable("");

export const orderProgress = writable([]);
export const currentPosition = writable(0);
export const undoing = writable(false);
export const backOrderProgress = writable([]);

export const initialParts = writable({
  Leather: { texture: "leather2", color: null },
  Cut_Band: { texture: "leather2", color: null },
  Topline: { texture: "leather2", color: null },
  Back_Leather: { texture: "leather2", color: null },
  Sole_: { texture: "leather2", color: null },
  Innersole: { texture: "leather2", color: null },
  Inner_fabric: { texture: "leather2", color: null },
});
export const finalParts = writable({
  Leather: { texture: "leather2", color: null, alt: "전체가죽" },
  Cut_Band: { texture: "leather2", color: null, alt: "밴딩" },
  Topline: { texture: "leather2", color: null, alt: "발목" },
  Back_Leather: { texture: "leather2", color: null, alt: "뒷부분" },
  Sole_: { texture: "leather2", color: null, alt: "솔" },
  Innersole: { texture: "leather2", color: null, alt: "안쪽솔" },
  Inner_fabric: { texture: "leather2", color: null, alt: "안섬유" },
});

export const cameraPosition = writable({
  x: 4,
  y: 8,
  z: 5,
});
