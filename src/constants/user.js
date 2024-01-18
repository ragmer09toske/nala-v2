import axios from "axios";
import URI_Server from "uri";

let user = {};

export const fetchCurrentUser = async () => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
        },
    };
    
    try {
        const response = await axios.get(
            `https://${URI_Server}/nala/users/${localStorage.getItem("user_id")}`,
            config
        );
        user = response.data;
        console.log(user)
    } catch (e) {
        console.log(e.message);
    }
};

// Exporting the user object
export default user;