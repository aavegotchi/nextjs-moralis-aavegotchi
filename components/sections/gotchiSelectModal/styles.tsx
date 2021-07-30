import { styled } from 'theme';

export const GotchiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.6rem;

  @media ${({ theme }) => theme.mediaQueries.phone} {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const GotchiCard = styled.div<{active: boolean}>`
  position: relative;
  border: 2px solid;
  cursor: pointer;
  border-color: ${({ theme, active }) => active ? theme.colors.primary : 'transparent'};
  width: 100%;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

export const GotchiNamePlate = styled.div`
  
`