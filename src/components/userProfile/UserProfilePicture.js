export default function UserProfilePic({
    user,
    setIsVisible,
    visible,
    toggleUploader,
}) {
    return (
        <>
            {user.image ? (
                <img
                    id="img"
                    src={user.image}
                    onClick={(e) => toggleUploader(e)}
                    alt={`${user.first_name} ${user.last_name}`}
                    data-testid="profile-pic"
                />
            ) : (
                <img
                    id="img"
                    src="/"
                    onClick={(e) => toggleUploader(e)}
                    alt="default"
                    data-testid="profile-pic"
                />
            )}
        </>
    );
}
