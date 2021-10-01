import "./style.css";

export default function UserProfilePic({ user, toggleUploader }) {
    return (
        <>
            {user.user.image ? (
                <img
                    id="img"
                    src={user.user.image}
                    onClick={(e) => toggleUploader(e)}
                    alt={`${user.user.first_name} ${user.user.last_name}`}
                    data-testid="profile-pic"
                />
            ) : (
                <img
                    id="img"
                    src="/assets/dolde2.png"
                    onClick={(e) => toggleUploader(e)}
                    alt="default"
                    data-testid="profile-pic"
                />
            )}
        </>
    );
}
