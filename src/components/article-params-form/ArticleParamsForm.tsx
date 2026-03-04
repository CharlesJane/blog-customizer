import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useState } from 'react';

export const ArticleParamsForm = () => {
	const [isParamsFormOpen, setIsParamsFormOpen] = useState(false);

	const toggleParamsForm = () => setIsParamsFormOpen((prev) => !prev);

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
						<Select selected={} options={} />
						<RadioGroup name='name' options={} selected={} title=' ' />
						<Select selected={} options={} />
						<Separator />
						<Select selected={} options={} />
						<Select selected={} options={} />
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
