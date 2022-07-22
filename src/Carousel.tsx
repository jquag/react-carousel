import { Children, ReactNode, useCallback, useState } from "react";
import classes from './Carousel.module.css';

interface Props {
  children: ReactNode[],
}

function Carousel({children}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [useTransitions, setUseTransition] = useState(true);

  const [visibleItems, setVisibleItems] = useState(Children.toArray(children));

  const handleNext = useCallback(() => {
    const length = Children.count(children);
    if ((activeIndex + 1) > (length - 1)) {
      setVisibleItems([...Children.toArray(children), Children.toArray(children)[0]]);
      setActiveIndex(activeIndex + 1);
      setTimeout(() => {
        setUseTransition(false);
        setVisibleItems([...Children.toArray(children)]);
        setActiveIndex(0);
        setTimeout(() => {
          setUseTransition(true);
        }, 40);
      }, 400)
    } else {
      setActiveIndex(activeIndex + 1);
    }
  }, [activeIndex, children]);

  const handlePrev = useCallback(() => {
    if ((activeIndex - 1) < 0) {
      setVisibleItems([...Children.toArray(children), Children.toArray(children)[0]]);
      setUseTransition(false);
      setActiveIndex(Children.count(children));
      setTimeout(() => {
        setUseTransition(true);
        setActiveIndex(Children.count(children) - 1);
        setTimeout(() => {
          setVisibleItems([...Children.toArray(children)]);
        }, 400);
      }, 50)
    } else {
      setActiveIndex(activeIndex - 1);
    }
  }, [activeIndex, children]);

  return (
    <div className={classes.Container}>
      <button onClick={handlePrev}>prev</button>
      <div className={classes.Carousel}>
        <div className={`${classes.Items} ${useTransitions ? '' : classes.NoTransition}`} style={{left: `${(-100 * activeIndex)}%`}}>
          {visibleItems.map((item, i) => (
            <div className={classes.Item} key={i}>{item}</div>
          ))}
        </div>
      </div>
      <button onClick={handleNext}>next</button>
    </div>
  )

}

export default Carousel;
