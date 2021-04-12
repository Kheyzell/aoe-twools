import React, { useRef } from "react";
import { useDispatch } from "react-redux";

import GroupTechTreeComponent from "./group-tech-tree/group-tech-tree";
import { resetSelection } from "./techSlice";
import './tech-tree.css';
import { barracksTechs } from "../../constants/GroupTechTree/barracks-tech-tree.const";
import { archeryTechs } from "../../constants/GroupTechTree/archery-tech-tree.const";
import { stableTechs } from "../../constants/GroupTechTree/stable-tech-tree.const";
import { siegeTechs } from "../../constants/GroupTechTree/siege-tech-tree.const";
import { castleTechs } from "../../constants/GroupTechTree/castle-tech-tree.const";
import { blacksmithTechs } from "../../constants/GroupTechTree/blacksmith-tech-tree.const";
import { monasteryTechs } from "../../constants/GroupTechTree/monastery-tech-tree.const";
import { universityTechs } from "../../constants/GroupTechTree/university-tech-tree.const";
import { townCenterTechs } from "../../constants/GroupTechTree/town-center-tech-tree.const";
import { lumberCampTechs } from "../../constants/GroupTechTree/lumber-camp-tech-tree.const";
import { millTechs } from "../../constants/GroupTechTree/mill-tech-tree.const";
import { miningCampTechs } from "../../constants/GroupTechTree/mining-camp-tech-tree.const";
import { marketTechs } from "../../constants/GroupTechTree/market-tech-tree.const";
import { dockTechs } from "../../constants/GroupTechTree/dock-tech-tree.const";

type Props = {}
type State = {}

const TechTreeComponent: React.FC<Props> = (props, state: State) => {
  const dispatch = useDispatch();
  const scrollRef = useRef<HTMLElement>(null);

  const wheelSpeed = 3;

  const onWheel = (e: any) => {
    e.preventDefault();
    if (scrollRef && scrollRef.current) {
      const container = scrollRef.current;
      const containerScrollPosition = scrollRef.current.scrollLeft;

      container.scrollTo({
        top: 0,
        left: containerScrollPosition + e.deltaY * wheelSpeed,
      });
    }
  };

  const onResetClick = () => {
    dispatch(resetSelection())
  }

  return (
    <div className="TechTree" ref={scrollRef as React.RefObject<HTMLDivElement>} onWheel={onWheel}>
      <div className="Tools">
        <button onClick={onResetClick}> Reset </button>
      </div>
      <GroupTechTreeComponent groupTechTree={blacksmithTechs}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={barracksTechs}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={archeryTechs}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={stableTechs}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={siegeTechs}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={castleTechs}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={monasteryTechs}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={universityTechs}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={townCenterTechs}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={lumberCampTechs}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={millTechs}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={miningCampTechs}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={marketTechs}></GroupTechTreeComponent>
      <GroupTechTreeComponent groupTechTree={dockTechs}></GroupTechTreeComponent>
    </div>
  );
}

export default TechTreeComponent;