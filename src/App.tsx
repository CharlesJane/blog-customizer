import { CSSProperties, useState, useEffect } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import styles from './styles/index.module.scss';

export const App = () => {
	const getAppliedState = (): ArticleStateType => {
		const applied = localStorage.getItem('articleParams');

		if (applied) {
			try {
				return JSON.parse(applied);
			} catch (evt) {
				console.error('Не удается загрузить параметры из localStorage:', evt);
			}
		}
		return defaultArticleState;
	};

	const [currentState, setCurrentState] = useState<ArticleStateType>(
		getAppliedState()
	);

	useEffect(() => {
		localStorage.setItem('articleParams', JSON.stringify(currentState));
	}, [currentState]);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': currentState.fontFamilyOption.value,
					'--font-size': currentState.fontSizeOption.value,
					'--font-color': currentState.fontColor.value,
					'--container-width': currentState.contentWidth.value,
					'--bg-color': currentState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				currentState={currentState}
				setCurrentState={setCurrentState}
			/>
			<Article />
		</main>
	);
};
