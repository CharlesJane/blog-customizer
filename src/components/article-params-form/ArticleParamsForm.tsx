import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	ArticleStateType,
	fontSizeOptions,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useState } from 'react';

type ArticleParamsFormProps = {
	currentState: ArticleStateType;
	setCurrentState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({
	currentState,
	setCurrentState,
}: ArticleParamsFormProps) => {
	const [isParamsFormOpen, setIsParamsFormOpen] = useState(false);
	const [tempState, setTempState] = useState<ArticleStateType>(currentState);

	const toggleParamsForm = () => setIsParamsFormOpen((prev) => !prev);

	const handleChange =
		(fieldName: keyof ArticleStateType) => (selectedOption: OptionType) => {
			setTempState((prev) => ({
				...prev,
				[fieldName]: selectedOption,
			}));
		};

	const handleApplication = () => {
		setCurrentState(tempState);
	};

	const handleReset = () => {
		setTempState(defaultArticleState);
		setCurrentState(defaultArticleState);
	};

	const handleSubmit = (evt: React.FormEvent) => {
		evt.preventDefault();
		handleApplication();
	};

	useEffect(() => {
		if (!isParamsFormOpen) return;

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
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={tempState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={tempState.fontSizeOption}
						title='Размер шрифта'
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						selected={tempState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						selected={tempState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						selected={tempState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={handleChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
