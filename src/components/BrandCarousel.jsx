import { useEffect, useRef, useState } from "react";
import "./BrandCarousel.css";

const GAP = 25;

/**
 * Infinite horizontal carousel for picking a car brand.
 * Interaction model (unchanged from the original design):
 *  - click the left third of the rail  -> step backward
 *  - click the right third of the rail -> step forward
 *  - click the center                  -> lock in the focused brand
 *  - mouse wheel                       -> scroll the rail
 *
 * Infinite looping is achieved by rendering the brand list three times
 * and silently snapping the scroll position back to the middle copy
 * whenever the user scrolls past it — this matches the previous vanilla
 * implementation but expressed with React refs instead of getElementById.
 */
export default function BrandCarousel({ brands, onSelectBrand, selectedBrand }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const scrollResetTimer = useRef(null);

  const [focusedBrand, setFocusedBrand] = useState(null);
  const [cardWidth, setCardWidth] = useState(185);

  const tripledBrands = [...brands, ...brands, ...brands];
  const setIndexOffset = brands.length; // index of the middle copy's first item

  // Measure card width and center the rail on the middle copy after layout.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || brands.length === 0) return;

    const firstCard = track.querySelector(".brand-card");
    if (firstCard) {
      const measured = firstCard.getBoundingClientRect().width + GAP;
      setCardWidth(measured);
      track.scrollLeft = measured * setIndexOffset;
    }

    updateFocus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brands]);

  function updateFocus() {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const containerCenter = container.getBoundingClientRect().left + container.offsetWidth / 2;
    let closestBrand = null;
    let minDistance = Infinity;

    track.querySelectorAll(".brand-card").forEach((card) => {
      const cardCenter = card.getBoundingClientRect().left + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestBrand = card.getAttribute("data-brand");
      }
    });

    setFocusedBrand(closestBrand);
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;

    const total = cardWidth * brands.length;
    if (track.scrollLeft <= 2) {
      track.scrollLeft = total;
    } else if (track.scrollLeft >= track.scrollWidth - track.offsetWidth - 2) {
      track.scrollLeft = total;
    }
    updateFocus();

    // After scrolling settles, gently re-center on the focused card.
    clearTimeout(scrollResetTimer.current);
    scrollResetTimer.current = setTimeout(() => {
      const focused = track.querySelector(".brand-card.is-focused");
      if (focused) {
        track.scrollTo({
          left: focused.offsetLeft + focused.offsetWidth / 2 - track.offsetWidth / 2,
          behavior: "smooth",
        });
      }
    }, 150);
  }

  function handleWheel(event) {
    event.preventDefault();
    const dir = document.documentElement.getAttribute("dir") === "rtl" ? -1 : 1;
    trackRef.current.scrollLeft += event.deltaY * 0.7 * dir;
  }

  function handleContainerClick(event) {
    const container = containerRef.current;
    const track = trackRef.current;
    const rect = container.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    const isRtl = document.documentElement.getAttribute("dir") === "rtl";

    if (clickX < width * 0.35) {
      track.scrollBy({ left: isRtl ? cardWidth : -cardWidth, behavior: "smooth" });
    } else if (clickX > width * 0.65) {
      track.scrollBy({ left: isRtl ? -cardWidth : cardWidth, behavior: "smooth" });
    } else if (focusedBrand) {
      onSelectBrand(focusedBrand);
      const focusedCard = track.querySelector(".brand-card.is-focused");
      if (focusedCard) {
        track.scrollTo({
          left: focusedCard.offsetLeft + focusedCard.offsetWidth / 2 - track.offsetWidth / 2,
          behavior: "smooth",
        });
      }
    }
  }

  return (
    <div
      className="brand-carousel"
      ref={containerRef}
      onClick={handleContainerClick}
      onWheel={handleWheel}
    >
      <div className="brand-carousel__track no-scrollbar" ref={trackRef} onScroll={handleScroll}>
        {tripledBrands.map((brand, index) => (
          <div
            key={`${brand}-${index}`}
            className={`brand-card ${focusedBrand === brand ? "is-focused" : ""} ${
              selectedBrand === brand ? "is-selected" : ""
            }`}
            data-brand={brand}
          >
            <span>{brand}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
