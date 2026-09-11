import { Navigation } from '#publicComponents';
import Editor from '../../components/HomePage/Editor';
import { useContext } from 'react';
import { StudyDispatchContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const New = () => {
  const { onCreate } = useContext(StudyDispatchContext);
  const nav = useNavigate();

  const onSubmit = (input) => {
    onCreate(input);
    nav('/', { replace: true });
  };

  return (
    <div>
      <Navigation />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
