import { ReactNode } from "react";

interface Props {
  children: ReactNode
}

function Card({children}: Props) {
  return (
    <div>
      {children}
    </div>
  )
}

export default Card;
