import { BorderRadius, ColorsV3 } from "@cecoc/ui-kit-v3";
import React, {
  ButtonHTMLAttributes,
  CSSProperties,
  ReactNode,
  useEffect,
  useState,
} from "react";
import styles from "./ButtonGroup.module.css";

type Size = "S" | "M";

export interface ButtonGroupProps extends ButtonHTMLAttributes<HTMLDivElement> {
  /**
   * The ButtonGroup template
   */
  template: ButtonGroupTemplate[];

  /**
   * The selected option (Id of the selected button)
   */
  selected?: string;

  /**
   * The Component size
   */
  size?: Size;

  /**
   * The selected option (Id of the selected button)
   */
  onChangeActive: (id: string) => void;

  /**
   * Id for testing propouses
   */
  dataTestId?: string;
}

export interface ButtonGroupTemplate {
  /**
   * The id for the button
   */
  id: string;

  /**
   * The text for the button
   */
  label: string;
  /**
   * Icon or Node for the left side
   */
  preffix?: ReactNode;

  /**
   * Icon or Node for the right side
   */
  suffix?: ReactNode;
}

export const ButtonGroup = ({
  template,
  selected,
  dataTestId,
  onChangeActive,
  size = "M",
  style,
}: ButtonGroupProps) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const handleHovered = (id: string) => {
    setHovered(id);
  };

  return (
    <div data-testid={dataTestId} className={styles.container} style={style}>
      {template.map((item, index) => {
        const { label, id, ...props } = item;
        let style = {};
        let nearActive = {
          left: false,
          right: false,
        };
        let nearHovered = {
          left: false,
          right: false,
        };
        if (index === 0 && index === template.length - 1) {
          style = { borderRadius: BorderRadius.XL };
        } else if (index === 0) {
          style = { borderRadius: `${BorderRadius.XL} 0 0 ${BorderRadius.XL}` };
          if (template[index + 1] && template[index + 1].id === selected) {
            nearActive = {
              left: false,
              right: true,
            };
          }
          if (template[index + 1] && template[index + 1].id === hovered) {
            nearHovered = {
              left: false,
              right: true,
            };
          }
        } else if (index === template.length - 1) {
          style = { borderRadius: `0 ${BorderRadius.XL} ${BorderRadius.XL} 0` };
          if (template[index - 1] && template[index - 1].id === selected) {
            nearActive = {
              left: true,
              right: false,
            };
          }
          if (template[index - 1] && template[index - 1].id === hovered) {
            nearHovered = {
              left: true,
              right: false,
            };
          }
        } else {
          if (template[index - 1] && template[index - 1].id === selected) {
            nearActive = {
              left: true,
              right: false,
            };
          } else if (
            template[index + 1] &&
            template[index + 1].id === selected
          ) {
            nearActive = {
              left: false,
              right: true,
            };
          }

          if (template[index - 1] && template[index - 1].id === hovered) {
            nearHovered = {
              left: true,
              right: false,
            };
          } else if (
            template[index + 1] &&
            template[index + 1].id === hovered
          ) {
            nearHovered = {
              left: false,
              right: true,
            };
          }
        }

        return (
          <ButtonBase
            size={size}
            active={selected === id}
            id={id}
            key={"ButtonBase" + index}
            style={style}
            index={index}
            nearActive={nearActive}
            totalItems={template.length}
            {...props}
            activate={() => onChangeActive(id)}
            dataTestId={`button-${index}`}
            hovered={hovered === id}
            handleHovered={handleHovered}
            nearHovered={nearHovered}
          >
            {label}
          </ButtonBase>
        );
      })}
    </div>
  );
};

ButtonGroup.displayName = "ButtonGroup";

interface ButtonBaseProps {
  /**
   * The Button id
   */
  id: string;
  /**
   * The Button status
   */
  disabled?: boolean;
  /**
   * The button size
   */
  size?: Size;
  /**
   * Icon or Node for the left side
   */
  preffix?: ReactNode;

  /**
   * Icon or Node for the right side
   */
  suffix?: ReactNode;

  /**
   * The Button width, can be either a number or a string.
   */
  width?: number | string;

  /**
   * Is active the option
   */
  active?: boolean;

  /**
   * The Button style
   */
  style?: CSSProperties;

  /**
   * The Button children
   */
  children?: ReactNode;

  /**
   * The Button onClick event
   */
  activate?: (id: string) => void;

  /**
   * The index of the button
   */
  index: number;

  /**
   * The total of items
   */
  totalItems: number;

  /**
   * The near active option
   */
  nearActive?: {
    left: boolean;
    right: boolean;
  };

  /**
   * Id for testing propouses
   */
  dataTestId?: string;

  /**
   * The hovered status
   */
  hovered: boolean;

  /**
   * Handle hovered event
   */
  handleHovered: (id: string) => void;

  /**
   * The near hovered option
   */
  nearHovered?: {
    left: boolean;
    right: boolean;
  };
}

const ButtonBase = ({
  id,
  active = false,
  disabled = false,
  preffix,
  suffix,
  size = "M",
  width = "auto",
  style,
  index,
  totalItems,
  children,
  nearActive,
  activate,
  dataTestId,
  hovered,
  handleHovered,
  nearHovered,
}: ButtonBaseProps) => {
  const [iconColor, setIconColor] = useState(ColorsV3.themeBodyText.medium);

  // Styles for the button
  const stylesButton: CSSProperties = {
    width: width,
    // minWidth: "88px",
    // display: "flex",
    // justifyContent: "center",
    // flexGrow: 1,
    // alignItems: "center",
    // boxSizing: "border-box",
    // cursor: disabled ? "not-allowed" : "pointer",
    // color: active ? ColorsV3.base.white : ColorsV3.themeBodyText.medium,
    // backgroundColor: active ? ColorsV3.mainColor.primary : ColorsV3.base.white,
    ...setBorder(index, totalItems, active, hovered, nearActive, nearHovered),
    // gap: "8px",
    // fontWeight: "500",
    ...style,
  };

  // Styles for the text inside
  const stylesText: CSSProperties = {
    userSelect: "none",
    fontSize: size == "M" ? "16px" : "14px",
  };

  useEffect(() => {
    setIconColor(active ? ColorsV3.base.white : ColorsV3.themeBodyText.medium);
  }, [disabled, active]);

  const handleOnClick = () => {
    if (!disabled && !active && activate) {
      activate(id);
    }
  };

  return (
    <div
      style={stylesButton}
      className={`${styles.button} 
      ${active ? styles.buttonActive : ""} 
      ${size === "S" ? styles.sizeS : styles.sizeM}
      ${index === 0 ? styles.buttonFirst : ""}
      ${index === totalItems - 1 ? styles.buttonLast : ""}
      ${index !== 0 && index !== totalItems - 1 ? styles.buttonMiddle : ""}
      ${hovered ? styles.buttonHovered : ""}`}
      tabIndex={0}
      onClick={handleOnClick}
      data-testid={dataTestId}
    >
      {preffix
        ? React.cloneElement(preffix as JSX.Element, {
            width: "24px",
            color: iconColor,
          })
        : ""}
      <span style={stylesText}>{children}</span>
      {suffix
        ? React.cloneElement(suffix as JSX.Element, {
            width: "24px",
            color: iconColor,
          })
        : ""}
    </div>
  );
};

/**
 * This function calculates start styles based on size
 */
function styleWithSize(size: Size): React.CSSProperties {
  switch (size) {
    case "S":
      return {
        padding: "6px 20px 6px 20px",
        lineHeight: "21px",
      };
    case "M":
      return {
        padding: "8px 25px 8px 25px",
        lineHeight: "24px",
      };
  }
}

/**
 * This function sets the border for the button
 */
function setBorder(
  index: number,
  totalItems: number,
  active: boolean,
  hovered: boolean,
  nearActive?: { left: boolean; right: boolean },
  nearHovered?: { left: boolean; right: boolean }
) {
  const normalBorder = `1.5px solid ${ColorsV3.themeBodyText.medium}`;
  const allBorders = { border: `1.5px solid ${ColorsV3.themeBodyText.medium}` };
  const noSideBorders = {
    borderTop: normalBorder,
    borderRight: "1.5px solid transparent",
    borderBottom: normalBorder,
    borderLeft: "1.5px solid transparent",
  };

  const noLeftBorder = {
    borderTop: normalBorder,
    borderRight: normalBorder,
    borderBottom: normalBorder,
    borderLeft: "1.5px solid transparent",
  };

  const noRightBorder = {
    borderTop: normalBorder,
    borderRight: "1.5px solid transparent",
    borderBottom: normalBorder,
    borderLeft: normalBorder,
  };

  if (active || hovered) {
    return {
      border: "1.5px solid transparent",
    };
  } else {
    if (index === totalItems - 1) {
      if (nearActive?.left || nearHovered?.left) {
        return noLeftBorder;
      }
      return allBorders;
    } else {
      if (nearActive?.left || nearHovered?.left) {
        return noSideBorders;
      }
      if (nearActive?.right || nearHovered?.right) {
        return noRightBorder;
      }
      return noRightBorder;
    }
  }
}
