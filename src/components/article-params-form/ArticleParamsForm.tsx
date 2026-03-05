import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	defaultArticleState,
	ArticleStateType,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useState } from 'react';

export const ArticleParamsForm = () => {
	const [isParamsFormOpen, setIsParamsFormOpen] = useState(false);
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const toggleParamsForm = () => setIsParamsFormOpen((prev) => !prev);
	const handleChange =
		(fieldName: keyof ArticleStateType) => (selectedOption: OptionType) => {
			setArticleState((prev) => ({
				...prev,
				[fieldName]: selectedOption,
			}));
		};

	useEffect(() => {
		const handleClickOutside = (evt: MouseEvent) => {
			const paramsForm = document.querySelector('aside');

			if (paramsForm && !paramsForm.contains(evt.target as Node)) {
				setIsParamsFormOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isParamsFormOpen]);

	return (
		<>
			<ArrowButton
				isOpen={isParamsFormOpen}
				onClick={toggleParamsForm}
				aria-expanded={isParamsFormOpen}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isParamsFormOpen,
				})}
				aria-hidden={!isParamsFormOpen}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Select
							selected={articleState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleChange('fontFamilyOption')}
						/>
						<RadioGroup
							name='name'
							options={fontSizeOptions}
							selected={articleState.fontSizeOption}
							title=' '
						/>
						<Select
							selected={articleState.fontColor}
							options={fontColors}
							onChange={handleChange('fontColor')}
						/>
						<Separator />
						<Select
							selected={articleState.backgroundColor}
							options={backgroundColors}
							onChange={handleChange('backgroundColor')}
						/>
						<Select
							selected={articleState.contentWidth}
							options={contentWidthArr}
							onChange={handleChange('contentWidth')}
						/>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
