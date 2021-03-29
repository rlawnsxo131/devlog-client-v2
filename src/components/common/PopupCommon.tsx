import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/react';
import { RootState } from '../../modules';
import { closePopup } from '../../modules/core';
import PopupBase from './PopupBase';
import Button from './Button';
import media from '../../lib/styles/media';

interface PopupCommonProps {}

function PopupCommon(props: PopupCommonProps) {
  const dispatch = useDispatch();
  const popup = useSelector((state: RootState) => state.core.popup);
  const onConfirm = useCallback(() => {
    dispatch(closePopup({}));
  }, [dispatch]);
  return (
    <PopupBase visible={popup.visible}>
      <div css={block}>
        <h3>{popup.title}</h3>
        <p>{popup.message}</p>
        <div css={buttonBlock}>
          <Button color="indigo" onClick={onConfirm}>
            확인
          </Button>
        </div>
      </div>
    </PopupBase>
  );
}

const block = css`
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

const buttonBlock = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export default PopupCommon;
