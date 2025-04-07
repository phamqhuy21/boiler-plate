import { OKXTonConnectUiCreateOptions, THEME } from '@okxconnect/ui';

export const config = {
	base_url: process.env.REACT_APP_BASE_URL || '',
	blog_url: `${process.env.REACT_APP_PADTON_API_URL}/blogs` || '',
	bcs_scan_url: process.env.REACT_APP_BSC_SCAN_URL || '',
	ton_scan_url: process.env.REACT_APP_TON_SCAN_URL || '',
	BLOG_DOMAIN: 'https://blog.padton.com/',
	padton_api_url: process.env.REACT_APP_PADTON_API_URL || '',
	padton_website: process.env.REACT_APP_PADTON || '',
};

export const connectOkxParams = {
	namespaces: {
		eip155: {
			chains: ['eip155:1', 'eip155:66', 'eip155:56'], // Network Ethereum (1), OKTC (66), and BSC (56)
			rpcMap: {
				1: 'https://testnet.toncenter.com/api/v2/jsonRPC', // Set Your Own RPC URL for Ethereum Mainnet
			},
			defaultChain: '1',
		},
	},
	optionalNamespaces: {
		eip155: {
			chains: ['eip155:43114'],
		},
	},
	sessionConfig: {
		openUniversalUrl: false,
		redirect: 'tg://resolve',
	},
};

export const connectTonOkxUIParams: OKXTonConnectUiCreateOptions = {
	dappMetaData: {
		name: process.env.REACT_MINIAPP_NAME || 'PadTON',
		icon: process.env.REACT_APP_ICON_URL || '',
	},
	buttonRootId: null,
	actionsConfiguration: {
		returnStrategy: 'none',
	},
	uiPreferences: {
		theme: THEME.DARK,
	},
	language: 'en_US',
	restoreConnection: true,
};
