import React, { useState } from "react";
import NavigationPanel from "../../components/NavigationPanel";
import Frame from "../../components/TopPanel";
import PageContent from "../../components/PageContent";
import styles from "./Skeleton.module.css";
import { useFontSize } from '../../contexts/FontSizeContext'; 

const Skeleton = () => {
  const { fontSize, darkMode } = useFontSize();
  const pageClassName = darkMode ? `${styles.skeleton} ${styles.darkMode}` : styles.skeleton;
  
  return (
    <div className={pageClassName} style={{ fontSize: `${fontSize}px` }} data-testid="skeleton-route">
      <NavigationPanel />
      <label className={styles.pageLabel} htmlFor="page_label">
        <div className={styles.skeletonPage}>
		  Skeleton Page
		</div>
      </label>
      <Frame />
      <PageContent
        pageContentHeight="511px"
        pageContentPosition="absolute"
        pageContentTop="178px"
        pageContentLeft="26px"
      />
    </div>
  );
};

export default Skeleton;
