import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { allStats } from '../../Redux/actions/statsActions';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Stats() {
  const stats = useSelector((state) => state.stats);
  console.log('🚀 ~ file: Stats.jsx ~ line 11 ~ Stats ~ stats', stats);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allStats());
  }, []);

  const likes = stats?.reduce((acc, el) => acc + el?.Likes?.length, 0);
  const favorites = stats.reduce((acc, el) => acc + el?.Favorites?.length, 0);
  const views = stats.reduce((acc, el) => acc + el?.view, 0);

  const data = {
    labels: ['Лайки', 'Избранные', 'Просмотры', 'Комментарии'],
    datasets: [
      {
        label: '# of Votes',
        data: [likes, favorites, views],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: '500px' }}>
      <Doughnut data={data} />
    </div>
  );
}
