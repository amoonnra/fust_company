import React, { useState } from 'react';
import Card from '../Card';
import FormComponent, {
	TextField,
	SelectField,
	TextAreaField,
} from '../../common/form/';

const NewCommentCard = ({ users, thisPageId, onSubmit }) => {
	const handleSubmit = (data) => {
		onSubmit(data);
	};

	const validatorConfig = {
		userId: {
			isRequired: {
				message: 'Выберите пользователя',
			},
		},
		content: {
			isRequired: {
				message: 'Введите хоть что-то...',
			},
		},
	};

	return (
		<Card title="New Comment" isContent>
			<div className="mb-4">
				<FormComponent
					onSubmit={handleSubmit}
					validatorConfig={validatorConfig}
					autoClear
				>
					<TextAreaField
						labelText="Сообщение"
						placeholder="Введите сообщение: "
						name="content"
						rows="3"
					/>
					<button className="btn btn-primary">Отправить</button>
				</FormComponent>
			</div>
		</Card>
	);
};

export default NewCommentCard;
