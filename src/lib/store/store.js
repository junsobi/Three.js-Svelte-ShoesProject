import { writable } from "svelte/store";

export const loaferData = writable(null);
export const selectedObjectName = writable("Leather");
export const selectedColor = writable(null);
export const selectedMaterial = writable(null);
export const hoverPart = writable("");

export const orderProgress = writable([]);
export const backOrderProgress = writable([]);

export const initialParts = writable({
  Leather: { texture: null, color: null },
  Cut_Band: { texture: null, color: null },
  Topline: { texture: null, color: null },
  Back_Leather: { texture: null, color: null },
  Sole_: { texture: null, color: null },
  Innersole: { texture: null, color: null },
  Inner_fabric: { texture: null, color: null },
});
export const finalParts = writable({
  Leather: { texture: null, color: null, alt: "전체가죽" },
  Cut_Band: { texture: null, color: null, alt: "밴딩" },
  Topline: { texture: null, color: null, alt: "발목" },
  Back_Leather: { texture: null, color: null, alt: "뒷부분" },
  Sole_: { texture: null, color: null, alt: "솔" },
  Innersole: { texture: null, color: null, alt: "안쪽솔" },
  Inner_fabric: { texture: null, color: null, alt: "안섬유" },
});
