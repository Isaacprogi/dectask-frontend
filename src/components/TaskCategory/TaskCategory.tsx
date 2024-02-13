import All from '../All/All';
import Todo from '../Todo/Todo';
import Progress from '../InProgress/InProgress';
import Done from '../Done/Done';

import useStatusContext from '../../hooks/useStatusContext';

const TaskCategory = () => {
  const { statuses } = useStatusContext();

  const renderComponentBasedOnStatus = () => {
    const activeStatus = statuses.find((status) => status.active);

    switch (activeStatus?.value) {
      case 'All':
        return <All />;
      case 'To Do':
        return <Todo />;
      case 'In Progress':
        return <Progress />;
      case 'Done':
        return <Done />;
      default:
        return null; 
    }
  };

  return <div className='w-full'>{renderComponentBasedOnStatus()}</div>;
};

export default TaskCategory;
