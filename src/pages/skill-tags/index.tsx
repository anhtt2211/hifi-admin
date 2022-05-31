import skillTagApi from '@/api/skillTagApi';
import AddSkillTagForm from '@/components/SkillTag/AddSkillTagForm';
import SkillTagTable from '@/components/SkillTag/SkillTagTable';
import UpdateSkillTagModal from '@/components/SkillTag/UpdateSkillTagModal';
import { SkillTag } from '@/types';
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';

type Props = {};

const SkillTagPage = (props: Props) => {
  const [data, setData] = useState<Array<SkillTag>>([]);
  const [selectedSkill, setSelectedSkill] = useState<SkillTag | null>(null);

  useEffect(() => {
    let isMounted = true;
    skillTagApi
      .getSkillTags()
      .then((skills) => {
        isMounted && setData(skills);
      })
      .catch((err) => console.log('skillTagApi gets: ', err));

    return () => {
      isMounted = false;
    };
  }, []);

  const onSuccess = (skillData: SkillTag | SkillTag[], mode?: string) => {
    if (mode === 'add-batch' && Array.isArray(skillData)) {
      setData((prev) => [...prev, ...(skillData as SkillTag[])]);
    } else {
      setData((prev) => {
        const newData = [...prev];
        skillData = skillData as SkillTag;
        const index = newData.findIndex(
          (s) => s._id === (skillData as SkillTag)._id,
        );
        if (index !== -1) {
          newData[index] = skillData;
        } else {
          newData.push(skillData);
        }
        return newData;
      });
    }
    setSelectedSkill(null);
  };
  return (
    <>
      <div>
        <h3 className="heading">Skill tags list</h3>
        <Row gutter={[20, 20]}>
          <Col md={14} sm={24}>
            <SkillTagTable
              data={data}
              setData={setData}
              onSelect={(selectedSkill) => setSelectedSkill(selectedSkill)}
            />
          </Col>
          <Col md={10} sm={24}>
            <AddSkillTagForm onSuccess={onSuccess} />
          </Col>
        </Row>
      </div>
      {selectedSkill && (
        <UpdateSkillTagModal
          visible={!!selectedSkill}
          skill={selectedSkill}
          onCancel={() => setSelectedSkill(null)}
          onSuccess={onSuccess}
        />
      )}
    </>
  );
};

export default SkillTagPage;
