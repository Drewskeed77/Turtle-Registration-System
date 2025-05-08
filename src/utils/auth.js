export const getUserRole = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    return user ? user.role : null;
};
