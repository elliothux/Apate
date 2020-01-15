import "./index.scss";
import * as React from "react";

import ADJUSTMENT from "assets/icons/adjustment.svg";
import COLORS from "assets/icons/colors.svg";
import CROP from "assets/icons/crop.svg";
import DOWN from "assets/icons/down.svg";
import EXPORT from "assets/icons/export.svg";
import MINUS from "assets/icons/minus.svg";
import PLUS from "assets/icons/plus.svg";
import HISTOGRAM from "assets/icons/histogram.svg";
import EXPAND from "assets/icons/expand.svg";
import UNEXPAND from "assets/icons/unexpand.svg";
import ROTATE from "assets/icons/rotate.svg";
import FLIP from "assets/icons/flip.svg";
import ASPECT from "assets/icons/aspect.svg";
import RESET from "assets/icons/reset.svg";

export enum IconType {
  ADJUSTMENT = "adjustment",
  COLORS = "colors",
  CROP = "crop",
  DOWN = "down",
  EXPORT = "EXPORT",
  MINUS = "minus",
  PLUS = "plus",
  HISTOGRAM = "histogram",
  EXPAND = "expand",
  UNEXPAND = "unexpand",
  ROTATE = "rotate",
  FLIP = "flip",
  ASPECT = "aspect",
  RESET = "reset"
}

export enum IconSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large"
}

interface Props {
  type: IconType;
  size?: IconSize;
  onClick?: Function;
  rotate?: number;
}

export function Icon({ type, size = IconSize.MEDIUM, rotate }: Props) {
  let src: string;
  let className: string;

  switch (type) {
    case IconType.ADJUSTMENT: {
      src = ADJUSTMENT;
      className = IconType.ADJUSTMENT;
      break;
    }
    case IconType.COLORS: {
      src = COLORS;
      className = IconType.COLORS;
      break;
    }
    case IconType.CROP: {
      src = CROP;
      className = IconType.CROP;
      break;
    }
    case IconType.DOWN: {
      src = DOWN;
      className = IconType.DOWN;
      break;
    }
    case IconType.EXPORT: {
      src = EXPORT;
      className = IconType.EXPORT;
      break;
    }
    case IconType.MINUS: {
      src = MINUS;
      className = IconType.MINUS;
      break;
    }
    case IconType.PLUS: {
      src = PLUS;
      className = IconType.PLUS;
      break;
    }
    case IconType.HISTOGRAM: {
      src = HISTOGRAM;
      className = IconType.HISTOGRAM;
      break;
    }
    case IconType.EXPAND: {
      src = EXPAND;
      className = IconType.EXPAND;
      break;
    }
    case IconType.UNEXPAND: {
      src = UNEXPAND;
      className = IconType.UNEXPAND;
      break;
    }
    case IconType.ROTATE: {
      src = ROTATE;
      className = IconType.ROTATE;
      break;
    }
    case IconType.FLIP: {
      src = FLIP;
      className = IconType.FLIP;
      break;
    }
    case IconType.ASPECT: {
      src = ASPECT;
      className = IconType.ASPECT;
      break;
    }
    case IconType.RESET: {
      src = RESET;
      className = IconType.RESET;
      break;
    }
  }

  return (
    <img
      src={src}
      className={`icon icon-${className} icon-size-${size}`}
      alt="icon"
      style={{ transform: `rotate(${rotate || 0}deg)` }}
    />
  );
}
