import { c as create_ssr_component, b as createEventDispatcher, e as escape, d as add_attribute, a as subscribe, f as each, v as validate_component } from "../../chunks/index2.js";
import { w as writable } from "../../chunks/index.js";
import * as THREE from "three";
const app = "";
const selectedObjectName = writable("Leather");
const selectedColor = writable(null);
const selectedMaterial = writable(null);
const hoverPart = writable("");
const initialParts = writable({
  Leather: { texture: null, color: null },
  Cut_Band: { texture: null, color: null },
  Topline: { texture: null, color: null },
  Back_Leather: { texture: null, color: null },
  Sole_: { texture: null, color: null },
  Innersole: { texture: null, color: null },
  Inner_fabric: { texture: null, color: null }
});
const finalParts = writable({
  Leather: { texture: null, color: null, alt: "전체가죽" },
  Cut_Band: { texture: null, color: null, alt: "밴딩" },
  Topline: { texture: null, color: null, alt: "발목" },
  Back_Leather: { texture: null, color: null, alt: "뒷부분" },
  Sole_: { texture: null, color: null, alt: "솔" },
  Innersole: { texture: null, color: null, alt: "안쪽솔" },
  Inner_fabric: { texture: null, color: null, alt: "안섬유" }
});
const ChangeableParts_svelte_svelte_type_style_lang = "";
const MATERIALS = [
  { name: "leather1", image: "/images/leather1.jpg", alt: "푸른가죽" },
  { name: "leather2", image: "/images/leather2.jpg", alt: "갈색가죽" },
  { name: "leather3", image: "/images/leather3.jpg", alt: "뱀가죽" },
  { name: "leather4", image: "/images/leather4.jpg", alt: "회색가죽" },
  {
    name: "leather5",
    image: "/images/leather5.jpg",
    alt: "노란가죽"
  },
  { name: "Suede", image: "/images/leather6.png", alt: "스웨이드" }
];
const ChosenPart_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: ".chosenContainer.svelte-7gi1u5{height:72px}",
  map: null
};
const ChosenPart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let parts = {};
  let selectedAltName = "";
  let selectedObjectIndex = 0;
  let partsOrder = [];
  let iconSrc = "/icon/down-arrow.svg";
  finalParts.subscribe((value) => {
    parts = value;
    partsOrder = Object.keys(parts);
  });
  selectedObjectName.subscribe((value) => {
    selectedAltName = parts[value]?.alt || "";
    selectedObjectIndex = partsOrder.indexOf(value);
  });
  $$result.css.add(css$4);
  {
    {
      iconSrc = "/icon/down-arrow.svg";
    }
  }
  return `<div class="flex w-full md:p-5 p-1 text-lg justify-between items-center text-black chosenContainer svelte-7gi1u5"><div class="flex pl-2 md:gap-24 gap-4 w-2/6 md:w-1/4 controlButton"><button class="w-9 h-9 rounded-full border-2 border-grey-500 button"><img class="w-6 mx-auto" src="/icon/undo.png" alt="취소"></button>
    <button class="w-9 h-9 rounded-full border-2 border-grey-500 button"><img class="w-6 mx-auto" src="/icon/redo.png" alt="취소"></button></div>
  <div class="flex justify-between md:w-auto w-3/6 gap-4 md:gap-48 directionControl"><button><img class="w-6" src="/icon/left-arrow.svg" alt="왼쪽"></button>

    <div class="flex items-center gap-8"><div class="text-center md:text-lg text-sm whitespace-nowrap overflow-visible">${escape(selectedAltName)}</div>
      <p class="md:text-base text-sm text-center text-gray-400">${escape(selectedObjectIndex + 1)}/${escape(partsOrder.length)}</p></div>
    <button><img class="w-6" src="/icon/right-arrow.svg" alt="오른쪽"></button></div>

  <div class="flex pr-2 md:gap-24 gap-8 md:w-1/4 w-1/6 justify-end sizeControl"><button class="w-9 h-9 rounded-full border-2 border-grey-500 button"><img class="w-4 mx-auto"${add_attribute("src", iconSrc, 0)} alt="축소"></button></div>
</div>`;
});
const colors = [
  { name: "Black", code: "000" },
  { name: "White", code: "fff" },
  { name: "Gray", code: "9ca3af" },
  { name: "Offwhite", code: "fef3c7" },
  { name: "Beige", code: "eab308" },
  { name: "Red", code: "ef4444" },
  { name: "Navy", code: "1e3a8a" },
  { name: "Blue", code: "2563eb" },
  { name: "Sky-blue", code: "dbeafe" },
  { name: "Green", code: "14532d" },
  { name: "Purple", code: "9333ea" },
  { name: "Pink", code: "fce7f3" },
  { name: "Orange", code: "fb923c" },
  { name: "Yellow", code: "facc15" },
  { name: "Neon-Yello", code: "fef08a" },
  { name: "Neon-Green", code: "a3e635" }
];
const ColorChoice_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".carousel.svelte-gri0eo{scroll-behavior:smooth}",
  map: null
};
const ColorChoice = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $finalParts, $$unsubscribe_finalParts;
  let $initialParts, $$unsubscribe_initialParts;
  let $selectedObjectName, $$unsubscribe_selectedObjectName;
  $$unsubscribe_finalParts = subscribe(finalParts, (value) => $finalParts = value);
  $$unsubscribe_initialParts = subscribe(initialParts, (value) => $initialParts = value);
  $$unsubscribe_selectedObjectName = subscribe(selectedObjectName, (value) => $selectedObjectName = value);
  let part;
  let initColor;
  let finalColor;
  let carousel;
  $$result.css.add(css$3);
  {
    {
      part = $selectedObjectName;
      if (part in $initialParts && $initialParts[part].color !== void 0) {
        initColor = $initialParts[part].color;
      }
      if (part in $finalParts && $finalParts[part].color !== void 0) {
        finalColor = $finalParts[part].color;
      }
    }
  }
  {
    {
      console.log(finalColor);
    }
  }
  $$unsubscribe_finalParts();
  $$unsubscribe_initialParts();
  $$unsubscribe_selectedObjectName();
  return `<div class="flex flex-nowrap lg:justify-center w-full overflow-x-auto px-4 carousel svelte-gri0eo"${add_attribute("this", carousel, 0)}><div class="color-container m-3 relative"><button><div class="w-8 h-8 mb-3 rounded-full border border-gray-500" style="${"background-color: #" + escape(initColor, true)}"></div>
      ${finalColor === null || finalColor === initColor ? `<div class="ring-2 ring-gray-500 absolute top-0 left-0 w-8 h-8 rounded-full"></div>
        <p class="text-xs text-gray-600 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap overflow-visible">Default
        </p>` : ``}</button></div>

  ${each(colors, (color) => {
    return `<div class="color-container m-3 relative"><button><div class="w-8 h-8 mb-2 rounded-full border border-gray-500" style="${"background-color: #" + escape(color.code, true)}"></div></button>
      ${finalColor === color.code ? `<div class="ring-2 ring-gray-500 absolute top-0 left-0 w-8 h-8 rounded-full"></div>
        <p class="text-xs text-gray-600 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap overflow-visible">${escape(color.name)}
        </p>` : ``}
    </div>`;
  })}
</div>`;
});
const MaterialChoice_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".carousel.svelte-cpz1oa{scroll-behavior:smooth}.material-button.svelte-cpz1oa{width:152px;height:36px;border-radius:18px;background-color:rgba(0, 0, 0, 0.3);background-blend-mode:multiply;background-position:center;background-repeat:no-repeat;background-size:cover;overflow:hidden;flex-shrink:0}",
  map: null
};
const MaterialChoice = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_selectedObjectName;
  $$unsubscribe_selectedObjectName = subscribe(selectedObjectName, (value) => value);
  let carousel;
  $$result.css.add(css$2);
  $$unsubscribe_selectedObjectName();
  return `<div class="flex flex-nowrap lg:justify-center w-full pb-2 overflow-x-auto px-4 carousel svelte-cpz1oa"${add_attribute("this", carousel, 0)}>${each(MATERIALS, (material) => {
    return `<button class="material-button m-1 flex items-center justify-center text-sm svelte-cpz1oa" style="${"background-image: url(" + escape(material.image, true) + ");"}"><p class="text-white">${escape(material.alt)}</p>
    </button>`;
  })}
</div>`;
});
const PaymentModal_svelte_svelte_type_style_lang = "";
const ControlBox_svelte_svelte_type_style_lang = "";
const ChoiceSection_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".choiceSection.svelte-1cz305{border:1px solid white}",
  map: null
};
const ChoiceSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  $$result.css.add(css$1);
  return `<div class="z-50 w-full h-full bg-white choiceSection svelte-1cz305">${validate_component(ChosenPart, "ChosenPart").$$render($$result, {}, {}, {})}
  ${validate_component(MaterialChoice, "MaterialChoice").$$render($$result, {}, {}, {})}
  ${validate_component(ColorChoice, "ColorChoice").$$render($$result, {}, {}, {})}
  
</div>`;
});
function resetHighlightMaterial(object) {
  if (object.material && object.userData.originalMaterial) {
    object.material = object.userData.originalMaterial;
  }
}
function resetHighlightColor(object) {
  if (object.material && object.userData.originalColor) {
    object.material.color = object.userData.originalColor;
  }
}
function removeHighlight(loafer) {
  if (loafer) {
    loafer.traverse(function(child) {
      resetHighlightMaterial(child);
      resetHighlightColor(child);
    });
  }
}
const Loafers = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_selectedObjectName;
  let $$unsubscribe_selectedMaterial;
  let $$unsubscribe_selectedColor;
  let $$unsubscribe_hoverPart;
  $$unsubscribe_selectedObjectName = subscribe(selectedObjectName, (value) => value);
  $$unsubscribe_selectedMaterial = subscribe(selectedMaterial, (value) => value);
  $$unsubscribe_selectedColor = subscribe(selectedColor, (value) => value);
  $$unsubscribe_hoverPart = subscribe(hoverPart, (value) => value);
  let loafer;
  new THREE.Color("#00FF00");
  {
    {
      let applyHighlight = function() {
        {
          removeHighlight(loafer);
        }
      };
      applyHighlight();
    }
  }
  $$unsubscribe_selectedObjectName();
  $$unsubscribe_selectedMaterial();
  $$unsubscribe_selectedColor();
  $$unsubscribe_hoverPart();
  return `<canvas id="canvas"></canvas>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".title.svelte-16uq0hp{position:fixed;top:4%;left:4%;color:#2b2b2b;font-size:24px;letter-spacing:24px;text-shadow:8px 8px 8px rgba(0, 0, 0, 0.5)}@media screen and (min-width: 768px){.title.svelte-16uq0hp{font-size:48px;letter-spacing:48px}}.pallete.svelte-16uq0hp{height:72px;position:fixed;bottom:0;z-index:1;transition:height 0.5s ease-in-out}.pallete.expanded.svelte-16uq0hp{height:224px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  finalParts.subscribe((value) => {
    Object.keys(value).length;
    Object.entries(value).filter(([part, data]) => data.texture !== null || data.color !== null).length;
    Object.entries(value).filter(([part, data]) => data.texture === null && data.color === null).map(([part, data]) => data.alt);
  });
  $$result.css.add(css);
  return `${``}

<div class="title svelte-16uq0hp">WAGKI</div>
<button class="fixed right-8 top-8 w-24 h-10 text-sm font-bold border text-black bg-white rounded-full">Done</button>

${validate_component(Loafers, "Loafers").$$render($$result, {}, {}, {})}
<div class="${["pallete w-full svelte-16uq0hp", "expanded"].join(" ").trim()}">${validate_component(ChoiceSection, "ChoiceSection").$$render($$result, {}, {}, {})}
</div>`;
});
export {
  Page as default
};
