'use client';
import { useEffect, useState } from 'react';
import { playGame, getPlayerBalance, getPool } from './backend';

import HistoryExpand from '../component/HistoryExpand';
import { HistoryItem } from '../type';
import Header from '../component/Header';
import BettingInterface from '../component/bettingInterface/BettingInterface';

const Demo = () => {
  const [playerbalance, setPlayerbalance] = useState(0);
  const [demoHis, setDemoHis] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setPlayerbalance(getPlayerBalance());
  }, []);

  const handleBet = async (multiplier: number, amount: number) => {
    const r = playGame(amount, multiplier);
    setPlayerbalance(getPlayerBalance());
    const data: HistoryItem = { ...r, multiplier, transaction: '' };
    setDemoHis([...demoHis, data]);
    return r;
  };

  return (
    <>
      <Header links={[{ name: 'Bet on the blockchain', url: '/bet' }]}>
        <p className="px-2 py-2 font-semibold text-cc2 bg-cc3/20 rounded-md select-none">
          Your Balance: {playerbalance.toFixed(4)}
        </p>
      </Header>
      <main className="flex justify-center items-center grow lg:flex-col lg:gap-10">
        <section className="w-1/3 self-start lg:self-center lg:w-2/3">
          <HistoryExpand history={demoHis} clear={() => setDemoHis([])} />
        </section>
        <BettingInterface handleBet={handleBet} maxAmount={getPool() / 12} />
      </main>
    </>
  );
};

export default Demo;
