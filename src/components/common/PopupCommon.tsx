import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../modules';
import { closePopup } from '../../modules/core';
import PopupBase from './PopupBase';
import Button from './Button';
import media from '../../lib/styles/media';

type PopupCommonProps = {};

function PopupCommon(props: PopupCommonProps) {
  const dispatch = useDispatch();
  const popup = useSelector((state: RootState) => state.core.popup);
  const onConfirm = useCallback(() => {
    dispatch(closePopup({}));
  }, [dispatch]);
  return (
    <PopupBase visible={popup.visible}>
      <Block>
        <h3>{popup.title}</h3>
        <p>{popup.message}</p>
        <ButtonBlock>
          <Button color="indigo" onClick={onConfirm}>
            확인
          </Button>
        </ButtonBlock>
      </Block>
    </PopupBase>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.725rem 1.5rem;
  h3 {
    margin: 0;
  }
  p {
    line-height: 1.75;
    word-break: break-word;
    overflow-wrap: break-word;
    display: -webkit-box;
  }
  ${media.xsmall} {
    width: calc(100vw - 2rem);
  }
  ${media.small} {
    width: 25rem;
  }
`;

const ButtonBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export default PopupCommon;
