import { RefObject, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Notfound from '../components/UI/NotFound';

export const useInfiniteLoading = (
	loading: boolean,
	fetchMore: () => void,
	loader: RefObject<HTMLDivElement>
) => {
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !loading) {
					fetchMore();
				}
			},
			{ threshold: 1 }
		);
		if (loader.current) {
			observer.observe(loader.current);
		}
		return () => {
			if (loader.current) {
				observer.unobserve(loader.current);
			}
		};
	}, [loading]);
};

interface InfiniteLoadProps {
	loading: boolean;
	loadingComponent?: React.ReactNode;
	params: {
		[key: string]: any;
	};
	children: React.ReactNode;
	data: any[];
	notFoundContent?: React.ReactNode;
	setParams: (params: { [key: string]: any }) => void;
}
const InfiniteLoad: React.FC<InfiniteLoadProps> = ({
	loading,
	params,
	notFoundContent,
	data,
	children,
	loadingComponent,
	setParams,
}: InfiniteLoadProps) => {
	const loader = useRef<HTMLDivElement>(null);
	const fetchMore = () => {
		setParams((params: any) => ({
			...params,
			page: params.page ? params.page + 1 : 1,
		}));
	};
	useInfiniteLoading(loading, fetchMore, loader);

	return (
		<>
			{loading && params.page === 1 ? (
				<>{loadingComponent ? loadingComponent : null}</>
			) : (
				<>
					{data.length === 0 ? (
						<>
							<Notfound
								content={
									notFoundContent ? notFoundContent : <div>Not found.</div>
								}
							/>
						</>
					) : (
						<>
							{children}
							{loading && params.page && params.page > 1 && (
								<LoadingWrapper style={{ height: '50px' }}>
									<img
										src="/images/loading.svg"
										alt="loading"
										width={'30px'}
										height={'30px'}
									/>
								</LoadingWrapper>
							)}
							<Loader ref={loader} />
						</>
					)}
				</>
			)}
		</>
	);
};

export default InfiniteLoad;
const Loader = styled.div``;
const LoadingWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50px;
`;
