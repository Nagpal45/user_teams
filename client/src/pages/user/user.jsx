import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './user.css'

export default function User() {
    const [user, setUser] = useState();
    const params = useParams();

    const [editedUser, setEditedUser] = useState({});
    const [editMode, setEditMode] = useState({
        first_name: false,
        last_name: false,
        email: false,
        domain: false,
        gender: false,
        available: false
    });

    useEffect(() => {
        setEditedUser(user);
    }, [user]);

    const handleEdit = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleSave = async (fieldName) => {
        try {
            const response = await axios.put(`/api/users/${user.id}`, {
                ...editedUser,
            });


            setUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));

        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const toggleEdit = (fieldName) => {
        setEditedUser({
            ...editedUser,
            [fieldName]: user ? user[fieldName] : "",
        });

        setEditMode({
            ...editMode,
            [fieldName]: !editMode[fieldName],
        });
    };

    const handleavatar = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);

        try {
            await axios.post(`/api/users/upload/${user._id}`, formData).then((res) => {
                setEditedUser({ ...editedUser, avatar: res.data.avatar });
                setUser(res.data);
                localStorage.setItem("user", JSON.stringify(res.data));

            });
        } catch (error) {
            console.error('Error uploading avatar:', error);
        }
    }

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`/api/users/${params.id}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, [params]);

    return (
        <div className="profilePage">
            <div className="profileWrapper">
                <div className="profileLeft">
                    <div className="profileHeading">Personal Info</div>
                    <div className="profileImgContainer">
                        <label htmlFor="file" className="profileImgLabel">
                            <div className="editIcon">
                                <img src="/pen.png" alt="" />
                            </div>
                            <input
                                type="file"
                                id="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                className="profilePageImg"
                                onChange={handleavatar}
                            />
                            <img
                                src={
                                    user
                                        ? user.avatar
                                            ? user.avatar
                                            : "/images/dummyProfilePic.png"
                                        : "/images/dummyProfilePic.png"
                                }
                                alt=""
                                className="profilePageImg"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/images/dummyProfilePic.png";
                                }
                                }
                            />
                        </label>
                    </div>
                </div>
                <div className="profileRight">
                    <div className="profileInfoItem">
                        <span className="profileInfoSubItemLabel">First Name</span>
                        <div className="profileInfoSubItem">
                            {editMode.first_name ? (
                                <input
                                    type="text"
                                    name="first_name"
                                    value={editedUser.first_name}
                                    onChange={handleEdit}
                                    className="profileInfoSubItemEditInput"
                                />
                            ) : user ? (
                                user.first_name ?
                                    user.first_name
                                    : <i>Update your First name</i>
                            ) : (
                                <i>Update your First name</i>
                            )}
                            <div
                                className="profileInfoSubItemEditBtn"
                                onClick={() => toggleEdit("first_name")}
                            >
                                {editMode.first_name ? "Cancel" : "Edit"}
                                {editMode.first_name && (
                                    <div
                                        className="profileInfoSubItemSaveBtn"
                                        onClick={handleSave}
                                    >
                                        Save
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="profileInfoItem">
                        <span className="profileInfoSubItemLabel">Last Name</span>
                        <div className="profileInfoSubItem">
                            {editMode.last_name ? (
                                <input
                                    type="text"
                                    name="last_name"
                                    value={editedUser.last_name}
                                    onChange={handleEdit}
                                    className="profileInfoSubItemEditInput"
                                />
                            ) : user ? (
                                user.last_name ?
                                    user.last_name
                                    : <i>Update your Last name</i>
                            ) : (
                                <i>Update your Last name</i>
                            )}
                            <div
                                className="profileInfoSubItemEditBtn"
                                onClick={() => toggleEdit("last_name")}
                            >
                                {editMode.last_name ? "Cancel" : "Edit"}
                                {editMode.last_name && (
                                    <div
                                        className="profileInfoSubItemSaveBtn"
                                        onClick={handleSave}
                                    >
                                        Save
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="profileInfoItem">
                        <span className="profileInfoSubItemLabel">Email</span>
                        <div className="profileInfoSubItem">
                            {editMode.email ? (
                                <input
                                    type="email"
                                    name="email"
                                    unique="true"
                                    value={editedUser.email}
                                    onChange={handleEdit}
                                    className="profileInfoSubItemEditInput"
                                />
                            ) : user ? (
                                user.email ?
                                    user.email
                                    : <i>Update your email</i>

                            ) : (
                                <i>Update your email</i>
                            )}
                            <div
                                className="profileInfoSubItemEditBtn"
                                onClick={() => toggleEdit("email")}
                            >
                                {editMode.email ? "Cancel" : "Edit"}
                                {editMode.email && (
                                    <div
                                        className="profileInfoSubItemSaveBtn"
                                        onClick={handleSave}
                                    >
                                        Save
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="profileInfoItem">
                        <span className="profileInfoSubItemLabel">Domain</span>
                        <div className="profileInfoSubItem">
                            {editMode.domain ? (
                                <input
                                    type="number"
                                    maxLength="10"
                                    name="domain"
                                    value={editedUser.domain}
                                    onChange={handleEdit}
                                    className="profileInfoSubItemEditInput"
                                />
                            ) : user ? (
                                user.domain ?
                                    user.domain
                                    : <i>Update your domain number</i>
                            ) : (
                                <i>Update your domain number</i>
                            )}
                            <div
                                className="profileInfoSubItemEditBtn"
                                onClick={() => toggleEdit("domain")}
                            >
                                {editMode.domain ? "Cancel" : "Edit"}
                                {editMode.domain && (
                                    <div
                                        className="profileInfoSubItemSaveBtn"
                                        onClick={handleSave}
                                    >
                                        Save
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="profileInfoItem">
                        <span className="profileInfoSubItemLabel">Gender</span>
                        <div className="profileInfoSubItem">
                            {editMode.gender ? (
                                <input
                                    type="text"
                                    name="gender"
                                    value={editedUser.gender}
                                    onChange={handleEdit}
                                    className="profileInfoSubItemEditInput"
                                />
                            ) : user ? (
                                user.gender ?
                                    user.gender
                                    : <i>Update your gender</i>

                            ) : (
                                <i>Update your gender</i>
                            )}
                            <div
                                className="profileInfoSubItemEditBtn"
                                onClick={() => toggleEdit("gender")}
                            >
                                {editMode.gender ? "Cancel" : "Edit"}
                                {editMode.gender && (
                                    <div
                                        className="profileInfoSubItemSaveBtn"
                                        onClick={handleSave}
                                    >
                                        Save
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
