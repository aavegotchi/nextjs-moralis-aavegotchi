import { styled } from 'theme';

export const Wrapper = styled.header`
  position: relative;
  width: 100%;
  background-color: ${({theme}) => theme.colors.dark0};
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 2.4rem;
  border-bottom: 1px solid ${({theme}) => theme.colors.dark2};

  @media ${({theme}) => theme.mediaQueries.laptop} {
    position: sticky;
    top:0;
  };
`

export const GotchiIconWrapper = styled.div`
  background-color: ${({theme}) => theme.colors.light1};
  height: 2.8rem;
  width: 2.8rem;
  border-radius: 50%;
  display: grid;
  align-items: center;
  overflow: hidden;
`

export const GotchiIcon = styled.img`
  height: 100%;
  width: 100%;
`

export const AavegotchiDetails = styled.div`
  margin-left: 0.8rem;
  p {
    font-size: 1.2rem;
    text-align: right;
    margin: 0;
    color: ${({ theme }) => theme.colors.light0}
  }
  p:last-of-type {
    color: ${({ theme }) => theme.colors.light1}
  }
`