import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navigation } from '#publicComponents';
import { getStudy, updateStudy } from '../../api/studies';
import Editor from '../../components/HomePage/Editor';

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const [curStudyItem, setCurStudyItem] = useState();

  useEffect(() => {
    const fetchStudy = async () => {
      try {
        const study = await getStudy(params.id);
        setCurStudyItem(study);
      } catch {
        window.alert('존재하지 않는 스터디입니다.');
        nav('/', { replace: true });
      }
    };

    fetchStudy();
  }, [params.id]);

  const onSubmit = async (input) => {
    if (window.confirm('스터디를 정말 수정할까요?')) {
      await updateStudy(params.id, {
        nickname: input.nickname,
        name: input.name,
        description: input.description,
        background: String(input.background),
        password: input.password,
      });
    }
    nav('/', { replace: true });
  };

  return (
    <div>
      <Navigation />
      {curStudyItem && <Editor initData={curStudyItem} onSubmit={onSubmit} />}
    </div>
  );
};

export default Edit;
