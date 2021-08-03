import { mouths, eyes } from "./svg";
import { Tuple } from "types";
/**
 * Converts SVG to Blob URL
 * @param {string} svg - SVG you want to turn into Blob URL
 * @returns {string} Object URL of Blob
 */
 export const convertInlineSVGToBlobURL = (svg: string) => {
  const blob = new Blob([svg], { type: "image/svg+xml" });
  return URL.createObjectURL(blob);
};

/**
 * Removes background from Aavegotchi SVG
 * @param {string} svg - SVG you want to customise
 * @returns {string} Returns customised SVG
 */
export const removeBG = (svg: string) => {
  const styledSvg = svg.replace("<style>", "<style>.gotchi-bg{display: none}");
  return styledSvg;
};

/**
 * Removes shadow from Aavegotchi SVG
 * @param {string} svg - SVG you want to customise
 * @returns {string} Returns customised SVG
 */
 export const removeShadow = (svg: string) => {
  const styledSvg = svg.replace("<style>", "<style>.gotchi-shadow{display: none}");
  return styledSvg;
};

/**
 * Adds Keyframe animation to SVG. (NOT TO BE USED IN IN GAME SPRITESHEET)
 * @param {string} svg - SVG you want to customise
 * @returns {string} Returns customised SVG
 */
export const bounceAnimation = (svg: string) => {
  const style = `
    @keyframes downHands {
      from {
        --hand_translateY: -4px;
      }
      to {
        --hand_translateY: -3.5px;
      }
    }
    @keyframes up {
      from {
        transform: translate(0px, 0);
      }
      to {
        transform: translate(0px, -1px);
      }
    }
    @keyframes down {
      from {
        transform: translate(0px, 0);
      }
      to {
        transform: translate(0px, 1px);
      }
    }
    svg {
      animation-name:down;
      animation-duration:1s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      animation-timing-function: steps(1);
    }
    .gotchi-shadow {
      animation: up 1s infinite linear steps(2);
      animation-name:up;
      animation-duration:1s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      animation-timing-function: steps(2);
    }
    .gotchi-wearable {
      animation-name:down;
      animation-duration:1s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      animation-timing-function: steps(1);
    }
    .gotchi-handsDownClosed, .gotchi-handsUp, .gotchi-handsDownOpen, .gotchi-handsDownClosed, .gotchi-body, .gotchi-eyeColor, .gotchi-collateral, .gotchi-cheek, .gotchi-primary-mouth, .gotchi-wearable, .gotchi-sleeves   {
      animation-name:down;
      animation-duration:1s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      animation-timing-function: steps(2);
    }
    .wearable-hand {
      animation-name:downHands !important;
      animation-duration:1s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      animation-timing-function: steps(2);
    }
  `;
  const styledSvg = svg.replace("<style>", `<style>${style}`);
  return styledSvg;
};


/**
 * Adds SVG styling to Aavegotchi to raise its arms
 * @param {string} svg - SVG you want to customise
 * @param {{left?: number, right?: number}} arms - Wearable id of arms for unique animations 
 * @returns {string} Returns customised SVG
 */
export const raiseHands = (svg: string, arms?: {left?: number, right?: number}) => {
  const leftArm = arms?.left === 201 ? `
      .wearable-hand-left {
        transform: translateY(calc(14px + var(--hand_translateY, -4px))) scaleY(-1);
        transform-origin: 50% 50%;
      }
    ` : ''
    const rightArm = arms?.right === 201 ? `
      .wearable-hand-right {
        transform: translateY(calc(14px + var(--hand_translateY, -4px))) scaleY(-1);
        transform-origin: 50% 50%;
      }
    ` : ``

  const style = `
    .gotchi-handsDownClosed {
      display:none !important;
    }
    .gotchi-handsDownOpen {
      display:none !important;
    }
    .gotchi-handsUp {
      display:block !important;
    }
    .gotchi-sleeves {
      display:none !important;
    }
    .gotchi-sleeves-up {
      display:block !important;
    }
    .wearable-hand {
      transform: translateY(var(--hand_translateY, -4px));
    }
    ${leftArm}
    ${rightArm}
  `;

  const styledSvg = svg.replace("<style>", `<style>${style}`);
  return styledSvg;
};

/**
 * Adds SVG styling to Aavegotchi so it appears to float higher
 * @param {string} svg - SVG you want to customise
 * @returns {string} Returns customised SVG
 */
export const addIdleUp = (svg: string): string => {
  const styledSvg = svg.replace(
    "<style>",
    "<style>.gotchi-shadow {transform: translateY(1px);}.gotchi-wearable,.gotchi-handsDownClosed,.gotchi-handsUp,.gotchi-handsDownOpen,.gotchi-handsDownClosed,.gotchi-body,.gotchi-eyeColor,.gotchi-collateral,.gotchi-cheek,.gotchi-primary-mouth,.gotchi-wearable,.gotchi-sleeves {transform: translateY(-1px);}"
  );
  return styledSvg;
};

interface ReplaceEyes {
  target: "eyes";
  replaceSvg: keyof typeof eyes;
}

interface ReplaceMouth {
  target: "mouth";
  replaceSvg: keyof typeof mouths;
}

type ReplaceElement = ReplaceEyes | ReplaceMouth;

/**
 * Replaces a layer in the Aavegotchi SVG with custom SVG data
 * @param {string} svg - SVG you want to customise
 * @param {ReplaceElement} element - target of element you want to replace + element you want to replace it with
 * @returns {string} Returns customised SVG
 */
export function replaceParts(svg: string, element: ReplaceElement) {
  const doc = document.createDocumentFragment();
  const wrapper = document.createElement("svg");
  wrapper.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  wrapper.setAttribute("viewbox", "0 0 64 64");
  wrapper.innerHTML = svg;
  doc.appendChild(wrapper);

  const targetClass =
    element.target === "eyes" ? "g.gotchi-eyeColor" : "g.gotchi-primary-mouth";
  const textnodes = doc.querySelectorAll(targetClass);

  textnodes.forEach(function (txt) {
    txt.innerHTML =
      element.target === "eyes"
        ? eyes[element.replaceSvg]
        : mouths[element.replaceSvg];
    //txt.parentNode?.replaceChild(el, txt);
  });
  const div = document.createElement("svg");
  div.appendChild(doc);
  return div.innerHTML;
}


export type CustomiseOptions = {
  removeBg?: boolean,
  eyes?: keyof typeof eyes,
  mouth?: keyof typeof mouths,
  animate?: boolean,
  armsUp?: boolean,
  removeShadow?: boolean;
}

/**
 * Customise Aavegotchi SVG
 * @param {string} svg - SVG you want to customise
 * @param {CustomiseOptions} options - Properties you want to change
 * @param {Tuple<number, 16>} equipped - Equipped wearables (Only necessary for raised mechanical arms)
 * @returns {string} Returns customised SVG
 */
export const customiseSvg = (svg: string, options: CustomiseOptions, equipped?: Tuple<number, 16>) => {
  let styledSvg = svg;
  (Object.keys(options) as Array<keyof typeof options>).map((option) => {
    const value = options[option];
    if (value) {
      switch (option) {
        case 'removeBg':
          return styledSvg = removeBG(styledSvg);
        case 'eyes':
          return styledSvg = replaceParts(styledSvg, {target: option, replaceSvg: value as keyof typeof eyes});
        case 'mouth':
          return styledSvg = replaceParts(styledSvg, {target: option, replaceSvg: value as keyof typeof mouths});
        case 'animate':
          return styledSvg = bounceAnimation(styledSvg);
        case 'armsUp':
          return styledSvg = raiseHands(styledSvg, equipped ? {left: equipped[4], right: equipped[5]} : undefined);
        case 'removeShadow':
          return styledSvg = removeShadow(styledSvg);
        default:
          return styledSvg;
      }
    }
  })
  return styledSvg;
}
