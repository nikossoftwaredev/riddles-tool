import React, { useEffect, useRef } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

interface OptimizedListProps {
  hasMore: boolean;
  loadMore: () => void;
  items: any[];
  renderItems: (items: any[]) => JSX.Element;
  style?: React.CSSProperties;
}

const OptimizedList: React.FC<OptimizedListProps> = ({
  hasMore,
  loadMore,
  items,
  renderItems,
  style,
}) => {
  const scrollRef = useRef<HTMLElement>();

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;

      const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 100 && hasMore) {
        loadMore();
      }
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loadMore, hasMore]);

  return (
    <PerfectScrollbar
      containerRef={(el) => (scrollRef.current = el)}
      style={{ height: "100%", overflow: "auto", ...style }}
    >
      {renderItems(items)}
    </PerfectScrollbar>
  );
};

export default OptimizedList;
