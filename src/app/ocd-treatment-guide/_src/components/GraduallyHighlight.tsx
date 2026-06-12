// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const GraduallyHighlight = () => {
    const { t } = useTranslation("ocd-treatment-guide");
      const ref = useRef<HTMLSpanElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={`highlight-gradually ${animate ? "animate" : ""}`}
    >
      {t("gradually")}</span>
  );
};

export default GraduallyHighlight;
