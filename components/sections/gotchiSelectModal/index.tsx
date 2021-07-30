import { useState } from "react";
import { GotchiSVG, Modal } from "components/ui";
import { useAavegotchi } from "context/AavegotchiContext";
import * as Styled from "./styles";
import { Aavegotchi } from "types";

interface Props {
  onHandleClose: () => void;
}

export const GotchiSelectModal = ({ onHandleClose }: Props) => {
  const {
    state: { usersAavegotchis, selectedAavegotchiIndex },
    dispatch,
  } = useAavegotchi();
  const [hoverIndex, setHoverIndex] = useState<number | undefined>();

  const handleSelect = (key: number) => {
    dispatch({
      type: "SET_SELECTED_AAVEGOTCHI",
      selectedAavegotchiIndex: key
    })
    onHandleClose();
  }

  return (
    <Modal onHandleClose={onHandleClose}>
      <h2>Select Aavegotchi</h2>
      <Styled.GotchiGrid>
        {usersAavegotchis?.map((gotchi, i) => (
          <Styled.GotchiCard
            active={i === selectedAavegotchiIndex}
            onClick={() => handleSelect(i)}
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(undefined)}
          >
            <GotchiSVG
              tokenId={gotchi.id}
              options={{ animate: hoverIndex === i, armsUp: hoverIndex === i }}
            />
            <Styled.GotchiNamePlate>
              <h4>{gotchi.name}</h4>
            </Styled.GotchiNamePlate>
          </Styled.GotchiCard>
        ))}
      </Styled.GotchiGrid>
    </Modal>
  );
};
