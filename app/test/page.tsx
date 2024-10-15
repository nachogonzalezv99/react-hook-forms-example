"use client";
import { Tag } from "@cecoc/ui-kit-v3";
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

export default function Page() {
  const [items, setItems] = useState<string[]>([]);
  const [positions, setPositions] = useState<number[]>([]);
  const [hover, setHover] = useState(false);
  const gap = 8; // Gap between items
  const [animateKey, setAnimateKey] = useState(0);

  // Mutable reference to the items
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const calculatePositions = () => {
      const newPositions: number[] = [];
      let topOffset = 0;

      itemRefs.current.forEach((item) => {
        if (item) {
          const itemHeight = item.offsetHeight;
          newPositions.push(topOffset);
          topOffset += itemHeight + gap;
        }
      });

      setPositions(newPositions);
    };

    // Calculate positions after the component mounts and whenever items change
    calculatePositions();

    // Optional: Add event listener for window resize if needed
    window.addEventListener("resize", calculatePositions);
    return () => window.removeEventListener("resize", calculatePositions);
  }, [hover, items]);

  const isSecondAndCollapsed = (index: number) =>
    index === 1 && items.length < 3;

  const getTopPosition = (index: number) => {
    if (hover) return positions[index];
    if (isSecondAndCollapsed(index)) return positions[index];
    return 0;
  };

  const getOpacity = (index: number) => {
    if (index === 0 || hover || isSecondAndCollapsed(index)) return 1;
    return 0;
  };

  return (
    <div>
      <div
        className={styles.absoluteContainer}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          key={animateKey} // Unique key to force re-render
          className={styles.absoluteItem}
          style={{
            height: "20px",
            width: "100%",
            top: itemRefs.current[0]?.offsetHeight! - 12,
            transition: "0.3s ease hover",
            opacity: hover || items.length < 3 ? 0 : 1,
          }}
        />
        {items.length > 2 && !hover && (
          <Tag
            text={items.length}
            style={{
              position: "absolute",
              transition: "0.3s ease all",
              top: itemRefs.current[0]?.offsetHeight! + 12,
            }}
          />
        )}
        {items
          .slice()
          .reverse()
          .map((item, index) => (
            <div
              key={item}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={styles.absoluteItem}
              style={{
                top: getTopPosition(index),
                opacity: getOpacity(index),
                zIndex: items.length - index,
              }}
            >
              {item}
            </div>
          ))}
      </div>

      <div style={{ marginTop: "200px" }}>
        <button
          onClick={() => {
            setItems((prev) => [
              ...prev,
              `Notificación número ${items.length}`,
            ]);
            if (items.length > 1) setAnimateKey((prevKey) => prevKey + 1);
          }}
        >
          Add short
        </button>
        <button
          onClick={() => {
            setItems((prev) => [
              ...prev,
              `Notificación número ${items.length}: Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam reiciendis dicta eligendi? Optio exercitationem aliquam accusantium`,
            ]);
            if (items.length > 1) setAnimateKey((prevKey) => prevKey + 1);
          }}
        >
          Add long
        </button>
        <button
          onClick={() =>
            setItems((prev) => prev.filter((_, i) => i !== prev.length - 1))
          }
        >
          Delete
        </button>
      </div>
    </div>
  );
}
