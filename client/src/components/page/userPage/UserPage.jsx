import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import QualitiesList from '../../UI/qualities/QualitiesList';
import Container from '../../UI/Container';
import LeftColumn from '../../UI/LeftColumn';
import RightColumn from '../../UI/RightColumn';
import Card from '../../UI/Card';
import UserMainCard from '../../UI/UserMainCard';
import NewCommentCard from '../../UI/comments/NewCommentCard';
import CommentsCard from '../../UI/comments/CommentsCard';
import CommentsContainer from '../../UI/comments/CommentsContainer';
import CommentsProvider from '../../../hooks/useComments';
import { useSelector } from 'react-redux';
import { getCurrentUserId, getUserById } from '../../../store/users';

const UserPage = () => {
    const { id } = useParams();
    const currentUserId = useSelector(getCurrentUserId());
    const userData = useSelector(getUserById(id));
    if (userData) {
        return (
            <Container>
                <LeftColumn>
                    <Card>
                        {currentUserId === id && (
                            <Link to="edit">
                                <button className="position-absolute top-0 end-0 btn btn-light btn-sm ">
                                    <i className="bi bi-gear"></i>
                                </button>
                            </Link>
                        )}
                        <UserMainCard
                            name={userData.name}
                            profession={userData.profession}
                            rate={userData.rate}
                            imgKey={userData._id}
                        />
                    </Card>
                    <Card
                        title="Qualities"
                        text={<QualitiesList qualities={userData.qualities} />}
                        classes="card-body d-flex flex-column justify-content-center text-center"
                    ></Card>
                    <Card
                        title="Completed meetings"
                        classes="card-body d-flex flex-column justify-content-center text-center"
                    >
                        <h1 className="display-1">
                            {userData.completedMeetings}
                        </h1>
                    </Card>
                </LeftColumn>
                <RightColumn>
                    <CommentsProvider>
                        <CommentsContainer thisPageId={id}>
                            <NewCommentCard />
                            <CommentsCard />
                        </CommentsContainer>
                    </CommentsProvider>
                </RightColumn>
            </Container>
        );
    } else return <h2>Loading...</h2>;
};

export default UserPage;
