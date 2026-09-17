import { useNavigate } from 'react-router-dom';
import { Navigation } from '#publicComponents';
import { createStudy } from '../../api/studies';
import Editor from '../../components/HomePage/Editor';

const New = () => {
  const nav = useNavigate();

  const onSubmit = async (input) => {
    await createStudy({
      nickname: input.nickname,
      name: input.name,
      description: input.description,
      background: String(input.background),
      password: input.password,
    });
    nav('/', { replace: true });
  };

  return (
    <div>
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
