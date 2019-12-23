import "./index.scss";
import * as React from "react";

import ADJUSTMENT from "../../assets/icons/adjustment.svg";
import COLORS from "../../assets/icons/colors.svg";
import CROP from "../../assets/icons/crop.svg";
import DOWN from "../../assets/icons/down.svg";
import EXPORT from "../../assets/icons/export.svg";
import MINUS from "../../assets/icons/minus.svg";
import PLUS from "../../assets/icons/plus.svg";

export enum IconType {
  ADJUSTMENT = "adjustment",
  COLORS = "colors",
  CROP = "crop",
  DOWN = "down",
  EXPORT = "EXPORT",
  MINUS = "minus",
  PLUS = "plus"
}

export enum IconSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large"
}

interface Props {
  type: IconType;
  size?: IconSize;
}

export function Icon({ type, size = IconSize.MEDIUM }: Props) {
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
  }

  return (
    <img
      src={src}
      className={`icon icon-${className} icon-size-${size}`}
      alt="icon"
    />
  );
}
