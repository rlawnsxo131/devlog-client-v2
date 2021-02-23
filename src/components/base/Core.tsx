import useDarkmode from '../../lib/hooks/useDarkmode';
import Loading from '../common/Loading';
import PopupCommon from '../common/PopupCommon';

type CoreProps = {};

function Core(props: CoreProps) {
  useDarkmode();
  return (
    <>
      <Loading />
      <PopupCommon />
    </>
  );
}

export default Core;
