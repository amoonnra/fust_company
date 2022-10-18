import React, { useState, useEffect } from 'react';
import UserAva from '../UserAva';
import timeAgo from '../../../utils/timeAgo';
import { getUserById, getCurrentUserId } from '../../../store/users';
import { useSelector } from 'react-redux';

const CommentItem = ({ userId, commentText, time, onDelete }) => {
	const currentUserId = useSelector(getCurrentUserId());
	const user = useSelector(getUserById(userId));

	return (
		<div className="bg-light card-body mb-3">
			<div className="row mb-2">
				<div className="col">
					<div className="d-flex flex-start">
						{user ? (
							<>
								<UserAva
									imgKey={userId}
									width="65"
									height="65"
									classes="shadow-1-strong me-3"
									alt="avatar"
								/>
								<div className=" flex-grow-1 flex-shrink-1 ">
									<div className="mb-4">
										<div className=" d-flex justify-content-between align-items-center ">
											<p className="mb-1">
												<b>{user.name} </b>
												<span
													className="small"
													style={{ verticalAlign: 'unset' }}
												>
													- {timeAgo(time)}
												</span>
											</p>
											{userId === currentUserId && (
												<button
													onClick={onDelete}
													className=" btn btn-sm text-primary d-flex align-items-center "
												>
													<i className=" bi bi-x-lg "></i>
												</button>
											)}
										</div>
										<p className="small mb-0">{commentText}</p>
									</div>
								</div>
							</>
						) : (
							'Loading...'
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default React.memo(CommentItem);
