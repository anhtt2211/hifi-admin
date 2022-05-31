import skillTagApi from '@/api/skillTagApi';
import AddSkillTagForm from '@/components/SkillTag/AddSkillTagForm';
import SkillTagTable from '@/components/SkillTag/SkillTagTable';
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

  const onSuccess = (skill: SkillTag) => {
    setData((prev) => {
      const newData = [...prev];
      const index = newData.findIndex((s) => s._id === skill._id);
      if (index !== -1) {
        newData[index] = skill;
      } else {
        newData.push(skill);
      }
      return newData;
    });
  };
  return (
    <div>
      <h3 className="heading">Skill tags list</h3>
      <Row gutter={[20, 20]}>
        <Col span={14}>
          <SkillTagTable
            data={data}
            setData={setData}
            onSelect={(selectedSkill) => setSelectedSkill(selectedSkill)}
          />
        </Col>
        <Col span={10}>
          <AddSkillTagForm
            skill={selectedSkill}
            onReset={() => {
              setSelectedSkill(null);
            }}
            onSuccess={onSuccess}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SkillTagPage;
