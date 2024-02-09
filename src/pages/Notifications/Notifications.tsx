import React, { useEffect, useState } from 'react';
import NotificationCard from '../../components/NotificationCard/NotificationCard';
import { Task } from '../../types/types';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const Notifications: React.FC = () => {
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);

  useEffect(() => {
    socket.on('upcomingTasksNotification', (tasks: Task[]) => {
      setUpcomingTasks(tasks);
    });
    
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="w-full p-[1rem] flex flex-col gap-y-[2rem]">
      {upcomingTasks.map((task: Task) => (
        <NotificationCard task={task} key={task._id} />
      ))}
    </div>
  );
};

export default Notifications;
