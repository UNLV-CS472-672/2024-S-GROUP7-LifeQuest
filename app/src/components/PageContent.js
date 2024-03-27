import { useMemo } from "react";
import styles from "./PageContent.module.css";

const PageContent = ({
  pageContentHeight,
  pageContentPosition,
  pageContentTop,
  pageContentLeft,
}) => {
  const pageContentStyle = useMemo(() => {
    return {
      height: pageContentHeight,
      position: pageContentPosition,
      top: pageContentTop,
      left: pageContentLeft,
    };
  }, [pageContentHeight, pageContentPosition, pageContentTop, pageContentLeft]);

  return (
    <section
      className={styles.pageContent}
      id="page_content"
      style={pageContentStyle}
      data-testid="page-content" // testing purpose

    />
  );
};

export default PageContent;
