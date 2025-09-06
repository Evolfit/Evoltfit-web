import { useEffect, useRef } from "react";
import TypedCore from "typed.js";

export default function Typed(props) {
  const { strings = [], typeSpeed = 50, backSpeed = 25, loop = false, className = "" } = props;
  const spanRef = useRef(null);
  const typedInstanceRef = useRef(null);

  useEffect(() => {
    if (!spanRef.current) return;

    typedInstanceRef.current = new TypedCore(spanRef.current, {
      strings,
      typeSpeed,
      backSpeed,
      loop,
    });

    return () => {
      if (typedInstanceRef.current) {
        typedInstanceRef.current.destroy();
        typedInstanceRef.current = null;
      }
    };
  }, [strings, typeSpeed, backSpeed, loop]);

  return <span ref={spanRef} className={className} />;
}
