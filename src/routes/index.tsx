import { createBrowserRouter } from 'react-router-dom';
import HomeLayout from '../components/layouts/home.layout';
import HomePage from '../pages/home';
import RankingPage from '../pages/ranking';
import FriendsPage from '../pages/friends';
import WalletPage from '../pages/wallet';

export const ROUTES = {
	ERROR: '*',
	HOME: '/',
	PACKAGES: '/packages',
	MISSION: '/mission',
	RANKING: '/ranking',
	REFERRAL: '/referral',
	FRIENDS: '/friends',
	WALLET: '/wallet',
	MY_REWARDS: '/my-rewards',
	LUCKY_SPIN: '/lucky-spin',
	CAMPAIGN: '/campaign/:id',
	EARN: '/earn',
	FARM: '/farm',
	WITHDRAWAL: '/withdrawal',
	WALLET_HISTORY: '/wallet-history',
	CAMPAIGNS: '/campaigns',
	TRANSACTION_DETAIL: '/transaction-detail',
	IDO_LIST: '/ido-list',
	LOTTERY: '/lottery',
	LOTTERY_DETAIL: '/lottery/pool-detail',
	DEPOSIT: '/deposit',
	LOTTERY_RESULT_DETAIL: '/lottery/pool-detail/result',
	SWAP: '/swap',
};

export const router = createBrowserRouter([
	{
		element: <HomeLayout />,
		children: [
			{ path: ROUTES.HOME, element: <HomePage /> },
			{ path: ROUTES.RANKING, element: <RankingPage /> },
			{ path: ROUTES.FRIENDS, element: <FriendsPage /> },
			{ path: ROUTES.WALLET, element: <WalletPage /> },
		],
	},
]);
