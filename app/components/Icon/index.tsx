import "./index.scss";
import * as React from "react";

import DOWN from "../../assets/icons/down.svg";
import PLUS from "../../assets/icons/plus.svg";
import MINUTE from "../../assets/icons/miuns.svg";

export enum IconType {
  DOWN = "down",
  PLUS = 'plus',
  MINUTE = 'minute'
}

interface Props {
  type: IconType;
}

export function Icon({ type }: Props) {
  let src: string;
  let className: string;

  switch (type) {
    case IconType.DOWN: {
      src = DOWN;
      className = IconType.DOWN;
      break;
    }
    case IconType.PLUS: {
      src = PLUS;
      className = IconType.PLUS;
      break;
    }
    case IconType.MINUTE: {
      src = MINUTE;
      className = IconType.MINUTE;
      break;
    }
  }

  return <img src={src} className={`icon icon-${className}`} alt="icon" />;
}
