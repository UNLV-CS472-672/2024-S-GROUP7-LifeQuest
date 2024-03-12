import { useMemo } from "react";
import styles from "./BackButtonIcon.module.css";

const BackButtonIcon = ({
  groupIconWidth,
  groupIconHeight,
  groupIconPosition,
  groupIconTop,
  groupIconRight,
  groupIconBottom,
  groupIconLeft,
  groupIconMaxHeight,
}) => {
  const groupIconStyle = useMemo(() => {
    return {
      width: groupIconWidth,
      height: groupIconHeight,
      position: groupIconPosition,
      top: groupIconTop,
      right: groupIconRight,
      bottom: groupIconBottom,
      left: groupIconLeft,
      maxHeight: groupIconMaxHeight,
    };
  }, [
    groupIconWidth,
    groupIconHeight,
    groupIconPosition,
    groupIconTop,
    groupIconRight,
    groupIconBottom,
    groupIconLeft,
    groupIconMaxHeight,
  ]);

  return (
    <img
      className={styles.groupIcon}
      alt=""
      src="/group.svg"
      style={groupIconStyle}
    />
  );
};

export default BackButtonIcon;
