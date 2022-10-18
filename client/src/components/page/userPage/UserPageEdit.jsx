import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import QualitiesList from '../../UI/qualities/QualitiesList';
import FormComponent, { TextField, SelectField } from '../../common/form/';
import RadioField from '../../common/form/RadioField';
import MultiSelectField from '../../common/form/MultiSelectField';
import { useDispatch, useSelector } from 'react-redux';
import {
    getQualities,
    getQualitiesLoadingStatus,
} from '../../../store/qualities';
import {
    getProfessions,
    getProfessionsLoadingStatus,
} from '../../../store/professions';
import { getCurrentUserData, updateUserData } from '../../../store/users';

const UserPageEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const currentUser = useSelector(getCurrentUserData());
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const professions = useSelector(getProfessions());
    const professionLoading = useSelector(getProfessionsLoadingStatus());
    const qualities = useSelector(getQualities());
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
    const dispatch = useDispatch();
    const getQualitiesByIds = (qualIds) => {
        const qualitiesArray = [];
        for (const qualId in qualIds) {
            for (const quality in qualities) {
                if (qualIds[qualId] === qualities[quality]._id) {
                    qualitiesArray.push(qualities[quality]);
                }
            }
        }
        return qualitiesArray;
    };

    const transformData = (data) => {
        return data.map((q) => ({ label: q.name, value: q._id }));
    };

    useEffect(() => {
        if (!professionLoading && !qualitiesLoading && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: transformData(
                    getQualitiesByIds(currentUser.qualities)
                ),
            });
            setIsLoading(false);
        }
    }, [professionLoading, qualitiesLoading, currentUser, data]);

    if (id !== currentUser._id) {
        console.log(`/users/${currentUser._id}/edit`);
        return <Navigate to={`/users/${currentUser._id}/edit`} />;
    }

    const validatorConfig = {
        name: {
            isRequired: {
                message: 'Электронная почта обязательна к заполнению',
            },
        },
        email: {
            isRequired: {
                message: 'Электронная почта обязательна к заполнению',
            },
            isEmail: {
                message: 'Введите корректный адрес почты',
            },
        },
        qualities: {
            isRequired: {
                message: 'Выберите хотя бы одно качество',
            },
        },
    };

    const handleSubmit = (data) => {
        dispatch(
            updateUserData({
                ...data,
                qualities: data.qualities.map((q) => q.value),
            })
        );
        navigate('/users/' + currentUser._id);
    };

    if (!isLoading) {
        return (
            <div style={{ position: 'relative' }}>
                <button
                    style={{ position: 'absolute', top: '20px', left: '20px' }}
                    className="btn btn-primary"
                    onClick={() => navigate(-1)}
                >
                    <i className="bi bi-caret-left-fill mr-1"></i> Назад
                </button>
                <div style={{ maxWidth: '500px', margin: 'auto' }}>
                    <h1>Редактирование</h1>
                    <FormComponent
                        onSubmit={handleSubmit}
                        validatorConfig={validatorConfig}
                        defaultData={data}
                    >
                        <TextField labelText="Имя: " name="name" />
                        <TextField
                            labelText="Электронная почта: "
                            name="email"
                        />
                        <SelectField
                            name="profession"
                            labelText="Выберите проффесию"
                            defaultOption="Выберите..."
                            options={professions}
                        />
                        <RadioField
                            name="sex"
                            labelText="Выберите ваш пол"
                            options={[
                                { name: 'Male', value: 'male' },
                                { name: 'Female', value: 'female' },
                                { name: 'Other', value: 'other' },
                            ]}
                        />
                        <MultiSelectField
                            options={qualities}
                            name="qualities"
                            labelText="Выберите свои качества"
                        />

                        <button className="btn btn-primary w-100 mt-4 ">
                            Сохранить
                        </button>
                    </FormComponent>
                </div>
            </div>
        );
    } else return 'loadi';
};

export default UserPageEdit;
