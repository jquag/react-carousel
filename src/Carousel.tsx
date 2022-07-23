import { Children, ReactNode, useCallback, useEffect, useState } from "react";
import classes from './Carousel.module.css';

interface Props {
  children: ReactNode[] | ReactNode,
}

function Carousel({children}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [useTransitions, setUseTransition] = useState(true);

  const [visibleItems, setVisibleItems] = useState([] as ReactNode[]);

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
        }, 50);
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
        }, 200);
      }, 50)
    } else {
      setActiveIndex(activeIndex - 1);
    }
  }, [activeIndex]);

  const left = -100 * Math.min(activeIndex, (visibleItems.length - 1));

  useEffect(() => {
    setVisibleItems(Children.toArray(children));
  }, [children]);

  return (
    <div>
      <div className={classes.Carousel}>
        <button onClick={handlePrev}>{'<'}</button>
        <div className={classes.ViewPort}>
          <div className={`${classes.Slides} ${useTransitions ? '' : classes.NoTransition}`} style={{left: `${left}%`}}>
            {visibleItems.map((item, i) => (
              <div className={classes.Slide} key={i}>{item}</div>
            ))}
          </div>
        </div>
        <button onClick={handleNext}>{'>'}</button>
      </div>
      <div className={classes.Pages}>
        {Children.map(children, (_c, i) => (
          <div className={`${classes.Page} ${activeIndex === i ? classes.active : ''}`} key={i}>
            <button onClick={() => setActiveIndex(i)}/>
          </div>
        ))}
      </div>
    </div>
  )

}

export default Carousel;
