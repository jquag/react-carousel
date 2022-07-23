import Carousel from "./Carousel"
import classes from "./App.module.css";
import useViewPortDims from "./useViewPortDims";
import { useMemo } from "react";

interface Widget {
  id: number
  description: string
}
  
const widgets: Widget[] = [
  {id: 1, description: "Hello from widget one."},
  {id: 2, description: "Hello from widget two."},
  {id: 3, description: "Hello from widget three."},
  {id: 4, description: "Hello from widget four."},
  {id: 5, description: "Hello from widget five."},
]

function App() {
  const {width} = useViewPortDims();
  
  // Show two at a time if wide enough
  const slideGroups: Widget[][] = useMemo(() => {
    if (width >= 900) {
      // console.log('wide enough');
      const groups: Widget[][] = [];
      for (let i = 0; i < widgets.length; i = i + 2) {
        groups[i/2] = i + 1 < widgets.length ? [widgets[i], widgets[i+1]] : [widgets[i]];
      }
      return groups;
    } else {
      // console.log('not wide enough');
      return widgets.map(s => [s]);
    }
  }, [width]);

  return (
    <div className={classes.App}>
      <Carousel>
        {slideGroups.map(g => (
          <div className={classes.Slide} key={g.map(s => s.id).join('-')}>
            {g.map(s => (
              <div className={classes.Card} key={s.id}>
                <h2>Widget {s.id}</h2>
                <p>{s.description}</p>
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default App
