import axiosIns from "./axiosConfig";

export async function loginUser({ email, password }) {
  try {
    const response = await axiosIns.post("/gloubeOut/auth/login", {
      UsernameOrEmail: email,
      Password: password,
    });
    return response.data; // { token, user, etc... }
  } catch (error) {
    if (error.response) {
      // Server responded with a status (like 400, 401, etc.)
      if (error.response.status === 404)
        throw new Error("Email Or Password is not correct !");
      if (error.response.status === 403)
        throw new Error("Access denied. Your account may be suspended.");
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
  }
}

export async function signUpUser({
  firstName,
  lastName,
  email,
  password,
  nationality,
  gender,
  profilePicture,
}) {
  try {
    const response = await axiosIns.post("/gloubeOut/auth/register/tourist", {
      firstName,
      lastName,
      email,
      password,
      role: "Tourist",
      nationality,
      gender,
      profilePicture,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400)
        throw new Error("Email Already Exits ");

      if (error.response.status === 409)
        throw new Error("This email is already registered.");
      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}
export async function travelAgencySignUp({
  email,
  password,
  agencyName,
  city,
  country,
  address,
  contact,
  profilePicture,
  website,
}) {
  try {
    const response = await axiosIns.post("/gloubeOut/auth/register/agency", {
      email,
      password,
      role: "TravelAgency",
      agencyName,
      city,
      country,
      address,
      contact,
      profilePicture,
      website,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400)
        throw new Error("Email Already Exists");

      if (error.response.status === 409)
        throw new Error("This email is already registered.");

      if (error.response.status === 500)
        throw new Error("Server error. Please try again later.");
    }
    throw new Error("Something went wrong. Please try again.");
  }
}
